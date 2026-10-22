import type { Language } from '../context/preferences'
import { projects, type LocalizedText, type Project } from './portfolio'

export type TrackId = 'frontend' | 'backend' | 'hub'

export interface TrackProjectEntry {
  project: Project
  /** What this project means inside this specific track. */
  focus: LocalizedText
  highlight: string
}

export interface TrackContent {
  id: TrackId
  label: string
  tagline: LocalizedText
  kicker: string
  heroTitle: LocalizedText
  typedLines: Record<Language, string[]>
  heroLead: LocalizedText
  heroHint: LocalizedText
  stackLabel: LocalizedText
  stack: string[]
  deckKicker: LocalizedText
  deckTitle: LocalizedText
  deckHint: LocalizedText
  deckJump: LocalizedText
  index: LocalizedText
  stackTitle: LocalizedText
  contactHeading: LocalizedText
  contactBody: LocalizedText
  projects: TrackProjectEntry[]
}

const bySlug = (slug: string, focus: LocalizedText, highlight: string): TrackProjectEntry => {
  const project = projects.find((item) => item.slug === slug)
  if (!project) throw new Error(`Unknown project slug: ${slug}`)

  return { project, focus, highlight }
}

const frontend: TrackContent = {
  id: 'frontend',
  label: 'Frontend',
  tagline: { pt: 'Interfaces, motion e design systems', en: 'Interfaces, motion & design systems' },
  kicker: '// frontend',
  heroTitle: {
    pt: 'Interfaces que respondem ao toque, ao olhar e ao scroll.',
    en: 'Interfaces that answer to touch, gaze and scroll.',
  },
  typedLines: {
    pt: [
      'const experiencia = motion + a11y + performance',
      'design tokens → componentes → produto',
      '$ npm run build -- --mode production',
    ],
    en: [
      'const experience = motion + a11y + performance',
      'design tokens → components → product',
      '$ npm run build -- --mode production',
    ],
  },
  heroLead: {
    pt: 'Construo produtos digitais em que a camada visual é engenharia: componentes acessíveis, animação com propósito e performance medida no build, não no achismo.',
    en: 'I build digital products where the visual layer is engineering: accessible components, purposeful animation and performance measured at build time — not by guesswork.',
  },
  heroHint: {
    pt: 'Frontend é onde a decisão de produto vira sensação.',
    en: 'Frontend is where a product decision becomes a feeling.',
  },
  stackLabel: { pt: 'Stack de interface', en: 'Interface stack' },
  stack: ['React', 'TypeScript', 'MUI', 'Framer Motion', 'Vite', 'A11y WCAG', 'CSS architecture', 'Design tokens'],
  deckKicker: { pt: '// deck de projetos', en: '// project deck' },
  deckTitle: {
    pt: 'Role o scroll: os cards saem da fila e se alinham em cascata.',
    en: 'Scroll: the cards leave the row and align into a cascade.',
  },
  deckHint: {
    pt: 'Clique em um card da fila para ir direto ao projeto.',
    en: 'Click a card in the row to jump straight to the project.',
  },
  deckJump: { pt: 'Ir para este projeto', en: 'Jump to this project' },
  index: { pt: 'Projeto', en: 'Project' },
  stackTitle: { pt: 'Tecnologias', en: 'Technologies' },
  contactHeading: {
    pt: 'Precisa de uma interface que não pareça template?',
    en: 'Need an interface that does not feel like a template?',
  },
  contactBody: {
    pt: 'Trabalho do design token ao deploy: motion, acessibilidade e performance no mesmo pacote.',
    en: 'I work from design token to deploy: motion, accessibility and performance in the same package.',
  },
  projects: [
    bySlug(
      'polos',
      {
        pt: 'Painel responsivo que traduz dados densos do ERP TOTVS RM em leitura rápida para os polos da UNEF.',
        en: 'A responsive dashboard that turns dense TOTVS RM ERP data into fast reading for UNEF campuses.',
      },
      'Full stack · UI densa',
    ),
    bySlug(
      'tutorials',
      {
        pt: 'Redesign completo de UI/UX dos portais de tutoriais, com layout responsivo em seis instituições.',
        en: 'A complete UI/UX redesign of the tutorial portals, shipped responsively across six institutions.',
      },
      'UI/UX · 6 portais',
    ),
    bySlug(
      'renovame',
      {
        pt: 'Site institucional pro bono, feito para uma comunidade nova: tipografia, ritmo e motion em HTML/CSS puro.',
        en: 'A pro bono institutional site for a new community: typography, rhythm and motion in pure HTML/CSS.',
      },
      'Pro bono · CSS puro',
    ),
    bySlug(
      'customizer',
      {
        pt: 'Ferramenta que substitui páginas dos portais acadêmicos, com interface de configuração do template.',
        en: 'A tool that replaces academic portal pages, with an interface to configure the template.',
      },
      'Ferramenta · templates',
    ),
    bySlug(
      'portal-do-cliente',
      {
        pt: 'App white-label: cada escritório com sua identidade, chat em tempo real e notificação que chega na hora certa.',
        en: 'White-label app: each firm with its own identity, real-time chat and notifications that land at the right moment.',
      },
      'Mobile · white-label',
    ),
    bySlug(
      'riftshield',
      {
        pt: 'Dashboard de modelagem de ameaças em React 19 + Chakra UI: diagrama, matriz STRIDE, risco e exportação.',
        en: 'Threat modeling dashboard in React 19 + Chakra UI: diagram, STRIDE matrix, risk and export.',
      },
      'React 19 · Chakra',
    ),
  ],
}

const backend: TrackContent = {
  id: 'backend',
  label: 'Backend',
  tagline: { pt: 'Serviços, integrações e dados', en: 'Services, integrations & data' },
  kicker: '// backend',
  heroTitle: {
    pt: 'Sistemas que aguentam o mundo real: integrações, filas e dados.',
    en: 'Systems built for the real world: integrations, queues and data.',
  },
  typedLines: {
    pt: [
      '$ ./deploy --env production --safe-migrations',
      'POST /api/v1/integrations → 201 Created · 42ms',
      'SELECT p95 FROM observability WHERE env = \'prod\';',
      '// integridade antes de velocidade. sempre.',
    ],
    en: [
      '$ ./deploy --env production --safe-migrations',
      'POST /api/v1/integrations → 201 Created · 42ms',
      'SELECT p95 FROM observability WHERE env = \'prod\';',
      '// integrity before speed. always.',
    ],
  },
  heroLead: {
    pt: 'Desenho APIs, integrações e automações que ligam ERP, bancos legados e operações críticas — com rastreabilidade, testes e deploy previsível.',
    en: 'I design APIs, integrations and automations that connect ERP, legacy databases and critical operations — with traceability, tests and predictable deploys.',
  },
  heroHint: {
    pt: 'O trabalho invisível é o que mantém o produto de pé.',
    en: 'The invisible work is what keeps the product standing.',
  },
  stackLabel: { pt: 'Stack de serviços', en: 'Service stack' },
  stack: ['Node.js', 'Python', 'SQL Server', 'MongoDB', 'JWT / OAuth', 'Docker', 'Nginx + SSL', 'Pandas · scikit-learn'],
  deckKicker: { pt: '// fila de deploys', en: '// deploy queue' },
  deckTitle: {
    pt: 'Os serviços saem da fila e entram em produção conforme o scroll.',
    en: 'Services leave the queue and enter production as you scroll.',
  },
  deckHint: {
    pt: 'Cada card abre o processo completo: contexto, stack e resultado.',
    en: 'Each card opens the full run: context, stack and outcome.',
  },
  deckJump: { pt: 'Abrir processo', en: 'Open run' },
  index: { pt: 'Processo', en: 'Run' },
  stackTitle: { pt: 'Tecnologias', en: 'Technologies' },
  contactHeading: {
    pt: 'Precisa de alguém para domesticar a integração?',
    en: 'Need someone to tame the integration?',
  },
  contactBody: {
    pt: 'Do desenho da API ao monitoramento em produção: contrato claro, migração segura e logs que contam a verdade.',
    en: 'From API design to production monitoring: clear contracts, safe migrations and logs that tell the truth.',
  },
  projects: [
    bySlug(
      'biometria',
      {
        pt: 'Integração que envia fotos de alunos e colaboradores e automatiza a autorização de acesso nas duas instituições.',
        en: 'An integration that ships student and employee photos and automates access authorization across both institutions.',
      },
      'Python · Node · SQL',
    ),
    bySlug(
      'nobrehub',
      {
        pt: 'Hub de eventos com Mercado Pago, controle de inscrições e emissão automática de certificados.',
        en: 'An events hub with Mercado Pago, registration control and automatic certificate issuing.',
      },
      'Pagamentos · webhooks',
    ),
    bySlug(
      'aniversariantes',
      {
        pt: 'Job interno que organiza aniversários do Grupo Nobre e monta a experiência do colaborador do dia.',
        en: 'An internal job that organizes Grupo Nobre birthdays and builds the employee-of-the-day experience.',
      },
      'Node · SQL · cron',
    ),
    bySlug(
      'tax-analysis',
      {
        pt: 'Modelo preditivo de impostos de importação e exportação sobre dados históricos de 2000 a 2024.',
        en: 'A predictive model for import and export taxes over historical data from 2000 to 2024.',
      },
      'Python · dados',
    ),
    bySlug(
      'polos',
      {
        pt: 'Camada de serviço do painel de polos: rotas Node, queries no SQL Server e cache no MongoDB.',
        en: 'The service layer behind the campus dashboard: Node routes, SQL Server queries and MongoDB caching.',
      },
      'Full stack · API',
    ),
    bySlug(
      'portal-do-cliente',
      {
        pt: 'Serviços por trás do app: fila com retry, reconciliação de push, Redis no caminho curto e Socket.IO com log rastreável.',
        en: 'Services behind the app: retry queue, push reconciliation, Redis on the short path and traced Socket.IO.',
      },
      'Node · Redis · filas',
    ),
    bySlug(
      'riftshield',
      {
        pt: 'FastAPI com YOLOv8 customizado, agente LangGraph de 11 ferramentas e RAG multilíngue sobre FAISS.',
        en: 'FastAPI with a custom YOLOv8, an 11-tool LangGraph agent and multilingual RAG over FAISS.',
      },
      'FastAPI · YOLO',
    ),
    bySlug(
      'episcope',
      {
        pt: 'Modelo exportado para execução determinística dentro da Cartesi Machine, com notices servidas por GraphQL.',
        en: 'Model exported for deterministic execution inside the Cartesi Machine, with notices served over GraphQL.',
      },
      'ML · Web3',
    ),
  ],
}

export const tracks: Record<Exclude<TrackId, 'hub'>, TrackContent> = { frontend, backend }

export const hubCopy = {
  pt: {
    kicker: '// henrique bisneto',
    title: 'Dois lados do mesmo ofício',
    lead: 'Escolha o ambiente. Cada trilha tem linguagem visual, ritmo e cases próprios — o mesmo engenheiro, dois jeitos de olhar o problema.',
    hint: 'Frontend é sobre sensação. Backend é sobre confiança. Os dois são o mesmo trabalho.',
  },
  en: {
    kicker: '// henrique bisneto',
    title: 'Two sides of the same craft',
    lead: 'Pick an environment. Each track has its own visual language, rhythm and cases — the same engineer, two ways of looking at the problem.',
    hint: 'Frontend is about feeling. Backend is about trust. Both are the same work.',
  },
} as const
