import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAboutPage, getHomePage, getResults, mediaUrl, record, str } from "../../lib/site-content";
import ResultsGallery from "./ResultsGallery";
import "./about.css";

export const metadata: Metadata = { title: "О клинике — Арт-Медика" };
export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [about, home, results] = await Promise.all([getAboutPage(), getHomePage(), getResults("about")]);
  const departments = (about.outpatientCategories || []).map(record);
  const stationary = (about.stationaryCategories || []).map(record);
  return <main id="top" className="about-page"><Header /><div className="about-content">
    <nav className="about-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>О клинике</span></nav>
    <div className="about-intro"><h1>О клинике <span aria-hidden="true">↗</span></h1><p>{about.intro}</p></div>
    <section className="about-overview" aria-label="Наш центр"><div className="about-room"><Image src={mediaUrl(about.roomImage)} alt="Кабинет клиники Арт-Медика" fill sizes="(max-width: 720px) 100vw, 40vw" priority /></div><div className="about-overview-copy"><p>{about.overview}</p><p>{about.equipment}</p><div className="about-stats">{home.facts?.map((item, index) => <div key={index}><strong>{item.value}</strong><span>{item.label?.replaceAll("\n", " ")}</span></div>)}</div></div></section>
    <section className="about-departments"><div><h2>Поликлиническое отделение</h2><p>Вы можете получить помощь по направлениям:</p><ul>{departments.map((item) => <li key={str(item.slug)}><Link href={`/services/${str(item.slug)}`}><span aria-hidden="true">↗</span>{str(item.title)}</Link></li>)}</ul></div>
      <div><h2>Стационарное отделение</h2><p>{about.stationaryIntro}</p><p>{about.stationaryCare}</p><p>{about.stationarySurgery}</p><div className="about-departments-bottom"><Link href={`/services/${str(stationary[0]?.slug || "ent-surgery")}`}>Подробнее</Link><div><span>Сайт Министерства здравоохранения Российской Федерации</span><span>Официальный интернет-портал правовой информации</span></div></div></div></section>
    <section className="about-results" id="results"><div className="about-results-heading"><h2>Результат операций <span aria-hidden="true">↗</span></h2><p>{about.resultsIntro}</p></div><ResultsGallery results={results} /></section>
  </div><Footer /></main>;
}
