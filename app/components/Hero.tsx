import Image from "next/image";
import { getHomePage, mediaUrl } from "../lib/site-content";
import ClinicPhoneLink from "./ClinicPhoneLink";

export default function Hero({ content }: { content: Awaited<ReturnType<typeof getHomePage>> }) {
  const statistics = content.statistics ?? [];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src={mediaUrl(content.heroImage)}
        alt="Врач консультирует пациентку"
        fill
        priority
        sizes="100vw"
      />

      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-copy">
          <h1 id="hero-title">{content.heroTitle}</h1>
          <p>{content.heroDescription}</p>
        </div>

        <div className="hero-statistics" aria-label="Преимущества центра">
          {statistics.map(({ value, label }) => (
            <article className="stat-card" key={value + label}>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </div>

      <ClinicPhoneLink className="hero-call" label="Позвонить в клинику">
        <Image src="/icon-phone.svg" alt="" width={36} height={36} aria-hidden="true" />
      </ClinicPhoneLink>
    </section>
  );
}
