import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../components/editorial.css";

export const metadata: Metadata = { title: "Вопросы и ответы — Арт-Медика" };
const questions = [
  { q: "Насколько безопасны методы и оборудование?", a: "Мы используем только сертифицированные технологии и следуем строгим медицинским стандартам." },
  { q: "Сколько времени занимает курс процедур?", a: "Продолжительность зависит от выбранной процедуры и индивидуального плана. Специалист расскажет о сроках на консультации." },
  { q: "Есть ли противопоказания?", a: "Противопоказания зависят от конкретной процедуры. Перед записью на неё необходима консультация специалиста." },
  { q: "Можно ли сочетать несколько процедур одновременно?", a: "Возможность сочетания процедур определяет врач после оценки вашего запроса и состояния здоровья." },
  { q: "Нужно ли проходить обследование перед процедурой?", a: "Необходимость и состав обследования определяет специалист для конкретной процедуры." },
  { q: "Какие процедуры подходят именно мне?", a: "На консультации специалист выслушает ваш запрос и предложит подходящие направления. Посмотреть их можно в каталоге услуг." },
];
export default function FaqPage() { return <main id="top"><Header /><div className="editorial-content"><nav className="editorial-breadcrumb" aria-label="Навигационная цепочка"><Link href="/">Арт-Медика</Link><span>›</span><span>Вопросы и ответы</span></nav><div className="editorial-intro"><h1>Вопросы и ответы <span aria-hidden="true">↗</span></h1><p>Прозрачность медицинской помощи начинается с понятных ответов на сложные вопросы. Мы собрали самые частые обращения пациентов и разъяснения наших врачей</p></div><section aria-label="Частые вопросы">{questions.map((item, index) => <details className="editorial-accordion" key={item.q} open={index === 0 ? true : undefined}><summary><span>{item.q}</span><span aria-hidden="true">↓</span></summary><div><p>{item.a}</p>{index === 5 && <Link href="/services">Смотреть услуги →</Link>}</div></details>)}</section></div><Footer /></main>; }
