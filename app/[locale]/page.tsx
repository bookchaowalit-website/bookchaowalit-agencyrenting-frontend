"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Bath, BedDouble, MapPin, Phone, Radio, Search } from "lucide-react";
import { getFeaturedProperties, type Property } from "@/lib/sampleData";

const copy = {
  en: {
    navListings: "Inventory", navAbout: "Desk", navContact: "Call the desk",
    eyebrow: "AGENCY RENTING / BKK—TH",
    title: "Find the address that fits your next chapter.",
    intro: "A focused property desk for Thailand. Browse the sample inventory, read the signal, then speak to a human when one feels right.",
    cta: "Open full inventory", call: "Talk to an agent", sample: "SAMPLE INVENTORY", live: "LOCAL DATA / UI DEMO",
    search: "Search by city, project, or type", all: "All signals", rent: "For rent", sale: "For sale",
    inventory: "properties in this pass", featured: "Front-of-desk picks", details: "View property",
    demo: "Demo inventory — contact submit is simulated", bilingual: "EN / TH",
  },
  th: {
    navListings: "รายการ", navAbout: "โต๊ะดูแล", navContact: "คุยกับทีม",
    eyebrow: "AGENCY RENTING / BKK—TH", title: "หาที่อยู่ที่พอดีกับบทต่อไปของคุณ",
    intro: "โต๊ะคัดอสังหาฯ ในไทยที่ตั้งใจให้ดูข้อมูลสำคัญก่อน แล้วค่อยคุยกับคนจริงเมื่อเจอที่ใช่",
    cta: "ดูรายการทั้งหมด", call: "คุยกับเอเจนต์", sample: "รายการตัวอย่าง", live: "ข้อมูลในเครื่อง / เดโม UI",
    search: "ค้นหาด้วยเมือง โครงการ หรือประเภท", all: "ทั้งหมด", rent: "เช่า", sale: "ขาย",
    inventory: "รายการในรอบนี้", featured: "รายการที่โต๊ะแนะนำ", details: "ดูรายละเอียด",
    demo: "ข้อมูลตัวอย่าง — การส่งแบบฟอร์มยังเป็นการจำลอง", bilingual: "TH / EN",
  },
} as const;

function money(property: Property, locale: "en" | "th") {
  const amount = new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(property.price);
  return `฿${amount}${property.price_type === "rent" ? locale === "th" ? "/ด." : "/mo" : ""}`;
}

function shortType(value: string) { return value.replace(/^./, (letter) => letter.toUpperCase()); }

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale as "en" | "th";
  if (!copy[locale]) notFound();
  const t = copy[locale];
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"all" | "rent" | "sale">("all");
  const properties = getFeaturedProperties(5);
  const filtered = useMemo(() => properties.filter((property) => {
    const haystack = `${property.title} ${property.location} ${property.property_type}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (mode === "all" || property.price_type === mode);
  }), [mode, properties, query]);

  return (
    <main className="agency-shell">
      <div className="agency-dust" aria-hidden="true" />
      <header className="agency-nav agency-wrap">
        <Link href={`/${locale}`} className="agency-mark" aria-label="Agency Renting home"><span className="agency-mark-dot" /><span>AR / 01</span></Link>
        <nav className="agency-nav-links" aria-label="Primary navigation">
          <Link href={`/${locale}/listings`}>{t.navListings}</Link><Link href={`/${locale}/about`}>{t.navAbout}</Link>
          <Link href={`/${locale}/contact`} className="agency-nav-call">{t.navContact} <ArrowUpRight size={14} /></Link>
        </nav>
      </header>

      <section className="agency-wrap agency-hero">
        <div className="agency-hero-copy">
          <p className="agency-overline"><Radio size={14} /> {t.eyebrow}</p>
          <h1>{t.title}</h1><p className="agency-lede">{t.intro}</p>
          <div className="agency-actions"><Link className="agency-primary" href={`/${locale}/listings`}>{t.cta} <ArrowRight size={17} /></Link><Link className="agency-text-link" href={`/${locale}/contact`}><Phone size={15} /> {t.call}</Link></div>
        </div>
        <div className="agency-status" aria-label={t.live}><span className="agency-status-light" /><span>{t.live}</span><strong>{new Date().getFullYear()}</strong></div>
      </section>

      <section className="agency-wrap agency-inventory" aria-labelledby="inventory-heading">
        <div className="agency-section-head"><div><p className="agency-overline">{t.sample}</p><h2 id="inventory-heading">{t.featured}</h2></div><span className="agency-count">{filtered.length} / {properties.length} {t.inventory}</span></div>
        <div className="agency-controls">
          <label className="agency-search"><Search size={16} /><span className="sr-only">{t.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label>
          <div className="agency-modes" aria-label="Property mode">{(["all", "rent", "sale"] as const).map((item) => <button key={item} className={mode === item ? "is-active" : ""} onClick={() => setMode(item)} type="button">{item === "all" ? t.all : item === "rent" ? t.rent : t.sale}</button>)}</div>
        </div>
        <div className="agency-list">
          {filtered.map((property, index) => <article className="agency-listing" key={property.id}>
            <span className="agency-index">0{index + 1}</span><div className="agency-thumb"><img src={property.images[0]} alt="" /></div>
            <div className="agency-listing-main"><div className="agency-listing-title"><h3>{property.title}</h3><span>{shortType(property.property_type)}</span></div><p className="agency-location"><MapPin size={14} /> {property.location}</p><div className="agency-specs"><span><BedDouble size={14} /> {property.bedrooms}</span><span><Bath size={14} /> {property.bathrooms}</span><span>{property.size} sqm</span></div></div>
            <div className="agency-listing-end"><strong>{money(property, locale)}</strong><Link href={`/${locale}/listings?property=${property.id}`}>{t.details} <ArrowUpRight size={14} /></Link></div>
          </article>)}
          {filtered.length === 0 ? <p className="agency-empty">No matching sample listings. Try a wider signal.</p> : null}
        </div>
      </section>

      <footer className="agency-footer agency-wrap"><span>{t.demo}</span><Link href={`/${locale === "en" ? "th" : "en"}`}><span>{t.bilingual}</span> <ArrowRight size={14} /></Link></footer>
    </main>
  );
}
