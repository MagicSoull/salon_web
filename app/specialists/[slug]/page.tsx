import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSpecialist, specialists } from "../../data/specialists";
import "../../components/editorial.css";
import "../../services/[category]/service-detail.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return specialists.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const person = getSpecialist((await params).slug); return { title: person ? `${person.name} — Арт-Медика` : "Специалисты — Арт-Медика" }; }
export default async function SpecialistPage({ params }: Props) { const person = getSpecialist((await params).slug); if (!person) notFound(); return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/specialists">Специалисты</Link><span>›</span><span>{person.name}</span></nav><div className="service-detail-intro"><h1>{person.name} <span aria-hidden="true">↗</span></h1><p>{person.role}</p></div><section className="service-article"><div className="service-article-image"><Image src={person.image} alt={person.name} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><h2>{person.category}</h2><p>{person.role}</p><p>Уточнить расписание и записаться на консультацию можно по телефону клиники.</p><div className="service-article-actions"><a href="tel:+73517751918">Записаться</a><Link href={`/services/${person.service}`}>Услуги направления</Link></div></div></section></div><Footer /></main>; }
