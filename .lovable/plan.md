

# Gerar HTML Estático para Hostinger

## O que será feito

Converter a landing page React do TurnX Clube em um **arquivo HTML único e autossuficiente** que pode ser enviado diretamente para a Hostinger, sem necessidade de Node.js, React ou build.

## Abordagem

Criar um arquivo `turnx-landing.html` em `/mnt/documents/` contendo:

1. **CSS inline completo** — todas as variáveis de cor, estilos dos botões 3D metálicos, glassmorphism, animações (shimmer, float, pulse-glow, gradient-shift, fade-in on scroll)
2. **HTML semântico** reproduzindo todas as seções: Hero, O que é, Experiências, Planos, Como Funciona, CTA Final, Footer
3. **JavaScript vanilla** para:
   - Intersection Observer (animações de fade-in ao scroll)
   - Indicador de scroll no hero
4. **Google Fonts** via link externo (Space Grotesk + Inter)
5. **Ícones SVG inline** substituindo os ícones do Lucide (Star, Check, Lock, ChevronRight, Users, Calendar, ShoppingBag, etc.)
6. **Imagens**: como as imagens são assets locais do projeto, serão substituídas por **placeholders com gradients** que simulam as fotos, ou o usuário poderá trocar os `src` pelos URLs reais das imagens na Hostinger

## Estrutura do arquivo

```text
turnx-landing.html
├── <head>
│   ├── Meta tags (charset, viewport, SEO)
│   ├── Google Fonts link
│   └── <style> (todo o CSS inline)
├── <body>
│   ├── Hero Section
│   ├── O que é o TurnX Clube
│   ├── Experiências (5 cards)
│   ├── Planos (Gratuito vs TurnX-Around)
│   ├── Como Funciona (3 passos)
│   ├── CTA Final
│   ├── Footer
│   └── <script> (Intersection Observer + animações)
```

## Detalhes técnicos

- **Responsivo**: media queries para mobile/tablet/desktop
- **X dourado**: todas as menções de "TurnX" terão o X com gradiente dourado via `<span class="text-gradient-gold">`
- **Botões**: classe `.btn-metallic-3d` com gradiente dourado, sombra 3D e efeito shimmer
- **Sem dependências**: arquivo 100% standalone, basta fazer upload na Hostinger

## Entrega

Arquivo gerado em `/mnt/documents/turnx-landing.html` pronto para download e upload na Hostinger.

