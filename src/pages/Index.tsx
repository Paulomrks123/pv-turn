import { useEffect, useRef, useState, createContext, useContext } from "react";
import { ChevronRight, Shield, Crosshair, Lock, Briefcase, TrendingUp, Users, Target, Zap, Radio, Brain, Mail, MessageSquare, ArrowRight, Check, Star, Trophy, UserPlus, Calendar, UserMinus, MinusCircle, Menu, X as XIcon } from "lucide-react";
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
      {children}
    </span>
  );
}

// ─── Logo ─────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>S</span>
      </div>
      <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SECC</span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────
function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav_how, href: "#mecanismo" },
    { label: t.nav_who, href: "#para-quem" },
    { label: t.nav_connect, href: "#connect" },
    { label: t.nav_plans, href: "#planos" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm" className="btn-metallic-3d rounded-full border-0 hover:bg-transparent text-sm px-5">
            {t.nav_cta} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30 px-4 pb-4">
          {links.map(l => (
            <a key={l.href} href={l.href} className="block py-3 text-sm text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <Button size="sm" className="btn-metallic-3d rounded-full border-0 hover:bg-transparent w-full mt-2">
            {t.nav_cta} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const t = useT();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary animate-gradient" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, hsl(38 92% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(38 80% 45% / 0.1) 0%, transparent 50%)" }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <Section>
          <Badge>{t.hero_badge}</Badge>
        </Section>

        <Section delay={50}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            SECC
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
          <p className="text-muted-foreground text-sm sm:text-base mb-4 max-w-xl mx-auto font-medium">
            {t.hero_desc2}
          </p>
        </Section>

        {/* YouTube Video */}
        <Section delay={250}>
          <div className="max-w-2xl mx-auto mb-6 rounded-xl overflow-hidden border border-border/30 shadow-2xl">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/MaaQmjIj2js"
                title="Turnaround Digital - Introdução"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
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
              <a href="#planos">{t.hero_cta2}</a>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full border-border/40 text-foreground hover:bg-secondary">
              {t.hero_cta3}
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
          <p className="text-muted-foreground text-base sm:text-lg mb-4 leading-relaxed">{t.belief_text}</p>
          <p className="text-foreground font-semibold text-lg sm:text-xl mb-1">{t.belief_text2}</p>
          <p className="text-gradient-gold font-bold text-xl sm:text-2xl">{t.belief_text3}</p>
        </Section>
      </div>
    </section>
  );
}

// ─── Posicionamento ───────────────────────────────────────────
function Positioning() {
  const t = useT();
  const cards = [
    { icon: Shield, title: t.position_curation, desc: t.position_curation_desc },
    { icon: Crosshair, title: t.position_match, desc: t.position_match_desc },
    { icon: Users, title: t.position_belonging, desc: t.position_belonging_desc },
    { icon: Zap, title: t.position_community, desc: t.position_community_desc },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <div className="text-center mb-12">
            <Badge>{t.position_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              {t.position_title}<br />
              <span className="text-gradient-gold">{t.position_title2}</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-4 max-w-xl mx-auto">{t.position_text}</p>
            <p className="text-foreground font-medium">{t.position_text2}</p>
            <p className="text-gradient-gold font-bold text-lg">{t.position_text3}</p>
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <Section key={c.title} delay={i * 100}>
              <div className="glass rounded-xl p-6 hover:glow-amber transition-shadow duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-1">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.desc}</p>
              </div>
            </Section>
          ))}
        </div>
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
    <section id="mecanismo" className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <Badge>{t.mech_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              {t.mech_title} <span className="text-gradient-gold">{t.mech_title2}</span>
            </h2>
          </div>
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
    { icon: Briefcase, title: t.who_1, desc: t.who_1_desc },
    { icon: TrendingUp, title: t.who_2, desc: t.who_2_desc },
    { icon: Users, title: t.who_3, desc: t.who_3_desc },
    { icon: Target, title: t.who_4, desc: t.who_4_desc },
  ];

  return (
    <section id="para-quem" className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <Badge>{t.who_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              {t.who_title}<br />
              <span className="text-gradient-gold">{t.who_title2}</span>
            </h2>
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {profiles.map((p, i) => (
            <Section key={p.title} delay={i * 100}>
              <div className="glass rounded-xl p-5 sm:p-6 hover:glow-amber transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-base">{p.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm ml-13">{p.desc}</p>
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
  const items = [
    { icon: Crosshair, title: t.value_1, desc: t.value_1_desc },
    { icon: Star, title: t.value_2, desc: t.value_2_desc },
    { icon: Calendar, title: t.value_3, desc: t.value_3_desc },
    { icon: Users, title: t.value_4, desc: t.value_4_desc },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <Badge>{t.value_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.value_title} <span className="text-gradient-gold">{t.value_title2}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.value_desc}</p>
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <Section key={item.title} delay={i * 100}>
              <div className="glass rounded-xl p-6 hover:glow-amber transition-shadow duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECC Connect ─────────────────────────────────────────────
function TurnConnect() {
  const t = useT();
  const features = [
    { icon: Radio, title: t.connect_1, desc: t.connect_1_desc },
    { icon: Brain, title: t.connect_2, desc: t.connect_2_desc },
    { icon: Mail, title: t.connect_3, desc: t.connect_3_desc },
    { icon: MessageSquare, title: t.connect_4, desc: t.connect_4_desc },
  ];

  return (
    <section id="connect" className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <Badge>{t.connect_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.connect_title} <span className="text-gradient-gold">{t.connect_title2}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">{t.connect_desc}</p>
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <Section key={f.title} delay={i * 100}>
              <div className="glass rounded-xl p-5 sm:p-6 text-center hover:glow-amber transition-shadow duration-300 group h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{f.desc}</p>
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
  const testimonials = [
    { name: t.social_1_name, role: t.social_1_role, text: t.social_1_text, img: "https://turnaround-masters.lovable.app/assets/social-proof-1-DDtPH1Gv.jpg" },
    { name: t.social_2_name, role: t.social_2_role, text: t.social_2_text, img: "https://turnaround-masters.lovable.app/assets/social-proof-2-DFQxQ_pj.jpg" },
    { name: t.social_3_name, role: t.social_3_role, text: t.social_3_text, img: "https://turnaround-masters.lovable.app/assets/social-proof-3-iMLC6WTd.jpg" },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <Badge>{t.social_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              {t.social_title} <span className="text-gradient-gold">{t.social_title2}</span>
            </h2>
          </div>
        </Section>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tm, i) => (
            <Section key={tm.name} delay={i * 120}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src={tm.img} alt={tm.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                  <div>
                    <p className="font-bold text-sm">{tm.name}</p>
                    <p className="text-muted-foreground text-xs">{tm.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic flex-1">"{tm.text}"</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Professor ────────────────────────────────────────────────
function Professor() {
  const t = useT();
  const stats = [t.prof_stat1, t.prof_stat2, t.prof_stat3, t.prof_stat4, t.prof_stat5];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Section>
          <div className="text-center mb-10">
            <Badge>{t.prof_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">{t.prof_title}</h2>
          </div>
        </Section>

        <Section delay={150}>
          <div className="glass rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
            <img
              src="https://turnaround-masters.lovable.app/assets/estevao-photo-C43bblSx.png"
              alt={t.prof_name}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover border-2 border-primary/30 shrink-0"
            />
            <div>
              <h3 className="text-2xl font-bold mb-1">{t.prof_name}</h3>
              <p className="text-primary text-sm font-medium mb-4">{t.prof_role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">{t.prof_bio1}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">{t.prof_bio2}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.prof_bio3}</p>
              <div className="flex flex-wrap gap-2">
                {stats.map(s => (
                  <span key={s} className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Gamificação ──────────────────────────────────────────────
function Gamification() {
  const t = useT();
  const items = [
    { label: t.gamif_1, pts: t.gamif_1_pts, positive: true },
    { label: t.gamif_2, pts: t.gamif_2_pts, positive: true },
    { label: t.gamif_3, pts: t.gamif_3_pts, positive: true },
    { label: t.gamif_4, pts: t.gamif_4_pts, positive: true },
    { label: t.gamif_5, pts: t.gamif_5_pts, positive: false },
    { label: t.gamif_6, pts: t.gamif_6_pts, positive: false },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <Section>
          <div className="text-center mb-10">
            <Badge>{t.gamif_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              {t.gamif_title} <span className="text-gradient-gold">{t.gamif_title2}</span>
            </h2>
          </div>
        </Section>

        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((item, i) => (
            <Section key={item.label} delay={i * 80}>
              <div className="glass rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <span className={`font-bold text-lg ${item.positive ? "text-emerald-400" : "text-red-400"}`}>{item.pts}</span>
              </div>
            </Section>
          ))}
        </div>

        <Section delay={500}>
          <div className="mt-6 text-center">
            <p className="text-gradient-gold font-bold text-lg mb-2">{t.gamif_reward}</p>
            <p className="text-muted-foreground text-sm">{t.gamif_footer}</p>
          </div>
        </Section>
      </div>
    </section>
  );
}

// ─── Comunidade ───────────────────────────────────────────────
function Community() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Section>
          <Badge>{t.community_badge}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            {t.community_title}<br />
            <span className="text-gradient-gold">{t.community_title2}</span>
          </h2>
        </Section>
        <Section delay={150}>
          <p className="text-muted-foreground text-base sm:text-lg mb-2">{t.community_text}</p>
          <p className="text-foreground font-semibold text-lg mb-1">{t.community_text2}</p>
          <p className="text-gradient-gold font-bold text-xl">{t.community_text3}</p>
        </Section>
      </div>
    </section>
  );
}

// ─── Planos ───────────────────────────────────────────────────
function Plans() {
  const t = useT();
  const freeFeatures = [t.plan_free_f1, t.plan_free_f2, t.plan_free_f3, t.plan_free_f4];
  const proFeatures = [t.plan_pro_f1, t.plan_pro_f2, t.plan_pro_f3, t.plan_pro_f4, t.plan_pro_f5, t.plan_pro_f6, t.plan_pro_f7, t.plan_pro_f8];

  return (
    <section id="planos" className="py-20 sm:py-28 px-4 relative" style={{ background: "linear-gradient(135deg, hsl(220 60% 12%), hsl(220 50% 18%), hsl(220 60% 12%))" }}>
      {/* Decorative glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Section>
          <div className="text-center mb-14">
            <Badge>{t.plan_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {t.plan_title} <span className="text-gradient-gold">{t.plan_title2}</span>
            </h2>
          </div>
        </Section>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Plano Gratuito */}
          <Section>
            <div className="rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60 bg-white/10 rounded-full px-3 py-1 w-fit mb-4">{t.plan_free_badge}</span>
              <h3 className="text-2xl font-bold text-white mb-1">{t.plan_free}</h3>
              <div className="text-3xl font-bold text-white mb-1">{t.plan_free_price}</div>
              <p className="text-white/50 text-sm mb-6">{t.plan_free_sub}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {freeFeatures.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10 py-5">
                {t.plan_free_cta} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Section>

          {/* Plano Pro */}
          <Section delay={150}>
            <div className="relative rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-primary/40 bg-primary/5 backdrop-blur-sm shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                Mais Popular
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 w-fit mb-4">{t.plan_pro_badge}</span>
              <h3 className="text-2xl font-bold text-white mb-1">{t.plan_pro}</h3>
              <div className="text-3xl font-bold text-white mb-1">{t.plan_pro_price}</div>
              <p className="text-white/50 text-sm mb-6">{t.plan_pro_sub}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {proFeatures.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-full btn-metallic-3d border-0 hover:bg-transparent py-5">
                {t.plan_pro_cta} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────
function FAQ() {
  const t = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { q: t.faq_1_q, a: t.faq_1_a },
    { q: t.faq_2_q, a: t.faq_2_a },
    { q: t.faq_3_q, a: t.faq_3_a },
    { q: t.faq_4_q, a: t.faq_4_a },
    { q: t.faq_5_q, a: t.faq_5_a },
    { q: t.faq_6_q, a: t.faq_6_a },
    { q: t.faq_7_q, a: t.faq_7_a },
    { q: t.faq_8_q, a: t.faq_8_a },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <Section>
          <div className="text-center mb-10">
            <Badge>{t.faq_badge}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">{t.faq_title}</h2>
          </div>
        </Section>

        <div className="space-y-3">
          {items.map((item, i) => (
            <Section key={item.q} delay={i * 60}>
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
            </Section>
          ))}
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
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-2">{t.urgency_text}</p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto">{t.urgency_text2}</p>
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
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-base sm:text-lg">{t.cta_desc}</p>
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
      <Logo />
      <p className="text-muted-foreground text-xs mt-4">© {new Date().getFullYear()} SECC. {t.footer_rights}</p>
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
        <Navbar />
        <LanguageSwitcher current={lang} onChange={setLang} />
        <Hero />
        <BeliefBreaker />
        <Positioning />
        <Mechanism />
        <WhoIsItFor />
        <ValueProp />
        <TurnConnect />
        <SocialProof />
        <Professor />
        <Gamification />
        <Community />
        <Plans />
        <FAQ />
        <Urgency />
        <FinalCTA />
        <Footer />
      </main>
    </LangContext.Provider>
  );
}
