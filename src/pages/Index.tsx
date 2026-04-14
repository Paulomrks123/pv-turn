import { useEffect, useRef, useState, createContext, useContext } from "react";
import { ChevronRight, Check, ArrowRight, Lock, AlertTriangle, X as XIcon, Menu, Sun, Moon, Trophy, Users, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translations, type LangCode } from "@/lib/translations";
import seccLogo from "@/assets/secc-logo.png";
import estevaoPhoto from "@/assets/estevao-seccatto.png";
import bookPsicologia from "@/assets/book-psicologia.jpg";
import book100Segredos from "@/assets/book-100segredos.jpg";
import bookBootcamp from "@/assets/book-bootcamp.jpg";
import bookSalve from "@/assets/book-salve.jpg";
import proofRicardo from "@/assets/proof-ricardo.jpg";
import proofCamila from "@/assets/proof-camila.jpg";
import proofAndre from "@/assets/proof-andre.jpg";

const LangContext = createContext<Record<string, string>>(translations.pt);
function useT() { return useContext(LangContext); }

function useInView(threshold = 0.1) {
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

function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale" }) {
  const { ref, inView } = useInView();
  const directionClasses = {
    up: inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
    left: inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16",
    right: inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16",
    scale: inView ? "opacity-100 scale-100" : "opacity-0 scale-85",
  };
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${directionClasses[direction]} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Floating Particles Background ────────────────────────── */
function FloatingParticles({ count = 20, color = "hsl(215 100% 50%)" }: { count?: number; color?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Orbs ────────────────────────────────────────── */
function HeroOrbs() {
  return (
    <>
      <div className="hero-orb w-[300px] h-[300px] bg-primary/15 top-[10%] left-[10%]" />
      <div className="hero-orb w-[250px] h-[250px] bg-primary/10 bottom-[15%] right-[10%]" style={{ animationDelay: "2s", animationDuration: "10s" }} />
      <div className="hero-orb w-[180px] h-[180px] bg-primary/8 top-[50%] left-[50%]" style={{ animationDelay: "4s", animationDuration: "12s" }} />
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function CTA({ primary, secondary, tertiary }: { primary: string; secondary?: string; tertiary?: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center my-6">
      <Button size="lg" className="btn-metallic-3d btn-pulse text-base px-10 py-6 rounded-full border-0 hover:bg-transparent animate-pulse-glow">
        {primary} <ChevronRight className="w-5 h-5 ml-1" />
      </Button>
      {secondary && (
        <Button size="lg" className="btn-curadoria text-base px-10 py-6 rounded-full border-2 border-primary font-bold">
          {secondary} <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      )}
      {tertiary && (
        <Button size="lg" variant="outline" className="text-base px-10 py-6 rounded-full font-bold">
          {tertiary}
        </Button>
      )}
    </div>
  );
}

function Divider() {
  return <div className="divider-glow w-32 mx-auto my-8 sm:my-10 rounded-full" />;
}

function GoldHighlight({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient-gold font-bold">{children}</span>;
}

/* ─── Logo component ──────────────── */
import turnLogo from "@/assets/turn-logo.png";
function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <img src={turnLogo} alt="TURN - Turnaround Network" className={`${className} w-auto object-contain`} />
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Alternar tema">
      {dark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
    </button>
  );
}

/* ─── Sticky Top Bar ─────────────────────────────────────────── */
function TopBar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className="bg-background/90 backdrop-blur-xl border-b border-border/30 py-2.5 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo className="h-8" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" className="btn-metallic-3d btn-pulse rounded-full border-0 hover:bg-transparent text-sm px-5">
              {t.lp_cta_short} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [lang, setLang] = useState<LangCode>("pt");
  const t = translations[lang];

  return (
    <LangContext.Provider value={t}>
      <main className="bg-background text-foreground overflow-x-hidden">
        <TopBar />
        
        {/* Theme toggle visible at top */}
        <div className="fixed top-4 right-4 z-40">
          <ThemeToggle />
        </div>

        {/* ━━━━━━━━━━━━ HERO — ABOVE THE FOLD ━━━━━━━━━━━━ */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-14">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary animate-gradient" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(215 80% 50% / 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(215 70% 45% / 0.08) 0%, transparent 50%)" }} />
          <HeroOrbs />
          <FloatingParticles count={25} />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-5">
                ⚡ {t.lp_hero_badge}
              </div>
            </Reveal>

            <Reveal delay={100} direction="left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-2 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <GoldHighlight>{t.lp_hero_h1_1}</GoldHighlight>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.lp_hero_h1_2}
              </p>
            </Reveal>

            <Reveal delay={200} direction="right">
              <p className="text-base sm:text-lg md:text-xl text-foreground mb-2 leading-relaxed max-w-2xl mx-auto">
                {t.lp_hero_sub}
              </p>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto italic">
                {t.lp_hero_desc}
              </p>
            </Reveal>

            {/* VSL - Video Sales Letter */}
            <Reveal delay={300}>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-lg mb-4 max-w-2xl mx-auto">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/hQ9nQ-WMuQs?si=UdaqS1cUxVmA_hXU"
                  title="TURN - Business Club de Alto Impacto"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal delay={400}>
              <CTA primary={t.lp_cta_plans} secondary={t.lp_cta_main} tertiary={t.lp_cta_talk} />
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ POSICIONAMENTO ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6">
                {t.lp_break_h2}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                {t.lp_break_p1}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                {t.lp_break_p2}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-foreground text-lg sm:text-xl font-semibold mb-1">
                {t.lp_break_bold1}
              </p>
              <p className="text-2xl sm:text-3xl font-bold mb-8">
                <GoldHighlight>{t.lp_break_gold1}</GoldHighlight>
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ PILARES — 4 BLOCOS ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 leading-tight">
                {t.lp_mech_h2_1} <GoldHighlight>{t.lp_mech_h2_2}</GoldHighlight>
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { num: "01", title: t.lp_mech_1_title, desc: t.lp_mech_1_desc, icon: <Lock className="w-5 h-5 text-primary" /> },
                { num: "02", title: t.lp_mech_2_title, desc: t.lp_mech_2_desc, icon: <ArrowRight className="w-5 h-5 text-primary" /> },
                { num: "03", title: t.lp_mech_3_title, desc: t.lp_mech_3_desc, icon: <Heart className="w-5 h-5 text-primary" /> },
                { num: "04", title: t.lp_mech_4_title, desc: t.lp_mech_4_desc, icon: <Users className="w-5 h-5 text-primary" /> },
              ].map((item, i) => (
                <Reveal key={item.num} delay={i * 150} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="card-elevated p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-xs text-primary/60 font-bold">{item.num}</span>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ CTA INTERMEDIÁRIO ━━━━━━━━━━━━ */}
        <section className="px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="text-foreground text-lg sm:text-xl font-semibold mb-2">{t.lp_mid_cta_text}</p>
              <CTA primary={t.lp_cta_main} />
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ PARA QUEM É ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {t.lp_who_h2}
              </h2>
            </Reveal>

            {[
              { title: t.lp_who_1, desc: t.lp_who_1_desc },
              { title: t.lp_who_2, desc: t.lp_who_2_desc },
              { title: t.lp_who_3, desc: t.lp_who_3_desc },
              { title: t.lp_who_4, desc: t.lp_who_4_desc },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="flex items-start gap-3 mb-5 card-elevated p-5">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-foreground text-base sm:text-lg font-bold">{item.title}</p>
                    <p className="text-muted-foreground text-sm sm:text-base mt-1">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={500}>
              <div className="mt-8 card-elevated rounded-xl p-5 border-destructive/20">
                <p className="text-muted-foreground text-sm sm:text-base flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {t.lp_who_warning}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ O QUE VOCÊ ENCONTRA ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {t.lp_value_h2}
              </h2>
            </Reveal>
            <Reveal delay={50}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">{t.lp_value_desc}</p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {[t.lp_value_1, t.lp_value_2, t.lp_value_3, t.lp_value_4].map((item, i) => (
                <Reveal key={i} delay={i * 80} direction="scale">
                  <div className="card-elevated p-5 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary mb-3" />
                    <p className="text-foreground text-base sm:text-lg font-semibold">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ TURN CONNECT — DIFERENCIAL ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 relative dark-section overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 30% 8%) 0%, hsl(220 35% 12%) 50%, hsl(220 30% 8%) 100%)" }}>
          <FloatingParticles count={15} color="hsl(215 80% 60%)" />
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
                TURN Connect
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t.lp_connect_h2_1}<br />
                <GoldHighlight>{t.lp_connect_h2_2}</GoldHighlight>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">{t.lp_connect_desc}</p>
            </Reveal>

            {[
              { title: t.lp_connect_f1_title, desc: t.lp_connect_f1_desc },
              { title: t.lp_connect_f2_title, desc: t.lp_connect_f2_desc },
              { title: t.lp_connect_f3_title, desc: t.lp_connect_f3_desc },
              { title: t.lp_connect_f4_title, desc: t.lp_connect_f4_desc },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="mb-6 pl-5 border-l-2 border-primary/30">
                  <h3 className="font-bold text-base sm:text-lg mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{f.desc}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={500}>
              <p className="text-center text-lg font-bold text-white mt-6">{t.lp_connect_phrase}</p>
            </Reveal>

            <Reveal delay={600}>
              <CTA primary={t.lp_cta_main} secondary={t.lp_cta_curadoria} />
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ GAMIFICAÇÃO ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
                  <Trophy className="w-4 h-4 inline mr-2" />
                  Gamificação
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                  {t.lp_gamif_h2}
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg italic">{t.lp_gamif_desc}</p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[t.lp_gamif_1, t.lp_gamif_2, t.lp_gamif_3, t.lp_gamif_4].map((item, i) => (
                <Reveal key={i} delay={i * 100} direction="scale">
                  <div className="card-elevated p-4 text-center">
                    <p className="text-foreground font-semibold text-base">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={500}>
              <div className="card-elevated p-6 text-center border-primary/30">
                <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-foreground font-bold text-lg">{t.lp_gamif_milestone}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ PERTENCIMENTO ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 relative dark-section overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 30% 6%) 0%, hsl(220 35% 10%) 50%, hsl(220 30% 6%) 100%)" }}>
          <FloatingParticles count={12} color="hsl(215 70% 55%)" />
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">
                {t.lp_belong_h2}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-6">
                {t.lp_belong_desc}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <CTA primary={t.lp_cta_main} />
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ SEU FUNDADOR ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 relative dark-section overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(220 30% 6%) 0%, hsl(220 35% 10%) 50%, hsl(220 30% 6%) 100%)" }}>
          <FloatingParticles count={12} color="hsl(215 70% 55%)" />
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
                  Fundador
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <Reveal delay={100} direction="left">
                <div className="shrink-0 w-64 sm:w-72 md:w-80">
                  <img src={estevaoPhoto} alt="Estêvão Seccatto" className="w-full rounded-2xl border-2 border-primary/20 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]" loading="lazy" width={640} height={960} />
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Estêvão Seccatto</h2>
                  <p className="text-primary font-semibold text-base mb-5">Empreendedor em Série • Presidente da TURN</p>
                  
                  <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    <p>Especializado em resolver situações complexas (crise e pressão de tempo) com abordagem holística, criando valor, orientado à execução e a resultados, capaz de reunir competências e liderar equipes de alto desempenho.</p>
                    <p>Ao longo de 2 décadas, +130 empresas assessoradas (turnaround, reestruturação, M&A, mercado de capitais, captação de recursos, negociação de dívidas), com diversos portes, setores e tipos de desafios. +R$20 bilhões em transações realizadas.</p>
                    <p>Professor e Coordenador de Turnaround na FIA Business School, Empiricus Research e Mundo Financeiro. Colunista da Agência Estado, Money Times e SBT News.</p>
                    <p>Presidente da TURN, uma das maiores associações de profissionais atuantes em turnaround e reestruturação empresarial do Brasil.</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      "+130 empresas assessoradas",
                      "+R$ 20 BI em transações",
                      "Professor FIA Business School",
                      "Presidente da TURN",
                      "Colunista Agência Estado & SBT News",
                    ].map((badge) => (
                      <span key={badge} className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1.5">{badge}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Livros */}
            <Reveal delay={300}>
              <div className="mt-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Livros Publicados
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { img: book100Segredos, title: "Turnaround 100 Segredos" },
                    { img: bookSalve, title: "Salve Seu Negócio" },
                    { img: bookBootcamp, title: "Turnaround Bootcamp" },
                    { img: bookPsicologia, title: "Psicologia da Crise" },
                  ].map((book) => (
                    <div key={book.title} className="group flex flex-col items-center">
                      <div className="overflow-hidden rounded-lg border border-primary/20 shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <img src={book.img} alt={book.title} className="w-full h-auto" loading="lazy" />
                      </div>
                      <p className="text-xs text-center text-white/70 mt-2 font-medium">{book.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ PROVA SOCIAL ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {t.lp_proof_h2}
              </h2>
            </Reveal>

            {[
              { text: t.lp_proof_1_text, name: t.lp_proof_1_name, photo: proofRicardo },
              { text: t.lp_proof_2_text, name: t.lp_proof_2_name, photo: proofCamila },
              { text: t.lp_proof_3_text, name: t.lp_proof_3_name, photo: proofAndre },
            ].map((tm, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="mb-8 card-elevated rounded-xl p-6 flex gap-4 items-start">
                  <img src={tm.photo} alt={tm.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shrink-0" loading="lazy" width={56} height={56} />
                  <div>
                    <p className="text-foreground text-base sm:text-lg italic leading-relaxed mb-3">"{tm.text}"</p>
                    <p className="text-primary text-sm font-semibold">— {tm.name}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ PLANOS ━━━━━━━━━━━━ */}
        <section id="planos" className="py-12 sm:py-16 px-4 relative dark-section overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(220 60% 10%), hsl(220 50% 16%), hsl(220 60% 10%))" }}>
          <FloatingParticles count={18} color="hsl(215 90% 60%)" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-14">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {t.lp_plans_h2_1}<br />
                  <GoldHighlight>{t.lp_plans_h2_2}</GoldHighlight>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Turn-In */}
              <Reveal>
                <div className="rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 hover:-translate-y-2 transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-1">Turn-In</h3>
                  <div className="text-3xl font-bold text-white mb-1">{t.lp_plan_free_price}</div>
                  <p className="text-white/50 text-sm mb-6">{t.lp_plan_free_desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[t.lp_plan_free_f1, t.lp_plan_free_f2, t.lp_plan_free_f3].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10 py-5">
                    {t.lp_plan_free_cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Reveal>

              {/* Turn-Around */}
              <Reveal delay={150}>
                <div className="relative rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-primary/40 bg-primary/5 backdrop-blur-sm shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)] animate-border-glow hover:-translate-y-2 hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.5)] transition-all duration-500">
                  <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    {t.lp_plan_pro_popular}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Turn-Around</h3>
                  <div className="text-3xl font-bold text-white mb-1">{t.lp_plan_pro_price}</div>
                  <p className="text-white/50 text-sm mb-6">{t.lp_plan_pro_desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[t.lp_plan_pro_f1, t.lp_plan_pro_f2, t.lp_plan_pro_f3, t.lp_plan_pro_f4, t.lp_plan_pro_f5].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full rounded-full btn-metallic-3d btn-pulse border-0 hover:bg-transparent py-5">
                    {t.lp_plan_pro_cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ URGÊNCIA / ESCASSEZ ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <Lock className="w-10 h-10 text-primary mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {t.lp_urgency_h2}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-3">
                {t.lp_urgency_p1}
              </p>
              <p className="text-foreground font-semibold text-lg">
                {t.lp_urgency_bold}
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ FAQ ━━━━━━━━━━━━ */}
        <FAQSection />

        {/* ━━━━━━━━━━━━ CTA FINAL — GRANDE ━━━━━━━━━━━━ */}
        <section className="px-4 py-12 sm:py-16">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center card-elevated rounded-3xl p-8 sm:p-14 glow-amber-strong">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {t.lp_final_h2_1}
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <GoldHighlight>{t.lp_final_h2_2}</GoldHighlight>
              </h2>
              <p className="text-muted-foreground mb-8 text-base sm:text-lg max-w-md mx-auto">{t.lp_final_desc}</p>
              <CTA primary={t.lp_cta_plans} secondary={t.lp_cta_main} tertiary={t.lp_cta_curadoria} />
            </div>
          </Reveal>
        </section>

        {/* ━━━━━━━━━━━━ FOOTER MÍNIMO ━━━━━━━━━━━━ */}
        <footer className="py-8 px-4 border-t border-border/30 text-center flex flex-col items-center">
          <Logo className="h-10" />
          <p className="text-muted-foreground text-xs mt-2">© {new Date().getFullYear()} TURN. {t.lp_footer}</p>
        </footer>
      </main>
    </LangContext.Provider>
  );
}

/* ─── FAQ Inline ──────────────────────────────────────────────── */
function FAQSection() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { q: t.lp_faq_1_q, a: t.lp_faq_1_a },
    { q: t.lp_faq_2_q, a: t.lp_faq_2_a },
    { q: t.lp_faq_3_q, a: t.lp_faq_3_a },
    { q: t.lp_faq_4_q, a: t.lp_faq_4_a },
    { q: t.lp_faq_5_q, a: t.lp_faq_5_a },
  ];

  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.lp_faq_title}</h2>
        </Reveal>
        <div className="space-y-3">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card-elevated rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-primary/5 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-semibold text-sm sm:text-base">{item.q}</span>
                  <ChevronRight className={`w-5 h-5 text-primary shrink-0 transition-transform ${openIndex === i ? "rotate-90" : ""}`} />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
