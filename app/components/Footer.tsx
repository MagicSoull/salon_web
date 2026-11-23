import Image from "next/image";
import Link from "next/link";

const clinicLinks = [
  "О клинике",
  "Специалисты",
  "Услуги",
  "Проекты",
  "Акции",
  "Новости",
  "Цены",
  "Контакты",
  "Документы",
  "Вопросы и ответы",
];

const serviceLinks = [
  "Пластическая хирургия",
  "Косметология",
  "Топ-продукты",
  "Дерматология",
  "Оториноларингология",
  "Лор-хирургия",
  "Неврология и рефлексотерапия",
  "Эстетическая гинекология",
  "Терапевтический приём",
  "Массаж",
];

const footerRoutes: Record<string, string> = {
  "О клинике": "/about",
  "Специалисты": "/specialists",
  "Акции": "/offers",
  "Новости": "/news",
  "Цены": "/prices",
  "Контакты": "/contacts",
  "Документы": "/documents",
  "Вопросы и ответы": "/faq",
  "Услуги": "/services",
  "Проекты": "/projects",
  "Пластическая хирургия": "/services/plastic-surgery",
  "Косметология": "/services/cosmetology",
  "Топ-продукты": "/services/top-products",
  "Дерматология": "/services/dermatology",
  "Оториноларингология": "/services/otorhinolaryngology",
  "Лор-хирургия": "/services/ent-surgery",
  "Неврология и рефлексотерапия": "/services/neurology",
  "Эстетическая гинекология": "/services/aesthetic-gynecology",
  "Терапевтический приём": "/services/therapy",
  "Массаж": "/services/massage",
};

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <section className="footer-links" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link href={footerRoutes[link] ?? "#top"}>{link}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="footer-main">
        <div className="footer-grid">
          <section className="footer-brand" aria-label="Арт-Медика">
            <Link className="footer-logo" href="/" aria-label="Арт-Медика — на главную">
              <Image src="/logo.svg" alt="Арт-Медика" width={270} height={64} />
            </Link>

            <div className="footer-socials" aria-label="Мы в социальных сетях">
              <span className="social" aria-label="MAX">
                <Image src="/social-max.png" alt="" width={48} height={48} />
              </span>
              <span className="social" aria-label="ВКонтакте">
                <Image src="/social-vk.png" alt="" width={48} height={48} />
              </span>
              <a className="social" href="https://t.me/Artmedica_bot" target="_blank" rel="noreferrer" aria-label="Telegram">
                <Image src="/social-telegram.png" alt="" width={48} height={48} />
              </a>
            </div>

            <span className="accessibility-link">
              <Image src="/icon-view.svg" alt="" width={24} height={24} />
              Версия для слабовидящих
            </span>

            <p className="footer-copyright">
              © Медико-косметологический центр Арт-медика 2026
              <br />
              Категория 18+
            </p>
          </section>

          <FooterLinks title="Клиника" links={clinicLinks} />
          <FooterLinks title="Услуги" links={serviceLinks} />

          <section className="footer-contacts" aria-label="Контакты">
            <a className="footer-appointment" href="tel:+73517751918">Записаться</a>
            <address>
              <p><Image src="/icon-location.svg" alt="" width={14} height={16} />Челябинск, пр. Ленина 12а</p>
              <p><Image src="/icon-phone.svg" alt="" width={17} height={17} /><a href="tel:+73517751918">+7 (351) 775-19-18</a></p>
              <p><Image src="/icon-message.svg" alt="" width={24} height={24} /><a href="mailto:marketing.art-medica@mail.ru">marketing.art-medica@mail.ru</a></p>
              <p><Image src="/icon-time.svg" alt="" width={24} height={24} />09:00 до 20:00<br /><b>понедельник – суббота</b></p>
            </address>
          </section>
        </div>
      </div>

      <p className="footer-notice">ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА</p>
    </footer>
  );
}
