import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ClinicMap from "./ClinicMap";
import { getPageCopy, getSiteSettings } from "../../lib/site-content";
import "./contacts.css";

export const metadata: Metadata = {
  title: "Контакты — Арт-Медика",
  description: "Адрес, телефоны и режим работы медико-косметологического центра Арт-Медика в Челябинске.",
};

export const dynamic = "force-dynamic";
export default async function ContactsPage() {
  const [settings, copy] = await Promise.all([getSiteSettings(), getPageCopy("contacts")]);
  const tel = (value: string | null | undefined) => `tel:${(value || "").replace(/[^+\d]/g, "")}`;
  return (
    <main id="top">
      <Header />
      <div className="contacts-content">
        <nav className="contacts-breadcrumb" aria-label="Навигационная цепочка">
          <Link href="/">Арт-Медика</Link><span aria-hidden="true">›</span><span>Контакты</span>
        </nav>

        <div className="contacts-intro">
          <h1>Контакты <picture><source media="(max-width: 720px)" srcSet="/offers/title-arrow-mobile.svg" /><Image src="/contacts-arrow.svg" alt="" width={50} height={50} /></picture></h1>
          <p>{copy?.intro}</p>
        </div>

        <ClinicMap coordinates={[settings.longitude || 0, settings.latitude || 0]} mapUrl={settings.mapUrl || "#"} />

        <div className="contacts-details">
          <section className="contacts-card contact-address">
            <h2>Адрес</h2>
            <p>{settings.fullAddress}</p>
          </section>
          <section className="contacts-card contact-phones">
            <h2>Телефоны</h2>
            <p><a href={tel(settings.phone)}>{settings.phone}</a> - запись на прием;<br /><a href={tel(settings.hotline)}>{settings.hotline}</a> - телефон горячей линии</p>
          </section>
          <section className="contacts-card contact-email">
            <h2>E-mail</h2>
            <p><a href={`mailto:${settings.analysisEmail}`}>{settings.analysisEmail}</a> - отправка анализов<br /><a href={`mailto:${settings.email}`}>{settings.email}</a> - прием обращений граждан</p>
          </section>
          <section className="contacts-card contact-messages">
            <h2>Сообщения</h2>
            <p><a href={tel(settings.messengerPhone)}>{settings.messengerPhone}</a> - Telegram, MAX</p>
          </section>
          <section className="contacts-card contact-hours">
            <h2>Режим работы</h2>
            <p>{settings.hours}</p>
          </section>
          <div className="contacts-socials" aria-label="Социальные сети">
            <span className="contacts-social-max" aria-label="MAX"><Image src="/contacts/social-max-bg.png" alt="" width={80} height={80} /><Image src="/contacts/social-max-mark.svg" alt="" width={47} height={47} /></span>
            <span aria-label="ВКонтакте"><Image src="/contacts/social-vk.svg" alt="" width={80} height={80} /></span>
            <a href={settings.telegramUrl || "#"} aria-label="Telegram" target="_blank" rel="noreferrer"><Image src="/contacts/social-telegram.svg" alt="" width={80} height={80} /></a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
