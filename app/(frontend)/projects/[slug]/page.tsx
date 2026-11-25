import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ClinicPhoneLink from "../../../components/ClinicPhoneLink";
import { getPageCopy, getProject } from "../../../lib/site-content";
import "../../services/[category]/service-detail.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> { const project = await getProject((await params).slug); return { title: project ? `${project.title} — Арт-Медика` : "Проекты — Арт-Медика" }; }
export default async function ProjectPage({ params }: Props) { const [project, copy] = await Promise.all([getProject((await params).slug), getPageCopy("project-detail")]); if (!project) notFound(); return <main id="top"><Header /><div className="service-detail-content"><nav className="service-detail-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/projects">Проекты</Link><span>›</span><span>{project.title}</span></nav><div className="service-detail-intro"><h1>Проекты <span aria-hidden="true">↗</span></h1><p>{project.title}</p></div><section className="service-article"><div className="service-article-image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) 100vw, 45vw" priority /></div><div className="service-article-copy"><h2>{project.title}</h2><p>{project.description}</p><p>{copy?.intro}</p><div className="service-article-actions"><ClinicPhoneLink>Узнать подробнее</ClinicPhoneLink>{project.relatedCategories.map((category) => <Link href={`/services/${category.slug}`} key={category.slug}>{category.title}</Link>)}<Link href="/projects">Все проекты</Link></div></div></section></div><Footer /></main>; }




