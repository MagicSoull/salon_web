import { getPayload } from 'payload'
import config from '../payload.config.ts'

const payload = await getPayload({ config })
const item = (await payload.find({ collection: 'faq', sort: 'sortOrder', limit: 1 })).docs[0]
if (!item) throw new Error('FAQ seed was not created')

const original = item.answer
const marker = 'PAYLOAD_PILOT_CHECK'

try {
  await payload.update({ collection: 'faq', id: item.id, data: { answer: `${original} ${marker}` }, draft: false })
  const response = await fetch('http://localhost:3000/faq')
  const html = await response.text()
  if (!response.ok || !html.includes(marker)) throw new Error('Published FAQ edit did not appear on the public page')
  process.stdout.write('Payload edit appeared on /faq\n')
} finally {
  await payload.update({ collection: 'faq', id: item.id, data: { answer: original }, draft: false })
}

const restored = await fetch('http://localhost:3000/faq').then((response) => response.text())
if (restored.includes(marker)) throw new Error('FAQ test edit was not removed from the public page')
process.stdout.write('FAQ content restored\n')

const article = (await payload.find({ collection: 'news', where: { slug: { equals: 'reviews' } }, limit: 1 })).docs[0]
if (!article) throw new Error('News seed was not created')
const originalTitle = article.title

try {
  await payload.update({ collection: 'news', id: article.id, data: { title: `${originalTitle} ${marker}` }, draft: false })
  const listing = await fetch('http://localhost:3000/news').then((response) => response.text())
  const detail = await fetch('http://localhost:3000/news/reviews').then((response) => response.text())
  if (!listing.includes(marker) || !detail.includes(marker)) throw new Error('Published news edit did not appear on both pages')
  process.stdout.write('Payload edit appeared on /news and /news/reviews\n')
} finally {
  await payload.update({ collection: 'news', id: article.id, data: { title: originalTitle }, draft: false })
}

const restoredNews = await fetch('http://localhost:3000/news/reviews').then((response) => response.text())
if (restoredNews.includes(marker)) throw new Error('News test edit was not removed from the public page')
process.stdout.write('News content restored\n')
process.exit(0)
