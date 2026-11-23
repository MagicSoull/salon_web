export const newsItems = [
  { slug: "refresh", type: "Хирургия", title: "«Освежиться, но не более!» Пластический хирург Dr.Gaja о бьюти-трендах и операциях", date: "11.04.2025", image: "/news/desktop-image35.png", summary: "Встреча с пластическим хирургом Dr.Gaja в клинике «Арт-Медика»." },
  { slug: "reviews", type: "Косметология", title: "Отзывы пациентов — наша гордость!", date: "11.04.2025", image: "/news/desktop-image35.png", summary: "Истории пациентов и обратная связь помогают нам становиться лучше." },
  { slug: "beauty-finale", type: "Красота в тебе", title: "Финал 4 сезона международного проекта «Красота в тебе»", date: "12.03.2025", image: "/news/desktop-rectangle4.png", summary: "Событие проекта «Красота в тебе» в Челябинске." },
];
export const getNews = (slug: string) => newsItems.find((item) => item.slug === slug);
