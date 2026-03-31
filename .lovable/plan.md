

# Landing Page Persuasiva — TurnX Clube

## Visão Geral

Landing page dark premium com efeitos visuais modernos, destacando os dois planos (Gratuito vs Turn-Around R$229,90) e criando urgência com o modelo "somente convidados".

## Estrutura da Página

### 1. Hero Section
- Título impactante: "Sua rede define seu futuro"
- Subtítulo sobre comunidade exclusiva de empresários
- Badge "Somente Convidados" com efeito glow
- CTA principal: "Quero meu convite"
- Background com gradient animado (dark com toques dourados/âmbar)

### 2. Seção "O que é o TurnX Clube"
- Breve descrição da comunidade
- 3-4 ícones com benefícios-chave (Networking, Eventos, Marketplace, Conteúdo)
- Animações de entrada (fade-in ao scroll)

### 3. Comparativo de Planos
- Duas colunas lado a lado (responsivo)
- **Gratuito**: lista de benefícios com indicadores visuais de limitação (cadeado nos itens restritos)
- **Turn-Around R$229,90/mês**: lista completa com check marks, badge "Recomendado", efeito de destaque/glow
- CTA em cada plano

### 4. Seção de Experiências
- Cards visuais com: Jantares, Expedições, Podcasts, Visitas a empresas, Centro de Treinamento MOA
- Imagens placeholder com overlay gradient
- Efeito hover com zoom sutil

### 5. Como Funciona
- 3 passos: Receba o convite → Escolha seu plano → Conecte-se
- Layout horizontal com ícones numerados

### 6. CTA Final
- Frase de urgência: "Vagas limitadas para convidados"
- Botão grande com efeito pulse

## Estilo Visual
- Paleta: fundo escuro (#0a0a0a), dourado/âmbar para destaques, branco para texto
- Tipografia grande e bold nos títulos
- Glassmorphism nos cards
- Animações CSS: fade-in on scroll, hover effects, gradient animations
- Sem dependências externas de animação (CSS puro + Tailwind)

## Arquivos a Criar/Editar
1. **src/pages/Index.tsx** — componente principal da landing page
2. **src/index.css** — variáveis de cor atualizadas para tema dark premium

## Notas Técnicas
- Responsivo mobile-first (viewport atual é 286px)
- Intersection Observer para animações on-scroll
- Imagens via gradients e SVG inline (sem assets externos)
- Seção de planos com destaque visual claro no plano pago

