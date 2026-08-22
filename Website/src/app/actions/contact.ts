"use server";

import { Resend } from "resend";
import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSchema = z.object({
  name: z.string().min(1, "required"),
  phone: z.string().min(1, "required"),
  company: z.string().optional(),
  email: z.string().min(1, "required").regex(EMAIL_RE, "email"),
  message: z.string().min(1, "required"),
  website: z.string().optional(), // honeypot field, must stay empty
});

export type ContactState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Record<string, string>;
};

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());

  // Honeypot: bots fill every field, real users never see/fill this one.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return { status: "success" };
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  const { name, phone, company, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    console.error(
      "[contact] RESEND_API_KEY or CONTACT_EMAIL_TO is not configured — inquiry was not delivered.",
      { name, email, phone },
    );
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM ?? "JTP Trading Website <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[JTP Trading Website] New inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Company: ${company || "-"}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend returned an error", error);
      return { status: "error" };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Failed to send contact email", err);
    return { status: "error" };
  }
}
