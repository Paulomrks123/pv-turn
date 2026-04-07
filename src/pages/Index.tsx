import { useEffect, useRef, useState, createContext, useContext } from "react";
import { Check, Lock, Users, Calendar, ShoppingBag, Newspaper, ChevronRight, Star, Mountain, Mic, Building2, Dumbbell, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { translations, type LangCode } from "@/lib/translations";

import dinnerImg from "@/assets/dinner-event.jpg";
import expeditionImg from "@/assets/expedition.jpg";
import podcastImg from "@/assets/podcast.jpg";
import companyVisitImg from "@/assets/company-visit.jpg";
import trainingImg from "@/assets/training-center.jpg";

// Translation context
const LangContext = createContext<Record<string, string>>(translations.pt);
function useT() { return useContext(LangContext); }

// Intersection Observer hook
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

const X = () => <span className="text-gradient-gold">X</span>;

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  const t = useT();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary animate-gradient" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(38 92% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(38 80% 45% / 0.1) 0%, transparent 50%)" }} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <Section>
          <Badge className="mb-6 px-4 py-1.5 text-xs tracking-widest uppercase border-primary/40 bg-primary/10 text-primary animate-pulse-glow">
            <Star className="w-3 h-3 mr-1.5" /> {t.badge_invite}
          </Badge>
        </Section>

        <Section delay={150}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            {t.hero_title_1}{" "}
            <span className="text-gradient-gold">{t.hero_title_2}</span>
          </h1>
        </Section>

        <Section delay={300}>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            {t.hero_desc}
          </p>
        </Section>

        <Section delay={450}>
          <Button size="lg" className="btn-metallic-3d text-base px-8 py-6 rounded-full border-0 hover:bg-transparent">
            {t.hero_cta} <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
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

// ─── O que é ─────────────────────────────────────────────────
function WhatIs() {
  const t = useT();
  const pillars = [
    { icon: Users, title: t.pillar_networking, desc: t.pillar_networking_desc },
    { icon: Calendar, title: t.pillar_events, desc: t.pillar_events_desc },
    { icon: ShoppingBag, title: t.pillar_marketplace, desc: t.pillar_marketplace_desc },
    { icon: Newspaper, title: t.pillar_content, desc: t.pillar_content_desc },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            {t.what_title}<X />{t.what_title_end}
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
            {t.what_desc}
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
function Plans() {
  const t = useT();
  const freeFeatures = [
    { text: t.free_1, included: true },
    { text: t.free_2, included: true },
    { text: t.free_3, included: true },
    { text: t.free_4, included: true },
    { text: t.free_5, included: true },
    { text: t.free_6, included: false },
    { text: t.free_7, included: false },
    { text: t.free_8, included: false },
    { text: t.free_9, included: false },
  ];

  const proFeatures = [t.pro_1, t.pro_2, t.pro_3, t.pro_4, t.pro_5, t.pro_6, t.pro_7, t.pro_8, t.pro_9, t.pro_10, t.pro_11, t.pro_12];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            {t.plans_title_1} <span className="text-gradient-gold">{t.plans_title_2}</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            {t.plans_desc}
          </p>
        </Section>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <Section>
            <div className="glass rounded-2xl p-6 sm:p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-1">{t.plan_free}</h3>
              <p className="text-muted-foreground text-sm mb-6">{t.plan_free_sub}</p>
              <div className="text-3xl font-bold mb-6">R$ 0<span className="text-sm font-normal text-muted-foreground">{t.month}</span></div>
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
              <Button variant="outline" className="mt-8 w-full rounded-full border-primary/40 text-primary hover:bg-primary/10">{t.plan_free_cta}</Button>
            </div>
          </Section>

          <Section delay={150}>
            <div className="relative glass rounded-2xl p-6 sm:p-8 h-full flex flex-col border-primary/30 glow-amber">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 text-xs uppercase tracking-wider">{t.plan_recommended}</Badge>
              <h3 className="text-xl font-bold mb-1">Turn<X />{t.plan_pro}</h3>
              <p className="text-muted-foreground text-sm mb-6">{t.plan_pro_sub}</p>
              <div className="text-3xl font-bold mb-6">R$ 229<span className="text-lg">,90</span><span className="text-sm font-normal text-muted-foreground">{t.month}</span></div>
              <ul className="space-y-3 flex-1">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full rounded-full btn-metallic-3d border-0 hover:bg-transparent">{t.plan_pro_cta}</Button>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}

// ─── Experiências ────────────────────────────────────────────
function Experiences() {
  const t = useT();
  const experiences = [
    { img: dinnerImg, title: t.exp_dinner, desc: t.exp_dinner_desc, icon: UtensilsCrossed },
    { img: expeditionImg, title: t.exp_expedition, desc: t.exp_expedition_desc, icon: Mountain },
    { img: podcastImg, title: t.exp_podcast, desc: t.exp_podcast_desc, icon: Mic },
    { img: companyVisitImg, title: t.exp_company, desc: t.exp_company_desc, icon: Building2 },
    { img: trainingImg, title: t.exp_training, desc: t.exp_training_desc, icon: Dumbbell },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            {t.exp_title_1} <span className="text-gradient-gold">{t.exp_title_2}</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            {t.exp_desc}
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
function HowItWorks() {
  const t = useT();
  const steps = [
    { num: "01", title: t.step_1_title, desc: t.step_1_desc },
    { num: "02", title: t.step_2_title, desc: t.step_2_desc },
    { num: "03", title: t.step_3_title, desc: t.step_3_desc },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
            {t.how_title_1} <span className="text-gradient-gold">{t.how_title_2}</span>
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
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <Section>
        <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-8 sm:p-14 glow-amber-strong">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.cta_title_1} <span className="text-gradient-gold">{t.cta_title_2}</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t.cta_desc_1}<X />{t.cta_desc_2}
          </p>
          <Button size="lg" className="btn-metallic-3d text-base px-10 py-6 rounded-full border-0 animate-pulse-glow hover:bg-transparent">
            {t.cta_button} <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </Section>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  const t = useT();
  return (
    <footer className="py-10 px-4 border-t border-border/30 text-center">
      <p className="font-bold text-xl tracking-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TURN<X /> CLUBE</p>
      <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Turn<X /> Clube. {t.footer_rights}</p>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function Index() {
  const [lang, setLang] = useState<LangCode>("pt");
  const t = translations[lang];

  return (
    <LangContext.Provider value={t}>
      <main className="bg-background text-foreground overflow-x-hidden">
        <LanguageSwitcher current={lang} onChange={setLang} />
        <Hero />
        <WhatIs />
        <Experiences />
        <Plans />
        <HowItWorks />
        <FinalCTA />
        <Footer />
      </main>
    </LangContext.Provider>
  );
}
