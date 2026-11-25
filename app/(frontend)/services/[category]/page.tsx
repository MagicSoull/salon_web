import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getServiceCategory } from "../../../lib/site-content";
import "./service-detail.css";

type Props = { params: Promise<{ category: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getServiceCategory((await params).category);
  return { title: category ? `${category.title} — Арт-Медика` : "Услуги — Арт-Медика" };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const category = await getServiceCategory((await params).category);
  if (!category) notFound();
  return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/services">Услуги</Link><span>›</span><span>{category.title}</span></nav><div className="service-detail-intro"><h1>{category.title} <span aria-hidden="true">↗</span></h1><p>{category.summary}</p></div><section className="service-treatment-list" aria-label={`Направления: ${category.title}`}>{category.treatments.map((treatment) => <article className="service-treatment-card" key={treatment.slug}><div className="service-treatment-copy"><h2>{treatment.title}</h2><p>{treatment.description}</p><Link href={`/services/${category.slug}/${treatment.slug}`}>Подробнее</Link></div><div className="service-treatment-image"><Image src={treatment.image || category.image} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" /></div></article>)}</section></div><Footer /></main>;
}
