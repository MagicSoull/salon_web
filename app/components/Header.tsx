import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { getServiceCategories, getSiteSettings } from "../lib/site-content";

export default async function Header() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getServiceCategories()]);
  const phoneHref = `tel:${(settings.phone || "").replace(/[^+\d]/g, "")}`;
  return (
    <header className="header">
      <div className="header-inner">
        <MobileMenu serviceItems={categories.slice(0, 4).map((item) => ({ label: item.title, href: `/services/${item.slug}` }))} />
        <Link className="logo" href="/" aria-label="Арт-Медика — на главную">
          <Image
            src="/logo.svg"
            alt="Арт-Медика"
            width={270}
            height={64}
            priority
          />
        </Link>

        <nav className="nav" aria-label="Основная навигация">
          <Link href="/about">О клинике</Link>
          <Link href="/services">Услуги</Link>
          <Link href="/specialists">Специалисты</Link>
          <Link href="/offers">Акции</Link>
          <Link href="/documents">Документы</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>

        <div className="header-actions">
          <p className="header-address">
            {settings.address}
            <br />
            {settings.hours}
          </p>

          <a className="appointment-button" href={phoneHref}>
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}
