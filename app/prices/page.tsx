import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./prices.css";

export const metadata: Metadata = { title: "Цены на услуги — Арт-Медика" };

type Price = { code: string; mis: string; name: string; time: string; prices: string[] };
const consultations: Price[] = [
  { code: "B01.057.003", mis: "3.2.1", name: "Первичная консультация пластического хирурга (включает осмотр, сбор анамнеза, консультирование по выбранной операции, подбор оптимального способа, выбор анестезии, описание хода и особенностей операции, обсуждение периода восстановления, выдача рекомендаций)", time: "до 40", prices: ["2 500 ₽"] },
  { code: "B01.057.004", mis: "3.2.2", name: "Повторная консультация пластического хирурга (оценка результатов, назначение и коррекция лечения, планирование обследований, выдача рекомендаций)", time: "30", prices: ["2 500 ₽"] },
  { code: "B01.057.004", mis: "3.2.3", name: "Осмотр после лечения в течение 1 месяца", time: "до 10", prices: ["Бесплатно"] },
];
const operations: Price[] = [
  { code: "А16.20.085", mis: "3.2.4.1", name: "Увеличение молочной железы (маммопластика) (без стоимости имплантов)", time: "120", prices: ["112 000 ₽", "137 000 ₽", "147 000 ₽"] },
  { code: "А16.20.085", mis: "3.2.4.2", name: "Увеличение молочной железы (маммопластика) с коррекцией ареол (без стоимости имплантов)", time: "90", prices: ["127 000 ₽", "147 000 ₽", "162 000 ₽"] },
  { code: "А16.20.085", mis: "3.2.4.3", name: "Редукционная (уменьшение) пластика молочной железы", time: "120", prices: ["140 000 ₽", "165 000 ₽", "240 000 ₽"] },
  { code: "А16.20.085", mis: "3.2.4.4", name: "Вертикальная т-образная мастопексия (подтяжка молочной железы)", time: "120", prices: ["130 000 ₽", "150 000 ₽", "200 000 ₽"] },
  { code: "А16.20.085", mis: "3.2.4.5", name: "Подтяжка с увеличением молочных желез (без стоимости имплантов)", time: "120", prices: ["142 000 ₽", "162 000 ₽", "182 000 ₽"] },
  { code: "А16.30.005", mis: "3.2.5.1", name: "Мини-абдоминопластика", time: "90", prices: ["72 000 ₽", "82 000 ₽", "97 000 ₽"] },
  { code: "А16.30.005", mis: "3.2.5.2", name: "Абдоминопластика", time: "120", prices: ["112 000 ₽", "132 000 ₽", "182 000 ₽"] },
  { code: "А16.30.005", mis: "3.2.5.3", name: "Коррекция пупка (формирование пупка)", time: "60", prices: ["15 000 ₽", "20 000 ₽", "25 000 ₽"] },
  { code: "А16.30.005", mis: "3.2.5.4", name: "Устранение грыжи белой линии живота", time: "60", prices: ["52 000 ₽", "62 000 ₽", "72 000 ₽"] },
  { code: "А16.30.005", mis: "3.2.6.1", name: "Верхний бодилифт", time: "—", prices: ["182 000 ₽", "212 000 ₽", "262 000 ₽"] },
  { code: "А16.30.005", mis: "3.2.6.2", name: "Торсопластика (Бодилифт)", time: "—", prices: ["262 000 ₽", "362 000 ₽", "412 000 ₽"] },
];

function PriceTable({ rows, categories = false }: { rows: Price[]; categories?: boolean }) {
  return <div className="prices-table-scroll"><table className="prices-table"><thead><tr><th>Код<br />Номенклатуры<br />мед. услуг</th><th>Код МИС</th><th>Наименование медицинской услуги</th><th>Время,<br />мин.</th>{categories ? <th colSpan={3}>Цена, руб. / категория сложности<br /><span className="prices-category-labels">I　　　　 II　　　　 III</span></th> : <th>Цена,<br />руб.</th>}</tr></thead><tbody>{rows.map((row) => <tr key={row.mis}><td>{row.code}</td><td>{row.mis}</td><td>{row.name}</td><td>{row.time}</td>{row.prices.map((price, index) => <td key={index}>{price}</td>)}</tr>)}</tbody></table></div>;
}

const sections = [
  { heading: "Пластическая хирургия", items: ["Пластическая и эстетическая хирургия", "Пластическая хирургия", "Дополнительные услуги"] },
  { heading: "Дерматология", items: ["Дерматология", "Манипуляции", "Физиотерапия"] },
  { heading: "Лор-хирургия", items: ["Оториноларингология хирургического профиля"] },
  { heading: "Гинекология", items: ["Гинекология", "Манипуляции", "Физиотерапия", "Биоревитализация, аутоомоложение, инъекционная пластика", "Fotona Intimalase гинекологические процедуры с применением лазерной системы"] },
];

export default function PricesPage() {
  return <main id="top" className="prices-page"><Header /><div className="prices-content"><h1>Цены на услуги <span aria-hidden="true">↗</span></h1>{sections.map((section, sectionIndex) => <section className="prices-section" key={section.heading}><h2>{section.heading}</h2>{section.items.map((item, itemIndex) => <details key={`${item}-${itemIndex}`} className="prices-accordion" open={sectionIndex === 0 && itemIndex === 0 ? true : undefined}><summary><span>{item} <small>от 3 500 ₽</small></span><span className="prices-chevron" aria-hidden="true">↓</span></summary>{sectionIndex === 0 && itemIndex === 0 ? <div className="prices-accordion-body"><PriceTable rows={consultations} /><p className="prices-note">*Категория определяется врачом на консультации в зависимости от сложности операции.</p><PriceTable rows={operations} categories /></div> : <div className="prices-accordion-body prices-empty"><p>Подробную стоимость услуг уточняйте у администратора.</p><Link href="tel:+73517751918">Позвонить: +7 (351) 775-19-18</Link></div>}</details>)}</section>)}</div><Footer /></main>;
}
