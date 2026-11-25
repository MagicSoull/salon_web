import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ClinicPhoneLink from "../../components/ClinicPhoneLink";
import { getPageCopy, getPriceSections } from "../../lib/site-content";
import "./prices.css";

export const metadata: Metadata = { title: "Цены на услуги — Арт-Медика" };
export const dynamic = "force-dynamic";
type Row = { id?: string | null; code?: string | null; mis?: string | null; name: string; duration?: string | null; price1?: string | null; price2?: string | null; price3?: string | null; priceMode?: "single" | "tiered" | null };
function PriceTable({ rows, tiered = false }: { rows: Row[]; tiered?: boolean }) {
  return <div className="prices-table-scroll"><table className="prices-table"><thead><tr><th>Код<br />Номенклатуры<br />мед. услуг</th><th>Код МИС</th><th>Наименование медицинской услуги</th><th>Время,<br />мин.</th>{tiered ? <th colSpan={3}>Цена, руб. / категория сложности<br /><span className="prices-category-labels">I　　　　 II　　　　 III</span></th> : <th>Цена,<br />руб.</th>}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.id || row.mis || index}><td>{row.code}</td><td>{row.mis}</td><td>{row.name}</td><td>{row.duration}</td><td>{row.price1}</td>{tiered && <><td>{row.price2}</td><td>{row.price3}</td></>}</tr>)}</tbody></table></div>;
}
export default async function PricesPage() {
  const [sections, emptyCopy] = await Promise.all([getPriceSections(), getPageCopy("prices-empty")]);
  return <main id="top" className="prices-page"><Header /><div className="prices-content"><h1>Цены на услуги <span aria-hidden="true">↗</span></h1>{sections.map((section, sectionIndex) => <section className="prices-section" key={section.id}><h2>{section.title}</h2>{section.groups?.map((group, groupIndex) => {
    const single = (group.rows || []).filter((row) => row.priceMode !== "tiered");
    const tiered = (group.rows || []).filter((row) => row.priceMode === "tiered");
    return <details key={group.id || groupIndex} className="prices-accordion" open={sectionIndex === 0 && groupIndex === 0 ? true : undefined}><summary><span>{group.title} <small>{group.minPrice}</small></span><span className="prices-chevron" aria-hidden="true">↓</span></summary>{group.rows?.length ? <div className="prices-accordion-body">{single.length > 0 && <PriceTable rows={single} />}{group.note && <p className="prices-note">{group.note}</p>}{tiered.length > 0 && <PriceTable rows={tiered} tiered />}</div> : <div className="prices-accordion-body prices-empty"><p>{emptyCopy?.intro}</p><ClinicPhoneLink>Позвонить в клинику</ClinicPhoneLink></div>}</details>;
  })}</section>)}</div><Footer /></main>;
}


