export const siteConfig = {
  phone: "078-646-8077",
  phoneHref: "tel:078-646-8077",
  social: {
    facebook: "https://www.facebook.com/jtptrading",
    instagram: "https://www.instagram.com/jtp_wholesale/",
    twitter: "https://twitter.com/kobe_patina",
  },
  onlineStores: {
    rakuten: "https://www.rakuten.co.jp/",
    yahoo: "https://shopping.yahoo.co.jp/",
  },
  // Placeholder until the JTP e-commerce site exists — update this single value
  // once it launches and every "See More" product link site-wide will point there.
  ecommerceUrl: "#",
  navItems: [
    { key: "home", href: "/" },
    { key: "business", href: "/business" },
    { key: "trading", href: "/trading" },
    { key: "oem", href: "/oem" },
    { key: "company", href: "/company" },
    { key: "contact", href: "/contact" },
  ] as const,
} as const;
