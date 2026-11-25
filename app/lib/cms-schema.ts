import path from "node:path";
import type { CollectionConfig, GlobalConfig } from "payload";

const signedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);
const publicRead = () => true;
const contentAccess = { read: publicRead, create: signedIn, update: signedIn, delete: signedIn };
const image = (name: string, label: string, required = false) => ({ name, label, type: "upload" as const, relationTo: "media" as const, required });
const text = (name: string, label: string, required = false) => ({ name, label, type: "text" as const, required });
const area = (name: string, label: string, required = false) => ({ name, label, type: "textarea" as const, required });
const order = { name: "sortOrder", label: "Порядок показа", type: "number" as const, defaultValue: 100 };
const slug = { name: "slug", label: "Адрес страницы", type: "text" as const, required: true, unique: true, index: true };

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories", labels: { singular: "Направление", plural: "Направления услуг" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "sortOrder"] }, access: contentAccess,
  fields: [slug, text("title", "Название", true), area("summary", "Краткое описание", true), image("image", "Изображение", true), image("mobileImage", "Изображение для телефона"), order],
};
export const Treatments: CollectionConfig = {
  slug: "treatments", labels: { singular: "Услуга", plural: "Услуги" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "sortOrder"] }, access: contentAccess,
  fields: [
    { name: "category", label: "Направление", type: "relationship", relationTo: "service-categories", required: true, index: true },
    text("slug", "Адрес внутри направления", true), text("title", "Название", true), area("description", "Краткое описание", true),
    area("body", "Текст на странице услуги"), image("image", "Изображение"), order,
  ],
  indexes: [{ fields: ["category", "slug"], unique: true }],
};
export const Specialists: CollectionConfig = {
  slug: "specialists", labels: { singular: "Специалист", plural: "Специалисты" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "sortOrder"] }, access: contentAccess,
  fields: [slug, text("name", "ФИО", true), area("role", "Должность и специализация", true), text("category", "Группа для фильтра", true), image("image", "Фотография", true),
    { name: "serviceCategory", label: "Направление услуг", type: "relationship", relationTo: "service-categories" }, order],
};
export const Projects: CollectionConfig = {
  slug: "projects", labels: { singular: "Проект", plural: "Проекты" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "sortOrder"] }, access: contentAccess,
  fields: [slug, text("title", "Название", true), area("description", "Описание", true), area("teaser", "Текст на главной"), text("group", "Рубрика"),
    { name: "date", label: "Дата", type: "date" }, image("image", "Изображение", true), image("homeImage", "Изображение на главной"),
    { name: "relatedCategories", label: "Связанные направления", type: "relationship", relationTo: "service-categories", hasMany: true }, order],
};
export const Offers: CollectionConfig = {
  slug: "offers", labels: { singular: "Акция", plural: "Акции" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "date", "sortOrder"] }, access: contentAccess,
  fields: [slug, text("shortTitle", "Короткое название", true), text("title", "Заголовок", true), area("description", "Описание", true),
    { name: "date", label: "Дата", type: "date", required: true }, image("image", "Изображение", true),
    { name: "treatment", label: "Связанная услуга", type: "relationship", relationTo: "treatments" }, order],
};
export const Results: CollectionConfig = {
  slug: "results", labels: { singular: "Результат", plural: "Результаты операций" },
  admin: { useAsTitle: "title" }, access: contentAccess,
  fields: [text("title", "Название", true), text("category", "Категория для фильтра", true), text("alt", "Описание изображения", true), image("image", "Изображение", true),
    { name: "treatment", label: "Связанная услуга", type: "relationship", relationTo: "treatments" },
    { name: "showOnHome", label: "Показывать на главной", type: "checkbox", defaultValue: true },
    { name: "showOnAbout", label: "Показывать в разделе о клинике", type: "checkbox", defaultValue: true }, order],
};
export const Reviews: CollectionConfig = {
  slug: "reviews", labels: { singular: "Отзыв", plural: "Отзывы" },
  admin: { useAsTitle: "name" }, access: contentAccess,
  fields: [text("name", "Имя автора", true), area("story", "История пациента", true), area("liked", "Что понравилось", true),
    { name: "date", label: "Дата", type: "date" }, { name: "rating", label: "Оценка", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "specialist", label: "Специалист", type: "relationship", relationTo: "specialists" }, order],
};
export const PriceSections: CollectionConfig = {
  slug: "price-sections", labels: { singular: "Раздел цен", plural: "Цены" },
  admin: { useAsTitle: "title" }, access: contentAccess,
  fields: [text("title", "Заголовок раздела", true), { name: "category", label: "Связанное направление", type: "relationship", relationTo: "service-categories" }, order,
    { name: "groups", label: "Группы услуг", type: "array", fields: [text("title", "Название", true), text("minPrice", "Цена от"), area("note", "Примечание"),
      { name: "rows", label: "Позиции прайса", type: "array", fields: [text("code", "Код номенклатуры"), text("mis", "Код МИС"), text("name", "Наименование", true), text("duration", "Время, мин."), text("price1", "Цена / I категория"), text("price2", "II категория"), text("price3", "III категория"),
        { name: "priceMode", label: "Тип цены", type: "select", defaultValue: "single", options: [{ label: "Одна цена", value: "single" }, { label: "Категории сложности", value: "tiered" }] },
        { name: "treatment", label: "Связанная услуга", type: "relationship", relationTo: "treatments" }] } ] }],
};
export const Files: CollectionConfig = {
  slug: "files", labels: { singular: "Файл", plural: "Файлы документов" },
  admin: { useAsTitle: "title" }, access: { read: publicRead, create: signedIn, update: signedIn, delete: signedIn },
  upload: { staticDir: path.resolve(process.cwd(), "storage/documents"), mimeTypes: ["application/pdf", "image/*"] },
  fields: [text("title", "Название файла", true)],
};
export const Documents: CollectionConfig = {
  slug: "documents", labels: { singular: "Документ", plural: "Документы и сертификаты" },
  admin: { useAsTitle: "title" }, access: contentAccess,
  fields: [text("title", "Название", true), { name: "category", label: "Раздел", type: "select", required: true,
    options: [{ label: "Организационные", value: "organization" }, { label: "Нормативно-правовые", value: "legal" }, { label: "Другие", value: "other" }, { label: "Сертификаты", value: "certificates" }] },
    { name: "file", label: "Файл", type: "upload", relationTo: "files" }, order],
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings", label: "Общие данные клиники", access: { read: publicRead, update: signedIn },
  fields: [text("name", "Название клиники"), text("address", "Краткий адрес"), area("fullAddress", "Полный адрес"),
    text("phone", "Телефон для записи"), text("hotline", "Горячая линия"), text("messengerPhone", "Телефон мессенджеров"),
    text("email", "Почта для обращений"), text("analysisEmail", "Почта для анализов"), text("hours", "Время работы"),
    text("telegramUrl", "Telegram"), text("mapUrl", "Ссылка на карту"),
    { name: "longitude", label: "Долгота", type: "number" }, { name: "latitude", label: "Широта", type: "number" }],
};
export const HomePage: GlobalConfig = {
  slug: "home-page", label: "Главная страница", access: { read: publicRead, update: signedIn },
  fields: [text("heroTitle", "Главный заголовок"), area("heroDescription", "Подзаголовок"), image("heroImage", "Главное изображение"),
    { name: "statistics", label: "Показатели в первом блоке", type: "array", fields: [text("value", "Значение", true), area("label", "Подпись", true)] },
    area("servicesIntro", "Вступление услуг"), text("surgeryTitle", "Заголовок блока о работе"), area("surgeryDescription", "Описание клиники"), area("equipmentDescription", "Описание оборудования"), image("surgeryImage", "Фото операционной"),
    { name: "facts", label: "Показатели клиники", type: "array", fields: [text("value", "Значение", true), area("label", "Подпись", true)] },
    area("resultsIntro", "Текст о результатах"), area("specialistsIntro", "Текст о специалистах"), area("projectsIntro", "Текст о проектах"), area("workIntro", "Текст о работе"), image("workImage", "Фото работы"), area("reviewsIntro", "Текст об отзывах")],
};
export const AboutPage: GlobalConfig = {
  slug: "about-page", label: "Страница о клинике", access: { read: publicRead, update: signedIn },
  fields: [area("intro", "Вступление"), image("roomImage", "Фото кабинета"), area("overview", "Описание центра"), area("equipment", "Оборудование"),
    { name: "outpatientCategories", label: "Направления поликлиники", type: "relationship", relationTo: "service-categories", hasMany: true },
    { name: "stationaryCategories", label: "Направления стационара", type: "relationship", relationTo: "service-categories", hasMany: true },
    area("stationaryIntro", "Стационарное отделение"), area("stationaryCare", "Условия пребывания"), area("stationarySurgery", "Пластическая хирургия"), area("resultsIntro", "Текст о результатах")],
};
export const PageCopy: CollectionConfig = {
  slug: "page-copy", labels: { singular: "Текст страницы", plural: "Тексты страниц" }, admin: { useAsTitle: "title" }, access: contentAccess,
  fields: [slug, text("title", "Название страницы", true), area("intro", "Вступление"), area("note", "Дополнительный текст")],
};
