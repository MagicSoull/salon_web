import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardsList from "./components/cardsList";
import { getOffers, getPageCopy } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Акции — Арт-Медика",
  description: "Акции и специальные предложения медико-косметологического центра Арт-Медика.",
};

export const dynamic = "force-dynamic";
export default async function OffersPage() {
  const [offers, copy] = await Promise.all([getOffers(), getPageCopy("offers")]);
  return (
    <main id="top" className="offers-page">
      <Header />
      <div className="offers-content">
        <nav className="offers-breadcrumb" aria-label="Навигационная цепочка">
          <Link href="/">Арт-Медика</Link><span aria-hidden="true">›</span><span>Акции</span>
        </nav>
        <div className="offers-intro">
          <h1>Акции<picture><source media="(max-width: 720px)" srcSet="/offers/title-arrow-mobile.svg" /><Image src="/offers/title-arrow.svg" alt="" width={50} height={50} /></picture></h1>
          <p>{copy?.intro}</p>
        </div>
        <Suspense fallback={<p className="offers-loading">Загрузка акций…</p>}>
          <CardsList allCards={offers} />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
