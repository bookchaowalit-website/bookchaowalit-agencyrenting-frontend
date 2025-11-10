import React from "react";
import Nav from "./components/Nav";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  return (
    <>
      <Nav locale={locale} />
      {children}
    </>
  );
}
