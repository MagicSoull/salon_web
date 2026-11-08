import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClinicMap from "./ClinicMap";
import "./contacts.css";

export const metadata: Metadata = {
  title: "Контакты — Арт-Медика",
  description: "Адрес, телефоны и режим работы медико-косметологического центра Арт-Медика в Челябинске.",
};

export default function ContactsPage() {
  return (
    <main id="top">
      <Header />
      <div className="contacts-content">
        <nav className="contacts-breadcrumb" aria-label="Навигационная цепочка">
          <Link href="/">Арт-Медика</Link><span aria-hidden="true">›</span><span>Контакты</span>
        </nav>

        <div className="contacts-intro">
          <h1>Контакты <picture><source media="(max-width: 720px)" srcSet="/offers/title-arrow-mobile.svg" /><Image src="/contacts-arrow.svg" alt="" width={50} height={50} /></picture></h1>
          <p>Пишите нам, когда вам удобно — даже в выходные или ночью. Ваш запрос будет обработан в ближайшее рабочее время</p>
        </div>

        <ClinicMap />

        <div className="contacts-details">
          <section className="contacts-card contact-address">
            <h2>Адрес</h2>
            <p>454007, Челябинская область,<br />г. Челябинск, проспект Ленина 12 «А» (рядом Театр ЧТЗ)</p>
          </section>
          <section className="contacts-card contact-phones">
            <h2>Телефоны</h2>
            <p><a href="tel:+73517751918">+7 (351) 775-19-18</a> - запись на прием;<br /><a href="tel:+73517751988">+7 (351) 775-19-88</a> - телефон горячей линии</p>
          </section>
          <section className="contacts-card contact-email">
            <h2>E-mail</h2>
            <p><a href="mailto:sender@artmdc.ru">sender@artmdc.ru</a> - отправка анализов<br /><a href="mailto:marketing.art-medica@mail.ru">marketing.art-medica@mail.ru</a> - прием обращений граждан</p>
          </section>
          <section className="contacts-card contact-messages">
            <h2>Сообщения</h2>
            <p><a href="tel:+79123263460">+7 (912) 326-34-60</a> - Telegram, MAX</p>
          </section>
          <section className="contacts-card contact-hours">
            <h2>Режим работы</h2>
            <p>ПН-СБ с 9:00 до 20:00</p>
          </section>
          <div className="contacts-socials" aria-label="Социальные сети">
            <span className="contacts-social-max" aria-label="MAX"><Image src="/contacts/social-max-bg.png" alt="" width={80} height={80} /><Image src="/contacts/social-max-mark.svg" alt="" width={47} height={47} /></span>
            <span aria-label="ВКонтакте"><Image src="/contacts/social-vk.svg" alt="" width={80} height={80} /></span>
            <a href="https://t.me/Artmedica_bot" aria-label="Telegram" target="_blank" rel="noreferrer"><Image src="/contacts/social-telegram.svg" alt="" width={80} height={80} /></a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
