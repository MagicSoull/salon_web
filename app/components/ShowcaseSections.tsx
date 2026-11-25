"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ContentProject, ContentResult, ContentReview, ContentSpecialist, getHomePage } from "../lib/site-content";

type Props = {
  content: Awaited<ReturnType<typeof getHomePage>>;
  specialists: ContentSpecialist[];
  projects: ContentProject[];
  results: ContentResult[];
  reviews: ContentReview[];
  workImage: string;
};
function rotate<T>(items: T[], start: number, count: number) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(count, items.length) }, (_, index) => items[(start + index) % items.length]);
}
function Controls({ back, next }: { back: () => void; next: () => void }) {
  return <div className="carousel-controls"><button type="button" aria-label="Предыдущие карточки" onClick={back}>←</button><button type="button" aria-label="Следующие карточки" onClick={next}>→</button></div>;
}
function Intro({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  return <div className="showcase-intro">{href ? <Link className="showcase-label" href={href}>{label}<span>↗</span></Link> : <span className="showcase-label">{label}<span>↗</span></span>}<p>{children}</p></div>;
}
function Tabs({ options, selected, onChange }: { options: string[]; selected: string; onChange: (value: string) => void }) {
  return <div className="filter-tabs" aria-label="Выбор направления"><button className={selected === "Все" ? "filter-tab is-active" : "filter-tab"} onClick={() => onChange("Все")} type="button">Все</button>{options.map((option) => <button className={selected === option ? "filter-tab is-active" : "filter-tab"} key={option} type="button" onClick={() => onChange(option)}>{option}</button>)}</div>;
}
const fmt = (value: string) => value ? value.split("-").reverse().join(".") : "";

export default function ShowcaseSections({ content, specialists, projects, results, reviews, workImage }: Props) {
  const [resultFilter, setResultFilter] = useState("Все");
  const [resultStart, setResultStart] = useState(0);
  const [specialistFilter, setSpecialistFilter] = useState("Все");
  const [specialistStart, setSpecialistStart] = useState(0);
  const [projectStart, setProjectStart] = useState(0);
  const [reviewStart, setReviewStart] = useState(0);
  const filteredResults = resultFilter === "Все" ? results : results.filter((item) => item.category === resultFilter);
  const filteredSpecialists = specialistFilter === "Все" ? specialists : specialists.filter((item) => item.category === specialistFilter);
  const visibleResults = rotate(filteredResults, resultStart, 3);
  const visibleSpecialists = rotate(filteredSpecialists, specialistStart, 4);
  const visibleProjects = rotate(projects, projectStart, 3);
  const visibleReviews = rotate(reviews, reviewStart, 2);
  const move = (setter: React.Dispatch<React.SetStateAction<number>>, length: number, direction: number) => () => setter((current) => length ? (current + direction + length) % length : 0);

  return <section className="showcase" aria-label="Материалы клиники"><div className="showcase-inner">
    <section className="showcase-section" id="results"><Intro label="Результат операций" href="/about#results">{content.resultsIntro}</Intro>
      <Tabs options={[...new Set(results.map((item) => item.category))]} selected={resultFilter} onChange={(value) => { setResultFilter(value); setResultStart(0); }} />
      <div className="showcase-cards result-row">{visibleResults.map((item, index) => <article className="result-card" key={`${item.image}-${index}`}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 720px) 85vw, 560px" /></article>)}</div>
      <Controls back={move(setResultStart, filteredResults.length, -1)} next={move(setResultStart, filteredResults.length, 1)} />
    </section>
    <section className="showcase-section" id="specialists"><Intro label="Наши специалисты" href="/specialists">{content.specialistsIntro}</Intro>
      <Tabs options={[...new Set(specialists.map((item) => item.category))]} selected={specialistFilter} onChange={(value) => { setSpecialistFilter(value); setSpecialistStart(0); }} />
      <div className="showcase-cards specialist-row">{visibleSpecialists.map((item) => <Link className="specialist-card" href={`/specialists/${item.slug}`} key={item.slug}><Image src={item.image} alt={item.name} fill sizes="(max-width: 720px) 85vw, 415px" /><div className="specialist-gradient" /><div className="specialist-card-content"><h3>{item.name}</h3><p>{item.role}</p></div></Link>)}</div>
      <Controls back={move(setSpecialistStart, filteredSpecialists.length, -1)} next={move(setSpecialistStart, filteredSpecialists.length, 1)} />
    </section>
    <section className="showcase-section" id="projects"><Intro label="Проекты" href="/projects">{content.projectsIntro}</Intro>
      <div className="project-row">{visibleProjects.map((item, index) => <Link href={`/projects/${item.slug}`} className={index === 0 ? "project-card project-card-featured" : "project-card"} key={item.slug}><div className="project-card-meta"><span>Проекты / {item.group}</span><b>↗</b></div><div className="project-card-image"><Image src={item.homeImage} alt={item.title} fill sizes="(max-width: 720px) 85vw, 395px" /></div><div className="project-card-content"><h3>{item.title}</h3>{item.teaser && <p>{item.teaser}</p>}<time dateTime={item.date}>{fmt(item.date)}</time></div></Link>)}</div>
      <Controls back={move(setProjectStart, projects.length, -1)} next={move(setProjectStart, projects.length, 1)} />
    </section>
    <section className="showcase-section showcase-work" id="work"><Intro label="Наша работа">{content.workIntro}</Intro><div className="work-video" aria-label="Работа клиники"><Image src={workImage} alt="Работа клиники" fill sizes="(max-width: 720px) 100vw, 1720px" /></div></section>
    <section className="showcase-section" id="reviews"><Intro label="Кейсы клиентов">{content.reviewsIntro}</Intro>
      <div className="review-grid">{visibleReviews.map((item, index) => <article className="review-card" key={`${item.story}-${index}`}><div className="review-name"><strong>{item.name}</strong><span>{Array.from({ length: item.rating }, (_, star) => <Image src="/icon-star.svg" alt="" width={36} height={36} key={star} />)}</span><b>↗</b></div><div className="review-columns"><div><h3>История пациента</h3><p>{item.story}</p></div><div><h3>Понравилось</h3><p>{item.liked}</p></div></div><time dateTime={item.date}>{fmt(item.date)}</time></article>)}</div>
      <Controls back={move(setReviewStart, reviews.length, -1)} next={move(setReviewStart, reviews.length, 1)} />
    </section>
  </div></section>;
}
