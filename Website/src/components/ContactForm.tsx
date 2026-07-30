"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const t = useTranslations("contact.form");
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-neutral-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
    >
      {pending ? t("submitting") : t("submit")}
    </button>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("contact.form");
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-neutral-800">
        <span>{label}</span>
        <span className={`text-xs ${required ? "text-amber-600" : "text-neutral-400"}`}>
          {required ? t("required") : t("optional")}
        </span>
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction] = useActionState(submitContactForm, initialState);

  const fieldError = (code?: string) =>
    code ? (code === "email" ? t("validation.email") : t("validation.required")) : undefined;

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-lg font-semibold text-emerald-900">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-emerald-700">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, catches basic bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">{t("errorTitle")}</p>
          <p className="mt-1">{t("errorBody")}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t("name")} required error={fieldError(state.fieldErrors?.name)}>
          <input id="name" name="name" type="text" required className={inputClass} />
        </Field>
        <Field id="furigana" label={t("furigana")} required error={fieldError(state.fieldErrors?.furigana)}>
          <input id="furigana" name="furigana" type="text" required className={inputClass} />
        </Field>
        <Field id="phone" label={t("phone")} required error={fieldError(state.fieldErrors?.phone)}>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </Field>
        <Field id="company" label={t("companyOptional")} error={fieldError(state.fieldErrors?.company)}>
          <input id="company" name="company" type="text" className={inputClass} />
        </Field>
      </div>

      <Field id="email" label={t("email")} required error={fieldError(state.fieldErrors?.email)}>
        <input id="email" name="email" type="email" required className={inputClass} />
      </Field>

      <Field id="message" label={t("message")} required error={fieldError(state.fieldErrors?.message)}>
        <textarea id="message" name="message" rows={6} required className={inputClass} />
      </Field>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
