import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <MobileMenu />
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
          <Link href="/#about">О клинике</Link>
          <Link href="/#services">Услуги</Link>
          <Link href="/#specialists">Специалисты</Link>
          <Link href="/offers">Акции</Link>
          <Link href="/#documents">Документы</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>

        <div className="header-actions">
          <p className="header-address">
            Челябинск, пр. Ленина 12а
            <br />
            ПН–СБ с 9:00 до 20:00
          </p>

          <a className="appointment-button" href="tel:+73517751918">
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}
