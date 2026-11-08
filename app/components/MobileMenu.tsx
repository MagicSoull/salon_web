"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const serviceItems = ["Пластическая хирургия", "Косметология", "Топ-продукты", "Дерматология"];
const menuItems = [
  { label: "О клинике", href: "/#about" },
  { label: "Специалисты", href: "/#specialists" },
  { label: "Услуги", href: "/#services" },
  { label: "Проекты", href: "/#projects" },
  { label: "Акции", href: "/offers" },
  { label: "Новости" },
  { label: "Цены" },
  { label: "Контакты", href: "/contacts" },
  { label: "Документы" },
  { label: "Вопросы и ответы" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button ref={triggerRef} className="mobile-menu-trigger" type="button" aria-label="Открыть меню" aria-expanded={open} aria-controls="mobile-menu-panel" onClick={() => setOpen(true)}>
        <Image src="/offers/menu.svg" alt="" width={32} height={32} />
      </button>
      {open && (
        <>
          <button className="mobile-menu-backdrop" type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)} />
          <div className="mobile-menu-panel" id="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Меню сайта">
            <div className="mobile-menu-panel-head">
              <Link href="/" onClick={() => setOpen(false)} aria-label="Арт-Медика — на главную"><Image src="/logo.svg" alt="Арт-Медика" width={152} height={36} /></Link>
              <button ref={closeRef} type="button" aria-label="Закрыть меню" onClick={() => setOpen(false)}><Image src="/nav/close.svg" alt="" width={32} height={32} /></button>
            </div>
            <nav className="mobile-menu-links" aria-label="Мобильная навигация">
              <button className="mobile-menu-services" type="button" aria-expanded={servicesOpen} onClick={() => setServicesOpen((value) => !value)}>Услуги <Image src="/nav/arrow-down.svg" alt="" width={24} height={24} /></button>
              {servicesOpen && <div className="mobile-menu-submenu">{serviceItems.map((item) => <Link key={item} href="/#services" onClick={() => setOpen(false)}>{item}</Link>)}</div>}
              {menuItems.map(({ label, href }) => href ? <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link> : <span key={label}>{label}</span>)}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
