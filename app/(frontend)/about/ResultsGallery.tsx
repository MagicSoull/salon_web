"use client";

import Image from "next/image";
import { useState } from "react";
import type { ContentResult } from "../../lib/site-content";

export default function ResultsGallery({ results }: { results: ContentResult[] }) {
  const categories = ["Все", ...new Set(results.map((item) => item.category))];
  const [selected, setSelected] = useState("Все");
  const [offset, setOffset] = useState(0);
  const filtered = selected === "Все" ? results : results.filter((result) => result.category === selected);
  const visible = filtered.length ? [...filtered.slice(offset), ...filtered.slice(0, offset)] : [];
  function changeCategory(category: string) { setSelected(category); setOffset(0); }
  function move(direction: number) { if (filtered.length) setOffset((current) => (current + direction + filtered.length) % filtered.length); }
  return <div className="about-gallery"><div className="about-gallery-tabs" role="group" aria-label="Фильтр результатов">{categories.map((category) => <button type="button" key={category} className={selected === category ? "active" : ""} onClick={() => changeCategory(category)} aria-pressed={selected === category}>{category}</button>)}</div>{visible.length ? <div className="about-gallery-grid">{visible.map((result, index) => <div className="about-gallery-image" key={`${result.image}-${index}`}><Image src={result.image} alt={result.alt} fill sizes="(max-width: 720px) 80vw, 33vw" /></div>)}</div> : <p className="about-gallery-empty">Примеры работ по этому направлению скоро появятся.</p>}<div className="about-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Предыдущие результаты">←</button><button type="button" onClick={() => move(1)} aria-label="Следующие результаты">→</button></div></div>;
}
