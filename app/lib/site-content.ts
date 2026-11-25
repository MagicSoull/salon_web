import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

const payloadClient = () => getPayload({ config });
type Entity = Record<string, unknown>;
const record = (value: unknown): Entity => value && typeof value === "object" && !Array.isArray(value) ? value as Entity : {};
const str = (value: unknown) => typeof value === "string" ? value : "";
const id = (value: unknown) => typeof value === "object" && value !== null ? record(value).id : value;
export const mediaUrl = (value: unknown, size?: "card" | "article") => {
  const media = record(value);
  return str(size && record(record(media.sizes)[size]).url) || str(media.url) || "";
};
const date = (value: unknown) => str(value).slice(0, 10);
const sort = { sort: "sortOrder" as const, limit: 200, depth: 1, overrideAccess: false as const };

export type ContentTreatment = { id: number | string; slug: string; title: string; description: string; body: string; image: string };
export type ContentCategory = { id: number | string; slug: string; title: string; summary: string; image: string; mobileImage: string; treatments: ContentTreatment[] };
export const getServiceCategories = cache(async function getServiceCategories(): Promise<ContentCategory[]> {
  const payload = await payloadClient();
  const [categories, treatments] = await Promise.all([
    payload.find({ collection: "service-categories", ...sort }),
    payload.find({ collection: "treatments", ...sort }),
  ]);
  return categories.docs.map((item) => ({
    id: item.id, slug: str(item.slug), title: str(item.title), summary: str(item.summary),
    image: mediaUrl(item.image), mobileImage: mediaUrl(item.mobileImage),
    treatments: treatments.docs.filter((entry) => id(entry.category) === item.id).map((entry) => ({
      id: entry.id, slug: str(entry.slug), title: str(entry.title), description: str(entry.description), body: str(entry.body), image: mediaUrl(entry.image),
    })),
  }));
});
export async function getServiceCategory(slug: string) { return (await getServiceCategories()).find((item) => item.slug === slug); }

export type ContentSpecialist = { slug: string; name: string; role: string; category: string; image: string; service: string };
export async function getSpecialists(): Promise<ContentSpecialist[]> {
  const result = await (await payloadClient()).find({ collection: "specialists", ...sort });
  return result.docs.map((item) => ({ slug: str(item.slug), name: str(item.name), role: str(item.role), category: str(item.category), image: mediaUrl(item.image), service: str(record(item.serviceCategory).slug) }));
}
export async function getSpecialist(slug: string) { return (await getSpecialists()).find((item) => item.slug === slug); }

export type ContentProject = { slug: string; title: string; description: string; teaser: string; group: string; image: string; homeImage: string; date: string; relatedCategories: { slug: string; title: string }[] };
export async function getProjects(): Promise<ContentProject[]> {
  const result = await (await payloadClient()).find({ collection: "projects", ...sort });
  return result.docs.map((item) => ({ slug: str(item.slug), title: str(item.title), description: str(item.description), teaser: str(item.teaser), group: str(item.group), image: mediaUrl(item.image), homeImage: mediaUrl(item.homeImage) || mediaUrl(item.image), date: date(item.date), relatedCategories: (item.relatedCategories || []).map((value) => ({ slug: str(record(value).slug), title: str(record(value).title) })).filter((value) => value.slug) }));
}
export async function getProject(slug: string) { return (await getProjects()).find((item) => item.slug === slug); }

export type ContentOffer = { id: number | string; slug: string; mini_title: string; title: string; description: string; image: string; date: string; treatmentHref?: string; treatmentTitle?: string };
export async function getOffers(): Promise<ContentOffer[]> {
  const result = await (await payloadClient()).find({ collection: "offers", ...sort, depth: 2 });
  return result.docs.map((item) => {
    const treatment = record(item.treatment);
    const category = record(treatment.category);
    const treatmentHref = str(category.slug) && str(treatment.slug) ? `/services/${str(category.slug)}/${str(treatment.slug)}` : undefined;
    return { id: item.id, slug: str(item.slug), mini_title: str(item.shortTitle), title: str(item.title), description: str(item.description), image: mediaUrl(item.image), date: date(item.date), treatmentHref, treatmentTitle: str(treatment.title) };
  });
}
export async function getOffer(slug: string) { return (await getOffers()).find((item) => item.slug === slug); }

export type ContentResult = { title: string; category: string; image: string; alt: string; treatment?: string };
export async function getResults(place: "home" | "about"): Promise<ContentResult[]> {
  const result = await (await payloadClient()).find({ collection: "results", ...sort, where: { [place === "home" ? "showOnHome" : "showOnAbout"]: { equals: true } } });
  return result.docs.map((item) => ({ title: str(item.title), category: str(item.category), image: mediaUrl(item.image), alt: str(item.alt), treatment: str(record(item.treatment).slug) }));
}
export type ContentReview = { name: string; story: string; liked: string; date: string; rating: number };
export async function getReviews(): Promise<ContentReview[]> {
  const result = await (await payloadClient()).find({ collection: "reviews", ...sort });
  return result.docs.map((item) => ({ name: str(item.name), story: str(item.story), liked: str(item.liked), date: date(item.date), rating: Number(item.rating) || 5 }));
}

export const getSiteSettings = cache(async () => await (await payloadClient()).findGlobal({ slug: "site-settings", depth: 1, overrideAccess: false }));
export const getHomePage = cache(async () => await (await payloadClient()).findGlobal({ slug: "home-page", depth: 1, overrideAccess: false }));
export const getAboutPage = cache(async () => await (await payloadClient()).findGlobal({ slug: "about-page", depth: 1, overrideAccess: false }));
export async function getPageCopy(slug: string) {
  const result = await (await payloadClient()).find({ collection: "page-copy", where: { slug: { equals: slug } }, limit: 1, overrideAccess: false });
  return result.docs[0];
}
export async function getPriceSections() { return (await (await payloadClient()).find({ collection: "price-sections", ...sort })).docs; }
export async function getDocuments(category?: string) {
  return (await (await payloadClient()).find({ collection: "documents", ...sort, where: category ? { category: { equals: category } } : undefined })).docs;
}
export { record, str };
