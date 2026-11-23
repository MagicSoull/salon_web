export type Treatment = { slug: string; title: string; description: string; image?: string };
export type ServiceCategory = { slug: string; title: string; summary: string; image: string; treatments: Treatment[] };

export const serviceCategories: ServiceCategory[] = [
  { slug: "plastic-surgery", title: "Пластическая хирургия", summary: "Операции и консультации по эстетической хирургии. План лечения и объём вмешательства обсуждаются с хирургом индивидуально.", image: "/services/desktop-7.png", treatments: [
    { slug: "face", title: "Пластика лица", description: "Консультации и операции по эстетической коррекции лица.", image: "/service-detail/face.png" },
    { slug: "breast", title: "Пластика груди", description: "Маммопластика и другие варианты коррекции груди.", image: "/service-detail/breast.png" },
    { slug: "body", title: "Пластика тела", description: "Консультации по коррекции контуров тела.", image: "/service-detail/body.png" },
    { slug: "men", title: "Интимная пластика для мужчин", description: "Индивидуальная консультация по направлению.", image: "/service-detail/men.png" },
    { slug: "combined", title: "Комбо-операции", description: "Возможность сочетания операций обсуждается на приёме.", image: "/service-detail/combined.png" },
    { slug: "preparation", title: "Подготовка к операции", description: "Обследование, планирование и рекомендации перед вмешательством.", image: "/service-detail/preparation.png" },
  ] },
  { slug: "cosmetology", title: "Косметология", summary: "Консультации и уходовые процедуры для лица и тела.", image: "/services/desktop-0.png", treatments: [
    { slug: "consultation", title: "Консультация косметолога", description: "Знакомство с запросом пациента и подбор программы ухода." },
    { slug: "facial-care", title: "Уход за лицом", description: "Косметологические программы ухода с индивидуальным подбором." },
    { slug: "laser", title: "Лазерные процедуры", description: "Процедуры с использованием оборудования клиники после консультации." },
  ] },
  { slug: "top-products", title: "Топ-продукты", summary: "Средства для домашнего ухода, представленные в клинике.", image: "/services/desktop-1.png", treatments: [
    { slug: "home-care", title: "Домашний уход", description: "Подбор средств для ежедневного ухода вместе со специалистом." },
  ] },
  { slug: "dermatology", title: "Дерматология", summary: "Консультации по вопросам здоровья кожи.", image: "/services/desktop-5.png", treatments: [
    { slug: "consultation", title: "Консультация дерматолога", description: "Осмотр и рекомендации по дальнейшему обследованию или уходу." },
    { slug: "skin-diagnostics", title: "Диагностика кожи", description: "Обследование кожи по назначению специалиста." },
  ] },
  { slug: "venereology", title: "Венерология", summary: "Консультации дерматовенеролога и индивидуальный план обследования.", image: "/services/desktop-5.png", treatments: [
    { slug: "consultation", title: "Консультация дерматовенеролога", description: "Конфиденциальный приём и рекомендации по обследованию." },
  ] },
  { slug: "otorhinolaryngology", title: "Оториноларингология", summary: "Диагностика и консультации по вопросам здоровья уха, горла и носа.", image: "/services/desktop-2.png", treatments: [
    { slug: "consultation", title: "Консультация оториноларинголога", description: "Осмотр и определение дальнейшего плана обследования." },
    { slug: "diagnostics", title: "ЛОР-диагностика", description: "Обследование по направлению врача." },
  ] },
  { slug: "ent-surgery", title: "Лор-хирургия", summary: "Хирургическое направление стационарного отделения.", image: "/services/desktop-3.png", treatments: [
    { slug: "adenoidectomy", title: "Аденотомия", description: "Информация о возможности операции на консультации ЛОР-хирурга." },
    { slug: "septoplasty", title: "Септопластика", description: "Консультация по коррекции носовой перегородки." },
  ] },
  { slug: "aesthetic-gynecology", title: "Эстетическая гинекология", summary: "Деликатные консультации и процедуры по индивидуальному плану.", image: "/services/desktop-4.png", treatments: [
    { slug: "consultation", title: "Консультация гинеколога", description: "Приём специалиста и обсуждение возможных процедур." },
    { slug: "laser", title: "Лазерные процедуры", description: "Информация о процедурах после очной консультации." },
  ] },
  { slug: "neurology", title: "Неврология и рефлексотерапия", summary: "Консультации невролога и рефлексотерапевтическое направление.", image: "/services/desktop-8.png", treatments: [
    { slug: "consultation", title: "Консультация невролога", description: "Осмотр и рекомендации специалиста." },
    { slug: "reflexology", title: "Рефлексотерапия", description: "Возможность применения методики обсуждается с врачом." },
  ] },
  { slug: "diagnostics", title: "Диагностика", summary: "Обследования и подготовка к приёму или операции.", image: "/services/desktop-2.png", treatments: [
    { slug: "preoperative", title: "Обследование перед операцией", description: "Состав обследования определяет лечащий врач." },
  ] },
  { slug: "therapy", title: "Терапевтические услуги", summary: "Приём терапевта и оценка общего состояния здоровья.", image: "/services/desktop-9.png", treatments: [
    { slug: "consultation", title: "Терапевтический приём", description: "Первичная консультация и рекомендации по дальнейшим действиям." },
  ] },
  { slug: "massage", title: "Массаж", summary: "Программы массажа и восстановительного ухода.", image: "/services/desktop-6.png", treatments: [
    { slug: "consultation", title: "Консультация по массажу", description: "Выбор программы с учётом запроса пациента." },
  ] },
];

export const getServiceCategory = (slug: string) => serviceCategories.find((item) => item.slug === slug);
