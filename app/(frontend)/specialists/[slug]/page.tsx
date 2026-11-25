import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ClinicPhoneLink from "../../../components/ClinicPhoneLink";
import { getPageCopy, getSpecialist } from "../../../lib/site-content";
import "../../../components/editorial.css";
import "../../services/[category]/service-detail.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> { const person = await getSpecialist((await params).slug); return { title: person ? `${person.name} — Арт-Медика` : "Специалисты — Арт-Медика" }; }
export default async function SpecialistPage({ params }: Props) { const [person, copy] = await Promise.all([getSpecialist((await params).slug), getPageCopy("specialist-detail")]); if (!person) notFound(); return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/specialists">Специалисты</Link><span>›</span><span>{person.name}</span></nav><div className="service-detail-intro"><h1>{person.name} <span aria-hidden="true">↗</span></h1><p>{person.role}</p></div><section className="service-article"><div className="service-article-image"><Image src={person.image} alt={person.name} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><h2>{person.category}</h2><p>{person.role}</p><p>{copy?.intro}</p><div className="service-article-actions"><ClinicPhoneLink>Записаться</ClinicPhoneLink><Link href={`/services/${person.service}`}>Услуги направления</Link></div></div></section></div><Footer /></main>; }



