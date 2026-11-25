import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { ru } from "@payloadcms/translations/languages/ru";
import { buildConfig, type CollectionConfig } from "payload";
import sharp from "sharp";
import { faqItems } from "./app/data/faq.ts";
import { newsItems } from "./app/data/news.ts";
import { AboutPage, Documents, Files, HomePage, Offers, PageCopy, PriceSections, Projects, Results, Reviews, ServiceCategories, SiteSettings, Specialists, Treatments } from "./app/lib/cms-schema.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publishedOnly = ({ req }: { req: { user?: unknown } }) => req.user ? true : { _status: { equals: "published" as const } };
const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Администратор", plural: "Администраторы" },
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [],
};

const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Изображение", plural: "Медиатека" },
  admin: { useAsTitle: "alt" },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    staticDir: path.resolve(dirname, "storage/media"),
    mimeTypes: ["image/*"],
    adminThumbnail: "card",
    imageSizes: [
      { name: "card", width: 800, height: 600, fit: "cover", withoutEnlargement: true },
      { name: "article", width: 1600, height: 1200, fit: "inside", withoutEnlargement: true },
    ],
  },
  fields: [{ name: "alt", label: "Описание изображения", type: "text", required: true }, { name: "sourcePath", label: "Исходный путь при переносе", type: "text", admin: { readOnly: true } }],
};

const Faq: CollectionConfig = {
  slug: "faq",
  labels: { singular: "Вопрос и ответ", plural: "Вопросы и ответы" },
  admin: { useAsTitle: "question", defaultColumns: ["question", "sortOrder", "_status"] },
  versions: { drafts: true },
  access: { read: publishedOnly, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "question", label: "Вопрос", type: "text", required: true },
    { name: "answer", label: "Ответ", type: "textarea", required: true },
    { name: "sortOrder", label: "Порядок", type: "number", required: true, defaultValue: 100 },
    { name: "servicesLink", label: "Ссылка на услуги", type: "checkbox", defaultValue: false },
  ],
};

const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Новость", plural: "Новости" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "date", "_status"] },
  versions: { drafts: true },
  access: { read: publishedOnly, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "slug", label: "Адрес страницы", type: "text", required: true, unique: true, index: true },
    { name: "title", label: "Заголовок", type: "text", required: true },
    { name: "type", label: "Рубрика", type: "text", required: true },
    { name: "summary", label: "Краткое описание", type: "textarea", required: true },
    { name: "body", label: "Текст новости", type: "textarea", required: true },
    { name: "date", label: "Дата публикации", type: "date", required: true },
    { name: "image", label: "Изображение", type: "upload", relationTo: "media", required: true },
    { name: "serviceCategory", label: "Связанное направление", type: "relationship", relationTo: "service-categories" },
    { name: "project", label: "Связанный проект", type: "relationship", relationTo: "projects" },
  ],
};

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  editor: lexicalEditor(),
  sharp,
  i18n: { fallbackLanguage: "ru", supportedLanguages: { ru } },
  admin: { user: Users.slug, importMap: { baseDir: dirname }, meta: { titleSuffix: "— Арт-Медика" } },
  collections: [Users, Media, Files, Faq, News, ServiceCategories, Treatments, Specialists, Projects, Offers, Results, Reviews, PriceSections, Documents, PageCopy],
  globals: [SiteSettings, HomePage, AboutPage],
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  onInit: async (payload) => {
    if (process.env.SEED_DEMO_CONTENT !== "true") return;
    if ((await payload.count({ collection: "faq" })).totalDocs === 0) {
      for (const item of faqItems) {
        await payload.create({ collection: "faq", data: { ...item, servicesLink: item.sortOrder === 6, _status: "published" } });
      }
    }
    if ((await payload.count({ collection: "news" })).totalDocs === 0) {
      const uploaded = new Map<string, number>();
      for (const item of newsItems) {
        const [day, month, year] = item.date.split(".");
        let imageId = uploaded.get(item.image);
        if (!imageId) {
          const media = await payload.create({ collection: "media", data: { alt: item.title }, filePath: path.resolve(dirname, "public", item.image.slice(1)) });
          imageId = media.id;
          uploaded.set(item.image, imageId);
        }
        await payload.create({ collection: "news", data: { slug: item.slug, title: item.title, type: item.type, summary: item.summary, body: item.body, date: `${year}-${month}-${day}`, image: imageId, _status: "published" } });
      }
    }
  },
});
