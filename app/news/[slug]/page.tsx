import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getNews, newsItems } from "../../data/news";
import "../../services/[category]/service-detail.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return newsItems.filter((item) => item.slug !== "refresh").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = getNews((await params).slug); return { title: item ? `${item.title} — Арт-Медика` : "Новости — Арт-Медика" }; }
export default async function NewsDetailPage({ params }: Props) { const item = getNews((await params).slug); if (!item || item.slug === "refresh") notFound(); return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/news">Новости</Link><span>›</span><span>{item.title}</span></nav><div className="service-detail-intro"><h1>Новости <span aria-hidden="true">↗</span></h1><p>{item.title}</p></div><section className="service-article"><div className="service-article-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><time>{item.date}</time><h2>{item.title}</h2><p>{item.summary}</p>{item.slug === "beauty-finale" && <p>Подробнее о проекте и его участниках можно прочитать на странице «Красота в тебе».</p>}<div className="service-article-actions">{item.slug === "beauty-finale" && <Link href="/projects/beauty-in-you">О проекте</Link>}<Link href="/news">Все новости</Link></div></div></section></div><Footer /></main>; }
