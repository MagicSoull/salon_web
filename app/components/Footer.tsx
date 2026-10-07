import Image from "next/image";

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

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <section className="footer-links" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href="#top">{link}</a>
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
            <a className="footer-logo" href="#top" aria-label="Арт-Медика — на главную">
              <Image src="/logo.svg" alt="Арт-Медика" width={270} height={64} />
            </a>

            <div className="footer-socials" aria-label="Мы в социальных сетях">
              <a className="social" href="#top" aria-label="MAX">
                <Image src="/social-max.png" alt="" width={48} height={48} />
              </a>
              <a className="social" href="#top" aria-label="ВКонтакте">
                <Image src="/social-vk.png" alt="" width={48} height={48} />
              </a>
              <a className="social" href="#top" aria-label="Telegram">
                <Image src="/social-telegram.png" alt="" width={48} height={48} />
              </a>
            </div>

            <a className="accessibility-link" href="#top">
              <span aria-hidden="true">●</span>
              Версия для слабовидящих
            </a>

            <p className="footer-copyright">
              © Медико-косметический центр Арт-медика 2026
              <br />
              Категория 18+
            </p>
          </section>

          <FooterLinks title="Клиника" links={clinicLinks} />
          <FooterLinks title="Услуги" links={serviceLinks} />

          <section className="footer-contacts" aria-label="Контакты">
            <a className="footer-appointment" href="#appointment">Записаться</a>
            <address>
              <p><Image src="/icon-location.svg" alt="" width={14} height={16} />Челябинск, пр. Ленина 12а</p>
              <p><Image src="/icon-phone.svg" alt="" width={17} height={17} /><a href="tel:+73517751918">+7 (351) 775-19-18</a></p>
              <p><Image src="/icon-message.svg" alt="" width={24} height={24} /><a href="mailto:marketing.art.medica@mail.ru">marketing.art.medica@mail.ru</a></p>
              <p><Image src="/icon-time.svg" alt="" width={24} height={24} />09:00 до 20:00<br /><b>понедельник – суббота</b></p>
            </address>
          </section>
        </div>
      </div>

      <p className="footer-notice">ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА</p>
    </footer>
  );
}
