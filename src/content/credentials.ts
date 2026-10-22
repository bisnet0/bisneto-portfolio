import type { LocalizedText } from './portfolio'

export interface Credential {
  slug: string
  title: LocalizedText
  issuer: LocalizedText
  date: LocalizedText
  description: LocalizedText
  images: string[]
  links?: Array<{ label: string; url: string }>
}

export interface Award extends Credential {
  rank: 1 | 2
}

/** Reconhecimentos — ouro para o 1º lugar, prata para o 2º. */
export const awards: Award[] = [
  {
    slug: 'cartesi-1st',
    rank: 1,
    title: {
      pt: '1º lugar · Desafio Cartesi Rollups',
      en: '1st place · Cartesi Rollups Challenge',
    },
    issuer: {
      pt: 'Cartesi · UFBA · Tomorrow · Positivo Tecnologia',
      en: 'Cartesi · UFBA · Tomorrow · Positivo Tecnologia',
    },
    date: { pt: '2025', en: '2025' },
    description: {
      pt: 'Blockchain com Cartesi Machine desenvolvida em parceria com a UFBA e premiada em primeiro lugar. O EpiScope DApp — ML verificável rodando dentro da Cartesi Machine — foi o projeto premiado e ganhou um post oficial da Cartesi apresentando o case.',
      en: 'A Cartesi Machine blockchain built in partnership with UFBA and awarded first place. The EpiScope DApp — verifiable ML running inside the Cartesi Machine — was the winning project and got an official Cartesi post presenting the case.',
    },
    images: ['/projects/awards/cartesi-award.webp', '/projects/studies/cartesi-1.webp', '/projects/studies/cartesi-2.webp'],
    links: [
      { label: 'Cartesi', url: 'https://www.linkedin.com/posts/bisnet0_artificialintelligence-machinelearning-web3-ugcPost-7462300956521590784-Z34B/' },
      { label: 'EpiScope-dapp', url: 'https://github.com/bisnet0/EpiScope-dapp' },
    ],
  },
  {
    slug: 'bytecraft-2nd',
    rank: 2,
    title: { pt: '2º lugar · Hackathon BYTECRAFT', en: '2nd place · BYTECRAFT Hackathon' },
    issuer: { pt: 'BYTECRAFT', en: 'BYTECRAFT' },
    date: { pt: '2025', en: '2025' },
    description: {
      pt: 'Segundo lugar no hackathon da BYTECRAFT, resolvendo o desafio em equipe sob pressão de tempo — da leitura do problema ao pitch final.',
      en: 'Second place at the BYTECRAFT hackathon, solving the challenge as a team under time pressure — from reading the problem to the final pitch.',
    },
    images: [
      '/projects/awards/bytecraft-1.webp',
      '/projects/awards/bytecraft-2.webp',
      '/projects/awards/bytecraft-3.webp',
      '/projects/awards/bytecraft-4.webp',
    ],
  },
]

/** Certificados — formação, cursos e participações. */
export const certificates: Credential[] = [
  {
    slug: 'blockchain-web3-cartesi',
    title: {
      pt: 'Blockchain, Web3 e Cartesi Rollups',
      en: 'Blockchain, Web3 and Cartesi Rollups',
    },
    issuer: { pt: 'UFBA · Tomorrow · Positivo Tecnologia (30h)', en: 'UFBA · Tomorrow · Positivo Tecnologia (30h)' },
    date: { pt: '2025', en: '2025' },
    description: {
      pt: 'Capacitação em Blockchain, Web3 e Cartesi Rollups pela UFBA (30h). Redes descentralizadas, fundamentos de blockchain e aplicações Web3, além de soluções de escalabilidade com rollups e conceitos de DApps.',
      en: 'Blockchain, Web3 and Cartesi Rollups training at UFBA (30h). Decentralized networks, blockchain fundamentals and Web3 applications, plus rollup-based scalability and DApp concepts.',
    },
    images: ['/projects/certificates/blockchain.webp'],
  },
  {
    slug: 'java-completo',
    title: {
      pt: 'Java COMPLETO — POO + Projetos',
      en: 'Java COMPLETE — OOP + Projects',
    },
    issuer: { pt: 'Formação online', en: 'Online program' },
    date: { pt: '2024', en: '2024' },
    description: {
      pt: 'Spring Boot, MongoDB, JPA/Hibernate e JavaFX: CRUD em bancos relacionais e NoSQL, entidades expostas via REST e uma aplicação JavaFX de gerenciamento de departamentos e vendedores, incluindo distribuição e empacotamento.',
      en: 'Spring Boot, MongoDB, JPA/Hibernate and JavaFX: CRUD on relational and NoSQL databases, entities exposed over REST and a JavaFX app for managing departments and sellers, including packaging and distribution.',
    },
    images: ['/projects/certificates/java.webp'],
  },
  {
    slug: 'reprograme-se',
    title: { pt: 'Reprograme-se — Além do Código', en: 'Reprograme-se — Beyond Code' },
    issuer: { pt: 'UNIFAN · Dia do Programador', en: 'UNIFAN · Programmer’s Day' },
    date: { pt: '2024', en: '2024' },
    description: {
      pt: 'Evento na UNIFAN em comemoração ao Dia do Programador, com palestra e roda de conversa sobre o equilíbrio entre vida pessoal e profissional e o lado humano da tecnologia.',
      en: 'UNIFAN event celebrating Programmer’s Day, with a talk and round table about work-life balance and the human side of technology.',
    },
    images: ['/projects/certificates/reprograme-se-1.webp', '/projects/certificates/reprograme-se-2.webp'],
  },
  {
    slug: 'trilhando-carreiras',
    title: {
      pt: 'Trilhando Carreiras: Desafios, Comportamento e Oportunidades na Era Digital',
      en: 'Tracing Careers: Challenges, Behavior and Opportunities in the Digital Era',
    },
    issuer: { pt: 'UNIFAN', en: 'UNIFAN' },
    date: { pt: '2024', en: '2024' },
    description: {
      pt: 'Palestra sobre adaptabilidade, inovação, soft skills e expectativas do mercado de tecnologia, promovendo reflexões sobre carreira e alinhamento entre estudos e objetivos.',
      en: 'A talk on adaptability, innovation, soft skills and technology market expectations, prompting reflection on career and alignment between studies and goals.',
    },
    images: ['/projects/certificates/trilhando-1.webp', '/projects/certificates/trilhando-2.webp'],
  },
  {
    slug: 'tcc',
    title: {
      pt: 'TCC — Análise e Desenvolvimento de Sistemas',
      en: 'Capstone — Systems Analysis and Development',
    },
    issuer: { pt: 'UNIFAN · colação em ago. 2024', en: 'UNIFAN · graduated Aug 2024' },
    date: { pt: 'ago. 2024', en: 'Aug 2024' },
    description: {
      pt: 'Conclusão do curso de Análise e Desenvolvimento de Sistemas: desenvolvimento de software, lógica de programação e soluções tecnológicas orientadas a problema real.',
      en: 'Completion of the Systems Analysis and Development degree: software development, programming logic and technology solutions aimed at real problems.',
    },
    images: ['/projects/certificates/tcc.webp'],
  },
  {
    slug: 'fiap-security',
    title: {
      pt: 'Hackathon FIAP Software Security 2026 — modelagem de ameaças com IA',
      en: 'FIAP Software Security 2026 Hackathon — AI threat modeling',
    },
    issuer: { pt: 'FIAP', en: 'FIAP' },
    date: { pt: '2026', en: '2026' },
    description: {
      pt: 'Desafio da FIAP: validar a viabilidade de gerar modelagem de ameaças STRIDE automaticamente, com IA, a partir de um diagrama de arquitetura em imagem — base do RiftShield.',
      en: 'FIAP challenge: validate the feasibility of generating STRIDE threat models automatically, with AI, from an architecture diagram image — the seed of RiftShield.',
    },
    images: ['/projects/certificates/hackathon.webp'],
  },
]

/** Estudos e laboratórios — entregas de pós/cursos que não são produto. */
export const studies: Credential[] = [
  {
    slug: 'aws-ner-voc',
    title: {
      pt: 'Arquitetura dentro da AWS → NER e VoC',
      en: 'Architecture inside AWS → NER and VoC',
    },
    issuer: { pt: 'Pós IA para Devs · FIAP · Fase 4', en: 'AI for Devs postgraduate · FIAP · Phase 4' },
    date: { pt: '2026', en: '2026' },
    description: {
      pt: 'Named Entity Recognition em contratos e escala de Voice of Customer com Amazon Comprehend e Amazon Lex, sem reimplementar NLP: a nuvem como serviço de arquitetura, não só como esteira de deploy.',
      en: 'Named Entity Recognition on contracts and Voice of Customer at scale with Amazon Comprehend and Lex, without rebuilding NLP: the cloud as an architecture service, not just a deploy pipeline.',
    },
    images: [
      '/projects/studies/aws-ner-voc-1.webp',
      '/projects/studies/aws-ner-voc-2.webp',
      '/projects/studies/aws-ner-voc-3.webp',
    ],
    links: [{ label: 'LinkedIn', url: 'https://lnkd.in/p/eD-XJazb' }],
  },
  {
    slug: 'rabbitmq-meta',
    title: {
      pt: 'RabbitMQ na entrega de obrigações pela META API',
      en: 'RabbitMQ for obligation delivery through the META API',
    },
    issuer: { pt: 'ContaGou · arquitetura de mensageria', en: 'ContaGou · messaging architecture' },
    date: { pt: '2026', en: '2026' },
    description: {
      pt: 'Módulo centralizado de comunicados com Bull + RabbitMQ: cadências de envio, roteamento dinâmico para templates homologados, −40% de custo, 100% de assertividade e −80% de tempo no envio de arquivos.',
      en: 'Centralized messaging module with Bull + RabbitMQ: sending cadences, dynamic routing to approved templates, −40% cost, 100% delivery accuracy and −80% time spent sending files.',
    },
    images: ['/projects/studies/rabbitmq.webp'],
    links: [{ label: 'LinkedIn', url: 'https://lnkd.in/p/emJd3vZB' }],
  },
  {
    slug: 'cartesi-riscv',
    title: {
      pt: 'Aplicação Cartesi RISC-V no projeto de DApps',
      en: 'Cartesi RISC-V application in the DApps project',
    },
    issuer: { pt: 'Pós IA · Cartesi · UFBA/Tomorrow', en: 'AI postgraduate · Cartesi · UFBA/Tomorrow' },
    date: { pt: '2025', en: '2025' },
    description: {
      pt: 'Backend modularizado em Python para servir dados de ML a smart contracts dentro da Cartesi Machine: Flask + GraphQL, dados do usuário pertencendo só ao usuário, resultado consolidado em rollups.',
      en: 'A Python backend modularized to serve ML data to smart contracts inside the Cartesi Machine: Flask + GraphQL, user data owned by the user, results consolidated through rollups.',
    },
    images: [
      '/projects/studies/cartesi-1.webp',
      '/projects/studies/cartesi-2.webp',
      '/projects/studies/cartesi-3.webp',
    ],
    links: [{ label: 'LinkedIn', url: 'https://lnkd.in/p/eaS5F2ha' }],
  },
]
