"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ContentCategory } from "../lib/site-content";

type ServiceCard = {
  title: string;
  items: string[];
  image: string;
  href: string;
};

function ServiceCard({ card }: { card: ServiceCard }) {
  return (
    <article className="service-card">
      <Link className="service-card-route" href={card.href} aria-label={`${card.title} — подробнее`} />
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

export default function Services({ categories: serviceCategories, intro }: { categories: ContentCategory[]; intro: string }) {
  const [openCategory, setOpenCategory] = useState(0);
  const surgery = serviceCategories.find((item) => item.slug === "plastic-surgery");
  const cosmetology = serviceCategories.find((item) => item.slug === "cosmetology");
  const medical = ["otorhinolaryngology", "dermatology", "neurology", "therapy", "diagnostics"].map((slug) => serviceCategories.find((item) => item.slug === slug)).filter((item): item is ContentCategory => Boolean(item));
  const categories = [
    { title: surgery?.title || "Пластическая хирургия", cards: surgery?.treatments.map((item) => ({ title: item.title, items: [item.description], image: item.image || surgery.image, href: `/services/${surgery.slug}/${item.slug}` })) || [] },
    { title: cosmetology?.title || "Косметология", cards: cosmetology?.treatments.map((item) => ({ title: item.title, items: [item.description], image: item.image || cosmetology.image, href: `/services/${cosmetology.slug}/${item.slug}` })) || [] },
    { title: "Медицинские услуги", cards: medical.map((item) => ({ title: item.title, items: [item.summary], image: item.image, href: `/services/${item.slug}` })) },
  ];

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="services-inner">
        <Link className="services-kicker" href="/services">Услуги ↗</Link>
        <div className="services-intro">
          <h2 id="services-heading">{intro}</h2>
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
