import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <Hero />
      <Services />
      <Footer />
    </main>
  );
}
