import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { formatNewsDate, getNewsArticle, newsImageUrl } from "../../../lib/content";
import { record, str } from "../../../lib/site-content";
import "../../services/[category]/service-detail.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getNewsArticle((await params).slug);
  return { title: article ? `${article.title} — Арт-Медика` : "Новости — Арт-Медика" };
}

export default async function NewsDetailPage({ params }: Props) {
  const article = await getNewsArticle((await params).slug);
  if (!article) notFound();
  const projectSlug = str(record(article.project).slug);
  return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/news">Новости</Link><span>›</span><span>{article.title}</span></nav><div className="service-detail-intro"><h1>Новости <span aria-hidden="true">↗</span></h1><p>{article.title}</p></div><section className="service-article"><div className="service-article-image"><Image src={newsImageUrl(article.image, "article")} alt={article.title} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><time dateTime={article.date}>{formatNewsDate(article.date)}</time><h2>{article.title}</h2>{String(article.body).split(/\n\s*\n/).map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}<div className="service-article-actions">{projectSlug && <Link href={`/projects/${projectSlug}`}>О проекте</Link>}<Link href="/news">Все новости</Link></div></div></section></div><Footer /></main>;
}
