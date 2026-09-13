import Header from "./components/Header";

export default function Home() {
  return (
    <main id="top">
      <Header />
      <section className="stage" aria-label="Превью первого экрана">
        <p>Header preview</p>
      </section>
    </main>
  );
}
