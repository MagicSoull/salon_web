import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getPageCopy, getServiceCategories } from "../../lib/site-content";
import "./services-page.css";

export const metadata: Metadata = {
  title: "Услуги — Арт-Медика",
  description: "Медицинские и эстетические услуги центра Арт-Медика в Челябинске.",
};

export const dynamic = "force-dynamic";
export default async function ServicesPage() {
  const [categories, copy] = await Promise.all([getServiceCategories(), getPageCopy("services")]);
  return (
    <main id="top" className="services-page">
      <Header />
      <div className="services-page-content">
        <nav className="services-page-breadcrumb" aria-label="Навигационная цепочка">
          <Link href="/">Арт-Медика</Link><span aria-hidden="true">›</span><span>Услуги</span>
        </nav>
        <div className="services-page-intro">
          <h1>Услуги <picture><source media="(max-width: 720px)" srcSet="/offers/title-arrow-mobile.svg" /><Image src="/offers/title-arrow.svg" alt="" width={50} height={50} /></picture></h1>
          <div className="services-page-intro-copy">
            <p>{copy?.intro}</p>
          </div>
        </div>
        <section className="services-page-grid" aria-label="Направления услуг">
          {categories.map((category, index) => (
            <Link className={`services-page-card services-page-card-${category.slug}`} id={category.slug} key={category.slug} href={`/services/${category.slug}`} aria-label={`${category.title} — открыть направление`}>
              <div className="services-page-card-image">
                <picture>
                  <source media="(max-width: 720px)" srcSet={category.mobileImage || category.image} />
                  <Image src={category.image} alt="" fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 720px) calc(100vw - 32px), (max-width: 1100px) 45vw, 45vw" />
                </picture>
              </div>
              <div className="services-page-card-copy">
                <h2>{category.title}</h2>
                <p><span className="services-page-desktop-copy">{category.summary}</span><span className="services-page-mobile-copy">{category.summary}</span></p>
              </div>
            </Link>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
