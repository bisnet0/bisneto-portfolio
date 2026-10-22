/**
 * Post-build step for GitHub Pages:
 * - writes dist/404.html so unknown paths boot the SPA,
 * - writes real `/<route>/index.html` entries so /frontend and /backend answer 200
 *   (instead of 404) and ship their own title/description for crawlers and previews.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const SITE = 'https://www.henriquebisneto.com.br'
const dist = resolve('dist')
const shell = await readFile(resolve(dist, 'index.html'), 'utf8')

const routes = [
  {
    dir: 'frontend',
    title: 'Frontend · Henrique Bisneto | Engenheiro de Software',
    ogTitle: 'Henrique Bisneto — Frontend',
    description:
      'Interfaces, motion e design systems: produtos digitais com componentes acessíveis, animação com propósito e performance medida.',
  },
  {
    dir: 'backend',
    title: 'Backend · Henrique Bisneto | Engenheiro de Software',
    ogTitle: 'Henrique Bisneto — Backend',
    description:
      'Serviços, integrações e dados: APIs, automações e deploy previsível conectando ERP, bancos legados e operações críticas.',
  },
]

const escapeAttr = (value) => value.replace(/"/g, '&quot;')

const withMeta = (route) => shell
  .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(route.title)}</title>`)
  .replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${escapeAttr(route.description)}$2`,
  )
  .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${SITE}/${route.dir}$2`)
  .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${SITE}/${route.dir}$2`)
  .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${escapeAttr(route.ogTitle)}$2`)
  .replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    `$1${escapeAttr(route.description)}$2`,
  )

await writeFile(resolve(dist, '404.html'), shell)

for (const route of routes) {
  await mkdir(resolve(dist, route.dir), { recursive: true })
  await writeFile(resolve(dist, route.dir, 'index.html'), withMeta(route))
}

console.log(`postbuild: 404.html + ${routes.length} route entries written`)
