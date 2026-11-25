import Image from "next/image";
import { getHomePage, mediaUrl } from "../lib/site-content";

export default function SurgeryHighlight({ content }: { content: Awaited<ReturnType<typeof getHomePage>> }) {
  const facts = content.facts ?? [];
  return (
    <section className="surgery-highlight" aria-labelledby="surgery-heading">
      <div className="surgery-highlight-inner">
        <h2 id="surgery-heading">
          {content.surgeryTitle?.split("\n").map((line, index) => <span key={index}>{line}</span>)}
        </h2>

        <div className="surgery-highlight-grid">
          <div className="surgery-photo">
            <Image
              src={mediaUrl(content.surgeryImage)}
              alt="Операционная клиники Арт-Медика"
              fill
              sizes="(max-width: 720px) 100vw, 42vw"
            />
          </div>

          <div className="surgery-content">
            <div className="surgery-description">
              <p>{content.surgeryDescription}</p>
              <p>{content.equipmentDescription}</p>
            </div>

            <div className="surgery-facts" aria-label="Показатели клиники">
              {facts.map((fact) => (
                <article className="surgery-fact" key={fact.value}>
                  <strong>{fact.value}</strong>
                  <p>{fact.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
