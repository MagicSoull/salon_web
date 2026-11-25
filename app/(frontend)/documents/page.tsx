import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getDocuments, getPageCopy, mediaUrl } from "../../lib/site-content";
import "../../components/editorial.css";

export const metadata: Metadata = { title: "Документы — Арт-Медика" };
export const dynamic = "force-dynamic";
const categories = [
  { id: "organization", title: "Организационные документы" },
  { id: "legal", title: "Нормативно-правовые документы" },
  { id: "other", title: "Другие документы" },
];
export default async function DocumentsPage() {
  const [documents, emptyCopy] = await Promise.all([getDocuments(), getPageCopy("documents-empty")]);
  return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Документы</span></nav><div className="editorial-intro"><h1>Документы <span aria-hidden="true">↗</span></h1></div><section aria-label="Разделы документов">{categories.map((category) => {
    const items = documents.filter((item) => item.category === category.id);
    return <details className="editorial-accordion" key={category.id} open={category.id === "legal" ? true : undefined}><summary><span>{category.title}</span><span aria-hidden="true">↓</span></summary><div>{items.length ? items.map((item) => <p key={item.id}>{mediaUrl(item.file) ? <a href={mediaUrl(item.file)} target="_blank" rel="noreferrer">{item.title} ↗</a> : item.title}</p>) : <p>{emptyCopy?.intro}</p>}{category.id === "other" && <div className="editorial-link-row"><Link href="/certificates">Сертификаты клиники</Link><span aria-hidden="true">↗</span></div>}</div></details>;
  })}</section></div><Footer /></main>;
}

