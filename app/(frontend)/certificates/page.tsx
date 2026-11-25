import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getDocuments, getPageCopy, mediaUrl } from "../../lib/site-content";
import "../../components/editorial.css";

export const metadata: Metadata = { title: "Сертификаты — Арт-Медика" };
export const dynamic = "force-dynamic";
export default async function CertificatesPage() {
  const [documents, copy, emptyCopy] = await Promise.all([getDocuments("certificates"), getPageCopy("certificates"), getPageCopy("certificates-empty")]);
  return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/documents">Документы</Link><span>›</span><span>Сертификаты</span></nav><div className="editorial-intro"><h1>Сертификаты <span aria-hidden="true">↗</span></h1><p>{copy?.intro}</p></div>{documents.length ? <div className="editorial-cards">{documents.map((item) => <article className="editorial-card" key={item.id}><h2>{item.title}</h2>{mediaUrl(item.file) && <a href={mediaUrl(item.file)} target="_blank" rel="noreferrer">Открыть файл ↗</a>}</article>)}</div> : <p className="editorial-note">{emptyCopy?.intro}</p>}</div><Footer /></main>;
}

