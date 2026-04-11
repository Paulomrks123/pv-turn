import { useEffect, useRef, useState, createContext, useContext } from "react";
import { ChevronRight, Shield, Crosshair, Lock, Briefcase, TrendingUp, Users, Target, Zap, Radio, Brain, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { translations, type LangCode } from "@/lib/translations";

const LangContext = createContext<Record<string, string>>(translations.pt);
function useT() { return useContext(LangContext); }

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

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const t = useT();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary animate-gradient" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(38 92% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(38 80% 45% / 0.1) 0%, transparent 50%)" }} />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <Section>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            TURN
          </h1>
        </Section>

        <Section delay={100}>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/90 mb-6 leading-tight">
            {t.hero_tagline}
          </p>
        </Section>

        <Section delay={200}>
          <p className="text-muted-foreground text-base sm:text-lg mb-2 max-w-xl mx-auto leading-relaxed">
            {t.hero_desc}
          </p>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl mx-auto font-medium">
            {t.hero_desc2}
          </p>
        </Section>

        <Section delay={300}>
          <p className="text-gradient-gold text-sm sm:text-base font-bold tracking-wide uppercase mb-8">
            {t.hero_proof}
          </p>
        </Section>

        <Section delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-metallic-3d text-base px-8 py-6 rounded-full border-0 hover:bg-transparent">
              {t.hero_cta1} <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full border-primary/40 text-primary hover:bg-primary/10">
              {t.hero_cta2}
            </Button>
          </div>
        </Section>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Quebra de Crença ─────────────────────────────────────────
function BeliefBreaker() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Section>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t.belief_title}<br />
            <span className="text-gradient-gold">{t.belief_title2}</span>
          </h2>
        </Section>
        <Section delay={150}>
          <p className="text-muted-foreground text-base sm:text-lg mb-4 leading-relaxed">
            {t.belief_text}
          </p>
          <p className="text-foreground font-semibold text-lg sm:text-xl mb-1">
            {t.belief_text2}
          </p>
          <p className="text-gradient-gold font-bold text-xl sm:text-2xl">
            {t.belief_text3}
          </p>
        </Section>
      </div>
    </section>
  );
}

// ─── Posicionamento ───────────────────────────────────────────
function Positioning() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <Section>
          <div className="glass rounded-2xl p-8 sm:p-12 glow-amber text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              {t.position_title}<br />
              <span className="text-gradient-gold">{t.position_title2}</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 leading-relaxed max-w-xl mx-auto">
              {t.position_text}
            </p>
            <p className="text-foreground font-medium text-base sm:text-lg mb-1">
              {t.position_text2}
            </p>
            <p className="text-gradient-gold font-bold text-lg sm:text-xl">
              {t.position_text3}
            </p>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Mecanismo ────────────────────────────────────────────────
function Mechanism() {
  const t = useT();
  const blocks = [
    { icon: Shield, title: t.mech_curation, desc: t.mech_curation_desc },
    { icon: Crosshair, title: t.mech_match, desc: t.mech_match_desc },
    { icon: Lock, title: t.mech_closed, desc: t.mech_closed_desc },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            {t.mech_title} <span className="text-gradient-gold">{t.mech_title2}</span>
          </h2>
        </Section>

        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <Section key={b.title} delay={i * 120}>
              <div className="glass rounded-xl p-6 sm:p-8 text-center hover:glow-amber transition-shadow duration-300 group h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <b.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Para quem é ──────────────────────────────────────────────
function WhoIsItFor() {
  const t = useT();
  const profiles = [
    { icon: Briefcase, text: t.who_1 },
    { icon: TrendingUp, text: t.who_2 },
    { icon: Users, text: t.who_3 },
    { icon: Target, text: t.who_4 },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14 leading-tight">
            {t.who_title}<br />
            <span className="text-gradient-gold">{t.who_title2}</span>
          </h2>
        </Section>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {profiles.map((p, i) => (
            <Section key={p.text} delay={i * 100}>
              <div className="glass rounded-xl p-5 sm:p-6 flex items-start gap-4 hover:glow-amber transition-shadow duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm sm:text-base font-medium leading-snug">{p.text}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Proposta de Valor ────────────────────────────────────────
function ValueProp() {
  const t = useT();
  const bullets = [t.value_1, t.value_2, t.value_3, t.value_4];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            {t.value_title} <span className="text-gradient-gold">{t.value_title2}</span>
          </h2>
        </Section>

        <div className="grid sm:grid-cols-2 gap-4">
          {bullets.map((b, i) => (
            <Section key={b} delay={i * 100}>
              <div className="glass rounded-xl p-5 flex items-center gap-3 hover:glow-amber transition-shadow duration-300">
                <Zap className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm sm:text-base font-medium">{b}</span>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TURN Connect ─────────────────────────────────────────────
function TurnConnect() {
  const t = useT();
  const features = [
    { icon: Radio, text: t.connect_1 },
    { icon: Brain, text: t.connect_2 },
    { icon: Mail, text: t.connect_3 },
    { icon: MessageSquare, text: t.connect_4 },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            {t.connect_title} <span className="text-gradient-gold">{t.connect_title2}</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14 text-base sm:text-lg">
            {t.connect_desc}
          </p>
        </Section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <Section key={f.text} delay={i * 100}>
              <div className="glass rounded-xl p-5 sm:p-6 text-center hover:glow-amber transition-shadow duration-300 group h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm sm:text-base">{f.text}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Prova Social ─────────────────────────────────────────────
function SocialProof() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t.social_title} <span className="text-gradient-gold">{t.social_title2}</span>
          </h2>
        </Section>
        <Section delay={150}>
          <div className="glass rounded-2xl p-8 sm:p-10 glow-amber">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed italic">
              "{t.social_text}"
            </p>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Planos ───────────────────────────────────────────────────
function Plans() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <Section>
            <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-1">{t.plan_free}</h3>
              <p className="text-primary text-sm font-medium mb-2">{t.plan_free_sub}</p>
              <p className="text-muted-foreground text-sm mb-8">{t.plan_free_desc}</p>
              <div className="text-3xl font-bold mb-8">R$ 0<span className="text-sm font-normal text-muted-foreground">{t.month}</span></div>
              <div className="mt-auto">
                <Button variant="outline" className="w-full rounded-full border-primary/40 text-primary hover:bg-primary/10 py-5">
                  {t.plan_free_cta} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Section>

          <Section delay={150}>
            <div className="relative glass rounded-2xl p-6 sm:p-8 h-full flex flex-col border-primary/30 glow-amber">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {t.plan_recommended}
              </div>
              <h3 className="text-2xl font-bold mb-1">{t.plan_pro}</h3>
              <p className="text-primary text-sm font-medium mb-2">{t.plan_pro_sub}</p>
              <div className="text-3xl font-bold mb-8">R$ 229<span className="text-lg">,90</span><span className="text-sm font-normal text-muted-foreground">{t.month}</span></div>
              <div className="mt-auto">
                <Button className="w-full rounded-full btn-metallic-3d border-0 hover:bg-transparent py-5">
                  {t.plan_pro_cta} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}

// ─── Urgência ─────────────────────────────────────────────────
function Urgency() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Section>
          <div className="glass rounded-2xl p-8 sm:p-12 border-destructive/20">
            <Lock className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.urgency_title} <span className="text-gradient-gold">{t.urgency_title2}</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              {t.urgency_text}
            </p>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── CTA Final ────────────────────────────────────────────────
function FinalCTA() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <Section>
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-8 sm:p-14 glow-amber-strong">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">
            {t.cta_title}
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gradient-gold leading-tight">
            {t.cta_title2}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-base sm:text-lg">
            {t.cta_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-metallic-3d text-base px-10 py-6 rounded-full border-0 animate-pulse-glow hover:bg-transparent">
              {t.cta_button1} <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-10 py-6 rounded-full border-primary/40 text-primary hover:bg-primary/10">
              {t.cta_button2}
            </Button>
          </div>
        </div>
      </Section>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  const t = useT();
  return (
    <footer className="py-10 px-4 border-t border-border/30 text-center">
      <p className="font-bold text-xl tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TURN</p>
      <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} TURN. {t.footer_rights}</p>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Index() {
  const [lang, setLang] = useState<LangCode>("pt");
  const t = translations[lang];

  return (
    <LangContext.Provider value={t}>
      <main className="bg-background text-foreground overflow-x-hidden">
        <LanguageSwitcher current={lang} onChange={setLang} />
        <Hero />
        <BeliefBreaker />
        <Positioning />
        <Mechanism />
        <WhoIsItFor />
        <ValueProp />
        <TurnConnect />
        <SocialProof />
        <Plans />
        <Urgency />
        <FinalCTA />
        <Footer />
      </main>
    </LangContext.Provider>
  );
}
