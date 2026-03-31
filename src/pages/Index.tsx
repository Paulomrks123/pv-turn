import { useEffect, useRef, useState } from "react";
import { Check, Lock, Users, Calendar, ShoppingBag, Newspaper, ChevronRight, Star, Mountain, Mic, Building2, Dumbbell, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import dinnerImg from "@/assets/dinner-event.jpg";
import expeditionImg from "@/assets/expedition.jpg";
import podcastImg from "@/assets/podcast.jpg";
import companyVisitImg from "@/assets/company-visit.jpg";
import trainingImg from "@/assets/training-center.jpg";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* animated bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary animate-gradient" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(38 92% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(38 80% 45% / 0.1) 0%, transparent 50%)" }} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <Section>
          <Badge className="mb-6 px-4 py-1.5 text-xs tracking-widest uppercase border-primary/40 bg-primary/10 text-primary animate-pulse-glow">
            <Star className="w-3 h-3 mr-1.5" /> Somente Convidados
          </Badge>
        </Section>

        <Section delay={150}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Sua rede define{" "}
            <span className="text-gradient-gold">seu futuro</span>
          </h1>
        </Section>

        <Section delay={300}>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            O clube exclusivo que conecta empresários de alta performance através de experiências únicas, networking estratégico e oportunidades reais de negócio.
          </p>
        </Section>

        <Section delay={450}>
          <Button size="lg" className="btn-metallic-3d text-base px-8 py-6 rounded-full border-0 hover:bg-transparent">
            Quero meu convite <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </Section>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── O que é ─────────────────────────────────────────────────
const pillars = [
  { icon: Users, title: "Networking", desc: "Conexões estratégicas com empresários de alto nível" },
  { icon: Calendar, title: "Eventos", desc: "Jantares, expedições e encontros exclusivos" },
  { icon: ShoppingBag, title: "Marketplace", desc: "Oportunidades de negócio entre membros" },
  { icon: Newspaper, title: "Conteúdo", desc: "Feed exclusivo e participação no podcast" },
];

function WhatIs() {
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            O que é o <span className="text-gradient-gold">TurnX Clube</span>?
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
            Uma comunidade curada de empresários que acreditam que crescimento real vem de conexões genuínas e experiências transformadoras.
          </p>
        </Section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((p, i) => (
            <Section key={p.title} delay={i * 100}>
              <div className="glass rounded-xl p-5 sm:p-6 text-center hover:glow-amber transition-shadow duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">{p.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-snug">{p.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Planos ──────────────────────────────────────────────────
const freeFeatures = [
  { text: "Acesso ao feed de conteúdo", included: true },
  { text: "2 eventos online por mês", included: true },
  { text: "Visualizar eventos exclusivos", included: true },
  { text: "Visualizar marketplace", included: true },
  { text: "Ofertar no marketplace (com curadoria)", included: true },
  { text: "Participar de eventos presenciais", included: false },
  { text: "Contato direto com membros", included: false },
  { text: "Receber contatos de interessados", included: false },
  { text: "Grupo exclusivo WhatsApp", included: false },
];

const proFeatures = [
  "Acesso ao feed de conteúdo",
  "Eventos online ilimitados",
  "Eventos presenciais exclusivos",
  "Marketplace completo com contato direto",
  "Grupo exclusivo de WhatsApp",
  "Convidado para criar conteúdo",
  "Networking fechado e recorrente",
  "Jantares e palestras exclusivas",
  "Expedições de aventura",
  "Acesso ao Centro de Treinamento MOA",
  "Visitas a empresas",
  "Convite para o Podcast",
];

function Plans() {
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Escolha seu <span className="text-gradient-gold">nível de acesso</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            Comece gratuitamente ou desbloqueie todo o potencial do clube.
          </p>
        </Section>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Free */}
          <Section>
            <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-1">Gratuito</h3>
              <p className="text-muted-foreground text-sm mb-6">Somente convidados</p>
              <div className="text-3xl font-bold mb-6">R$ 0<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
              <ul className="space-y-3 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                    )}
                    <span className={f.included ? "" : "text-muted-foreground/50"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 w-full rounded-full border-primary/40 text-primary hover:bg-primary/10">Solicitar Convite</Button>
            </div>
          </Section>

          {/* Pro */}
          <Section delay={150}>
            <div className="relative glass rounded-2xl p-6 sm:p-8 h-full flex flex-col border-primary/30 glow-amber">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs uppercase tracking-wider">Recomendado</Badge>
              <h3 className="text-xl font-bold mb-1">Turn-Around</h3>
              <p className="text-muted-foreground text-sm mb-6">Acesso completo ao clube</p>
              <div className="text-3xl font-bold mb-6">R$ 229<span className="text-lg">,90</span><span className="text-sm font-normal text-muted-foreground">/mês</span></div>
              <ul className="space-y-3 flex-1">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full rounded-full glow-amber hover:glow-amber-strong transition-shadow">Quero ser membro</Button>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}

// ─── Experiências ────────────────────────────────────────────
const experiences = [
  { img: dinnerImg, title: "Jantares Exclusivos", desc: "Conexões em ambientes sofisticados", icon: UtensilsCrossed },
  { img: expeditionImg, title: "Expedições", desc: "Aventuras que transformam perspectivas", icon: Mountain },
  { img: podcastImg, title: "Podcast", desc: "Sua história inspirando outros empresários", icon: Mic },
  { img: companyVisitImg, title: "Visitas a Empresas", desc: "Aprenda nos bastidores de grandes negócios", icon: Building2 },
  { img: trainingImg, title: "Centro de Treinamento MOA", desc: "Supere limites com aventura e desafio", icon: Dumbbell },
];

function Experiences() {
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Experiências que <span className="text-gradient-gold">transformam</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            Mais do que networking — vivências que criam vínculos reais e abrem portas.
          </p>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {experiences.map((e, i) => (
            <Section key={e.title} delay={i * 100}>
              <div className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer">
                <img src={e.img} alt={e.title} loading="lazy" width={640} height={512} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <e.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-sm sm:text-base">{e.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm">{e.desc}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Como funciona ───────────────────────────────────────────
const steps = [
  { num: "01", title: "Receba o convite", desc: "Acesso exclusivo por indicação de um membro ou solicitação aprovada." },
  { num: "02", title: "Escolha seu plano", desc: "Comece grátis ou desbloqueie o acesso completo com o Turn-Around." },
  { num: "03", title: "Conecte-se", desc: "Participe de eventos, faça networking e gere negócios reais." },
];

function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            Como <span className="text-gradient-gold">funciona</span>
          </h2>
        </Section>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <Section key={s.num} delay={i * 150}>
              <div className="text-center">
                <div className="text-5xl font-bold text-gradient-gold mb-4">{s.num}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Final ───────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 px-4">
      <Section>
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-8 sm:p-14 glow-amber-strong">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Vagas <span className="text-gradient-gold">limitadas</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            O TurnX Clube é uma comunidade curada. Cada novo membro é selecionado para garantir o nível de excelência do grupo.
          </p>
          <Button size="lg" className="text-base px-10 py-6 rounded-full font-semibold animate-pulse-glow">
            Solicitar meu convite <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </Section>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-border/30 text-center">
      <p className="text-gradient-gold font-bold text-xl tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TURNX CLUBE</p>
      <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} TurnX Clube. Todos os direitos reservados.</p>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function Index() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Hero />
      <WhatIs />
      <Experiences />
      <Plans />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
}
