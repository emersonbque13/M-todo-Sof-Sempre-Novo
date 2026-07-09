import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Info,
  Calculator,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  CheckCircle,
  Droplets,
  AlertTriangle,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Trophy,
  FileText,
  CheckSquare,
  Square,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Calendar,
  Layers,
  Award,
  Clock,
  Download
} from "lucide-react";

import { bookIntro, modules, conclusions, bonusContent } from "./data/ebookContent";
import FabricIdentifier from "./components/FabricIdentifier";
import DilutionCalculator from "./components/DilutionCalculator";
import StainSolver from "./components/StainSolver";
import PetSurvivalTimer from "./components/PetSurvivalTimer";
import MaintenanceScheduler from "./components/MaintenanceScheduler";
import FabricCareInfographic from "./components/FabricCareInfographic";
import GiroCleanLogo from "./components/GiroCleanLogo";
import { generateEbookPDF } from "./utils/pdfGenerator";

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<string>("welcome");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [readProgress, setReadProgress] = useState<Record<string, boolean>>({});
  const [activeTool, setActiveTool] = useState<string>("identifier");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"manual" | "tools">("manual");
  const [completedBullets, setCompletedBullets] = useState<Record<string, boolean>>({});

  // Load and save completed bullet items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sofa_completed_bullets");
    if (saved) {
      try {
        setCompletedBullets(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar marcadores concluídos", e);
      }
    }
  }, []);

  const toggleBullet = (key: string) => {
    setCompletedBullets((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("sofa_completed_bullets", JSON.stringify(updated));
      return updated;
    });
  };

  // Load and save reading progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sofa_sempre_novo_progress");
    if (saved) {
      try {
        setReadProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar progresso", e);
      }
    }
  }, []);

  const markChapterAsRead = (id: string, value: boolean) => {
    const updated = { ...readProgress, [id]: value };
    setReadProgress(updated);
    localStorage.setItem("sofa_sempre_novo_progress", JSON.stringify(updated));
  };

  const getReadPercentage = () => {
    const totalChapters = modules.length + 3; // modules + welcome + conclusion + bonus
    const readCount = Object.values(readProgress).filter(Boolean).length;
    return Math.round((readCount / totalChapters) * 100);
  };

  // Filter modules based on search query
  const filteredModules = modules.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActiveModule = () => {
    if (currentChapter === "welcome" || currentChapter === "conclusion" || currentChapter === "bonus") {
      return null;
    }
    return modules.find((m) => m.id === currentChapter) || modules[0];
  };

  const activeModule = getActiveModule();

  const handleNextChapter = () => {
    if (currentChapter === "welcome") {
      setCurrentChapter("modulo-1");
    } else if (currentChapter === "conclusion") {
      setCurrentChapter("bonus");
    } else if (currentChapter === "bonus") {
      // end
    } else {
      const idx = modules.findIndex((m) => m.id === currentChapter);
      if (idx !== -1) {
        if (idx === modules.length - 1) {
          setCurrentChapter("conclusion");
        } else {
          setCurrentChapter(modules[idx + 1].id);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevChapter = () => {
    if (currentChapter === "welcome") {
      // none
    } else if (currentChapter === "modulo-1") {
      setCurrentChapter("welcome");
    } else if (currentChapter === "conclusion") {
      setCurrentChapter(modules[modules.length - 1].id);
    } else if (currentChapter === "bonus") {
      setCurrentChapter("conclusion");
    } else {
      const idx = modules.findIndex((m) => m.id === currentChapter);
      if (idx !== -1 && idx > 0) {
        setCurrentChapter(modules[idx - 1].id);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased selection:bg-indigo-500/20 selection:text-indigo-950">
      
      {/* 🌊 GIRO CLEAN TOP BRANDING HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GiroCleanLogo variant="horizontal" />
          </div>

          {/* Search bar Desktop */}
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 rounded-xl px-3 py-1.5 w-64 transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              id="search-input"
              type="text"
              placeholder="Buscar termos, tecidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs w-full focus:outline-none"
            />
            {searchQuery && (
              <button id="btn-clear-search" onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Progress circle */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5 border border-slate-150">
              <Award className="w-4 h-4 text-amber-500" />
              <div className="text-left">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Progresso de Leitura</span>
                <span className="text-xs font-display font-extrabold text-slate-800">{getReadPercentage()}% Concluído</span>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 📱 MOBILE VIEW NAVIGATION TABS */}
      <div className="md:hidden bg-white border-b border-slate-200 grid grid-cols-2 text-center sticky top-[65px] z-40">
        <button
          id="tab-manual"
          onClick={() => setMobileTab("manual")}
          className={`py-2.5 text-xs font-bold transition-all border-b-2 flex flex-col items-center gap-0.5 ${
            mobileTab === "manual" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Manual
        </button>
        <button
          id="tab-tools"
          onClick={() => setMobileTab("tools")}
          className={`py-2.5 text-xs font-bold transition-all border-b-2 flex flex-col items-center gap-0.5 ${
            mobileTab === "tools" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500"
          }`}
        >
          <Calculator className="w-4 h-4" />
          Ferramentas
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-5 p-4 md:py-6">
        
        {/* 📚 SIDEBAR: CHAPTER LIST & PROGRESS TRACKER */}
        <aside className={`w-full md:w-64 shrink-0 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm md:sticky md:top-[85px] md:h-[calc(100vh-120px)] ${
          mobileMenuOpen ? "fixed inset-x-4 top-[120px] bottom-4 z-50 overflow-y-auto block" : "hidden md:flex"
        }`}>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Estrutura do Livro</span>
              <div className="h-[2px] bg-slate-100 w-full mb-3 rounded">
                <div className="h-full bg-indigo-600 rounded" style={{ width: `${getReadPercentage()}%` }}></div>
              </div>
            </div>

            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
              {/* Boas-vindas Link */}
              <button
                id="btn-chap-welcome"
                onClick={() => {
                  setCurrentChapter("welcome");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  currentChapter === "welcome"
                    ? "bg-indigo-50 text-indigo-900 border border-indigo-100"
                    : "hover:bg-slate-50 text-slate-600 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Boas-vindas & Manual</span>
                </div>
                {readProgress["welcome"] && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
              </button>

              {/* Modules Links */}
              {filteredModules.map((m) => (
                <button
                  key={m.id}
                  id={`btn-chap-${m.id}`}
                  onClick={() => {
                    setCurrentChapter(m.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    currentChapter === m.id
                      ? "bg-indigo-50 text-indigo-900 border border-indigo-100"
                      : "hover:bg-slate-50 text-slate-600 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate max-w-[150px]">{m.title.replace("MÓDULO ", "Mod ")}</span>
                  </div>
                  {readProgress[m.id] && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                </button>
              ))}

              {/* Conclusão Link */}
              <button
                id="btn-chap-conclusion"
                onClick={() => {
                  setCurrentChapter("conclusion");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  currentChapter === "conclusion"
                    ? "bg-indigo-50 text-indigo-900 border border-indigo-100"
                    : "hover:bg-slate-50 text-slate-600 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conclusão do Treinamento</span>
                </div>
                {readProgress["conclusion"] && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
              </button>

              {/* Bônus Link */}
              <button
                id="btn-chap-bonus"
                onClick={() => {
                  setCurrentChapter("bonus");
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  currentChapter === "bonus"
                    ? "bg-indigo-50 text-indigo-900 border border-indigo-100"
                    : "hover:bg-slate-50 text-slate-600 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Bônus Exclusivos (4)</span>
                </div>
                {readProgress["bonus"] && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
              </button>
            </nav>
          </div>

          {/* Sidebar WhatsApp Card */}
          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider">Suporte do Produtor</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              Ficou com alguma dúvida sobre o método? Fale diretamente com o produtor no WhatsApp para suporte individual.
            </p>
            <a
              id="sidebar-link-whatsapp"
              href="https://wa.me/5579998376954?text=Olá!%20Fiquei%20com%20uma%20dúvida%20sobre%20o%20método%20Giro%20Clean%20e%20gostaria%20de%20falar%20com%20o%20produtor."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-2 rounded-lg transition-all shadow-sm shadow-emerald-600/10"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Falar com o Produtor
            </a>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-3 flex flex-col items-center gap-1.5 text-center">
            <GiroCleanLogo variant="icon-only" size={24} className="w-6 h-6 opacity-50" />
            <span className="text-[9px] text-slate-400 font-mono font-medium">Método SSV v1.2</span>
          </div>
        </aside>

        {/* 📖 COLUMN 2: BOOK CONTENT VIEWER */}
        <main className={`flex-1 space-y-6 ${mobileTab !== "manual" ? "hidden md:block" : "block"}`}>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-sm relative">
            
            {/* Boas-vindas Page */}
            {currentChapter === "welcome" && (
              <article className="space-y-8">
                {/* 🎨 ADAPTED PREMIUM VIRTUAL COVER (Fidelity Spiral Notebook Model) */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl relative overflow-hidden text-slate-800 font-sans min-h-[560px] flex flex-col justify-between pl-10 md:pl-12 pr-6 md:pr-10 py-12 md:py-16">
                  
                  {/* Realistic Metal Spiral Binder along the left edge */}
                  <div className="absolute left-1 md:left-2 top-0 bottom-0 w-7 flex flex-col justify-between py-8 z-20 pointer-events-none">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        {/* Ring metal loop */}
                        <div className="w-5 md:w-6 h-2 bg-gradient-to-r from-neutral-800 via-neutral-400 to-neutral-800 rounded-full border border-neutral-950/40 shadow-[0_1px_3px_rgba(0,0,0,0.4)]"></div>
                        {/* Punch hole */}
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-slate-300 ml-1 shadow-inner"></div>
                      </div>
                    ))}
                  </div>

                  {/* Top-centered brand logo monogram */}
                  <div className="flex flex-col items-center mt-4">
                    <div className="w-20 h-20 rounded-full border border-[#1c3879] flex items-center justify-center p-1 relative shadow-sm">
                      <div className="w-full h-full rounded-full border border-dashed border-[#1c3879]/60 flex items-center justify-center">
                        <span className="font-serif font-bold text-3xl text-[#1c3879] tracking-tight">SSV</span>
                      </div>
                    </div>
                  </div>

                  {/* Centered Spaced Elegant Typography */}
                  <div className="text-center space-y-3 my-auto z-10">
                    <span className="text-[11px] font-bold text-slate-500 tracking-[0.3em] block uppercase">
                      M É T O D O
                    </span>
                    <h1 className="font-serif text-6xl md:text-7xl font-extrabold text-[#1c3879] tracking-widest leading-none drop-shadow-sm select-none">
                      SOFÁ
                    </h1>
                    <h2 className="font-sans text-xl md:text-2xl font-extrabold text-[#1c3879] tracking-[0.25em] uppercase leading-tight">
                      SEMPRE NOVO
                    </h2>
                    
                    <div className="pt-2">
                      <span className="font-serif italic text-xs md:text-sm text-slate-400 tracking-wider">
                        LIMPAR   •   CONSERVAR   •   RESTAURAR
                      </span>
                    </div>
                  </div>

                  {/* Dual-layered smooth curve/waves at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none overflow-hidden rounded-b-3xl z-0">
                    <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                      {/* Lighter Lavender/Slate Wave (Inverted, starting low on left and rising close to letters on right) */}
                      <path d="M 0 125 Q 130 115, 260 55 T 400 38 L 400 150 L 0 150 Z" fill="#e2e8f0" />
                      {/* Rich Deep Navy Wave (Inverted, starting low on left and rising close to letters on right) */}
                      <path d="M 0 138 Q 140 125, 270 65 T 400 48 L 400 150 L 0 150 Z" fill="#1c3879" />
                    </svg>
                  </div>

                  {/* Elegant floating branding subtone */}
                  <div className="mt-auto text-center z-10 text-[9px] text-slate-300 font-mono tracking-widest uppercase">
                    Giro Clean Academy © 2026
                  </div>

                </div>

                {/* 📖 Introduction Welcome Text block */}
                <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed text-justify border-t border-slate-100 pt-6">
                  <h3 className="font-display font-bold text-xl text-slate-800">{bookIntro.welcome.title}</h3>
                  {bookIntro.welcome.content.split("\n\n").map((p, idx) => (
                    <p key={idx} className="text-justify">{p}</p>
                  ))}
                </div>

                {/* Who is it for */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs">
                  <h4 className="font-display font-bold text-sm text-slate-800 mb-3">Para quem é este verdadeiro manual profissional?</h4>
                  <ul className="space-y-2">
                    {bookIntro.welcome.whoIsItFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to use */}
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 text-xs text-sky-950">
                  <h4 className="font-display font-bold text-sm text-sky-900 mb-2">Como utilizar este método de forma eficiente:</h4>
                  <p className="leading-relaxed text-justify">{bookIntro.welcome.howToUse}</p>
                </div>

                {/* Copyright info */}
                <div className="border-t border-slate-100 pt-5 text-[10px] text-slate-400 leading-relaxed font-mono space-y-2">
                  <p>{bookIntro.copyright}</p>
                  <p>{bookIntro.disclaimer}</p>
                </div>
              </article>
            )}

            {/* Modules Pages */}
            {activeModule && (
              <article className="space-y-6">
                <div className="border-b border-slate-150 pb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Módulo de Ensino Prático
                  </span>
                  <h1 className="font-display font-black text-2xl md:text-3xl text-slate-900 mt-1 tracking-tight">
                    {activeModule.title}
                  </h1>
                  {activeModule.subtitle && (
                    <p className="text-sm font-medium text-slate-500 mt-1">{activeModule.subtitle}</p>
                  )}
                </div>

                {/* Introduction */}
                <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-serif italic border-l-4 border-indigo-400 pl-4 py-1.5 bg-slate-50/50 rounded-r-xl text-justify">
                  {activeModule.introduction}
                </div>

                {/* Module Objective */}
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex gap-3 text-xs text-indigo-950">
                  <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-indigo-900 uppercase text-[10px] tracking-wide mb-0.5">Objetivo do Módulo:</span>
                    <p className="leading-relaxed">{activeModule.objective}</p>
                  </div>
                </div>

                {/* Explanation HTML Parser (renders markdown tags as standard html with beautiful style) */}
                <div className="text-xs md:text-sm text-slate-600 leading-relaxed space-y-4 font-sans border-t border-slate-100 pt-4 text-justify animate-fade-in">
                  <div className="prose max-w-none prose-slate prose-xs">
                    {(() => {
                      const lines = activeModule.explanation.split("\n");
                      const blocks: { type: "heading" | "list" | "paragraph"; lines: string[] }[] = [];
                      let currentBlock: { type: "heading" | "list" | "paragraph"; lines: string[] } | null = null;

                      for (let i = 0; i < lines.length; i++) {
                        const rawLine = lines[i];
                        const trimmedLine = rawLine.trim();

                        if (!trimmedLine) {
                          if (currentBlock) {
                            blocks.push(currentBlock);
                            currentBlock = null;
                          }
                          continue;
                        }

                        if (trimmedLine.startsWith("### ")) {
                          if (currentBlock) {
                            blocks.push(currentBlock);
                          }
                          blocks.push({ type: "heading", lines: [trimmedLine] });
                          currentBlock = null;
                        } else if (trimmedLine.startsWith("*") || trimmedLine.startsWith("-")) {
                          if (currentBlock && currentBlock.type === "list") {
                            currentBlock.lines.push(trimmedLine);
                          } else {
                            if (currentBlock) {
                              blocks.push(currentBlock);
                            }
                            currentBlock = { type: "list", lines: [trimmedLine] };
                          }
                        } else {
                          if (currentBlock && currentBlock.type === "paragraph") {
                            currentBlock.lines.push(trimmedLine);
                          } else {
                            if (currentBlock) {
                              blocks.push(currentBlock);
                            }
                            currentBlock = { type: "paragraph", lines: [trimmedLine] };
                          }
                        }
                      }
                      if (currentBlock) {
                        blocks.push(currentBlock);
                      }

                      return blocks.map((block, bIdx) => {
                        if (block.type === "heading") {
                          const headingText = block.lines[0].replace("### ", "");
                          return (
                            <h3 key={bIdx} className="font-display font-bold text-base text-slate-800 mt-5 mb-2.5 text-left">
                              {headingText}
                            </h3>
                          );
                        }

                        if (block.type === "list") {
                          return (
                            <div key={bIdx} className="space-y-2.5 my-3">
                              {block.lines.map((li, lIdx) => {
                                // Remove leading star/hyphen and whitespace
                                const cleanLi = li.replace(/^[\*\-]\s*/, "");
                                const itemKey = `${activeModule.id}-${bIdx}-${lIdx}`;
                                const isCompleted = completedBullets[itemKey] || false;

                                // Extract bold section at start if present
                                const boldMatch = cleanLi.match(/^\s*\*\*(.*?)\*\*(.*)/s);
                                let topic = "";
                                let remainingText = cleanLi;

                                if (boldMatch) {
                                  topic = boldMatch[1];
                                  remainingText = boldMatch[2];
                                }

                                return (
                                  <div
                                    key={lIdx}
                                    onClick={() => toggleBullet(itemKey)}
                                    className={`group flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border text-justify select-none ${
                                      isCompleted
                                        ? "bg-emerald-50/55 border-emerald-100/80 text-emerald-950/80 shadow-sm"
                                        : "bg-white hover:bg-slate-50 border-slate-100 hover:border-indigo-100 hover:shadow-sm text-slate-600"
                                    }`}
                                  >
                                    {/* Interactive Marker */}
                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300 mt-0.5 ${
                                      isCompleted
                                        ? "bg-emerald-500 border-emerald-500 text-white scale-110 shadow-sm shadow-emerald-200"
                                        : "border-slate-300 group-hover:border-indigo-400 bg-white text-transparent group-hover:text-indigo-400"
                                    }`}>
                                      <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>

                                    <span className={`leading-relaxed text-xs md:text-sm ${isCompleted ? "line-through text-slate-400/80" : ""}`}>
                                      {topic ? (
                                        <>
                                          <strong className={`font-bold transition-colors ${isCompleted ? "text-slate-400/80" : "text-slate-800"}`}>
                                            {topic}
                                          </strong>
                                          {remainingText}
                                        </>
                                      ) : cleanLi}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }

                        // Paragraph type
                        return block.lines.map((line, lIdx) => (
                          <p key={`${bIdx}-${lIdx}`} className="mb-3 text-justify leading-relaxed">
                            {line.split("**").map((chunk, cIdx) => (
                              cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-slate-800">{chunk}</strong> : chunk
                            ))}
                          </p>
                        ));
                      });
                    })()}
                  </div>
                </div>

                {/* Passo a Passo */}
                <div className="border-t border-slate-100 pt-5">
                  <h3 className="font-display font-bold text-base text-slate-800 mb-3">Roteiro Passo a Passo do Higienizador</h3>
                  <div className="space-y-2.5">
                    {activeModule.stepByStep.map((step, idx) => (
                      <div key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-150">
                        <span className="w-5.5 h-5.5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-[10px] shrink-0 mt-0.5 shadow-sm">
                          {idx + 1}
                        </span>
                        <span>
                          {step.split("**").map((chunk, cIdx) => (
                            cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-slate-800">{chunk}</strong> : chunk
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Tips */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-950 flex gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-emerald-900 uppercase tracking-wide text-[10px] mb-1">
                      💡 Dicas do Especialista
                    </span>
                    <ul className="space-y-1.5 leading-relaxed">
                      {activeModule.expertTips.map((tip, idx) => (
                        <li key={idx} className="list-disc pl-4 italic">"{tip}"</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Common Errors & Important Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-xs text-red-950">
                    <span className="font-bold block text-red-900 uppercase tracking-wide text-[10px] mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      Erros Comuns Praticados
                    </span>
                    <ul className="space-y-2 leading-relaxed">
                      {activeModule.commonErrors.map((err, idx) => (
                        <li key={idx} className="list-disc pl-4 text-red-800">{err}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-950">
                    <span className="font-bold block text-amber-900 uppercase tracking-wide text-[10px] mb-2 flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      ⚠ Alertas Importantes de Segurança
                    </span>
                    <ul className="space-y-2 leading-relaxed">
                      {activeModule.importantAlerts.map((alert, idx) => (
                        <li key={idx} className="list-disc pl-4 text-amber-800">{alert}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical Exercise */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-950">
                  <h4 className="font-display font-bold text-slate-800 mb-1">Exercício Prático de Fixação:</h4>
                  <p className="leading-relaxed text-justify">{activeModule.practicalExercise}</p>
                </div>

                {/* Visual Suggestion Box (For Canva/PDF creation) */}
                {activeModule.visualSuggestions && (
                  activeModule.id === "modulo-1" ? (
                    <FabricCareInfographic />
                  ) : (
                    <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 text-[10px] text-slate-500 font-mono">
                      <span className="font-bold uppercase text-[9px] text-slate-400 block mb-1">📌 Sugestão de Imagem / Diagrama para Diagramação no Canva</span>
                      <p>{activeModule.visualSuggestions}</p>
                    </div>
                  )
                )}

                {/* Module Checklist */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs">
                  <span className="font-bold block text-slate-700 mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ✅ Checklist do Módulo
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModule.checklist.map((item, idx) => {
                      const itemKey = `${activeModule.id}-checklist-${idx}`;
                      const isChecked = !!readProgress[itemKey];
                      return (
                        <button
                          key={itemKey}
                          id={`btn-checklist-${itemKey}`}
                          onClick={() => markChapterAsRead(itemKey, !isChecked)}
                          className="text-left flex items-start gap-2 p-2 hover:bg-slate-50 rounded-lg transition-all"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                          ) : (
                            <Square className="w-4.5 h-4.5 text-slate-300 shrink-0 hover:text-slate-400" />
                          )}
                          <span className={`text-[11px] leading-relaxed ${isChecked ? "line-through text-slate-400" : "text-slate-600"}`}>
                            {item}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </article>
            )}

            {/* Conclusion Page */}
            {currentChapter === "conclusion" && (
              <article className="space-y-6">
                <div className="text-center border-b border-slate-150 pb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                    Conclusão do Método
                  </span>
                  <h1 className="font-display font-black text-3xl text-slate-900 mt-3 tracking-tight">
                    {conclusions.title}
                  </h1>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed font-serif text-justify">
                  {conclusions.content.split("\n\n").map((p, idx) => (
                    <p key={idx} className="text-justify">{p}</p>
                  ))}
                </div>

                {/* WhatsApp Community VIP Prompt Card */}
                <div className="bg-gradient-to-br from-emerald-800 to-green-950 text-white rounded-2xl p-6 shadow-md shadow-emerald-950/15 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto text-yellow-300">
                    <Sparkles className="w-6 h-6 fill-current" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-black text-lg text-white">Comunidade VIP no WhatsApp</h4>
                    <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                      Não limpe sozinho! Acesse nossa comunidade exclusiva no WhatsApp e tenha nosso time de especialistas e o produtor prontos para tirar qualquer dúvida em tempo real.
                    </p>
                  </div>
                  <a
                    id="link-whatsapp-vip"
                    href="https://chat.whatsapp.com/FFhzMpJGToACFDEkK9I9o1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-500/20 animate-pulse-soft"
                  >
                    Entrar na Comunidade VIP Gratuitamente
                  </a>
                </div>
              </article>
            )}

            {/* Bonus Page */}
            {currentChapter === "bonus" && (
              <article className="space-y-8">
                <div className="border-b border-slate-150 pb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
                    Material Suplementar Pró
                  </span>
                  <h1 className="font-display font-black text-3xl text-slate-900 mt-2 tracking-tight">
                    Materiais de Bônus Exclusivos
                  </h1>
                </div>

                {/* Bonus 1: Dilutions Table */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-display font-bold text-base text-slate-800">{bonusContent[0].title}</h3>
                  </div>
                  <p className="text-xs text-slate-500">{bonusContent[0].description}</p>
                  <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-xs text-left text-slate-600">
                      <thead className="bg-slate-50 text-slate-700 uppercase font-mono text-[9px] border-b border-slate-200">
                        <tr>
                          {bonusContent[0].columns?.map((col, idx) => (
                            <th key={idx} className="px-3 py-2 font-bold">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {bonusContent[0].rows?.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            {row.map((val, cellIdx) => (
                              <td key={cellIdx} className={`px-3 py-2 ${cellIdx === 0 ? "font-bold text-slate-900" : ""}`}>{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Bonus 3: Can or Cannot Table */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <h3 className="font-display font-bold text-base text-slate-800">{bonusContent[2].title}</h3>
                  </div>
                  <p className="text-xs text-slate-500">{bonusContent[2].description}</p>
                  <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                    <table className="w-full text-xs text-left text-slate-600">
                      <thead className="bg-slate-50 text-slate-700 uppercase font-mono text-[9px] border-b border-slate-200">
                        <tr>
                          {bonusContent[2].columns?.map((col, idx) => (
                            <th key={idx} className="px-3 py-2 font-bold">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {bonusContent[2].rows?.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            {row.map((val, cellIdx) => (
                              <td key={cellIdx} className={`px-3 py-2 ${
                                cellIdx === 0 ? "font-bold text-slate-900" : cellIdx === 1 ? (val.includes("SIM") ? "text-emerald-600 font-bold" : "text-red-600 font-bold") : ""
                              }`}>{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Bonus 2: Professional Checklist */}
                <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-display font-bold text-base text-slate-800">{bonusContent[1].title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{bonusContent[1].description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {bonusContent[1].items?.map((item, idx) => {
                      const itemKey = `bonus-checklist-${idx}`;
                      const isChecked = !!readProgress[itemKey];
                      return (
                        <button
                          key={itemKey}
                          id={`btn-bonus-check-${itemKey}`}
                          onClick={() => markChapterAsRead(itemKey, !isChecked)}
                          className="text-left flex items-start gap-2.5 p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-150"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4.5 h-4.5 text-slate-300 shrink-0 mt-0.5 hover:text-slate-400" />
                          )}
                          <span className={`text-xs leading-relaxed ${isChecked ? "line-through text-slate-400" : "text-slate-600"}`}>
                            {item}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Bonus 5: Digital Ebook PDF */}
                {bonusContent[4] && (
                  <section className="space-y-4 bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-2xl p-5 md:p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
                      <div className="w-full md:w-auto flex justify-center shrink-0">
                        {/* Beautiful 3D-like Book Mockup in CSS */}
                        <div className="relative w-32 h-44 bg-gradient-to-tr from-indigo-950 via-indigo-900 to-indigo-800 rounded-r-xl shadow-lg border-y border-r border-indigo-500/20 flex flex-col justify-between p-4 overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-indigo-950/45">
                          <div className="absolute -right-10 -top-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                          <div className="space-y-1 z-10">
                            <span className="text-[7px] font-extrabold uppercase tracking-widest text-indigo-300 bg-indigo-950/50 px-1.5 py-0.5 rounded border border-indigo-500/20">
                              MÉTODO PREMIUM
                            </span>
                            <h4 className="font-display font-black text-xs text-white leading-tight mt-1">
                              Método Sofá<br />Sempre Novo®
                            </h4>
                          </div>
                          <div className="space-y-1.5 z-10">
                            <div className="h-[2px] w-6 bg-amber-400"></div>
                            <span className="text-[7px] font-mono text-indigo-300 block">
                              Giro Clean Academy
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-display font-bold text-sm text-slate-800">
                              {bonusContent[4].title}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {bonusContent[4].description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {bonusContent[4].features?.map((feat: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2">
                          <button
                            id="btn-download-pdf"
                            onClick={generateEbookPDF}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/15 hover:scale-[1.01] cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            Baixar Ebook PDF Completo
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </article>
            )}

            {/* Bottom pagination */}
            <div className="border-t border-slate-100 pt-5 mt-8 flex items-center justify-between gap-4 text-xs">
              <button
                id="btn-page-prev"
                onClick={handlePrevChapter}
                disabled={currentChapter === "welcome"}
                className="px-4 py-2 bg-slate-150 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <button
                id="btn-mark-chapter-read"
                onClick={() => markChapterAsRead(currentChapter, !readProgress[currentChapter])}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  readProgress[currentChapter]
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${readProgress[currentChapter] ? "text-emerald-500" : "text-slate-400"}`} />
                {readProgress[currentChapter] ? "Lido ✅" : "Marcar como Lido"}
              </button>

              <button
                id="btn-page-next"
                onClick={handleNextChapter}
                disabled={currentChapter === "bonus"}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>

        {/* 🛠 COLUMN 3: INTERACTIVE TOOLBELT PANEL & ASSISTENTE */}
        <aside className={`w-full md:w-85 shrink-0 space-y-6 ${
          mobileTab === "manual" ? "hidden md:block" : mobileTab === "tools" ? "block" : "hidden"
        }`}>
          {/* Active Tool Select Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Painel Interativo de Ferramentas</span>
            <div className="grid grid-cols-3 gap-1 mb-4">
              <button
                id="tool-tab-identifier"
                onClick={() => setActiveTool("identifier")}
                className={`py-2 text-[10px] font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  activeTool === "identifier"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <Layers className="w-4 h-4" />
                Tecidos
              </button>
              <button
                id="tool-tab-calculator"
                onClick={() => setActiveTool("calculator")}
                className={`py-2 text-[10px] font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  activeTool === "calculator"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <Calculator className="w-4 h-4" />
                Diluições
              </button>
              <button
                id="tool-tab-stains"
                onClick={() => setActiveTool("stains")}
                className={`py-2 text-[10px] font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  activeTool === "stains"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <Droplets className="w-4 h-4" />
                Manchas
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                id="tool-tab-pets"
                onClick={() => setActiveTool("pets")}
                className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  activeTool === "pets"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <Clock className="w-4 h-4" />
                Emergência Pets
              </button>
              <button
                id="tool-tab-calendar"
                onClick={() => setActiveTool("calendar")}
                className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  activeTool === "calendar"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Cronograma
              </button>
            </div>
          </div>

          {/* Render Active Tool */}
          <div className="transition-all duration-300">
            {activeTool === "identifier" && <FabricIdentifier />}
            {activeTool === "calculator" && <DilutionCalculator />}
            {activeTool === "stains" && <StainSolver />}
            {activeTool === "pets" && <PetSurvivalTimer />}
            {activeTool === "calendar" && <MaintenanceScheduler />}
          </div>
        </aside>



      </div>

      {/* 🖨️ PRINT-ONLY BEAUTIFULLY STYLED EBOOK FOR PDF DOWNLOAD */}
      <div id="printable-ebook" className="hidden print:block bg-white text-slate-900 p-12 space-y-16">
        
        {/* CAPA (Cover Page) */}
        <div className="flex flex-col justify-between items-center text-center h-[26cm] py-16 page-break">
          <div></div>
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 mb-8">
              <GiroCleanLogo variant="full" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Ebook Premium Digital
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-slate-950 mt-6 tracking-tight max-w-2xl leading-tight">
              {bookIntro.title}
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-xl mx-auto mt-4 leading-relaxed">
              {bookIntro.subtitle}
            </p>
          </div>
          <div className="w-full border-t border-slate-100 pt-6 space-y-2">
            <p className="text-xs font-mono text-slate-400">{bookIntro.author}</p>
            <p className="text-[10px] text-slate-300 font-mono">Giro Clean Academy © 2026</p>
          </div>
        </div>

        {/* BOAS-VINDAS / INTRODUÇÃO */}
        <div className="space-y-8 page-break py-8">
          <div className="border-b border-slate-150 pb-5">
            <h2 className="font-display font-black text-3xl text-slate-900">
              {bookIntro.welcome.title}
            </h2>
          </div>
          
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed text-justify">
            {bookIntro.welcome.content.split("\n\n").map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">
              Para quem é este verdadeiro manual profissional?
            </h3>
            <ul className="space-y-2.5">
              {bookIntro.welcome.whoIsItFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 text-sky-950">
            <h3 className="font-display font-bold text-base text-sky-900 mb-2">
              Como utilizar este método de forma eficiente:
            </h3>
            <p className="text-sm leading-relaxed text-justify">{bookIntro.welcome.howToUse}</p>
          </div>

          <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 leading-relaxed font-mono space-y-2">
            <p>{bookIntro.copyright}</p>
            <p>{bookIntro.disclaimer}</p>
          </div>
        </div>

        {/* MODULES */}
        {modules.map((m) => (
          <div key={m.id} className="space-y-8 page-break py-8">
            
            {/* Page 1 of Module: Theory */}
            <div className="border-b border-slate-150 pb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Módulo de Ensino Prático
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 mt-1 tracking-tight">
                {m.title}
              </h2>
              {m.subtitle && (
                <p className="text-sm font-medium text-slate-500 mt-1">{m.subtitle}</p>
              )}
            </div>

            <div className="text-sm text-slate-600 leading-relaxed font-serif italic border-l-4 border-indigo-400 pl-4 py-2 bg-slate-50/50 rounded-r-xl text-justify">
              {m.introduction}
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 text-sm text-indigo-950">
              <span className="font-bold block text-indigo-900 uppercase text-[10px] tracking-wide mb-1">Objetivo do Módulo:</span>
              <p className="leading-relaxed">{m.objective}</p>
            </div>

            {/* Render formatted Explanation */}
            <div className="text-sm text-slate-700 leading-relaxed space-y-4 font-sans text-justify">
              {m.explanation.split("\n").map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="font-display font-bold text-lg text-slate-900 mt-6 mb-3">
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }
                if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
                  const cleanLi = trimmed.replace(/^[\*\-]\s*/, "");
                  return (
                    <li key={idx} className="list-disc pl-4 ml-4 text-slate-600 my-1">
                      {cleanLi.split("**").map((chunk, cIdx) => (
                        cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-slate-900">{chunk}</strong> : chunk
                      ))}
                    </li>
                  );
                }
                return (
                  <p key={idx} className="mb-3">
                    {trimmed.split("**").map((chunk, cIdx) => (
                      cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-slate-950">{chunk}</strong> : chunk
                    ))}
                  </p>
                );
              })}
            </div>

            <div className="page-break" />

            {/* Page 2 of Module: Steps & Tips */}
            <div className="py-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-slate-900">
                Roteiro Prático & Diretrizes
              </h3>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-sm text-slate-800">Passo a Passo do Higienizador</h4>
                <div className="space-y-2.5">
                  {m.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm">
                        {idx + 1}
                      </span>
                      <span>
                        {step.split("**").map((chunk, cIdx) => (
                          cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-slate-900">{chunk}</strong> : chunk
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-sm text-emerald-950">
                <span className="font-bold block text-emerald-900 uppercase tracking-wide text-[10px] mb-2">
                  💡 Dicas do Especialista
                </span>
                <ul className="space-y-2 leading-relaxed">
                  {m.expertTips.map((tip, idx) => (
                    <li key={idx} className="list-disc pl-4 italic">"{tip}"</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-xs text-red-950">
                  <span className="font-bold block text-red-900 uppercase tracking-wide text-[10px] mb-2">
                    Erros Comuns Praticados
                  </span>
                  <ul className="space-y-2 leading-relaxed">
                    {m.commonErrors.map((err, idx) => (
                      <li key={idx} className="list-disc pl-4 text-red-800">{err}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-xs text-amber-950">
                  <span className="font-bold block text-amber-900 uppercase tracking-wide text-[10px] mb-2">
                    Alertas Importantes de Segurança
                  </span>
                  <ul className="space-y-2 leading-relaxed">
                    {m.importantAlerts.map((alert, idx) => (
                      <li key={idx} className="list-disc pl-4 text-amber-800">{alert}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 text-sm text-indigo-950">
                <h4 className="font-display font-bold text-slate-900 mb-1">Exercício Prático de Fixação:</h4>
                <p className="leading-relaxed text-justify">{m.practicalExercise}</p>
              </div>
            </div>
          </div>
        ))}

        {/* CONCLUSÃO */}
        <div className="space-y-8 page-break py-8">
          <div className="text-center border-b border-slate-150 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
              Conclusão do Método
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 mt-3 tracking-tight">
              {conclusions.title}
            </h2>
          </div>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-serif text-justify">
            {conclusions.content.split("\n\n").map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-800 to-green-950 text-white rounded-2xl p-8 text-center space-y-4">
            <h4 className="font-display font-black text-xl text-white">Comunidade VIP no WhatsApp</h4>
            <p className="text-sm text-emerald-100 leading-relaxed max-w-lg mx-auto">
              Não limpe sozinho! Acesse nossa comunidade exclusiva no WhatsApp e tenha nosso time de especialistas e o produtor prontos para tirar qualquer dúvida em tempo real.
            </p>
            <p className="text-base font-bold text-yellow-300">
              Acesse: https://chat.whatsapp.com/FFhzMpJGToACFDEkK9I9o1
            </p>
          </div>
        </div>

        {/* BÔNUS EXCLUSIVOS */}
        <div className="space-y-12 py-8">
          <div className="border-b border-slate-150 pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded">
              Material Suplementar Pró
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 mt-2 tracking-tight">
              Materiais de Bônus Exclusivos
            </h2>
          </div>

          {/* Table of Dilutions */}
          <section className="space-y-4 page-break">
            <h3 className="font-display font-bold text-lg text-slate-900">{bonusContent[0].title}</h3>
            <p className="text-sm text-slate-600">{bonusContent[0].description}</p>
            <table className="w-full border-collapse border border-slate-200 text-xs text-left">
              <thead>
                <tr className="bg-slate-100">
                  {bonusContent[0].columns?.map((col, idx) => (
                    <th key={idx} className="border border-slate-200 px-4 py-2 font-bold text-slate-700">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bonusContent[0].rows?.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((val, cIdx) => (
                      <td key={cIdx} className={`border border-slate-200 px-4 py-2 ${cIdx === 0 ? "font-bold text-slate-900" : "text-slate-600"}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Table of Can or Cannot */}
          <section className="space-y-4 page-break">
            <h3 className="font-display font-bold text-lg text-slate-900">{bonusContent[2].title}</h3>
            <p className="text-sm text-slate-600">{bonusContent[2].description}</p>
            <table className="w-full border-collapse border border-slate-200 text-xs text-left">
              <thead>
                <tr className="bg-slate-100">
                  {bonusContent[2].columns?.map((col, idx) => (
                    <th key={idx} className="border border-slate-200 px-4 py-2 font-bold text-slate-700">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bonusContent[2].rows?.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((val, cIdx) => (
                      <td key={cIdx} className={`border border-slate-200 px-4 py-2 ${
                        cIdx === 0 ? "font-bold text-slate-900" : cIdx === 1 ? (val.includes("SIM") ? "text-emerald-600 font-bold" : "text-red-600 font-bold") : "text-slate-600"
                      }`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Professional Checklist */}
          <section className="space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900">{bonusContent[1].title}</h3>
            <p className="text-sm text-slate-600 mb-4">{bonusContent[1].description}</p>
            <div className="grid grid-cols-2 gap-4">
              {bonusContent[1].items?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 border border-slate-100 rounded-lg">
                  <span className="text-slate-400 text-lg leading-none">☐</span>
                  <span className="text-xs text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-xs border-t border-slate-800 mt-auto font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-300">Método Sofá Sempre Novo® - SSV</p>
          <p>Tenho experiência prática em química têxtil, higienização de estofados e remoção de manchas.</p>
          <p className="text-[10px] text-slate-500 font-mono">© 2026 Método SSV. Todos os direitos reservados. Chave API integrada via AI Studio.</p>
        </div>
      </footer>

    </div>
  );
}
