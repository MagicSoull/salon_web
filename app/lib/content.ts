import config from "@payload-config";
import { getPayload } from "payload";

export async function getFaqContent() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "faq",
    where: { _status: { equals: "published" } },
    sort: "sortOrder",
    limit: 100,
    overrideAccess: false,
  });
  return result.docs;
}

export async function getNewsContent() {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "news",
    where: { _status: { equals: "published" } },
    sort: "-date",
    limit: 100,
    overrideAccess: false,
  });
  return result.docs;
}

export async function getNewsArticle(slug: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "news",
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    limit: 1,
    overrideAccess: false,
  });
  return result.docs[0] ?? null;
}

export function formatNewsDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-");
  return `${day}.${month}.${year}`;
}

export function newsImageUrl(image: unknown, size: "card" | "article") {
  if (image && typeof image === "object") {
    const media = image as { url?: string | null; sizes?: Record<string, { url?: string | null }> };
    return media.sizes?.[size]?.url || media.url || "/news/desktop-image35.png";
  }
  return "/news/desktop-image35.png";
}
