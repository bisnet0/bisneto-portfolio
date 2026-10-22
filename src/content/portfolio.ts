import type { Language } from '../context/preferences'

export type LocalizedText = Record<Language, string>

export interface ProjectLink {
  label: string
  url: string
  type: 'case' | 'code' | 'website'
}

export interface Project {
  slug: string
  name: LocalizedText
  period: LocalizedText
  description: LocalizedText
  technologies: string[]
  images: string[]
  cover: string
  links: ProjectLink[]
}

export const siteCopy = {
  pt: {
    nav: {
      home: 'Início',
      expertise: 'Expertise',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
      menu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      switchTheme: 'Ativar modo',
      switchLanguage: 'Switch to English',
    },
    hero: {
      badgeChip: 'Full Stack',
      badge: 'Engenheiro de software transformando ideias em produtos',
      headline: 'Construo software que transforma complexidade em progresso',
      description: 'Desenvolvo experiências digitais, integrações e sistemas orientados a dados com foco em clareza, desempenho e impacto real.',
      primaryCta: 'Explorar projetos',
      secondaryCta: 'Falar comigo',
      projectsNumber: '8',
      projectsLabel: 'Produtos e soluções em destaque',
      technologiesNumber: '12+',
      technologiesLabel: 'Tecnologias no meu fluxo de trabalho',
      stackIntro: 'Construindo soluções com tecnologias modernas',
    },
    expertise: {
      kicker: '// Expertise',
      heading: 'Engenharia em evolução',
      cards: [
        {
          title: 'Engenharia de Produto',
          description: 'Interfaces responsivas e produtos digitais construídos do conceito à entrega, equilibrando experiência, arquitetura e desempenho.',
          tags: ['React', 'TypeScript', 'UX responsiva', 'APIs'],
        },
        {
          title: 'Back-end e Integrações',
          description: 'Serviços, autenticação e integrações que conectam sistemas legados, bancos de dados e operações críticas com segurança.',
          tags: ['Node.js', 'Python', 'SQL Server', 'JWT'],
        },
        {
          title: 'Dados e Entrega',
          description: 'Automação, análise de dados e práticas de entrega que tornam produtos mais confiáveis, observáveis e fáceis de evoluir.',
          tags: ['Docker', 'MongoDB', 'Cloud', 'DevOps'],
        },
      ],
    },
    about: {
      kicker: '// Trajetória',
      heading: 'Código com contexto humano',
      intro: 'Sou movido por problemas que exigem curiosidade, colaboração e engenharia pragmática. Gosto de transformar processos complexos em produtos simples de usar e sustentar.',
      experienceTitle: 'Experiência',
      experience: 'Atuei em projetos para empresas do Grupo Nobre com Node.js, React, Angular e Python, além de deployments, evolução de APIs, cloud e gestão de SSL.',
      educationTitle: 'Formação',
      education: 'Graduado em Análise e Desenvolvimento de Sistemas pela UNIFAN, com base em algoritmos, desenvolvimento full stack e ciência de dados.',
      capstone: 'Ver trabalho de conclusão',
      presentation: 'Ver apresentação',
    },
    projects: {
      kicker: '// Projetos selecionados',
      heading: 'Sistemas que chegaram ao mundo real',
      intro: 'Uma seleção de produtos, automações e experiências desenvolvidas para resolver desafios reais em educação, operações e dados.',
      gallery: 'Abrir galeria',
      technologies: 'Tecnologias',
      viewCase: 'Ver case',
      viewCode: 'Ver código',
      visitWebsite: 'Visitar site',
      close: 'Fechar galeria',
      previous: 'Imagem anterior',
      next: 'Próxima imagem',
      imageOf: 'Imagem de',
    },
    contact: {
      kicker: '// Vamos conversar',
      heading: 'Tem um desafio interessante?',
      description: 'Estou sempre aberto a conversar sobre produtos digitais, engenharia de software e ideias que merecem sair do papel.',
      email: 'Enviar um e-mail',
      cv: 'Baixar currículo',
      social: 'Ou me encontre nas redes',
    },
    footer: {
      rights: 'Henrique Bisneto. Todos os direitos reservados.',
      backToTop: 'Voltar ao topo',
    },
  },
  en: {
    nav: {
      home: 'Home',
      expertise: 'Expertise',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Open menu',
      closeMenu: 'Close menu',
      switchTheme: 'Enable mode',
      switchLanguage: 'Mudar para português',
    },
    hero: {
      badgeChip: 'Full Stack',
      badge: 'Software engineer turning ideas into products',
      headline: 'I build software that turns complexity into progress',
      description: 'I create digital experiences, integrations and data-driven systems focused on clarity, performance and real-world impact.',
      primaryCta: 'Explore projects',
      secondaryCta: 'Contact me',
      projectsNumber: '8',
      projectsLabel: 'Featured products and solutions',
      technologiesNumber: '12+',
      technologiesLabel: 'Technologies in my workflow',
      stackIntro: 'Building solutions with modern technologies',
    },
    expertise: {
      kicker: '// Expertise',
      heading: 'Engineering evolved',
      cards: [
        {
          title: 'Product Engineering',
          description: 'Responsive interfaces and digital products built from concept to delivery, balancing experience, architecture and performance.',
          tags: ['React', 'TypeScript', 'Responsive UX', 'APIs'],
        },
        {
          title: 'Back-end & Integrations',
          description: 'Services, authentication and integrations that connect legacy systems, databases and critical operations securely.',
          tags: ['Node.js', 'Python', 'SQL Server', 'JWT'],
        },
        {
          title: 'Data & Delivery',
          description: 'Automation, data analysis and delivery practices that make products more reliable, observable and easier to evolve.',
          tags: ['Docker', 'MongoDB', 'Cloud', 'DevOps'],
        },
      ],
    },
    about: {
      kicker: '// Journey',
      heading: 'Code with human context',
      intro: 'I am driven by problems that demand curiosity, collaboration and pragmatic engineering. I enjoy turning complex processes into products that are simple to use and sustain.',
      experienceTitle: 'Experience',
      experience: 'I have delivered projects for Grupo Nobre companies using Node.js, React, Angular and Python, alongside deployments, API evolution, cloud and SSL management.',
      educationTitle: 'Education',
      education: 'I hold a degree in Systems Analysis and Development from UNIFAN, grounded in algorithms, full-stack development and data science.',
      capstone: 'View capstone project',
      presentation: 'View presentation',
    },
    projects: {
      kicker: '// Selected work',
      heading: 'Systems that reached the real world',
      intro: 'A selection of products, automations and experiences developed to solve real challenges across education, operations and data.',
      gallery: 'Open gallery',
      technologies: 'Technologies',
      viewCase: 'View case',
      viewCode: 'View code',
      visitWebsite: 'Visit website',
      close: 'Close gallery',
      previous: 'Previous image',
      next: 'Next image',
      imageOf: 'Image from',
    },
    contact: {
      kicker: '// Let’s talk',
      heading: 'Have an interesting challenge?',
      description: 'I am always open to conversations about digital products, software engineering and ideas that deserve to come to life.',
      email: 'Send an email',
      cv: 'Download résumé',
      social: 'Or find me online',
    },
    footer: {
      rights: 'Henrique Bisneto. All rights reserved.',
      backToTop: 'Back to top',
    },
  },
} as const

export const projects: Project[] = [
  {
    slug: 'polos',
    name: { pt: 'Gestão de Polos', en: 'Campus Management' },
    period: { pt: '17 a 29 jan. 2025', en: 'Jan 17–29, 2025' },
    description: {
      pt: 'Aplicação responsiva que centraliza dados do ERP TOTVS RM e disponibiliza informações em tempo real para os polos da UNEF.',
      en: 'A responsive application that centralizes data from the TOTVS RM ERP and delivers real-time information to UNEF campuses.',
    },
    technologies: ['React', 'Node.js', 'SQL Server', 'MongoDB', 'JWT'],
    images: ['/projects/polo.png', '/projects/Polo1.png', '/projects/polo2.png', '/projects/polo3.png', '/projects/polo4.png', '/projects/polo5.png', '/projects/polo6.png', '/projects/Polo7.png', '/projects/Polo8.png', '/projects/Polo9.png'],
    cover: '/projects/covers/polos.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_react-nodejs-desenvolvimentoweb-activity-7287959265695166465-Gum8', type: 'case' },
      { label: 'polos.unef.edu.br', url: 'https://polos.unef.edu.br/', type: 'website' },
    ],
  },
  {
    slug: 'tutorials',
    name: { pt: 'Tutoriais de Medicina e Escola Nobre', en: 'Medicine & Nobre School Tutorials' },
    period: { pt: '3 out. a 18 dez. 2024', en: 'Oct 3–Dec 18, 2024' },
    description: {
      pt: 'Redesign completo de UI/UX dos portais de tutoriais, com experiência responsiva para smartphones, tablets e desktop.',
      en: 'A complete UI/UX redesign for tutorial portals, delivering a responsive experience across smartphones, tablets and desktop.',
    },
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
    images: ['/projects/tutorial.png', '/projects/Tutorial1.png', '/projects/tutorial2.png', '/projects/tutorial3.png', '/projects/tutorial4.png', '/projects/tutorial5.png', '/projects/tutorial6.png', '/projects/tutorial7.png', '/projects/tutorial8.png', '/projects/Tutorial9.png', '/projects/Tutorial10.png', '/projects/Tutorial11.png'],
    cover: '/projects/covers/tutorials.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_frontend-js-css-activity-7247601763212513281-KuBA', type: 'case' },
      { label: 'UNIFAN MED', url: 'https://med.unifan.net.br/tutorial-professor', type: 'website' },
      { label: 'UNEF MED', url: 'https://med.unef.edu.br/tutorial-professor', type: 'website' },
      { label: 'UNIFAN', url: 'https://unifan.net.br/tutorial', type: 'website' },
      { label: 'UNEF', url: 'https://unef.edu.br/tutorial', type: 'website' },
      { label: 'Colégio Nobre', url: 'https://colegionobre.com.br/tutorial', type: 'website' },
    ],
  },
  {
    slug: 'renovame',
    name: { pt: 'Igreja Renova-me', en: 'Renova-me Church' },
    period: { pt: '9 a 16 out. 2024', en: 'Oct 9–16, 2024' },
    description: {
      pt: 'Website institucional pro bono criado para uma nova comunidade, com experiência fluida e totalmente responsiva.',
      en: 'A pro bono institutional website created for a new community, with a fluid and fully responsive experience.',
    },
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    images: ['/projects/Renovame.png', '/projects/Renovame1.png', '/projects/Renovame2.png', '/projects/Renovame3.png', '/projects/Renovame4.png', '/projects/Renovame5.png', '/projects/Renovame6.png', '/projects/Renovame7.png', '/projects/Renovame8.png'],
    cover: '/projects/covers/renovame.webp',
    links: [
      { label: 'renovamechurch.com.br', url: 'https://renovamechurch.com.br/', type: 'website' },
      { label: 'GitHub', url: 'https://github.com/bisnet0/renova-me', type: 'code' },
    ],
  },
  {
    slug: 'nobrehub',
    name: { pt: 'Hub de Eventos Nobre', en: 'Nobre Events Hub' },
    period: { pt: '14 ago. a 2 set. 2024', en: 'Aug 14–Sep 2, 2024' },
    description: {
      pt: 'Hub centralizado para eventos gratuitos e pagos, com Mercado Pago, gestão de informações e emissão de certificados.',
      en: 'A centralized hub for free and paid events, featuring Mercado Pago, information management and certificate generation.',
    },
    technologies: ['Node.js', 'Python', 'Mercado Pago API', 'JavaScript'],
    images: ['/projects/Nobrehub.png', '/projects/Nobrehub1.png', '/projects/Nobrehub2.png', '/projects/Nobrehub3.png', '/projects/Nobrehub4.png'],
    cover: '/projects/covers/events.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_development-system-backend-activity-7264752938651185152-9vcq', type: 'case' },
    ],
  },
  {
    slug: 'biometria',
    name: { pt: 'Biometria Facial UNEF e UNIFAN', en: 'UNEF & UNIFAN Facial Biometrics' },
    period: { pt: '29 jul. a 6 ago. 2024', en: 'Jul 29–Aug 6, 2024' },
    description: {
      pt: 'Solução de integração para envio de fotos de alunos e colaboradores, automatizando a autorização de acesso nas instituições.',
      en: 'An integration solution for student and employee photos, automating access authorization across both institutions.',
    },
    technologies: ['Python', 'Node.js', 'SQL Server', 'JavaScript'],
    images: ['/projects/Biometria.png', '/projects/Biometria1.png', '/projects/Biometria2.png', '/projects/Biometria3.png', '/projects/Biometria4.png', '/projects/Biometria5.png', '/projects/Biometria6.png', '/projects/Biometria7.png', '/projects/Biometria8.png', '/projects/Biometria9.png', '/projects/Biometria10.png', '/projects/Biometria11.png'],
    cover: '/projects/covers/biometrics.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_frontend-webdeb-javascript-activity-7227072365472448514-m9m7', type: 'case' },
      { label: 'UNIFAN', url: 'https://biometria.unifan.net.br/', type: 'website' },
      { label: 'UNEF', url: 'https://biometria.unef.edu.br/', type: 'website' },
    ],
  },
  {
    slug: 'aniversariantes',
    name: { pt: 'Aniversariantes do Mês', en: 'Monthly Birthdays' },
    period: { pt: '26 jun. a 23 jul. 2024', en: 'Jun 26–Jul 23, 2024' },
    description: {
      pt: 'Aplicação interna que organiza os aniversários do Grupo Nobre e cria uma experiência especial para o colaborador do dia.',
      en: 'An internal application that organizes Grupo Nobre birthdays and creates a special experience for the employee of the day.',
    },
    technologies: ['Node.js', 'SQL Server', 'JavaScript', 'HTML5', 'CSS3'],
    images: ['/projects/Aniversariantes.png', '/projects/Aniversariantes1.png', '/projects/Aniversariantes2.png', '/projects/Aniversariantes3.png', '/projects/Aniversariantes4.png'],
    cover: '/projects/covers/birthdays.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_webdev-desenvolvimentoweb-nodejs-activity-7220542341504245760-yEhG', type: 'case' },
    ],
  },
  {
    slug: 'customizer',
    name: { pt: 'Customizador de Portal', en: 'Portal Customizer' },
    period: { pt: '16 a 28 jun. 2024', en: 'Jun 16–28, 2024' },
    description: {
      pt: 'Ferramenta configurável em Python para automatizar a substituição de páginas em portais acadêmicos do Grupo Nobre.',
      en: 'A configurable Python tool that automates page replacement across Grupo Nobre academic portals.',
    },
    technologies: ['Python', 'Automation', 'HTML5', 'CSS3'],
    images: ['/projects/replaceM.png', '/projects/replaceM1.png', '/projects/replaceM2.png'],
    cover: '/projects/covers/customizer.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_boa-tarde-rede-tudo-bem-com-voc%C3%AAs-bom-activity-7209987530543296512-V1ar', type: 'case' },
      { label: 'GitHub', url: 'https://github.com/bisnet0/Replace_RM_Folder', type: 'code' },
    ],
  },
  {
    slug: 'tax-analysis',
    name: { pt: 'Análise Preditiva Tributária', en: 'Predictive Tax Analysis' },
    period: { pt: '18 a 19 jun. 2024', en: 'Jun 18–19, 2024' },
    description: {
      pt: 'Análise preditiva de impostos brasileiros de importação e exportação utilizando dados históricos de 2000 a 2024.',
      en: 'A predictive analysis of Brazilian import and export taxes using historical data from 2000 to 2024.',
    },
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'NumPy'],
    images: ['/projects/APreditiva.png', '/projects/APreditiva1.png', '/projects/APreditiva2.png', '/projects/APreditiva3.png', '/projects/APreditiva4.png'],
    cover: '/projects/covers/tax-analysis.webp',
    links: [
      { label: 'GitHub', url: 'https://github.com/bisnet0/DataScience', type: 'code' },
    ],
  },
  {
    slug: 'portal-do-cliente',
    name: { pt: 'Portal do Cliente (ContaGou)', en: 'Client Portal (ContaGou)' },
    period: { pt: 'app em produção · out. 2026', en: 'live app · Oct 2026' },
    description: {
      pt: 'App mobile white-label para os clientes das contabilidades: uma build por escritório com cores, logo e ícone próprios, notificações push com fila e reconciliação, chat em tempo real no estilo WhatsApp e cache no Redis.',
      en: 'White-label mobile app for accounting firm clients: one build per firm with its own colors, logo and icon, push notifications with retry queue and delivery reconciliation, WhatsApp-style real-time chat and Redis caching.',
    },
    technologies: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Socket.IO'],
    images: ['/projects/portal-do-cliente/01.webp', '/projects/portal-do-cliente/02.webp', '/projects/portal-do-cliente/03.webp', '/projects/portal-do-cliente/04.webp', '/projects/portal-do-cliente/05.webp', '/projects/portal-do-cliente/06.webp', '/projects/portal-do-cliente/07.webp'],
    cover: '/projects/covers/portal-do-cliente.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_reactnative-expo-nodejs-ugcPost-7514118462856933376-4hoB/', type: 'case' },
    ],
  },
  {
    slug: 'riftshield',
    name: { pt: 'RiftShield', en: 'RiftShield' },
    period: { pt: 'Hackathon FIAP Software Security · jul. 2026', en: 'FIAP Software Security Hackathon · Jul 2026' },
    description: {
      pt: 'Plataforma de modelagem de ameaças: um YOLOv8 customizado lê diagramas de arquitetura, o agente LangGraph orquestra STRIDE, RAG e simulação de ataques, e o laudo sai em JSON, CSV, Excel e PDF bilíngue.',
      en: 'Threat modeling platform: a custom YOLOv8 reads architecture diagrams, a LangGraph agent orchestrates STRIDE, RAG and attack simulation, and the report ships as bilingual JSON, CSV, Excel and PDF.',
    },
    technologies: ['FastAPI', 'YOLOv8', 'LangGraph', 'RAG · FAISS', 'React 19', 'Chakra UI', 'MongoDB', 'Docker'],
    images: ['/projects/riftshield/01.webp', '/projects/riftshield/02.webp', '/projects/riftshield/03.webp', '/projects/riftshield/04.webp', '/projects/riftshield/05.webp', '/projects/riftshield/06.webp', '/projects/riftshield/07.webp', '/projects/riftshield/08.webp'],
    cover: '/projects/covers/riftshield.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_cybersecurity-yolo-langgraph-ugcPost-7486203782599524354-6pLZ/', type: 'case' },
    ],
  },
  {
    slug: 'episcope',
    name: { pt: 'EpiScope', en: 'EpiScope' },
    period: { pt: 'Pós-graduação em IA · 2025–2026', en: 'AI postgraduate · 2025–2026' },
    description: {
      pt: 'Analisador de arboviroses com Machine Learning e IA generativa, com backend descentralizado rodando dentro da Cartesi Machine (RISC-V): o diagnóstico sai verificável, transparente e imutável sobre rollups.',
      en: 'Arbovirus analyzer powered by machine learning and generative AI, with a decentralized backend running inside the Cartesi Machine (RISC-V): diagnostics come out verifiable, transparent and immutable through rollups.',
    },
    technologies: ['Python', 'Flask', 'GraphQL', 'Cartesi Rollups', 'Blockchain', 'scikit-learn', 'Gemini'],
    images: ['/projects/episcope/01.webp', '/projects/episcope/02.webp', '/projects/episcope/03.webp', '/projects/episcope/04.webp', '/projects/episcope/05.webp', '/projects/episcope/06.webp', '/projects/episcope/07.webp', '/projects/episcope/08.webp'],
    cover: '/projects/covers/episcope.webp',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/bisnet0_artificialintelligence-machinelearning-web3-ugcPost-7462300956521590784-Z34B/', type: 'case' },
      { label: 'GitHub', url: 'https://github.com/bisnet0/EpiScope-dapp', type: 'code' },
    ],
  },
]

export const cvUrl = 'https://drive.usercontent.google.com/download?id=1jAOuBD5NmBkF9Sye-MWPo-ao_j3pWUq9&export=download&authuser=0'
export const capstoneUrl = 'https://drive.google.com/file/d/1hG7Q12aubtZ8iiRPz5gd9iX6culAv6Zd/view?usp=sharing'
export const presentationUrl = 'https://www.linkedin.com/posts/bisnet0_tcc-trabalhodeconclusaodecurso-backend-activity-7224933035924705281-qp9C'
export const emailUrl = 'mailto:bis_henrique@yahoo.com.br'
export const githubUrl = 'https://github.com/bisnet0'
export const linkedInUrl = 'https://www.linkedin.com/in/bisnet0'
