import React, { useState, useEffect } from "react";
import { Info, HelpCircle, Droplet, Sparkles, Wind, Trash2, ShieldCheck, HelpCircle as HelpIcon } from "lucide-react";

interface CareLetter {
  letter: string;
  name: string;
  badgeColor: string;
  textColor: string;
  bgColor: string;
  description: string;
  canUseWater: boolean;
  idealProducts: string[];
}

const CARE_LETTERS: CareLetter[] = [
  {
    letter: "P",
    name: "Processo Profissional",
    badgeColor: "bg-blue-500",
    textColor: "text-blue-800",
    bgColor: "bg-blue-50",
    description: "Permite limpeza convencional por profissionais utilizando solventes específicos de lavagem a seco ou processos tradicionais.",
    canUseWater: false,
    idealProducts: ["Isopropanol", "Solvente de Lavagem Seca Secativa", "Aspirador"]
  },
  {
    letter: "W",
    name: "Wet (Úmido)",
    badgeColor: "bg-emerald-500",
    textColor: "text-emerald-800",
    bgColor: "bg-emerald-50",
    description: "O tecido mais amigável e seguro de limpar! Permite limpeza úmida utilizando água e detergentes neutros de louça.",
    canUseWater: true,
    idealProducts: ["Fórmula Limpa-Tudo Giro Clean", "Detergente Neutro", "Vinagre Branco"]
  },
  {
    letter: "S",
    name: "Solvent (Seco)",
    badgeColor: "bg-amber-500",
    textColor: "text-amber-800",
    bgColor: "bg-amber-50",
    description: "ATENÇÃO! Permite apenas limpeza a seco com solventes. O uso de água pura pode manchar e encolher as fibras permanentemente.",
    canUseWater: false,
    idealProducts: ["Álcool Isopropílico 99%", "Flotadores dry-clean específicos"]
  },
  {
    letter: "F / X",
    name: "Fibras Especiais / Apenas Aspirar",
    badgeColor: "bg-rose-500",
    textColor: "text-rose-800",
    bgColor: "bg-rose-50",
    description: "Tecidos delicados ou de alfaiataria. Exige aspiração constante e escovação ultra-suave. Limpeza profunda apenas por profissionais.",
    canUseWater: false,
    idealProducts: ["Aspirador de Pó", "Escova de Cerdas de Crina", "Pano de microfibra seco"]
  }
];

export default function FabricCareInfographic() {
  const [selectedLetter, setSelectedLetter] = useState<string>("W");
  const [simState, setSimState] = useState<"falling" | "landed" | "absorbed">("falling");
  const [fabricType, setFabricType] = useState<"suede" | "linho">("suede");

  // Loop simulation of water droplet
  useEffect(() => {
    const interval = setInterval(() => {
      setSimState("falling");
      
      const landingTimeout = setTimeout(() => {
        setSimState("landed");
        
        if (fabricType === "linho") {
          const absorbTimeout = setTimeout(() => {
            setSimState("absorbed");
          }, 1200);
          return () => clearTimeout(absorbTimeout);
        }
      }, 1500);

      return () => clearTimeout(landingTimeout);
    }, 4500);

    return () => clearInterval(interval);
  }, [fabricType]);

  const activeLetterObj = CARE_LETTERS.find((l) => l.letter === selectedLetter || (selectedLetter === "F" && l.letter === "F / X")) || CARE_LETTERS[1];

  return (
    <div id="fabric-care-infographic" className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          Diagrama Interativo do Produtor
        </span>
        <h3 className="font-display font-black text-lg text-slate-800 mt-1">
          Infográfico Técnico de Tecidos & Conservação
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
          Abaixo você visualiza os códigos universais de etiquetas e a reação física real de absorção dos tecidos do Módulo 1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* PARTE 1: Códigos de Etiquetas (P, W, S, F) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 rounded-full bg-indigo-600"></span>
              1. Decifrando os Códigos das Etiquetas (P, W, S, F)
            </h4>
            
            {/* Letters Grid selection */}
            <div className="grid grid-cols-4 gap-2.5">
              {CARE_LETTERS.map((item) => {
                const isSelected = selectedLetter === item.letter || (selectedLetter === "F" && item.letter === "F / X");
                return (
                  <button
                    key={item.letter}
                    id={`btn-infographic-letter-${item.letter}`}
                    onClick={() => setSelectedLetter(item.letter === "F / X" ? "F" : item.letter)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500"
                        : "border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white ${item.badgeColor} shadow-sm`}>
                      {item.letter.substring(0, 1)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 mt-1.5">Etiqueta {item.letter.substring(0, 1)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Card */}
          <div className={`p-4 rounded-xl border transition-all ${activeLetterObj.bgColor} border-slate-100 space-y-2.5`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${activeLetterObj.badgeColor}`}></span>
                {activeLetterObj.name}
              </span>
              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                activeLetterObj.canUseWater ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
              }`}>
                {activeLetterObj.canUseWater ? "Permite Água" : "Proibido Água Pura"}
              </span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeLetterObj.description}
            </p>

            <div className="pt-1.5 border-t border-slate-200/50">
              <span className="text-[9px] font-bold text-slate-500 block mb-1">PRODUTOS INDICADOS:</span>
              <div className="flex flex-wrap gap-1">
                {activeLetterObj.idealProducts.map((p, idx) => (
                  <span key={idx} className="bg-white/80 border border-slate-200/60 rounded text-[9px] px-2 py-0.5 text-slate-600 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PARTE 2: Teste de Absorção em Suede vs Linho */}
        <div className="lg:col-span-5 flex flex-col justify-between border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 rounded-full bg-indigo-600"></span>
              2. Simulador: Teste das 3 Gotas (Física da Fibra)
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Altere o tecido abaixo para ver a diferença científica na absorção do Suede Sintético em comparação com o Linho Natural.
            </p>
          </div>

          {/* Toggle Suede vs Linho */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              id="btn-sim-suede"
              onClick={() => {
                setFabricType("suede");
                setSimState("falling");
              }}
              className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                fabricType === "suede" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Suede Sintético
            </button>
            <button
              id="btn-sim-linho"
              onClick={() => {
                setFabricType("linho");
                setSimState("falling");
              }}
              className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                fabricType === "linho" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Linho Natural
            </button>
          </div>

          {/* Simulated Canvas Box */}
          <div className="relative h-40 bg-gradient-to-b from-sky-950 to-slate-900 rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-3.5 text-white">
            
            {/* Status indicators */}
            <div className="flex justify-between items-center z-10">
              <span className="text-[9px] font-mono tracking-widest text-sky-300 uppercase">
                {fabricType === "suede" ? "SUEDE (SINTÉTICO)" : "LINHO (NATURAL)"}
              </span>
              <span className="text-[9px] font-bold bg-white/15 px-2 py-0.5 rounded-full">
                {simState === "falling" && "Gota caindo..."}
                {simState === "landed" && (fabricType === "suede" ? "Gota Flutuando! (Repelente)" : "Gota tocando a fibra...")}
                {simState === "absorbed" && "Absorção Rápida!"}
              </span>
            </div>

            {/* Droplet Simulation Stage */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Falling Droplet */}
              {simState === "falling" && (
                <div className="absolute top-4 w-4 h-4 bg-sky-400 rounded-b-full rounded-tl-full rotate-45 animate-[bounce_1.5s_infinite] shadow-md shadow-sky-400/30"></div>
              )}

              {/* Suede floating beading effect */}
              {fabricType === "suede" && simState === "landed" && (
                <div className="absolute bottom-[44px] w-5 h-5 bg-sky-400/95 rounded-full border-2 border-white/50 shadow-md shadow-sky-400/40 animate-pulse"></div>
              )}

              {/* Linho landed but absorbing stage */}
              {fabricType === "linho" && simState === "landed" && (
                <div className="absolute bottom-[40px] w-4 h-4 bg-sky-400/80 rounded-full scale-y-75 translate-y-1 transition-all duration-1000"></div>
              )}

              {/* Fabric Layer */}
              <div className="absolute bottom-0 inset-x-0 h-10 flex flex-col justify-end">
                {/* Visual representation of fabric weave pattern */}
                {fabricType === "suede" ? (
                  // Dense suede fiber layer
                  <div className="relative h-full bg-slate-700/80 border-t-2 border-emerald-400">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.07)_50%)] bg-[size:4px_100%]"></div>
                    <div className="absolute -top-1 inset-x-0 h-1 bg-emerald-400/40 animate-pulse"></div>
                  </div>
                ) : (
                  // Highly porous Linen weave layer
                  <div className="relative h-full bg-slate-800/80 border-t-2 border-rose-400">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_40%,rgba(255,255,255,0.15)_40%)] bg-[size:10px_100%]">
                      {simState === "absorbed" && (
                        <div className="absolute inset-0 bg-sky-500/30 animate-pulse transition-all duration-500"></div>
                      )}
                    </div>
                    <div className="absolute -top-1 inset-x-0 h-1 bg-rose-400/40"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Microscopic visual explain label */}
            <div className="z-10 bg-black/45 backdrop-blur-xs p-1.5 rounded text-[8px] text-slate-200 leading-normal border border-white/5 max-w-[190px]">
              {fabricType === "suede" ? (
                <span><strong>Efeito Pérola:</strong> O poliéster sintético não absorve água de imediato. A gota flutua na barreira de micro-pelos.</span>
              ) : (
                <span><strong>Efeito Esponja:</strong> Fibras vegetais são hidrofílicas. A água é sugada instantaneamente pelas cavidades da fibra.</span>
              )}
            </div>
          </div>

          {/* Quick takeaway tip */}
          <div className="flex items-start gap-2 text-[10px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {fabricType === "suede" 
                ? "Suede tolera bem receitas úmidas, pois a água demora para infiltrar na espuma profunda."
                : "Atenção: No Linho, qualquer excesso de umidade desce para a espuma, gerando mofos profundos rápidos."
              }
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
