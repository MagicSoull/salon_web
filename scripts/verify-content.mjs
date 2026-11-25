import { getPayload } from 'payload'
import config from '../payload.config.ts'

const payload = await getPayload({ config })
const base = 'http://127.0.0.1:3000'
const marker = 'CMS_CONTENT_CHECK'

async function page(path) {
  const response = await fetch(base + path)
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`)
  return response.text()
}
async function verify(collection, query, field, paths) {
  const item = (await payload.find({ collection, where: query, limit: 1 })).docs[0]
  if (!item) throw new Error(`${collection}: missing seed record`)
  const original = item[field]
  try {
    await payload.update({ collection, id: item.id, data: { [field]: `${original} ${marker}` } })
    for (const path of paths) if (!(await page(path)).includes(marker)) throw new Error(`${collection}: edit missing on ${path}`)
    process.stdout.write(`${collection}: edit appeared on ${paths.join(', ')}\n`)
  } finally {
    await payload.update({ collection, id: item.id, data: { [field]: original } })
  }
  for (const path of paths) if ((await page(path)).includes(marker)) throw new Error(`${collection}: edit remained on ${path}`)
}

await verify('service-categories', { slug: { equals: 'cosmetology' } }, 'title', ['/', '/services', '/services/cosmetology', '/about'])
await verify('projects', { slug: { equals: 'beauty-in-you' } }, 'title', ['/', '/projects', '/projects/beauty-in-you'])
process.stdout.write('Content restored\n')
process.exit(0)
