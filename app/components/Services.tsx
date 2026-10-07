"use client";

import Image from "next/image";
import { useState } from "react";

type ServiceCard = {
  title: string;
  items: string[];
  image: string;
};

const surgeryCards: ServiceCard[] = [
  {
    title: "Пластика лица",
    items: ["Блефаропластика", "Ринопластика", "Отопластика", "Фейслифтинг", "Коррекция губ", "Нитевой лифтинг"],
    image: "/service-face.png",
  },
  {
    title: "Пластика груди",
    items: ["Маммопластика", "Липофилинг"],
    image: "/service-breast.png",
  },
  {
    title: "Пластика тела",
    items: ["Абдоминопластика", "Брахиопластика", "Липосакция", "Подтяжка бедер"],
    image: "/service-body.png",
  },
  {
    title: "Интимная пластика\nдля мужчин",
    items: ["Интимная пластика"],
    image: "/service-men.png",
  },
  {
    title: "Комбо-операции",
    items: [
      "Маммопластика + Абдоминопластика + Лабиопластика",
      "Маммопластика + Абдоминопластика",
      "Маммопластика + Ринопластика",
      "Маммопластика + Блефаропластика",
      "Блефаропластика + Липосакция живота и талии + Липофилинг груди",
    ],
    image: "/service-face-care.png",
  },
  {
    title: "Другие услуги",
    items: [
      "Обследование перед операцией",
      "Подготовка к операции",
      "Памятка пациенту перед операцией",
      "Программа реабилитации после операции",
      "Плацентарная терапия",
    ],
    image: "/service-face-care.png",
  },
];

const categories = [
  { title: "Пластическая хирургия", cards: surgeryCards },
  { title: "Косметология", cards: [] },
  { title: "Медицинские услуги", cards: [] },
];

function ServiceCard({ card }: { card: ServiceCard }) {
  return (
    <article className="service-card">
      <Image
        className="service-card-image"
        src={card.image}
        alt=""
        fill
        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
      />
      <div className="service-card-shade" aria-hidden="true" />
      <div className="service-card-content">
        <h3>{card.title}</h3>
        <ul>
          {card.items.map((item) => (
            <li key={item}>
              <span>{item}</span>
              <b aria-hidden="true">→</b>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Services() {
  const [openCategory, setOpenCategory] = useState(0);

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="services-inner">
        <a className="services-kicker" href="#services">Услуги ↗</a>
        <div className="services-intro">
          <h2 id="services-heading">В клинике «Арт-медика» мы объединили многолетний опыт врачей и современные технологии, чтобы предложить вам максимально широкий спектр медицинских и эстетических услуг.</h2>
        </div>

        <div className="services-accordion">
          {categories.map((category, index) => {
            const isOpen = openCategory === index;

            return (
              <div className="service-group" key={category.title}>
                <button
                  className="service-group-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${index}`}
                  onClick={() => setOpenCategory(isOpen ? -1 : index)}
                >
                  <span>{category.title}</span>
                  <span className="service-group-arrow" aria-hidden="true">{isOpen ? "↑" : "↓"}</span>
                </button>

                <div
                  className="service-panel"
                  id={`service-panel-${index}`}
                  data-open={isOpen}
                  aria-hidden={!isOpen}
                >
                  <div className="service-panel-inner">
                    <div className="service-cards">
                    {category.cards.length ? (
                      category.cards.map((card) => <ServiceCard key={card.title} card={card} />)
                    ) : (
                      <p className="service-empty">Направления скоро появятся.</p>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
