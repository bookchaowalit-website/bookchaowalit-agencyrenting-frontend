import React from "react";
import Nav from "./components/Nav";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  return (
    <div lang={locale === "th" ? "th" : "en"}>
      <Nav locale={locale} />
      {children}
    </div>
  );
}
