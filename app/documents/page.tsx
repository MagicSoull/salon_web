import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/editorial.css";

export const metadata: Metadata = { title: "Документы — Арт-Медика" };
export default function DocumentsPage() { return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Документы</span></nav><div className="editorial-intro"><h1>Документы <span aria-hidden="true">↗</span></h1></div><section aria-label="Разделы документов"><details className="editorial-accordion"><summary><span>Организационные документы</span><span aria-hidden="true">↓</span></summary><div><p>Файлы документов будут размещены после получения от клиники.</p></div></details><details className="editorial-accordion" open><summary><span>Нормативно-правовые документы</span><span aria-hidden="true">↓</span></summary><div><p>Файлы документов будут размещены после получения от клиники.</p></div></details><details className="editorial-accordion"><summary><span>Другие документы</span><span aria-hidden="true">↓</span></summary><div><p>Файлы документов будут размещены после получения от клиники.</p><div className="editorial-link-row"><Link href="/certificates">Сертификаты клиники</Link><span aria-hidden="true">↗</span></div></div></details></section></div><Footer /></main>; }
