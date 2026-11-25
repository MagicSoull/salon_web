import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectCards from "./ProjectCards";
import { getPageCopy, getProjects } from "../../lib/site-content";
import "./projects.css";

export const metadata: Metadata = {
  title: "Проекты — Арт-Медика",
  description: "Проекты медико-косметологического центра Арт-Медика в Челябинске.",
};

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const [projects, copy] = await Promise.all([getProjects(), getPageCopy("projects")]);
  return (
    <main id="top" className="projects-page">
      <Header />
      <div className="projects-content">
        <nav className="projects-breadcrumb" aria-label="Навигационная цепочка">
          <Link href="/">Арт-Медика</Link><span aria-hidden="true">›</span><span>Проекты</span>
        </nav>
        <div className="projects-intro">
          <h1>Проекты <picture><source media="(max-width: 720px)" srcSet="/offers/title-arrow-mobile.svg" /><Image src="/offers/title-arrow.svg" alt="" width={50} height={50} /></picture></h1>
          <p>{copy?.intro}</p>
        </div>
        <ProjectCards projects={projects} />
      </div>
      <Footer />
    </main>
  );
}
