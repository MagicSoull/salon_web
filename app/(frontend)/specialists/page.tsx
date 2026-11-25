import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getPageCopy, getSpecialists } from "../../lib/site-content";
import "../../components/editorial.css";

export const metadata: Metadata = { title: "Наши специалисты — Арт-Медика" };
export const dynamic = "force-dynamic";
export default async function SpecialistsPage() { const [specialists, copy] = await Promise.all([getSpecialists(), getPageCopy("specialists")]); return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Наши специалисты</span></nav><div className="editorial-intro"><h1>Наши специалисты <span aria-hidden="true">↗</span></h1><p>{copy?.intro}</p></div><section className="editorial-cards" aria-label="Специалисты клиники">{specialists.map((person) => <article className="editorial-card" key={person.slug}><div className="editorial-card-image"><Image src={person.image} alt={person.name} fill sizes="(max-width: 720px) 100vw, 33vw" /></div><small>{person.category}</small><h2>{person.name}</h2><p>{person.role}</p><Link href={`/specialists/${person.slug}`}>Подробнее</Link></article>)}</section></div><Footer /></main>; }
