import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import ClinicPhoneLink from "../../../../components/ClinicPhoneLink";
import { getPageCopy, getServiceCategory } from "../../../../lib/site-content";
import "../service-detail.css";

type Props = { params: Promise<{ category: string; service: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  const service = (await getServiceCategory(categorySlug))?.treatments.find((item) => item.slug === serviceSlug);
  return { title: service ? `${service.title} — Арт-Медика` : "Услуги — Арт-Медика" };
}

export default async function TreatmentPage({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = await getServiceCategory(categorySlug);
  const copy = await getPageCopy("service-detail");
  const service = category?.treatments.find((item) => item.slug === serviceSlug);
  if (!category || !service) notFound();
  return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/services">Услуги</Link><span>›</span><Link href={`/services/${category.slug}`}>{category.title}</Link><span>›</span><span>{service.title}</span></nav><div className="service-detail-intro"><h1>{service.title} <span aria-hidden="true">↗</span></h1><p>{service.description}</p></div><section className="service-article"><div className="service-article-image"><Image src={service.image || category.image} alt={service.title} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><h2>О направлении</h2><p>{service.body || service.description}</p><p>{copy?.intro}</p><p>Стоимость и план оказания услуги определяются после консультации.</p><div className="service-article-actions"><ClinicPhoneLink>Записаться на консультацию</ClinicPhoneLink><Link href="/prices">Посмотреть цены</Link></div></div></section><section className="service-related"><h2>Другие направления</h2><div>{category.treatments.filter((item) => item.slug !== service.slug).slice(0,3).map((item) => <Link href={`/services/${category.slug}/${item.slug}`} key={item.slug}>{item.title} <span aria-hidden="true">↗</span></Link>)}</div></section></div><Footer /></main>;
}


