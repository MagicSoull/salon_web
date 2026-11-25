import path from 'node:path'
import { existsSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { serviceCategories } from '../app/data/services.ts'
import { specialists } from '../app/data/specialists.ts'
import { projects } from '../app/data/projects.ts'
import { cards as offers } from '../app/(frontend)/offers/components/cards.ts'
import { consultations, operations, sections } from '../app/data/prices.ts'

const payload = await getPayload({ config })
const root = process.cwd()
const ids = { categories: new Map(), treatments: new Map(), specialists: new Map() }

async function existing(collection, field, value) {
  return (await payload.find({ collection, where: { [field]: { equals: value } }, limit: 1, depth: 0 })).docs[0]
}

async function createOnce(collection, field, value, data) {
  return await existing(collection, field, value) ?? await payload.create({ collection, data })
}

async function media(sourcePath, alt) {
  if (!sourcePath) return undefined
  const found = await existing('media', 'sourcePath', sourcePath)
  if (found) return found.id
  const filePath = path.resolve(root, 'public', sourcePath.replace(/^\//, ''))
  if (!existsSync(filePath)) throw new Error(`Missing source image: ${sourcePath}`)
  const record = await payload.create({ collection: 'media', data: { alt, sourcePath }, filePath })
  return record.id
}

for (const [index, item] of serviceCategories.entries()) {
  const mobile = {
    'top-products': 'mobile-6.png', otorhinolaryngology: 'mobile-1.png', 'ent-surgery': 'mobile-2.png',
    'aesthetic-gynecology': 'mobile-4.png', dermatology: 'mobile-5.png', massage: 'mobile-3.png',
    'plastic-surgery': 'mobile-7.png', neurology: 'mobile-8.png', therapy: 'mobile-9.png',
  }[item.slug]
  const record = await createOnce('service-categories', 'slug', item.slug, {
    slug: item.slug, title: item.title, summary: item.summary, image: await media(item.image, item.title),
    mobileImage: mobile ? await media(`/services/${mobile}`, item.title) : undefined, sortOrder: index,
  })
  ids.categories.set(item.slug, record.id)
}

for (const category of serviceCategories) {
  for (const [index, item] of category.treatments.entries()) {
    const key = `${category.slug}/${item.slug}`
    const found = (await payload.find({ collection: 'treatments', where: { and: [
      { category: { equals: ids.categories.get(category.slug) } }, { slug: { equals: item.slug } },
    ] }, limit: 1, depth: 0 })).docs[0]
    const record = found ?? await payload.create({ collection: 'treatments', data: {
      category: ids.categories.get(category.slug), slug: item.slug, title: item.title, description: item.description,
      image: item.image ? await media(item.image, item.title) : undefined, sortOrder: index,
    } })
    ids.treatments.set(key, record.id)
  }
}

for (const [index, item] of specialists.entries()) {
  const record = await createOnce('specialists', 'slug', item.slug, {
    slug: item.slug, name: item.name, role: item.role, category: item.category,
    image: await media(item.image, item.name), serviceCategory: ids.categories.get(item.service), sortOrder: index,
  })
  ids.specialists.set(item.slug, record.id)
}

const projectHome = [
  { image: '/project-gloves.png', group: 'Красота в тебе', teaser: 'Проект для жителей Челябинской области, которые хотят преобразиться, доверив свое преображение лучшим специалистам в своей сфере. Проект имеет международный статус.' },
  { image: '/project-procedure.png', group: 'Косметология' },
  { image: '/project-procedure.png', group: 'Косметология' },
  { image: '/project-gloves.png', group: 'Проекты', teaser: 'Практические знания для пациентов клиники.' },
]
for (const [index, item] of projects.entries()) {
  const project = await createOnce('projects', 'slug', item.slug, {
    ...item, image: await media(item.image, item.title), homeImage: await media(projectHome[index].image, item.title),
    group: projectHome[index].group, teaser: projectHome[index].teaser, date: '2025-04-07', sortOrder: index,
  })
  if (!project.relatedCategories?.length && item.slug !== 'health-school') await payload.update({ collection: 'projects', id: project.id, data: { relatedCategories: [ids.categories.get('plastic-surgery')] } })
}

for (const [index, item] of offers.entries()) {
  const offer = await createOnce('offers', 'slug', item.slug, {
    slug: item.slug, shortTitle: item.mini_title, title: item.title, description: item.description,
    image: await media(item.image, item.title), date: item.date.split('.').reverse().join('-'), sortOrder: index,
  })
  if (!offer.treatment) await payload.update({ collection: 'offers', id: offer.id, data: { treatment: ids.treatments.get(item.slug === 'petal-lifting' ? 'plastic-surgery/face' : 'cosmetology/facial-care') } })
}

for (const [slug, relation] of [['refresh', { serviceCategory: ids.categories.get('plastic-surgery') }], ['reviews', { serviceCategory: ids.categories.get('cosmetology') }], ['beauty-finale', { project: (await existing('projects', 'slug', 'beauty-in-you')).id }]]) {
  const news = await existing('news', 'slug', slug)
  if (news && !news.project && !news.serviceCategory) await payload.update({ collection: 'news', id: news.id, data: relation, draft: false })
}

const results = [
  { image: '/about/desktop-rinoplastika1420x0is1.png', title: 'Ринопластика', category: 'Ринопластика', alt: 'Результат ринопластики до и после', treatment: 'plastic-surgery/face', about: true },
  { image: '/about/desktop-whatsapp-image20250204at1418250x3001.png', title: 'Ринопластика', category: 'Ринопластика', alt: 'Результат операции до и после', treatment: 'plastic-surgery/face', about: true },
  { image: '/about/desktop-whatsapp-image20250204at14182520x3001.png', title: 'Маммопластика', category: 'Маммопластика', alt: 'Результат маммопластики до и после', treatment: 'plastic-surgery/breast', about: true },
  { image: '/result-rhinoplasty-before-after.png', title: 'Ринопластика', category: 'Ринопластика', alt: 'До и после процедуры', treatment: 'plastic-surgery/face', home: true },
  { image: '/result-face-before-after.png', title: 'Блефаропластика', category: 'Блефаропластика', alt: 'До и после процедуры', treatment: 'plastic-surgery/face', home: true },
  { image: '/result-body-before-after.png', title: 'Липосакция', category: 'Липосакция', alt: 'До и после процедуры', treatment: 'plastic-surgery/body', home: true },
  { image: '/result-face-before-after.png', title: 'Фейслифтинг', category: 'Фейслифтинг', alt: 'До и после процедуры', treatment: 'plastic-surgery/face', home: true },
]
for (const [index, item] of results.entries()) {
  if (await existing('results', 'sortOrder', index)) continue
  await payload.create({ collection: 'results', data: {
    title: item.title, category: item.category, alt: item.alt, image: await media(item.image, item.alt),
    treatment: ids.treatments.get(item.treatment), showOnHome: Boolean(item.home), showOnAbout: Boolean(item.about), sortOrder: index,
  } })
}

const reviews = [
  ['Ольга', 'К неврологу Фахрисламовой Э.Р. обращалась в первый раз. Узнала об этом специалисте на портале ПроДокторов и при выборе ориентировалась на рейтинг.', 'Мне полностью понравилось, как прошёл приём у Эльвиры Рифатовны. Специалист внимательно выслушала, выполнила осмотр и дала понятные рекомендации.'],
  ['Ольга', 'К Новиковой Татьяне Васильевне я обратилась на прием в первый раз. При выборе ориентировалась на опыт работы врача и отзывы пациентов.', 'Мне понравилось, что врач подробно рассказала о моей проблеме и правильно подобрала терапию. Приём проходил в спокойной и комфортной обстановке.'],
  ['Ольга', 'На консультации получила ответы на все вопросы и ясный план дальнейшего лечения.', 'Очень внимательный и деликатный врач, всё объясняет доступным языком.'],
  ['Ольга', 'Выбрала клинику по рекомендации близких и осталась довольна приёмом.', 'Современное оборудование, тактичное отношение и высокий уровень заботы.'],
]
for (const [index, [name, story, liked]] of reviews.entries()) {
  if (await existing('reviews', 'sortOrder', index)) continue
  await payload.create({ collection: 'reviews', data: { name, story, liked, date: '2025-04-07', rating: 5, sortOrder: index } })
}

const settings = await payload.findGlobal({ slug: 'site-settings' })
if (!settings.phone) await payload.updateGlobal({ slug: 'site-settings', data: {
  name: 'Арт-Медика', address: 'Челябинск, пр. Ленина 12а', fullAddress: '454007, Челябинская область, г. Челябинск, проспект Ленина 12 «А» (рядом Театр ЧТЗ)',
  phone: '+7 (351) 775-19-18', hotline: '+7 (351) 775-19-88', messengerPhone: '+7 (912) 326-34-60',
  email: 'marketing.art-medica@mail.ru', analysisEmail: 'sender@artmdc.ru', hours: 'ПН–СБ с 9:00 до 20:00',
  telegramUrl: 'https://t.me/Artmedica_bot', mapUrl: 'https://2gis.ru/chelyabinsk/search/проспект%20Ленина%2012А',
  longitude: 61.448916, latitude: 55.160948,
} })

const home = await payload.findGlobal({ slug: 'home-page' })
if (!home.heroTitle) await payload.updateGlobal({ slug: 'home-page', data: {
  heroTitle: 'Ваше здоровье — наша забота', heroDescription: 'Медико-косметологический центр с современным оборудованием и опытными специалистами',
  heroImage: await media('/hero-consultation.png', 'Врач консультирует пациентку'),
  statistics: [{ value: '20', label: 'лет опыта работы\nв сфере медицины' }, { value: '20', label: 'видов медицинских\nнаправлений деятельности' }, { value: '40+', label: 'квалифицированных\nспециалистов' }],
  servicesIntro: 'В клинике «Арт-медика» мы объединили многолетний опыт врачей и современные технологии, чтобы предложить вам максимально широкий спектр медицинских и эстетических услуг.',
  surgeryTitle: 'Превращаем заветные мечты пациентов\nв реальность, невзирая на сложность задачи',
  surgeryDescription: 'Центр «Арт-Медика» — партнер ЮУГМУ, клиническая база «Межрегионального центра непрерывного медицинского и фармацевтического образования» (г. Москва). Наша клиника является участником международных проектов в направлении «Пластическая хирургия и косметология».',
  equipmentDescription: 'Качество результата обеспечивают инновационное высокотехнологичное хирургическое, эндоскопическое и лазерное оборудование.',
  surgeryImage: await media('/surgery-room.jpg', 'Операционная клиники Арт-Медика'),
  facts: [{ value: '10+', label: 'обучений в год\nпроходят специалисты\nцентра' }, { value: '20', label: 'проектов уже было\nреализовано в нашей\nклинике' }, { value: '90%', label: 'положительных\nотзывов' }],
  resultsIntro: 'Мы гордимся результатами, которых достигаем вместе с нашими пациентами благодаря современным методикам и золотым рукам хирургов. Убедитесь сами, как тонко и естественно мы умеем работать с красотой.',
  specialistsIntro: 'Наши специалисты — это команда профессионалов с многолетним опытом в пластической хирургии и косметологии. Они постоянно повышают своё мастерство, чтобы дарить вам гармонию, уверенность в себе и в своём теле.',
  projectsIntro: 'Подбираем для вас самые актуальные и интересные проекты из нашей практики, медицины и эстетической хирургии, с заботой о вас.',
  workIntro: 'Наша работа начинается с глубокой диагностики и детального планирования, а современное оборудование и сертифицированные материалы гарантируют безопасность на каждом этапе.',
  workImage: await media('/work-rhinoplasty.png', 'Подготовка пациентки к ринопластике'),
  reviewsIntro: 'Высокий уровень доверия и качества медицинской помощи подтверждает рейтинг нашей клиники — 4.5 на основе 118 отзывов о врачах на сайте «ПроДокторов».',
} })

const about = await payload.findGlobal({ slug: 'about-page' })
if (!about.intro) await payload.updateGlobal({ slug: 'about-page', data: {
  intro: 'Превращаем заветные мечты пациентов в реальность, невзирая на сложность задачи',
  roomImage: await media('/about/desktop-image34.png', 'Оборудованный кабинет клиники Арт-Медика'),
  overview: 'Центр «Арт-Медика» — партнер ЮУГМУ, клиническая база «Межрегионального центра непрерывного медицинского и фармацевтического образования» (г. Москва). Наша клиника является участником международных проектов в направлении «Пластическая хирургия и косметология».',
  equipment: 'Качество результата обеспечивает инновационное высокотехнологичное хирургическое, эндоскопическое и лазерное оборудование.',
  outpatientCategories: ['otorhinolaryngology', 'cosmetology', 'dermatology', 'venereology', 'aesthetic-gynecology', 'neurology', 'diagnostics', 'therapy'].map((key) => ids.categories.get(key)),
  stationaryCategories: ['ent-surgery', 'plastic-surgery'].map((key) => ids.categories.get(key)),
  stationaryIntro: 'На территории отделения мы ежедневно оказываем помощь даже самым маленьким пациентам, выполняя полный спектр операций по направлению «Лор-хирургия», одним из самых востребованных остается аденотомия и септопластика (исправление носовой перегородки).',
  stationaryCare: 'В стационарном отделении к вашим услугам палата европейского уровня с 3-х разовым питанием. Медицинская сестра будет сопровождать Вас 24 часа в сутки для создания самых комфортных условий.',
  stationarySurgery: 'Также в стационарном отделении мы оказываем полный спектр операций по направлению «Пластическая хирургия», особое место занимает проект «Доступная пластическая хирургия из Милана».',
  resultsIntro: 'Мы гордимся результатами, которых достигаем вместе с нашими пациентами благодаря современным методикам и золотым рукам хирургов. Убедитесь сами, как тонко и естественно мы умеем работать с красотой.',
} })

const copy = [
  ['services', 'Услуги', 'В клинике «Арт-медика» мы объединили многолетний опыт врачей и современные технологии, чтобы предложить вам максимально широкий спектр медицинских и эстетических услуг.'],
  ['specialists', 'Наши специалисты', 'Команда специалистов клиники «Арт-Медика»'],
  ['projects', 'Проекты', 'Наши проекты — проекты, представленные в клинике, доступные для всех желающих стать красивыми и здоровыми'],
  ['offers', 'Акции', 'Мы регулярно предлагаем выгодные акции и специальные предложения на популярные услуги, чтобы вы могли получать качественную медицинскую помощь по привлекательной стоимости'],
  ['news', 'Новости', 'Новости и события клиники «Арт-Медика»'],
  ['contacts', 'Контакты', 'Пишите нам, когда вам удобно — даже в выходные или ночью. Ваш запрос будет обработан в ближайшее рабочее время'],
  ['documents', 'Документы', ''], ['certificates', 'Сертификаты', 'Документы и сертификаты клиники'],
  ['prices', 'Цены на услуги', ''], ['faq', 'Вопросы и ответы', 'Прозрачность медицинской помощи начинается с понятных ответов на сложные вопросы. Мы собрали самые частые обращения пациентов и разъяснения наших врачей'],
  ['service-detail', 'Страница услуги', 'На очной консультации специалист уточнит ваш запрос, расскажет о подходящих вариантах и ответит на вопросы о подготовке и восстановлении.'],
  ['specialist-detail', 'Страница специалиста', 'Уточнить расписание и записаться на консультацию можно по телефону клиники.'],
  ['project-detail', 'Страница проекта', 'Подробности участия и актуальные условия можно уточнить у администратора клиники.'],
  ['offer-detail', 'Страница акции', 'Актуальные условия и возможность участия уточняйте у администратора клиники.'],
  ['prices-empty', 'Прайс без цены', 'Подробную стоимость услуг уточняйте у администратора.'],
  ['documents-empty', 'Документы без файлов', 'Файлы документов будут размещены после получения от клиники.'],
  ['certificates-empty', 'Сертификаты без файлов', 'Сканы сертификатов появятся после получения файлов от клиники.'],
]
for (const [slug, title, intro] of copy) {
  const item = await createOnce('page-copy', 'slug', slug, { slug, title, intro })
  if (!item.intro && intro) await payload.update({ collection: 'page-copy', id: item.id, data: { intro } })
}

for (const [index, section] of sections.entries()) {
  if (await existing('price-sections', 'sortOrder', index)) continue
  const groups = section.items.map((title, groupIndex) => ({
    title, minPrice: 'от 3 500 ₽',
    note: index === 0 && groupIndex === 0 ? '*Категория определяется врачом на консультации в зависимости от сложности операции.' : '',
    rows: index === 0 && groupIndex === 0 ? [
      ...consultations.map((item) => ({ code: item.code, mis: item.mis, name: item.name, duration: item.time, price1: item.prices[0], priceMode: 'single' })),
      ...operations.map((item) => ({ code: item.code, mis: item.mis, name: item.name, duration: item.time, price1: item.prices[0], price2: item.prices[1], price3: item.prices[2], priceMode: 'tiered' })),
    ] : [],
  }))
  const categorySlug = ['plastic-surgery', 'dermatology', 'ent-surgery', 'aesthetic-gynecology'][index]
  await payload.create({ collection: 'price-sections', data: { title: section.heading, category: ids.categories.get(categorySlug), sortOrder: index, groups } })
}

const counts = {}
for (const collection of ['service-categories', 'treatments', 'specialists', 'projects', 'offers', 'results', 'reviews', 'media', 'page-copy']) counts[collection] = (await payload.count({ collection })).totalDocs
process.stdout.write(`${JSON.stringify(counts)}\n`)
process.exit(0)
