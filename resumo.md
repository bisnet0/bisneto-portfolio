# Resumo do Projeto — Portfólio Henrique Bisneto

## Visão geral

Portfólio bilíngue de engenheiro de software organizado em **ambientes separados por rota**, cada um com linguagem visual própria:

| Rota | Ambiente | Design |
| --- | --- | --- |
| `/` | Hub | landing curta que apresenta as duas trilhas |
| `/frontend` | Frontend | liquid glass, Instrument Serif + Sora, acento verde-sálvia |
| `/backend` | Backend | "hard coding": preto quase absoluto, JetBrains Mono, azul elétrico, janela de IDE ao fundo |

- Site publicado: `https://www.henriquebisneto.com.br`
- Repositório: `git@github.com:bisnet0/bisneto-portfolio.git`
- Branch de desenvolvimento: `NEW-LAYOUT`
- Tema claro/escuro e idioma PT/EN persistidos em cookies (`portfolio-theme`, `portfolio-language`)
- O vídeo pessoal **saiu da landing** (arquivos preservados em `refs/video/` para a futura seção pessoal)

## Stack

| Camada | Tecnologia |
| --- | --- |
| Build | Vite 6 + TypeScript 5.6 |
| UI | React 18 + MUI 6 + Emotion |
| Rotas | react-router-dom 7 (BrowserRouter + fallback `404.html`) |
| Animação | Framer Motion 12 |
| Deploy | GitHub Actions → build + push para a branch `gh-pages` |
| Fontes | Instrument Serif, Sora, JetBrains Mono (Google Fonts) |

## Estrutura

```text
src/
├─ App.tsx                        # rotas / /frontend /backend
├─ theme.ts                       # tema MUI por ambiente (frontend | backend | hub) × light/dark
├─ styles/global.css              # tokens por data-track, liquid glass, painéis IDE, cursor, caret
├─ context/
│  ├─ preferences.ts              # contexto de tema e idioma
│  └─ PreferencesProvider.tsx     # cookies, preferência do sistema, <html lang>, meta description
├─ content/
│  ├─ portfolio.ts                # copy global, 8 projetos (slug, imagens, links), URLs
│  ├─ tracks.ts                   # copy + curadoria de projetos por ambiente
│  └─ postComments.ts             # post, métricas e comentários de cada projeto
├─ components/
│  ├─ TrackTheme/                 # aplica data-track + ThemeProvider por rota
│  ├─ SiteNav/                    # navegação entre ambientes + idioma/tema
│  ├─ TrackHero/                  # foto, typing de código, colagem de fragmentos, rede neural
│  ├─ Credentials/                # premiações, certificados e estudos (bordas pulsando)
│  ├─ GalleryDialog/              # lightbox compartilhado (projetos + credenciais)
│  ├─ ProjectDeck/                # deck → cascata (motor de scroll) + post do canto oposto
│  ├─ ProjectCard/                # card do projeto (glass ou IDE) com carrossel automático
│  ├─ PostPanel/                  # post real (LinkedIn/GitHub) do projeto, com métricas reais
│  ├─ CommentStorm/               # comentários do post espalhados sobre a linha
│  ├─ AudioPlayer/                # rádio flutuante (playlist + volume + skip + SFX)
│  ├─ ScrollTopButton/            # voltar ao topo (float canto inferior direito)
│  ├─ lib/sfx.ts                  # sons sintetizados (typing e clique) via WebAudio
│  ├─ lib/youtube.ts              # loader tipado da IFrame API
│  ├─ ProjectGallery/             # Dialog com galeria + thumbnails + teclado
│  ├─ TrackContact/               # contato + footer
│  ├─ NeuralField/                # canvas de nós/células com repulsão do cursor
│  ├─ CustomCursor/               # cursor personalizado (só ponteiro fino)
│  ├─ TypingText/                 # efeito de digitação (respeita reduced motion)
│  └─ WindowBackdrop/             # fundo "janela de IDE" do ambiente backend
└─ pages/
   ├─ Hub/Hub.tsx
   └─ Track/TrackPage.tsx
public/
├─ me/nocanva.png|webp            # retrato (webp 35 KB usado no hero)
├─ textures/window-plate.webp     # textura do fundo backend
├─ projects/*.png + covers/*.webp # capturas e capas dos 8 projetos
└─ CNAME, .nojekyll
refs/                             # vídeos e referências de design (fora do deploy, gitignored)
```

## Design system por ambiente

Os tokens vivem em `global.css` sob `:root[data-track='...'][data-theme='...']`; o atributo `data-track` é escrito por `TrackTheme` (e por um script inline em `index.html` para evitar flash na primeira pintura).

- **Frontend** — `.liquid-glass` / `.liquid-glass-strong` (blur 4px / 50px, borda em gradiente com `mask-composite`), títulos em Instrument Serif itálico, acento `#d9e5c5` (dark) / `#06462d` (light).
- **Backend** — paleta amostrada do vídeo de referência: base `#000004`, glow indigo `#0c1848`→`#243c6c`, acento `#5b8bff` (dark) / `#06462d` (light). Tipografia mono (JetBrains Mono), superfícies `.panel` com borda 1px, `.ide-grid`, `.scanlines`, cantos de 6–12px.
- **Hub** — neutro, reaproveita o glass.

## Motor do deck (frontend e backend usam o mesmo)

`ProjectDeck` mantém uma seção alta com um palco `sticky` de 100vh:

1. **Estado inicial:** todos os cards lado a lado em uma fila (deck) **colada na base da tela** (`vh - altura - 26px`), já com o conteúdo completo visível em escala reduzida (`deckCardW / cardW`, ~0,36) — capa, título, descrição, chips e botões, sem bloco vazio. O painel de detalhes fica com `pointer-events: none` enquanto o card está na fila, então clicar nele sempre pula para a linha do projeto.
   - Hover em um card da fila: ele sobe 26 px, cresce 1,22×, ganha sombra e os outros cards recebem `blur(3px) + saturate(.75) + opacity .55` (efeito de vidro líquido).
   - A fila é deslocada para a direita (`safeLeft` 468 px em telas ≥1280) para não encostar na rádio flutuante; as larguras dos cards são recalculadas para caber no espaço restante.
2. **Scroll:** o progresso da seção (`useScroll` com `offset: ['start start','end end']`) alimenta uma câmera virtual e o *timing* individual de cada card. Card *i* voa da fila para o seu slot da cascata (`translate` + `scale` + leve `rotate`), alternando esquerda/direita; o painel de informações abaixo do card aparece ao chegar.
3. **Leitura:** a câmera ancora cada card no centro/topo do viewport conforme ele pousa; há uma cauda (`TAIL`) após o último pouso para terminar de ler.
4. **Canto oposto:** ao lado do card, na mesma linha, entra o post real do projeto (`PostPanel`) com o texto original, reações, contagem de comentários e link. O fade é curto: o painel chega a 100% de opacidade em ~3% do progresso logo após o card pousar (antes eram ~13%). Hover no post dispara o `CommentStorm` com os **comentários reais** capturados, presos ao retângulo da linha (`overflow: hidden`), sem invadir as linhas vizinhas.
5. **Carrossel:** cada card cicla as próprias capturas a cada 2,4 s (crossfade + contador `04/13` + barra de progresso), pré-carrega o próximo frame e **pausa no hover** do card ou pelo botão de pausa.
6. **Clique em um card da fila** → scroll suave até o slot daquele projeto (`jumpTo`); clique no card já pousado abre a galeria.
7. **Fallback:** abaixo de 1024px ou com `prefers-reduced-motion` o componente troca para uma cascata estática (card + post empilhados, storm limitado a 3 chips dentro do bloco).
8. **Fila com mais de 6 cards:** o deck passa a usar duas fileiras de `ceil(n/2)` cards (backend tem 8 → 2×4) em vez de espremer oito miniaturas numa linha.

Alturas: seção = `100vh + (n × 95vh + 52vh)`; o card mede a altura real via `ResizeObserver` para calcular `rowHeight` e a âncora da câmera (centraliza quando cabe, encosta no topo quando o viewport é baixo).

## Conteúdo

- 11 cases reais em `portfolio.ts`, cada um com `slug`, período, descrição, stack, galeria e links.
- `tracks.ts` define **quais** projetos aparecem em cada ambiente, com uma linha de foco própria (`focus`) e um selo (`highlight`):
  - Frontend (6): Gestão de Polos, Tutoriais Medicina/Escola Nobre, Igreja Renova-me, Customizador de Portal, Portal do Cliente (app white-label), RiftShield (dashboard React 19).
  - Backend (8): Biometria Facial, Hub de Eventos Nobre, Aniversariantes do Mês, Análise Preditiva Tributária, Gestão de Polos (serviço), Portal do Cliente (filas/Redis/Socket.IO), RiftShield (FastAPI/YOLOv8/LangGraph), EpiScope (ML + Cartesi).
- `credentials.ts` guarda três coleções: `awards` (1º lugar Cartesi/UFBA e 2º lugar BYTECRAFT), `certificates` (Blockchain/Web3/Cartesi, Java completo, Reprograme-se, Trilhando Carreiras, TCC, Hackathon FIAP) e `studies` (AWS NER/VoC, RabbitMQ + META API, Cartesi RISC-V).
- Tudo bilíngue (`pt` / `en`); a troca de idioma anima de novo o typing.

## Seção de credenciais

`Credentials` aparece depois do deck, no fim das duas trilhas, em três blocos:

- **Premiações** — dois cards grandes (`award-card--gold` / `award-card--silver`) com badge de 1º/2º lugar e borda pulsando em ouro ou prata (`pulse-gold`, `pulse-silver`).
- **Certificados** — grid de 6 cards com ícone, miniatura e descrição; borda pulsando em azul (`pulse-blue`).
- **Estudos** — 3 cards de pesquisa aplicada com link para o post.

Qualquer card abre o `GalleryDialog` compartilhado (imagens, thumbnails, setas e Esc), que também atende aos projetos. Todas as animações são desligadas por `prefers-reduced-motion`.

Todo card com mais de uma imagem usa o `AutoCarousel` (mesmo comportamento dos projetos): crossfade a cada 2,4 s, contador `01/04`, barra de progresso, pausa no hover e botão de pausa fixa; só cicla quando o card está pelo menos 20% visível (`IntersectionObserver`).

## Micro-interações

- **Typing:** `TypingText` digita as linhas de "código" do hero e a descrição de cada card ao pousar; texto completo exposto em `.sr-only`. Cada caractere dispara um clique curto sintetizado (`sfx.key`), com throttle de 22 ms.
- **Rede neural:** `NeuralField` desenha nós e conexões; o ponteiro **empurra** os nós (raio 150–170px), o que dá o efeito de "afastar as coisas".
- **Dados reais:** `src/content/postComments.ts` é gerado a partir das páginas públicas do LinkedIn (texto do post, data derivada do ID da atividade, reações, total de comentários e os comentários visíveis ao visitante — o guest view entrega parte da thread, ex.: 10 de 22; a UI mostra essa proporção). Para os três repositórios, os metadados vêm da API pública do GitHub (linguagem, último push).
- **Cursor personalizado:** retículo (anel 1 px + mira em cruz + ponto) que cresce para 60 px em elementos interativos, encolhe no clique e dá glitches (jitter + fatias fantasmas) ao entrar/sair de controles, a cada clique e em intervalos aleatórios. `cursor: none !important` é aplicado em `html[data-custom-cursor='on']`, `body.custom-cursor-on` e todos os descendentes; desativado em touch e com reduced motion.
- **Som:** `sfx.ts` gera tudo por WebAudio (nenhum arquivo de áudio no bundle). Cada tecla tem duas camadas: corpo grave (triângulo + lowpass, "thock") e clique plástico (ruído em bandpass 2,1–3,7 kHz), com variação por tecla e teclas largas mais graves a cada 13. O clique de UI é um thump senoidal + ruído em bandpass, passando por um highshelf de −4 dB. Botão de ondas no player liga/desliga.
- **Rádio:** player flutuante na base com playlist do YouTube (`PLsVfn9YIFmNBaILsPtU3Vu3KLbsZ4R7oG`) a 16% de volume por padrão, com play/pause, faixa anterior, parar, próxima faixa, volume, mute e sons de interface — tudo persistido no cookie `portfolio-audio`. O embed fica 1×1 e invisível; a UI é própria. Autoplay depende de gesto do usuário.
- **Rede neural global:** `NeuralField` é montado uma vez por página (`fixed`, atrás de tudo) em `/frontend` e `/backend`; o ponteiro empurra os nós em qualquer seção, não só no hero.
- **Voltar ao topo:** botão flutuante no canto inferior direito, aparece depois de 700 px de scroll.
- **Marca:** o logo da navbar é a foto (`.webp`), recortada em círculo/quadrado conforme o ambiente.
- **Foto:** retrato em destaque acima do deck, cercado por fragmentos de código (CSS, motion, deploy, API) em vez de recortes de viagem.

## Scripts

```bash
npm run dev      # Vite em 0.0.0.0:3000
npm run lint     # ESLint
npm run build    # tsc -b + vite build + postbuild (404.html e entradas /frontend e /backend)
npm run preview  # Pré-visualização do build
npm run deploy   # Build + publicação em gh-pages
```

## Deploy e rotas

- `.github/workflows/deploy.yml` roda em todo push para `main` ou `NEW-LAYOUT` (e por `workflow_dispatch`): `npm ci` → `npm run lint` → `npm run build` → publica `dist` na branch `gh-pages` com o `GITHUB_TOKEN` (force-push, histórico descartável). O GitHub Pages continua configurado como "Deploy from branch: gh-pages / root", então o push publica em ~1 min.
- `scripts/postbuild.mjs` escreve, a partir do build: `dist/404.html` (fallback da SPA) e `dist/frontend/index.html` + `dist/backend/index.html` — assim essas rotas respondem **200** (com `301` de `/frontend` → `/frontend/`) e cada uma carrega seu próprio `<title>`, `description`, `canonical` e `og:url`.
- `public/CNAME` preserva `www.henriquebisneto.com.br`; o apex faz 301 para o `www` pelos registros A do GitHub Pages.
- `public/.nojekyll` evita o processamento Jekyll.
- Para usar o pipeline nativo (`actions/upload-pages-artifact` + `actions/deploy-pages`) basta trocar Settings → Pages → Source para "GitHub Actions"; hoje o workflow publica na branch para não depender dessa configuração.

## Validação executada

- `npm run lint` sem erros.
- `npm run build` concluído (JS 524 kB / 172 kB gzip; CSS 7,4 kB).
- Rotas `/`, `/frontend`, `/backend` carregadas no navegador sem erro de console e sem imagens quebradas.
- Deck verificado em 1440×900 e 1280×569: fila alinhada em `p=0`, cards alternando esquerda/direita (`x=79` / `x=698`), último card inteiro no viewport ao final, `jumpTo` do deck levando ao projeto correto, galeria abrindo com 6 imagens no card de teste.
- Layout compacto verificado em 390×800 (cascata empilhada, sem palco sticky).
- Troca de tema (dark→light em `/backend`: fundo `#f3f7ec`, acento `#06462d`) e de idioma (PT→EN) verificadas via DOM.
- Canvas neural renderizando (~1% de pixels pintados com nós + conexões).
- Deck na base: em 1440×900 a fila fica com topo em y≈697 e base em 894–901 px (viewport 900), começando em `x=468` — sem sobreposição com a rádio (verificado por interseção de retângulos: `overlap: false`).
- Hover no deck: card em `matrix(1.22, 0, 0, 1.22, 0, -26)` e os demais com `blur(3px) saturate(0.75)` / `opacity .55`.
- Posts com dados reais: 8 posts do LinkedIn (22/10/12/5/11/11/8/3 comentários declarados; 10/6/6/3/6/5/7/2 capturados) + 3 repositórios com linguagem e último push reais.
- Novos cases: Portal do Cliente, RiftShield e EpiScope com capa WebP e 7–8 frames de galeria cada (vídeos-fonte movidos para `refs/media/`, fora do deploy).
- Credenciais: 2 premiações, 6 certificados e 3 estudos renderizados; animações `pulse-gold`, `pulse-silver` e `pulse-blue` confirmadas por `getComputedStyle`; galeria abre com título e imagens corretos.
- Deck com 8 cards verificado em duas fileiras (topo 471 px, segunda fileira 686 px em 1440×900) sem sobrepor a rádio (x inicial 468 px).
- Uma única instância de canvas por página com `position: fixed` (rede neural global) e marca da navbar apontando para `/me/nocanva.webp`.
- Botão "Voltar ao topo" aparecendo após scroll e levando `scrollY` a 0 no clique.
- Player expondo 6 controles (Tocar, Faixa anterior, Parar, Próxima faixa, Silenciar, Sons de interface).
- Posts renderizados nas linhas (5/5 em `/backend`, 4/4 em `/frontend`), com opacidade revelada por linha (0 nas futuras).
- Storm: 5 chips no desktop, todos dentro do retângulo da linha (1125×428); 3 chips no mobile.
- Carrossel: contador avançando (`05/13` → `08/13` em 5 s) e congelado durante o hover (`11/13` por 5 s).
- Sons: 57 osciladores gerados durante um typing + 1 oscilador e 1 buffer por pointerdown em botão.
- Player: iframe da playlist inicializado, título/duration lidos (`0:00 / 2:24`), layout 210×46 no mobile.

## Pendências conhecidas

- Code splitting: o bundle principal passa de 500 kB (aviso do Vite). Candidato natural: separar MUI e as rotas com `React.lazy`.
- Imagens da galeria antiga em `public/projects/*.png` somam ~40 MB; converter para WebP reduziria o deploy (as novas pastas já são WebP).
- O LinkedIn limita o guest view e às vezes exige login: em uma segunda passada os comentários dos 3 posts novos foram capturados, mas rodadas repetidas podem ser bloqueadas.
- A seção pessoal (posts, imagens e o vídeo antigo) ainda não existe; os vídeos estão em `refs/video/` e `refs/` está no `.gitignore`.
- Os comentários são reais, mas o LinkedIn limita o guest view (ex.: 10 de 22). Para capturar a thread inteira é preciso estar logado; os dados vivem em `src/content/postComments.ts` e podem ser completados manualmente.
- O fade do post pode ser afinado em `ProjectDeck` (`reveal` window) e o deslocamento da fila em `safeLeft`.
- Autoplay da rádio não pode ser verificado em navegador headless (sem gesto confiável); em uso normal o play inicia no primeiro clique/tecla.
- O merge entre `gh-pages` e `main` (anotado no OpenCode) segue pendente — `main` ainda está 2 commits atrás de `NEW-LAYOUT` e é ela que o Dependabot usa como referência.
- `npm run deploy` (pacote `gh-pages`) virou legado: o deploy agora é feito pelo workflow.
