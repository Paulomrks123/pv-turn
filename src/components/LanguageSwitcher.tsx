import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { languages, type LangCode } from "@/lib/translations";

interface Props {
  current: LangCode;
  onChange: (code: LangCode) => void;
}

export default function LanguageSwitcher({ current, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = languages.find((l) => l.code === current)!;

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="glass flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium hover:glow-amber transition-shadow duration-300"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span>{currentLang.flag} {currentLang.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 glass rounded-xl overflow-hidden min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { onChange(lang.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 ${
                lang.code === current ? "text-primary bg-primary/5" : "text-foreground"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
