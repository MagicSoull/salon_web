export const specialists = [
  { slug: "irina-kuznetsova", name: "Кузнецова Ирина Сергеевна", role: "Директор ООО «МКЦ «Арт-Медика», врач-организатор здравоохранения, дерматовенеролог, косметолог.", category: "Руководство", image: "/doctor-kushentsova.png", service: "dermatology" },
  { slug: "anastasiya-busygina", name: "Бусыгина Анастасия Петровна", role: "Заведующая амбулаторно-поликлиническим отделением, врач-дерматовенеролог, косметолог, трихолог.", category: "Поликлиническое отделение", image: "/doctor-busygina.png", service: "cosmetology" },
  { slug: "yuriy-perevezentsev", name: "Перевезенцев Юрий Юрьевич", role: "Заведующий стационарным отделением пластической хирургии, врач пластический хирург, кандидат медицинских наук.", category: "Хирургия", image: "/doctor-perevezentsev.png", service: "plastic-surgery" },
  { slug: "evgeniya-sergeeva", name: "Сергеева Евгения Александровна", role: "Заместитель директора по медицинской части, заведующая отделением оториноларингологии.", category: "Оториноларингология", image: "/doctor-sergeeva.png", service: "otorhinolaryngology" },
];
export const getSpecialist = (slug: string) => specialists.find((item) => item.slug === slug);
