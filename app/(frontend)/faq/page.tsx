import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getFaqContent } from "../../lib/content";
import { getPageCopy } from "../../lib/site-content";
import "../../components/editorial.css";

export const metadata: Metadata = { title: "Вопросы и ответы — Арт-Медика" };
export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const [questions, copy] = await Promise.all([getFaqContent(), getPageCopy("faq")]);
  return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Вопросы и ответы</span></nav><div className="editorial-intro"><h1>Вопросы и ответы <span aria-hidden="true">↗</span></h1><p>{copy?.intro}</p></div><section aria-label="Частые вопросы">{questions.map((item, index) => <details className="editorial-accordion" key={item.id} open={index === 0 ? true : undefined}><summary><span>{item.question}</span><span aria-hidden="true">↓</span></summary><div><p>{item.answer}</p>{item.servicesLink && <Link href="/services">Смотреть услуги →</Link>}</div></details>)}</section></div><Footer /></main>;
}
