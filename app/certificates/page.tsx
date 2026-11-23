import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/editorial.css";

export const metadata: Metadata = { title: "Сертификаты — Арт-Медика" };
export default function CertificatesPage() { return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><Link href="/documents">Документы</Link><span>›</span><span>Сертификаты</span></nav><div className="editorial-intro"><h1>Сертификаты <span aria-hidden="true">↗</span></h1><p>Документы и сертификаты клиники</p></div><p className="editorial-note">Сканы сертификатов появятся после получения файлов от клиники. Пока вы можете обратиться за информацией по телефону <a href="tel:+73517751918">+7 (351) 775-19-18</a>.</p></div><Footer /></main>; }
