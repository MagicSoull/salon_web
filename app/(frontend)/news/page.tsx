import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { formatNewsDate, getNewsContent, newsImageUrl } from "../../lib/content";
import { getPageCopy } from "../../lib/site-content";
import "../../components/editorial.css";

export const metadata: Metadata = { title: "Новости — Арт-Медика" };
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const [newsItems, copy] = await Promise.all([getNewsContent(), getPageCopy("news")]);
  return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Новости</span></nav><div className="editorial-intro"><h1>Новости <span aria-hidden="true">↗</span></h1><p>{copy?.intro}</p></div><section className="editorial-cards" aria-label="Новости клиники">{newsItems.map((item) => <article className="editorial-card" key={item.id}><div className="editorial-card-image"><Image src={newsImageUrl(item.image, "card")} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" /></div><small>Новости / {item.type}</small><h2>{item.title}</h2><p>{item.summary}</p><time dateTime={item.date}>{formatNewsDate(item.date)}</time><Link href={`/news/${item.slug}`}>Читать</Link></article>)}</section></div><Footer /></main>;
}
