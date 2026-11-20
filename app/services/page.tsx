import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./services-page.css";

export const metadata: Metadata = {
  title: "Услуги — Арт-Медика",
  description: "Медицинские и эстетические услуги центра Арт-Медика в Челябинске.",
};

const categories = [
  { id: "cosmetology", title: "Косметология", desktop: "desktop-0.png", mobile: "desktop-0.png", description: "Сохраняем молодость и подчеркиваем вашу естественную красоту." },
  { id: "top-products", title: "Топ-продукты", desktop: "desktop-1.png", mobile: "mobile-6.png", description: "Селективный уход для поддержания красоты в домашних условиях." },
  { id: "otorhinolaryngology", title: "Оториноларингология", desktop: "desktop-2.png", mobile: "mobile-1.png", description: "Экспертная диагностика и лечение заболеваний лор-органов." },
  { id: "ent-surgery", title: "ЛОР-хирургия", desktop: "desktop-3.png", mobile: "mobile-2.png", description: "Профессиональная забота о здоровье уха, горла и носа." },
  { id: "aesthetic-gynecology", title: "Эстетическая гинекология", desktop: "desktop-4.png", mobile: "mobile-4.png", description: "Деликатные решения для женского здоровья и уверенности." },
  { id: "dermatology", title: "Дерматология", desktop: "desktop-5.png", mobile: "mobile-5.png", description: "Экспертные решения для здоровья и безупречного вида вашей кожи." },
  { id: "massage", title: "Массаж", desktop: "desktop-6.png", mobile: "mobile-3.png", description: "Оздоровление организма и глубокое расслабление через тело." },
  { id: "plastic-surgery", title: "Пластическая хирургия", desktop: "desktop-7.png", mobile: "mobile-7.png", description: "Эстетическая коррекция для гармонии вашей внешности." },
  { id: "neurology", title: "Неврология и рефлексотерапия", desktop: "desktop-8.png", mobile: "mobile-8.png", description: "Восстановление функций нервной системы методами классической и восточной медицины." },
  { id: "therapy", title: "Терапевтический приём", desktop: "desktop-9.png", mobile: "mobile-9.png", description: "Профессиональная оценка состояния организма и эффективное лечение." },
];

export default function ServicesPage() {
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
            <p className="services-page-intro-first-desktop">В клинике «Арт-медика» мы объединили</p>
            <p className="services-page-intro-first-mobile">В клинике «Арт-медика»</p>
            <p>многолетний опыт врачей и современные технологии, чтобы предложить вам максимально широкий спектр медицинских и эстетических услуг.</p>
          </div>
        </div>
        <section className="services-page-grid" aria-label="Направления услуг">
          {categories.map((category, index) => (
            <article className={`services-page-card services-page-card-${category.id}`} id={category.id} key={category.id}>
              <div className="services-page-card-image">
                <picture>
                  <source media="(max-width: 720px)" srcSet={`/services/${category.mobile}`} />
                  <Image src={`/services/${category.desktop}`} alt="" fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 720px) calc(100vw - 32px), (max-width: 1100px) 45vw, 45vw" />
                </picture>
              </div>
              <div className="services-page-card-copy">
                <h2>{category.title}</h2>
                <p><span className="services-page-desktop-copy">Сохраняем молодость и подчеркиваем вашу естественную красоту</span><span className="services-page-mobile-copy">{category.description}</span></p>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
