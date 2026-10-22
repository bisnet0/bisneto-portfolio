import type { Language } from '../context/preferences'

export interface PostComment {
  author: string
  /** Real comment text, copied from the public post. */
  text: string
}

export interface PostMeta {
  /** Where the panel link goes: the real post/repo. */
  url: string
  kind: 'linkedin' | 'repo'
  /** Real post body (LinkedIn) or a short honest summary (repos with no description). */
  text: string
  date: Record<Language, string>
  reactions?: number
  commentsTotal?: number
  comments: PostComment[]
  /** Repo metadata, when kind === 'repo'. */
  repo?: string
  language?: string
  pushedAt?: string
}

/**
 * Real data. Posts and comments were scraped from the public LinkedIn pages
 * (guest view exposes part of the thread: e.g. 10 of 22 comments) — the panel
 * shows how many were captured. Repos come from the GitHub public API.
 */
export const postBySlug: Record<string, PostMeta> = {

  polos: {
    url: 'https://www.linkedin.com/posts/bisnet0_react-nodejs-desenvolvimentoweb-activity-7287959265695166465-Gum8',
    kind: 'linkedin',
    text: 'Boa noite, rede! Tudo bem com vocês? 🌙 Venho compartilhar um projeto que desenvolvi utilizando React e Node.js para a Gestão de Polos da UNEF! 🎓💻 🚀 Os Polos da UNEF são gerenciados por um dos serviços do RM TOTVS, mas encontrar informações relevantes para os gestores e diretores era uma tarefa complicada. Além disso, havia desafios como a dependência de uma conexão constante com sistemas de licenças e interligações entre diferentes serviços. Diante disso, recebi os seguintes requisitos: - 📋 Apresentar dados de alunos e cursos por Polo; - ✏️ Registrar Ofertas de cursos e Atualizações Cadastrais; - 📊 Gerar relatórios detalhados (controle de tráfego de informações); - 📎 Permitir anexos, como contratos, em PDF. 🛠️Sobre a Aplicação: Frontend: - Desenvolvido em React, com uso intenso de useState e useEffect para gerenciamento e manipulação de estados. Backend: - Construído em Node.js, integrando dois bancos de dados: * SQL Server do RM TOTVS para consultas diretas com o SmartView. * MongoDB para armazenar dados complementares. Controle de Acessos: - Role Diretor: Acesso global a todos os dados dos Polos. - Role Gestor: Visão limitada ao Polo gerenciado. Segurança: - Implementação de Tokens JWT com validade temporária para proteger todas as rotas da aplicação. ✨ Funcionalidades implementadas —📈 Dashboard: Acompanhamento em tempo real dos dados dos Polos. —📥 Exportação para Excel: Baix',
    date: { pt: '22 de jan. de 2025', en: 'Jan 22, 2025' },
    reactions: 31,
    commentsTotal: 22,
    comments: [
      { author: 'Lucas Nascimento', text: 'Ficou 10!' },
      { author: 'Gabriel Morais', text: 'Parabéns pelo projeto, Henrique, ficou incrível! 👏' },
      { author: 'Yann Smith', text: 'Excelente!👏🏼👏🏼👏🏼' },
      { author: 'Vitor Silva de Jesus', text: 'Muito bom mano, parabéns!' },
      { author: 'Luis Fernando Carneiro', text: 'Parabéns! Projeto incrível, bastante útil!' },
      { author: 'João Erick Barbosa', text: 'Parabéns, cara! Muito interessante o trabalho! E o mais importante, conseguiu facilitar a vida das pessoas 👏🏾👏🏾' },
      { author: 'Gustavo Pasqua', text: 'Que projeto show, cara!!! A legenda está impecável, gostei da stack. Qualidade demais 🚀🚀' },
      { author: 'Gabriel Silva Queiroz', text: 'Parabéns pelo projeto meu irmão, fico feliz demais em ver sua evolução e ainda mais por ver o projeto em si, vc é o cara e merece demais 🚀🚀🚀' },
      { author: 'Láiza Naline André de Oliveira Mascarenhas', text: 'Parabéns Henrique, ótima ferramenta' },
      { author: 'José de Aranha', text: 'Parabéns Henrique, projeto muito bom' },
    ],
  },
  tutorials: {
    url: 'https://www.linkedin.com/posts/bisnet0_frontend-js-css-activity-7247601763212513281-KuBA',
    kind: 'linkedin',
    text: 'Fala rede, tudo em cima? Estive durante esse hiato focado em um projeto mais elaborado com desafios de API de pagamento e regras de negócios que precisam de maior foco em papéis hierárquicos (brevemente posto sobre). ⏸️ Dando uma pausa nesse projeto, foi me passado uma task de melhora nas páginas de tutoriais de acesso aos portais e aplicativo educacionais do Grupo Nobre. Gustavo Pasqua, um dos desenvolvedores do GN, criou do zero as páginas e os vídeos de instrução para os estudantes; páginas proficientes que guiam as pessoas ao acesso facilitado da plataforma. ⏯️ 🌐 Por isso, só me restava fazer melhorias intuitivas dos tutoriais como responsividade, UX e UI. 🦻 Além disso, meu amigo Daniel Mattos deu um ótimo insight de acessibilidade, adicionar o widget de libras do Governo Federal (VLIBRAS), algo que poucos sabem, mas com poucas linhas de códigos prontos (plugins) já gera uma interface totalmente adaptativa do seu site! 🔗 Seguem os links: ⤵️ https://lnkd.in/dkCMeGvm https://lnkd.in/d_MmkHDn https://lnkd.in/dhQhk6Y4 Algumas melhorias futuras serão adicionadas, como: legendar os vídeos e subir em uma plataforma audiovisual para melhor timming de buffering. EN: Hey network, how\'s everything going? During this break, I\'ve been focused on a more elaborate project involving challenges with payment APIs and business rules that require greater attention to hierarchical roles (I\'ll p',
    date: { pt: '3 de out. de 2024', en: 'Oct 3, 2024' },
    reactions: 27,
    commentsTotal: 10,
    comments: [
      { author: 'Daniel Mattos', text: 'Ficou Top , Parabéns Parceiro, fico feliz com sua evolução, tu vai longe 👏🏻👏🏻👏🏻👏🏻' },
      { author: 'Erick Damasceno', text: 'Muito bom, Henrique! Interface ficou brabíssima' },
      { author: 'Gabriel Silva Queiroz', text: 'Shooow meu mano, parabéns, fico feliz demais em ver sua evolução e pela melhoria contínua do projeto, você e Gustavo Pasqua são feras demais!!' },
      { author: 'Gustavo Pasqua', text: 'Ficou incrível! Muito satisfatório ver outros desenvolvedores competentes dando continuidade a projetos nos quais trabalhei 😁. Meus parabéns, irmão 🚀 🚀 🚀' },
      { author: 'Paulo Roberto Brandão', text: 'Essa nova interface ficou muito top, parabéns 👏🏾' },
      { author: 'Láiza Naline André de Oliveira Mascarenhas', text: 'Show 🚀' },
    ],
  },
  nobrehub: {
    url: 'https://www.linkedin.com/posts/bisnet0_development-system-backend-activity-7264752938651185152-9vcq',
    kind: 'linkedin',
    text: 'Boa tarde, pessoal! Tudo bem? Quero compartilhar o progresso de uma aplicação (ainda em desenvolvimento) do Hub de Eventos do Grupo Nobre. Como ela envolve integração com a API de pagamento do Mercado Pago, precisa de mais atenção, por isso voltei com ela para o backlog. Em resumo, a aplicação tem requisitos e funcionalidades avançadas, como: — Validação de JWT (tokens que expiram em 15 minutos); — Roles (papéis) definidos para funcionalidades: ➡️ Administradores podem: 🔹 Definir prazos dos eventos; 🔹 Carregar imagens; 🔹 Gerenciar eventos criados; 🔹 Visualizar eventos criados por outros administradores; 🔹 Oferecer ingressos pagos e gratuitos. 🟡 Funcionalidades parcialmente concluídas: 🔸 Compra de ingressos pagos (geração de PIX); 🔸 Paginação de ingressos; 🔸 Modal com mais informações sobre ingressos; 🔸 Histórico de ingressos. 🟠 Pendências: 🔺 Cadastro de parceiros; 🔺 Verificação e ativação de ingressos (QR Code); 🔺 Geração de certificados; 🔺 Outras formas de pagamento; 🔺 Sorteios integrados; 🔺 Badges e pontuações; 🔺 Geração de relatórios. Futuramente melhorarei os processos e adicionarei as funcionalidades conforme a demanda. 💪 EN: Good afternoon, everyone! How’s it going? I’d like to share the progress of an application (still in development) for the Nobre Group’s Event Hub. Since it involves Mercado Pago\'s payment API, it requires extra attention, so I moved it back to the bac',
    date: { pt: '19 de nov. de 2024', en: 'Nov 19, 2024' },
    reactions: 30,
    commentsTotal: 12,
    comments: [
      { author: 'Gustavo Pasqua', text: 'Mais um projeto feito com excelência, gratificante ver seu progresso continuo. Meus parabéns! 😁😁' },
      { author: 'Erick Lopes', text: 'excelente projeto, irmão! 🚀 sucesso demais 👏🏽' },
      { author: 'José Augusto Júnior', text: '👏🏻👏🏻👏🏻👏🏻👏🏻' },
      { author: 'João Erick Barbosa', text: 'Muito bom, mano! Parabéns 👏🏾👏🏾' },
      { author: 'Láiza Naline André de Oliveira Mascarenhas', text: 'Genial Brabo demais' },
      { author: 'Gabriel Silva Queiroz', text: 'Projeto feraaa meu irmão, fico feliz demais em ver sua evolução!! 🚀🚀' },
    ],
  },
  biometria: {
    url: 'https://www.linkedin.com/posts/bisnet0_frontend-webdeb-javascript-activity-7227072365472448514-m9m7',
    kind: 'linkedin',
    text: 'Olá, pessoal! ✋🏻 Hoje quero compartilhar com vocês uma atualização importante de uma ideia que já foi implementada dentro do Grupo Nobre: uma página que permite aos alunos e funcionários da instituição cadastrarem sua biometria facial de forma simples e sem burocracia. Inicialmente, minha tarefa era apenas reformular o guia de coleta biométrica.🔒 No entanto, percebi que havia potencial para transformar essa tarefa em uma aplicação web responsiva com integrações de câmera com o navegador. Por isso, refatorei o código do meu colega e amigo Lucas Menezes, mantendo todas as regras de negócio que já haviam sido testadas, validadas e implementadas. E, adicionei o componente de câmera para dispositivos maiores, caso disponíveis. 💻 Neste frontend do projeto, utilizei JavaScript puro para dar vida aos cards e implementei transições com CSS. No backend, optei por Node.js para alinhar melhor as regras de negócio com a aplicação original, que foi desenvolvida em Python. Agora, compartilho com vocês um preview do resultado, antes do deploy oficial da aplicação! 😁 #Frontend #WebDeb #JavaScript #Coding #Security #Programming #Backend #Node #Development …mais 24 5 comentários Gostei Comentar Compartilhe Kailany Sampaio 2 a Muito bom Henrique!! Parabéns 👏 Gostei Responder 1 Reação Erik do Carmo Marques 2 a Parabéns meu amigo! Top demais Gostei Responder 1 Reação Vitor Silva de Jesus 2 a Muito B',
    date: { pt: '7 de ago. de 2024', en: 'Aug 7, 2024' },
    reactions: 24,
    commentsTotal: 5,
    comments: [
      { author: 'Kailany Sampaio', text: 'Muito bom Henrique!! Parabéns 👏' },
      { author: 'Erik do Carmo Marques', text: 'Parabéns meu amigo! Top demais' },
      { author: 'Vitor Silva de Jesus', text: 'Muito Bom mano!' },
    ],
  },
  aniversariantes: {
    url: 'https://www.linkedin.com/posts/bisnet0_webdev-desenvolvimentoweb-nodejs-activity-7220542341504245760-yEhG',
    kind: 'linkedin',
    text: 'Olá, rede! Espero que todos estejam bem. :) Hoje, gostaria de compartilhar um desafio interessante que recebi, relacionado à gestão do tempo, conhecimento e demanda. 🚀 O Grupo Nobre possui várias aplicações, feitas por ótimos desenvolvedores ao longo do tempo. No entanto, devido à rotatividade dos projetos, uma aplicação específica ainda não havia sido desenvolvida: uma página web responsiva para mostrar as datas dos aniversariantes do mês dos funcionários do GN. Para essa aplicação, utilizei HTML, CSS e JavaScript (além de Node.Js no backend). Anteriormente, decidi armazenar as informações em um arquivo .xlsx devido a problemas com a conexão ao banco de dados de testes que tive, mas foram solucionados posteriormente. 💻 Enfrentei alguns principais desafios: 🔙 Backend: As requisições retornavam erros por causa da instabilidade do banco de dados de testes. Além disso, as datas dos funcionários chegavam corretamente no response, mas apareciam invertidas no frontend (dias e meses trocados). 📲 Responsividade: Apesar do uso de Media Queries, alguns dispositivos apresentavam particularidades que exigiam ajustes adicionais. Esforcei-me para abranger o máximo possível de smartphones e tablets. Depois de descobrir que os problemas de conexão estavam mais relacionados ao banco de dados de testes, refatorei o código para fazer as requisições diretamente do banco na produção. Funcionou! Ago',
    date: { pt: '20 de jul. de 2024', en: 'Jul 20, 2024' },
    reactions: 21,
    commentsTotal: 11,
    comments: [
      { author: 'Igor Nascimento', text: 'Muito bom, mano' },
      { author: 'Kaíke Falcão', text: 'parabéns pelo projeto, muito bom ver seu avanço !' },
      { author: 'Gabriel Silva Queiroz', text: 'Muito boom meu mano, parabéns pelo projeto, você é fera!! 🚀🚀' },
      { author: 'Vitor Silva de Jesus', text: 'Top mano!' },
      { author: 'Gustavo Pasqua', text: 'Ficou bonito demais, parabéns pelo progresso, meu mano 🚀🚀' },
      { author: 'Aline Alexandre', text: 'Muito útil.' },
    ],
  },
  'renovame': {
    url: 'https://github.com/bisnet0/renova-me',
    kind: 'repo',
    text: 'Site institucional pro bono para uma comunidade nova. HTML, CSS e nada além disso — o tipo de projeto em que cada pixel precisa justificar a existência.',
    date: { pt: 'repo público', en: 'public repo' },
    repo: 'renova-me',
    language: 'HTML',
    pushedAt: '2024-10-16',
    comments: [],
  },
  'customizer': {
    url: 'https://github.com/bisnet0/Replace_RM_Folder',
    kind: 'repo',
    text: 'Script configurável em Python para trocar páginas dos portais acadêmicos. Antes: copiar arquivo por arquivo. Depois: um YAML e um comando.',
    date: { pt: 'repo público', en: 'public repo' },
    repo: 'Replace_RM_Folder',
    language: 'CSS',
    pushedAt: '2025-02-02',
    comments: [],
  },
  'tax-analysis': {
    url: 'https://github.com/bisnet0/DataScience',
    kind: 'repo',
    text: 'Análise preditiva de impostos de importação e exportação com dados de 2000 a 2024. Feature engineering vale mais que trocar o modelo.',
    date: { pt: 'repo público', en: 'public repo' },
    repo: 'DataScience',
    language: 'Jupyter Notebook',
    pushedAt: '2025-02-02',
    comments: [],
  },
}
