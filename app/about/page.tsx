import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ResultsGallery from "./ResultsGallery";
import "./about.css";

export const metadata: Metadata = { title: "О клинике — Арт-Медика" };

const departments = [
  { title: "Оториноларингология", slug: "otorhinolaryngology" },
  { title: "Косметология", slug: "cosmetology" },
  { title: "Дерматология", slug: "dermatology" },
  { title: "Венерология", slug: "venereology" },
  { title: "Эстетическая гинекология", slug: "aesthetic-gynecology" },
  { title: "Неврология", slug: "neurology" },
  { title: "Диагностика", slug: "diagnostics" },
  { title: "Терапевтические услуги", slug: "therapy" },
];

export default function AboutPage() {
  return <main id="top" className="about-page"><Header /><div className="about-content"><nav className="about-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>О клинике</span></nav><div className="about-intro"><h1>О клинике <span aria-hidden="true">↗</span></h1><p>Превращаем заветные мечты пациентов в реальность, невзирая на сложность задачи</p></div><section className="about-overview" aria-label="Наш центр"><div className="about-room"><Image src="/about/desktop-image34.png" alt="Оборудованный кабинет клиники Арт-Медика" fill sizes="(max-width: 720px) 100vw, 40vw" priority /></div><div className="about-overview-copy"><p>Центр «Арт-Медика» — партнер ЮУГМУ, клиническая база «Межрегионального центра непрерывного медицинского и фармацевтического образования» (г. Москва). Наша клиника является участником международных проектов в направлении «Пластическая хирургия и косметология».</p><p>Качество результата обеспечивает инновационное высокотехнологичное хирургическое, эндоскопическое и лазерное оборудование.</p><div className="about-stats"><div><strong>10+</strong><span>обучений в год проходят специалисты центра</span></div><div><strong>20</strong><span>проектов уже было реализовано в нашей клинике</span></div><div><strong>90%</strong><span>положительных отзывов</span></div></div></div></section><section className="about-departments"><div><h2>Поликлиническое отделение</h2><p>Вы можете получить помощь по направлениям:</p><ul>{departments.map((item) => <li key={item.slug}><Link href={`/services/${item.slug}`}><span aria-hidden="true">↗</span>{item.title}</Link></li>)}</ul></div><div><h2>Стационарное отделение</h2><p>На территории отделения мы ежедневно оказываем помощь даже самым маленьким пациентам, выполняя полный спектр операций по направлению «Лор-хирургия», одним из самых востребованных остается аденотомия и септопластика (исправление носовой перегородки).</p><p>В стационарном отделении к вашим услугам палата европейского уровня с 3-х разовым питанием. Медицинская сестра будет сопровождать Вас 24 часа в сутки для создания самых комфортных условий.</p><p>Также в стационарном отделении мы оказываем полный спектр операций по направлению «Пластическая хирургия», особое место занимает проект «Доступная пластическая хирургия из Милана».</p><div className="about-departments-bottom"><Link href="/services/ent-surgery">Подробнее</Link><div><span>Сайт Министерства здравоохранения Российской Федерации</span><span>Официальный интернет-портал правовой информации</span></div></div></div></section><section className="about-results" id="results"><div className="about-results-heading"><h2>Результат операций <span aria-hidden="true">↗</span></h2><p>Мы гордимся результатами, которых достигаем вместе с нашими пациентами благодаря современным методикам и золотым рукам хирургов. Убедитесь сами, как тонко и естественно мы умеем работать с красотой.</p></div><ResultsGallery /></section></div><Footer /></main>;
}


