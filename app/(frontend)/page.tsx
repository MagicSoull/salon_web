import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import SurgeryHighlight from "../components/SurgeryHighlight";
import ShowcaseSections from "../components/ShowcaseSections";
import { getHomePage, getProjects, getResults, getReviews, getServiceCategories, getSpecialists, mediaUrl } from "../lib/site-content";

export const dynamic = "force-dynamic";
export default async function Home() {
  const [content, categories, specialists, projects, results, reviews] = await Promise.all([
    getHomePage(), getServiceCategories(), getSpecialists(), getProjects(), getResults("home"), getReviews(),
  ]);
  return (
    <main id="top">
      <Header />
      <Hero content={content} />
      <Services categories={categories} intro={content.servicesIntro || ""} />
      <SurgeryHighlight content={content} />
      <ShowcaseSections content={content} specialists={specialists} projects={projects} results={results} reviews={reviews} workImage={mediaUrl(content.workImage)} />
      <Footer />
    </main>
  );
}
