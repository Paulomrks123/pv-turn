

# Redesign Premium — SECC Landing Page

## 1. DIAGNÓSTICO CRÍTICO

### Primeira Dobra (3 segundos)
- **Hero sobrecarregado**: Badge + H1 + subtítulo + vídeo + 2 botões = muita informação competindo. O olho não sabe onde pousar.
- **Vídeo acima do CTA**: O vídeo empurra o CTA principal para fora da viewport em mobile (286px de largura atual). O usuário precisa scrollar para ver o botão.
- **Badge genérico**: "⚡ Vagas limitadas" com emoji parece amador, não premium.

### Hierarquia e Fluxo
- **Excesso de seções com peso igual**: Quebra de Crença, Posicionamento, Mecanismo, Para Quem É, O que Você Ganha — 5 seções de texto corrido antes de qualquer prova social. Isso mata a retenção.
- **Dividers fracos**: Linhas de 16px não criam separação visual real. Todas as seções parecem uma parede de texto.
- **Cards em excesso**: Tudo é card-elevated — "Para Quem É", "O que Você Ganha", FAQ, depoimentos. Quando tudo tem destaque, nada tem destaque.

### Percepção de Valor
- **Animações excessivas e uniformes**: Tudo pulsa, tudo flutua, tudo entra com fade. Isso dilui o impacto e parece template.
- **Dois CTAs idênticos repetidos 3x**: "Entrar para a SECC" + "Solicitar curadoria" aparece hero, SECC Connect e CTA final — sem variação de contexto ou urgência.
- **Botão metálico 3D**: O shimmer + pulse + glow simultâneos criam um visual "clickbait", não premium.

### Mobile (atual 286px)
- **Texto hero muito grande**: `text-3xl` em 286px ocupa largura demais.
- **Cards com padding excessivo**: `p-5` e `p-6` em cards de 286px desperdiça espaço.
- **Sticky bar com 2 ThemeToggles**: Um fixo top-right + um na sticky bar = duplicação.

---

## 2. PLANO DE EXECUÇÃO

### A. Simplificar o Hero (alto impacto)
- Remover o badge emoji. Substituir por texto discreto sem borda.
- Mover vídeo para DEPOIS do CTA — CTA visível acima da dobra.
- Reduzir para 1 CTA principal no hero. "Solicitar curadoria" vira link secundário, não botão.
- Headline menor em mobile (`text-2xl`), com line-height mais apertado.

### B. Redesenhar Sistema de Botões
- Eliminar `.btn-metallic-3d` — substituir por botão sólido flat com micro hover (translate-y-1 + sombra sutil). Estilo Stripe/Vercel.
- Eliminar `.btn-pulse` e `.animate-pulse-glow` — sem animação contínua em botões. Pulsação só em momentos de urgência (seção final).
- Novo estilo: `bg-primary text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`.

### C. Reduzir Densidade de Cards
- Remover `card-elevated` das listas simples ("Para Quem É", "O que Você Ganha"). Usar items com borda-esquerda ou ícone simples, sem card.
- Manter `card-elevated` apenas em: Mecanismo (3 cards), Depoimentos, Planos, CTA Final.

### D. Consolidar Seções
- Fundir "Quebra de Crença" + "Posicionamento" em uma única seção. São redundantes.
- Mover "Prova Social" para ANTES dos planos — depoimentos devem preceder a decisão de compra.

### E. Paleta de Cores com Função
- Manter branco puro `#fff` de fundo, preto absoluto `#000` para texto.
- Primary: `hsl(215 100% 50%)` — azul Stripe (calls to action, links).
- Accent: `hsl(145 70% 42%)` — verde para checkmarks e confirmações (não azul nos checks).
- Muted: `hsl(220 15% 94%)` — cinza muito leve para fundos de seção alternados.
- Eliminar gradientes nos textos (`text-gradient-gold`). Usar cor sólida azul bold para destaques.

### F. Tipografia com Intenção
- Headlines: Space Grotesk 700, letter-spacing `-0.03em` (mais apertado = mais premium).
- Body: Inter 400, `text-base` (16px), line-height `1.65`.
- Muted text: Inter 400, `hsl(220 10% 45%)` — mais escuro que o atual.

### G. Microinterações com Propósito
- Cards: hover com `translate-y-1` + sombra crescente (não `translate-y-2` — sutil).
- FAQ: animação de altura com `max-height` transition (não aparecimento abrupto).
- Scroll sections: usar fundos alternados (branco / cinza `hsl(220 15% 97%)`) em vez de dividers.
- Remover ThemeToggle duplicado (manter só na sticky bar).

### H. Mobile First
- Hero: `min-h-[70vh]` em vez de `85vh`. Padding `py-10` em vez de `py-14`.
- Cards: `p-4` máximo. Gap `gap-3` em vez de `gap-5`.
- Fonte hero: `text-2xl` base, `sm:text-3xl`, `md:text-5xl`.
- Botões: largura full em mobile (`w-full`), inline em desktop.

---

## Arquivos Modificados

1. **`src/index.css`** — Nova paleta, remover animações excessivas (pulse-glow, shimmer, metallic-3d), novo sistema de cards simplificado, seções alternadas.
2. **`src/pages/Index.tsx`** — Reestruturar hero (CTA acima do vídeo), fundir seções, reordenar fluxo (prova social antes de planos), simplificar botões, remover ThemeToggle duplicado, ajustar responsividade mobile.

