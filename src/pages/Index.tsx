import { useEffect, useRef, useState, createContext, useContext } from "react";
import { ChevronRight, Check, ArrowRight, Lock, AlertTriangle, X as XIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { translations, type LangCode } from "@/lib/translations";
import seccLogo from "@/assets/secc-logo.png";

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

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/*  LONG-FORM PERSUASIVE LANDING PAGE                            */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function CTA({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center my-10">
      <Button size="lg" className="btn-metallic-3d text-base px-10 py-6 rounded-full border-0 hover:bg-transparent animate-pulse-glow">
        {primary} <ChevronRight className="w-5 h-5 ml-1" />
      </Button>
      {secondary && (
        <Button size="lg" variant="outline" className="text-base px-10 py-6 rounded-full border-primary/40 text-primary hover:bg-primary/10">
          {secondary}
        </Button>
      )}
    </div>
  );
}

function Divider() {
  return <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto my-16 sm:my-20" />;
}

function GoldHighlight({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient-gold font-bold">{children}</span>;
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
          <img src={seccLogo} alt="SECC" className="h-8 w-auto" width={128} height={32} />
          <Button size="sm" className="btn-metallic-3d rounded-full border-0 hover:bg-transparent text-sm px-5">
            {t.lp_cta_short} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
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
        <LanguageSwitcher current={lang} onChange={setLang} />

        {/* ━━━━━━━━━━━━ HERO — ABOVE THE FOLD ━━━━━━━━━━━━ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary animate-gradient" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(38 92% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(38 80% 45% / 0.1) 0%, transparent 50%)" }} />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8">
                ⚡ {t.lp_hero_badge}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {t.lp_hero_h1_1}<br />
                <GoldHighlight>{t.lp_hero_h1_2}</GoldHighlight>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/85 mb-4 leading-relaxed max-w-2xl mx-auto">
                {t.lp_hero_sub}
              </p>
            </Reveal>

            {/* VSL - Video Sales Letter */}
            <Reveal delay={300}>
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary/20 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)] mb-6 max-w-2xl mx-auto">
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

            <Reveal delay={400}>
              <CTA primary={t.lp_cta_main} secondary={t.lp_cta_curadoria} />
            </Reveal>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ QUEBRA DE CRENÇA ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                {t.lp_break_p1}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                {t.lp_break_h2}
              </h2>
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

        {/* ━━━━━━━━━━━━ O QUE É A SECC — POSICIONAMENTO ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6">
                {t.lp_pos_h2_1} <GoldHighlight>{t.lp_pos_h2_2}</GoldHighlight>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">{t.lp_pos_p1}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">{t.lp_pos_p2}</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-foreground font-semibold text-lg sm:text-xl">{t.lp_pos_bold}</p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ MECANISMO — 3 BLOCOS ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 leading-tight">
                {t.lp_mech_h2_1} <GoldHighlight>{t.lp_mech_h2_2}</GoldHighlight>
              </h2>
            </Reveal>

            {[
              { num: "01", title: t.lp_mech_1_title, desc: t.lp_mech_1_desc },
              { num: "02", title: t.lp_mech_2_title, desc: t.lp_mech_2_desc },
              { num: "03", title: t.lp_mech_3_title, desc: t.lp_mech_3_desc },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 150}>
                <div className="flex gap-5 sm:gap-6 mb-10 sm:mb-12">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
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
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {t.lp_who_h2}
              </h2>
            </Reveal>

            {[t.lp_who_1, t.lp_who_2, t.lp_who_3, t.lp_who_4].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex items-start gap-3 mb-5">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground text-base sm:text-lg">{item}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={500}>
              <div className="mt-8 glass rounded-xl p-5 border-destructive/20">
                <p className="text-muted-foreground text-sm sm:text-base flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {t.lp_who_warning}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ O QUE VOCÊ GANHA ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {t.lp_value_h2}
              </h2>
            </Reveal>

            {[t.lp_value_1, t.lp_value_2, t.lp_value_3, t.lp_value_4, t.lp_value_5, t.lp_value_6].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <p className="text-foreground text-base sm:text-lg">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━ SECC CONNECT — DIFERENCIAL ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24 relative" style={{ background: "linear-gradient(180deg, hsl(220 30% 8%) 0%, hsl(220 35% 12%) 50%, hsl(220 30% 8%) 100%)" }}>
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
                SECC Connect
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
              <CTA primary={t.lp_cta_main} secondary={t.lp_cta_curadoria} />
            </Reveal>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ PROVA SOCIAL ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {t.lp_proof_h2}
              </h2>
            </Reveal>

            {[
              { text: t.lp_proof_1_text, name: t.lp_proof_1_name },
              { text: t.lp_proof_2_text, name: t.lp_proof_2_name },
              { text: t.lp_proof_3_text, name: t.lp_proof_3_name },
            ].map((tm, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="mb-8 glass rounded-xl p-6">
                  <p className="text-foreground text-base sm:text-lg italic leading-relaxed mb-3">"{tm.text}"</p>
                  <p className="text-primary text-sm font-semibold">— {tm.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ━━━━━━━━━━━━ PLANOS — FUNDO AZUL ━━━━━━━━━━━━ */}
        <section id="planos" className="py-20 sm:py-28 px-4 relative" style={{ background: "linear-gradient(135deg, hsl(220 60% 10%), hsl(220 50% 16%), hsl(220 60% 10%))" }}>
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
              {/* SECC-In */}
              <Reveal>
                <div className="rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-1">SECC-In</h3>
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

              {/* SECC-Pro */}
              <Reveal delay={150}>
                <div className="relative rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-primary/40 bg-primary/5 backdrop-blur-sm shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]">
                  <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    {t.lp_plan_pro_popular}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">SECC-Pro</h3>
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
                  <Button className="w-full rounded-full btn-metallic-3d border-0 hover:bg-transparent py-5">
                    {t.lp_plan_pro_cta} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━ URGÊNCIA / ESCASSEZ ━━━━━━━━━━━━ */}
        <section className="px-4 py-16 sm:py-24">
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
        <section className="px-4 py-20 sm:py-28">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-8 sm:p-14 glow-amber-strong">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {t.lp_final_h2_1}
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <GoldHighlight>{t.lp_final_h2_2}</GoldHighlight>
              </h2>
              <p className="text-muted-foreground mb-8 text-base sm:text-lg max-w-md mx-auto">{t.lp_final_desc}</p>
              <CTA primary={t.lp_cta_main} secondary={t.lp_cta_curadoria} />
            </div>
          </Reveal>
        </section>

        {/* ━━━━━━━━━━━━ FOOTER MÍNIMO ━━━━━━━━━━━━ */}
        <footer className="py-8 px-4 border-t border-border/30 text-center">
          <img src={seccLogo} alt="SECC" className="h-10 w-auto mx-auto mb-2" width={160} height={40} />
          <p className="text-muted-foreground text-xs mt-2">© {new Date().getFullYear()} SECC. {t.lp_footer}</p>
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
    <section className="px-4 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.lp_faq_title}</h2>
        </Reveal>
        <div className="space-y-3">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="glass rounded-xl overflow-hidden">
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
