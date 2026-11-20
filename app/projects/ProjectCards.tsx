"use client";

import Image from "next/image";
import { useState } from "react";

const projects = [
  {
    id: "beauty-in-you",
    image: "/projects/desktop-1.png",
    title: "Социальный проект «Красота в тебе»",
    description: "«Красота в тебе» — социальный проект для жителей Челябинской области, которые хотят преобразиться, доверив свое преображение лучшим специалистам в своей сфере. Проект имеет международный статус, так как в проекте участвует итальянский пластический хирург Dr. Ivan Gaja.",
  },
  {
    id: "milan-surgery",
    image: "/projects/desktop-2.png",
    title: "Доступная пластическая хирургия из Милана в России",
    description: "В Челябинске на протяжении многих лет успешно реализуется Российско-Итальянский проект «Доступная пластическая хирургия из Милана в России». Сертифицированный пластический хирург с правом оперирования на территории нашей страны Dr. Gaja внедряет авторские методики: нитевой лифтинг, мезоботокс (лицо + шея), увеличение губ, коррекция носослезной борозды, липофилинг и др. Операции пользуются огромным успехом как у женщин, так и у мужчин.",
  },
  {
    id: "blepharoplasty",
    image: "/projects/desktop-3.png",
    mobileImage: "/projects/desktop-2.png",
    title: "Европейская блефаро-пластика 2025",
    description: "«Европейская блефаропластика» — комплексная программа омоложения верхнего века, в виде хирургической пластики верхнего века и 3-х сеансов реабилитации тканей на европейской лазерной системе Fotona. Комплексная программа осуществляется пластическим хирургом, прошедшим специализацию у членов Европейской Академии лицевой хирургии и получившего сертификат лазерного хирурга для работы на европейской лазерной системе Fotona.",
  },
];

export default function ProjectCards() {
  const [expanded, setExpanded] = useState<string[]>([]);

  function toggle(id: string) {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <section className="projects-list" aria-label="Проекты клиники">
      {projects.map((project) => {
        const isExpanded = expanded.includes(project.id);
        return (
          <article className={`projects-card${isExpanded ? " is-expanded" : ""}`} id={project.id} key={project.id}>
            <div className="projects-card-image">
              {project.mobileImage ? (
                <picture>
                  <source media="(max-width: 720px)" srcSet={project.mobileImage} />
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) calc(100vw - 72px), 50vw" />
                </picture>
              ) : <Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) calc(100vw - 72px), 50vw" />}
            </div>
            <div className="projects-card-body">
              <div className="projects-card-meta"><span>Проекты</span><Image src="/projects/desktop-arrow.svg" alt="" width={24} height={24} /></div>
              <div className="projects-card-middle">
                <div className="projects-card-copy">
                  <h2>{project.title}</h2>
                  <p className={isExpanded ? "" : "is-clamped"} id={`${project.id}-description`}>{project.description}</p>
                </div>
                <button className="projects-card-button" type="button" aria-expanded={isExpanded} aria-controls={`${project.id}-description`} onClick={() => toggle(project.id)}>{isExpanded ? "Свернуть" : "Подробнее"}</button>
              </div>
              <time dateTime="2025-04-07">07.04.2025</time>
            </div>
          </article>
        );
      })}
    </section>
  );
}
