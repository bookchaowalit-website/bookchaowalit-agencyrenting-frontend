import React from "react";
import Nav from "./components/Nav";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children } = props;
  const { locale } = await props.params;
  return (
    <div lang={locale === "th" ? "th" : "en"}>
      <Nav locale={locale} />
      {children}
    </div>
  );
}
