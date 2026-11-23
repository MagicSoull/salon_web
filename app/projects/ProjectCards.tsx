import Image from "next/image";
import Link from "next/link";
import { projects } from "../data/projects";

export default function ProjectCards() {
  return <section className="projects-list" aria-label="Проекты клиники">{projects.map((project) => <article className="projects-card" id={project.slug} key={project.slug}><div className="projects-card-image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 720px) calc(100vw - 72px), 50vw" /></div><div className="projects-card-body"><div className="projects-card-meta"><span>Проекты</span><Image src="/projects/desktop-arrow.svg" alt="" width={24} height={24} /></div><div className="projects-card-middle"><div className="projects-card-copy"><h2>{project.title}</h2><p className="is-clamped">{project.description}</p></div><Link className="projects-card-button" href={`/projects/${project.slug}`}>Подробнее</Link></div><time dateTime="2025-04-07">07.04.2025</time></div></article>)}</section>;
}
