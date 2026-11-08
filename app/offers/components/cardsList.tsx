"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { allCards } from "./cards";
import Card from "./card";

const cardsPerPage = 4;
const totalPages = Math.ceil(allCards.length / cardsPerPage);

function pageNumbers(currentPage: number): (number | "ellipsis")[] {
  if (totalPages <= 3) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (currentPage <= 2) return [1, 2, 3, "ellipsis", totalPages];
  if (currentPage >= totalPages - 1) return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}

export default function CardsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isInteger(requestedPage) && requestedPage >= 1 ? Math.min(requestedPage, totalPages) : 1;

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    router.push(nextPage === 1 ? "/offers" : `/offers?page=${nextPage}`, { scroll: false });
  }

  const visibleCards = allCards.slice((page - 1) * cardsPerPage, page * cardsPerPage);
  return (
    <section aria-label="Список акций">
      <div className="offers-grid">{visibleCards.map((card) => <Card key={card.id} {...card} />)}</div>
      <nav className="offers-pagination" aria-label="Страницы акций">
        <button type="button" className="offers-pagination-arrow offers-pagination-prev" aria-label="Предыдущая страница" onClick={() => changePage(page - 1)} disabled={page === 1}><Image src="/offers/nav-arrow.svg" alt="" width={36} height={36} /></button>
        <div className="offers-page-numbers">
          {pageNumbers(page).map((number, index) => number === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="offers-pagination-ellipsis">…</span>
          ) : (
            <button key={number} type="button" onClick={() => changePage(number)} aria-label={`Страница ${number}`} aria-current={page === number ? "page" : undefined} className={page === number ? "is-active" : undefined}>{number}</button>
          ))}
        </div>
        <button type="button" className="offers-pagination-arrow offers-pagination-next" aria-label="Следующая страница" onClick={() => changePage(page + 1)} disabled={page === totalPages}><Image src="/offers/nav-arrow.svg" alt="" width={36} height={36} /></button>
      </nav>
    </section>
  );
}
