import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ClinicPhoneLink from "../../../components/ClinicPhoneLink";
import { getOffer, getPageCopy } from "../../../lib/site-content";
import "../../services/[category]/service-detail.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const offer = await getOffer(slug); return { title: offer ? `${offer.title} — Арт-Медика` : "Акции — Арт-Медика" }; }
export default async function OfferPage({ params }: Props) { const { slug } = await params; const [offer, copy] = await Promise.all([getOffer(slug), getPageCopy("offer-detail")]); if (!offer) notFound(); return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/offers">Акции</Link><span>›</span><span>{offer.mini_title}</span></nav><div className="service-detail-intro"><h1>Акция <span aria-hidden="true">↗</span></h1><p>{offer.title}</p></div><section className="service-article"><div className="service-article-image"><Image src={offer.image} alt={offer.title} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><h2>{offer.title}</h2><p>{offer.description}</p><p>{copy?.intro}</p><div className="service-article-actions"><ClinicPhoneLink>Уточнить условия</ClinicPhoneLink>{offer.treatmentHref && <Link href={offer.treatmentHref}>{offer.treatmentTitle || "Об услуге"}</Link>}<Link href="/offers">Все акции</Link></div></div></section></div><Footer /></main>; }




