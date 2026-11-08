import Image from "next/image";

type CardProps = {
  mini_title: string;
  title: string;
  description: string;
  image: string;
  date: string;
};

export default function Card({ mini_title, title, description, image, date }: CardProps) {
  return (
    <article className="offer-card">
      <div className="offer-card-image">
        <Image src={image} alt={title} fill sizes="(max-width: 720px) calc(100vw - 72px), (max-width: 1300px) 45vw, 395px" />
      </div>
      <div className="offer-card-body">
        <div className="offer-card-top"><span>Акции / {mini_title}</span><Image src="/offers/card-arrow.svg" alt="" width={24} height={24} /></div>
        <div className="offer-card-copy"><h2>{title}</h2><p>{description}</p></div>
        <time dateTime="2025-04-07">{date}</time>
      </div>
    </article>
  );
}
