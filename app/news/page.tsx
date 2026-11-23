import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { newsItems } from "../data/news";
import "../components/editorial.css";

export const metadata: Metadata = { title: "Новости — Арт-Медика" };
export default function NewsPage() { return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Новости</span></nav><div className="editorial-intro"><h1>Новости <span aria-hidden="true">↗</span></h1><p>Новости и события клиники «Арт-Медика»</p></div><section className="editorial-cards" aria-label="Новости клиники">{newsItems.map((item) => <article className="editorial-card" key={item.slug}><div className="editorial-card-image"><Image src={item.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" /></div><small>Новости / {item.type}</small><h2>{item.title}</h2><p>{item.summary}</p><time>{item.date}</time><Link href={`/news/${item.slug}`}>Читать</Link></article>)}</section></div><Footer /></main>; }
