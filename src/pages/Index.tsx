import { useEffect, useRef, useState, createContext, useContext } from "react";
import { ChevronRight, Check, ArrowRight, Lock, AlertTriangle, Sun, Moon } from "lucide-react";
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

function Reveal({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale" }) {
  const { ref, inView } = useInView();
  const transforms: Record<string, string> = {
    up: inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    left: inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
    right: inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
    scale: inView ? "scale-100 opacity-100" : "scale-95 opacity-0",
  };
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${transforms[direction]} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Logo ──────────────────────────────────────────────────── */
function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <>
      <img src={seccLogo} alt="SECC" className={`${className} w-auto dark:block hidden`} width={128} height={32} />
      <span className={`dark:hidden font-bold tracking-tight text-foreground ${className === "h-8" ? "text-2xl" : "text-3xl"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SECC</span>
    </>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
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
            <Button size="sm" className="btn-primary-cta rounded-full text-sm px-5">
              {t.lp_cta_short} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [lang] = useState<LangCode>("pt");
  const t = translations[lang];

  return (
    <LangContext.Provider value={t}>
      <main className="bg-background text-foreground overflow-x-hidden">
        <TopBar />

        {/* ━━━━━━━━━━━━ HERO — ABOVE THE FOLD ━━━━━━━━━━━━ */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-10 sm:py-14">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {t.lp_hero_badge}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-3 leading-[1.05]">
                {t.lp_hero_h1_1}<br />
                <span className="text-primary">{t.lp_hero_h1_2}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
                {t.lp_hero_sub}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Button size="lg" className="btn-primary-cta text-base px-8 py-6 rounded-full w-full sm:w-auto">
                  {t.lp_cta_main} <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
                <a href="#" className="btn-secondary-cta text-sm self-center py-2">
                  {t.lp_cta_curadoria} →
                </a>
              </div>
            </Reveal>

            {/* VSL below CTA */}
            <Reveal delay={320}>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-sm max-w-2xl mx-auto">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/hQ9nQ-WMuQs?si=UdaqS1cUxVmA_hXU"
                  title="SECC - Você precisa de negócios"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ QUEBRA DE CRENÇA + POSICIONAMENTO (FUNDIDO) ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 section-alt">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
                {t.lp_break_p1}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight mb-4">
                {t.lp_break_h2}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                {t.lp_break_p2}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-foreground text-base sm:text-lg font-semibold mb-1">
                {t.lp_break_bold1}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-primary">
                {t.lp_break_gold1}
              </p>
            </Reveal>

            {/* Posicionamento inline */}
            <div className="mt-8">
              <Reveal delay={300}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4">
                  {t.lp_pos_h2_1} <span className="text-primary">{t.lp_pos_h2_2}</span>
                </h2>
              </Reveal>
              <Reveal delay={360}>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">{t.lp_pos_p1}</p>
              </Reveal>
              <Reveal delay={420}>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3">{t.lp_pos_p2}</p>
              </Reveal>
              <Reveal delay={480}>
                <p className="text-foreground font-semibold text-base sm:text-lg">{t.lp_pos_bold}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ MECANISMO — 3 BLOCOS ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-10 leading-tight">
                {t.lp_mech_h2_1} <span className="text-primary">{t.lp_mech_h2_2}</span>
              </h2>
            </Reveal>

            {[
              { num: "01", title: t.lp_mech_1_title, desc: t.lp_mech_1_desc },
              { num: "02", title: t.lp_mech_2_title, desc: t.lp_mech_2_desc },
              { num: "03", title: t.lp_mech_3_title, desc: t.lp_mech_3_desc },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="flex gap-4 mb-6 card-elevated p-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━ CTA INTERMEDIÁRIO ━━━━━━━━━━━━ */}
        <section className="px-4 py-8 section-alt">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="text-foreground text-base sm:text-lg font-semibold mb-3">{t.lp_mid_cta_text}</p>
              <Button size="lg" className="btn-primary-cta text-base px-8 py-6 rounded-full w-full sm:w-auto">
                {t.lp_cta_main} <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ PARA QUEM É ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 leading-tight">
                {t.lp_who_h2}
              </h2>
            </Reveal>

            {[t.lp_who_1, t.lp_who_2, t.lp_who_3, t.lp_who_4].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-3 mb-4 py-2 border-l-2 border-primary/30 pl-4">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm sm:text-base">{item}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={400}>
              <div className="mt-6 rounded-xl p-4 bg-destructive/5 border border-destructive/15">
                <p className="text-muted-foreground text-xs sm:text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  {t.lp_who_warning}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ O QUE VOCÊ GANHA ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 section-alt">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 leading-tight">
                {t.lp_value_h2}
              </h2>
            </Reveal>

            {[t.lp_value_1, t.lp_value_2, t.lp_value_3, t.lp_value_4, t.lp_value_5, t.lp_value_6].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-start gap-3 mb-3 py-2 border-l-2 border-accent/40 pl-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                  <p className="text-foreground text-sm sm:text-base">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━ PROVA SOCIAL (ANTES DOS PLANOS) ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-8 leading-tight">
                {t.lp_proof_h2}
              </h2>
            </Reveal>

            {[
              { text: t.lp_proof_1_text, name: t.lp_proof_1_name, photo: proofRicardo },
              { text: t.lp_proof_2_text, name: t.lp_proof_2_name, photo: proofCamila },
              { text: t.lp_proof_3_text, name: t.lp_proof_3_name, photo: proofAndre },
            ].map((tm, i) => (
              <Reveal key={i} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="mb-6 card-elevated rounded-xl p-4 sm:p-5 flex gap-3 items-start">
                  <img src={tm.photo} alt={tm.name} className="w-12 h-12 rounded-full object-cover border border-border shrink-0" loading="lazy" width={48} height={48} />
                  <div>
                    <p className="text-foreground text-sm sm:text-base italic leading-relaxed mb-2">"{tm.text}"</p>
                    <p className="text-primary text-xs font-semibold">— {tm.name}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━ SECC CONNECT — DIFERENCIAL ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 relative dark-section" style={{ background: "linear-gradient(180deg, hsl(220 30% 8%) 0%, hsl(220 35% 12%) 50%, hsl(220 30% 8%) 100%)" }}>
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-4">SECC Connect</p>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-5 leading-tight">
                {t.lp_connect_h2_1}<br />
                <span className="text-primary">{t.lp_connect_h2_2}</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{t.lp_connect_desc}</p>
            </Reveal>

            {[
              { title: t.lp_connect_f1_title, desc: t.lp_connect_f1_desc },
              { title: t.lp_connect_f2_title, desc: t.lp_connect_f2_desc },
              { title: t.lp_connect_f3_title, desc: t.lp_connect_f3_desc },
              { title: t.lp_connect_f4_title, desc: t.lp_connect_f4_desc },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="mb-5 pl-4 border-l-2 border-primary/30">
                  <h3 className="font-bold text-sm sm:text-base mb-0.5">{f.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{f.desc}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={400}>
              <div className="mt-6">
                <Button size="lg" className="btn-primary-cta text-base px-8 py-6 rounded-full w-full sm:w-auto">
                  {t.lp_cta_main} <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ SEU PROFESSOR ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 relative dark-section" style={{ background: "linear-gradient(180deg, hsl(220 30% 6%) 0%, hsl(220 35% 10%) 50%, hsl(220 30% 6%) 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-4 text-center">Seu Professor</p>
            </Reveal>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              <Reveal delay={80} direction="left">
                <div className="shrink-0 w-48 sm:w-56 md:w-72">
                  <img src={estevaoPhoto} alt="Estêvão Seccatto" className="w-full rounded-2xl border border-border/30" loading="lazy" width={640} height={960} />
                </div>
              </Reveal>

              <Reveal delay={160} direction="right">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Estêvão Seccatto</h2>
                  <p className="text-primary font-semibold text-sm mb-4">Empreendedor em Série • Presidente do TURN</p>
                  
                  <div className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    <p>Especializado em resolver situações complexas (crise e pressão de tempo) com abordagem holística, criando valor, orientado à execução e a resultados.</p>
                    <p>Ao longo de 2 décadas, +130 empresas assessoradas. +R$20 bilhões em transações realizadas.</p>
                    <p>Professor e Coordenador de Turnaround na FIA Business School, Empiricus Research e Mundo Financeiro.</p>
                    <p>Presidente do TURN, uma das maiores associações de profissionais atuantes em turnaround e reestruturação empresarial do Brasil.</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "+130 empresas",
                      "+R$ 20 BI",
                      "FIA Business School",
                      "Presidente do TURN",
                    ].map((badge) => (
                      <span key={badge} className="text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-1">{badge}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Livros */}
            <Reveal delay={240}>
              <div className="mt-8">
                <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-4">Livros Publicados</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { img: book100Segredos, title: "Turnaround 100 Segredos" },
                    { img: bookSalve, title: "Salve Seu Negócio" },
                    { img: bookBootcamp, title: "Turnaround Bootcamp" },
                    { img: bookPsicologia, title: "Psicologia da Crise" },
                  ].map((book) => (
                    <div key={book.title} className="group flex flex-col items-center">
                      <div className="overflow-hidden rounded-lg border border-white/10 transition-transform duration-300 group-hover:scale-105">
                        <img src={book.img} alt={book.title} className="w-full h-auto" loading="lazy" />
                      </div>
                      <p className="text-[10px] text-center text-white/60 mt-1.5 font-medium">{book.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ PLANOS ━━━━━━━━━━━━ */}
        <section id="planos" className="py-10 sm:py-14 px-4 relative dark-section" style={{ background: "linear-gradient(135deg, hsl(220 60% 10%), hsl(220 50% 14%), hsl(220 60% 10%))" }}>
          <div className="max-w-3xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight">
                  {t.lp_plans_h2_1}<br />
                  <span className="text-primary">{t.lp_plans_h2_2}</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* SECC-In */}
              <Reveal>
                <div className="rounded-2xl p-5 sm:p-6 h-full flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-1">SECC-In</h3>
                  <div className="text-2xl font-bold text-white mb-1">{t.lp_plan_free_price}</div>
                  <p className="text-white/50 text-xs mb-5">{t.lp_plan_free_desc}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {[t.lp_plan_free_f1, t.lp_plan_free_f2, t.lp_plan_free_f3].map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10 py-4 text-sm">
                    {t.lp_plan_free_cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Reveal>

              {/* SECC-Pro */}
              <Reveal delay={120}>
                <div className="relative rounded-2xl p-5 sm:p-6 h-full flex flex-col border border-primary/40 bg-primary/5 backdrop-blur-sm">
                  <div className="absolute -top-3 right-5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {t.lp_plan_pro_popular}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">SECC-Pro</h3>
                  <div className="text-2xl font-bold text-white mb-1">{t.lp_plan_pro_price}</div>
                  <p className="text-white/50 text-xs mb-5">{t.lp_plan_pro_desc}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {[t.lp_plan_pro_f1, t.lp_plan_pro_f2, t.lp_plan_pro_f3, t.lp_plan_pro_f4, t.lp_plan_pro_f5].map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full rounded-full btn-primary-cta py-4 text-sm">
                    {t.lp_plan_pro_cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ URGÊNCIA / ESCASSEZ ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14 section-alt">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <Lock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight">
                {t.lp_urgency_h2}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-2">
                {t.lp_urgency_p1}
              </p>
              <p className="text-foreground font-semibold text-base">
                {t.lp_urgency_bold}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ FAQ ━━━━━━━━━━━━ */}
        <FAQSection />

        {/* ━━━━━━━━━━━━ CTA FINAL ━━━━━━━━━━━━ */}
        <section className="px-4 py-10 sm:py-14">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center card-elevated rounded-2xl p-6 sm:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
                {t.lp_final_h2_1}
              </h2>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 leading-tight text-primary">
                {t.lp_final_h2_2}
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base max-w-md mx-auto">{t.lp_final_desc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="btn-primary-cta btn-final-pulse text-base px-8 py-6 rounded-full w-full sm:w-auto">
                  {t.lp_cta_main} <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
                <a href="#" className="btn-secondary-cta text-sm self-center py-2">
                  {t.lp_cta_curadoria} →
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━ */}
        <footer className="py-6 px-4 border-t border-border/30 text-center flex flex-col items-center">
          <Logo className="h-8" />
          <p className="text-muted-foreground text-xs mt-2">© {new Date().getFullYear()} SECC. {t.lp_footer}</p>
        </footer>
      </main>
    </LangContext.Provider>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────── */
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
          <h2 className="text-xl sm:text-2xl font-bold mb-6">{t.lp_faq_title}</h2>
        </Reveal>
        <div className="space-y-2">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-semibold text-xs sm:text-sm">{item.q}</span>
                  <ChevronRight className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-90" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
