import React, { useState } from "react";
import { Info, Check, HelpCircle, Shield, AlertTriangle, Droplets } from "lucide-react";

interface Option {
  id: string;
  label: string;
  desc: string;
  icon?: string;
}

const FEEL_OPTIONS: Option[] = [
  { id: "suede", label: "Camurça / Suede", desc: "Toque aveludado e macio. Ao passar a mão ele muda de tom (efeito 'escreve')." },
  { id: "linho", label: "Linho Rústico", desc: "Trama visível e rústica, parece um entrelaçado de palhas ou fios de algodão." },
  { id: "veludo", label: "Veludo Denso", desc: "Muito macio, pelos curtos e densos com brilho sofisticado ao refletir luz." },
  { id: "chenille", label: "Chenille Felpudo", desc: "Canais ou relevos peludos entrelaçados (parece pequenas lagartas no tecido)." },
  { id: "couro", label: "Couro ou Material Sintético", desc: "Toque frio, impermeável à primeira vista, liso ou com textura de pele sintética." },
  { id: "algodao", label: "Algodão / Jacquard", desc: "Tecido encorpado, tramas planas sem pelos, desenhos em relevo formados pela linha." },
];

const DROP_OPTIONS: Option[] = [
  { id: "instant", label: "Absorve Instantaneamente (menos de 10s)", desc: "A gota some na hora e o tecido escurece imediatamente." },
  { id: "slow", label: "Absorve Lentamente (10s a 60s)", desc: "A gota murcha devagar e vai molhando o tecido aos poucos." },
  { id: "bead", label: "Não absorve (fica como uma bolinha em cima)", desc: "A água flutua sobre a superfície sem penetrar no tecido." },
];

export default function FabricIdentifier() {
  const [feel, setFeel] = useState<string>("");
  const [drop, setDrop] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleReset = () => {
    setFeel("");
    setDrop("");
    setShowResult(false);
  };

  const getDiagnosis = () => {
    if (feel === "suede") {
      const isImpermeable = drop === "bead";
      return {
        name: isImpermeable ? "Suede / Microsuede (IMPERMEABILIZADO)" : "Suede / Microsuede (Sintético de Poliéster)",
        nature: "Fibra Sintética (Poliéster)",
        absorbency: isImpermeable ? "Nula (Repelente)" : "Baixa / Moderada",
        phRange: "pH 6.0 a 8.5 (Neutro a levemente alcalino)",
        verdict: "O tecido mais amigável do mundo para limpar! É resistente, não encolhe com água e tolera bem o detergente neutro e álcool.",
        danger: "Uso de escovas de plástico rígidas (esgarça as microfibras) e calor direto de ferros ou sol quente.",
        safetyCode: "W",
        steps: [
          "Excelente para a Fórmula Limpa-Tudo Giro Clean (água morna + álcool + detergente + vinagre).",
          "Escove sempre com cerdas macias em movimentos circulares.",
          "Para alinhar as fibras após a secagem, escove levemente em um único sentido."
        ]
      };
    }

    if (feel === "linho") {
      const isNatural = drop === "instant";
      return {
        name: isNatural ? "Linho Natural (Fibras Orgânicas)" : "Linho Sintético / Misto (Poliéster/Algodão)",
        nature: isNatural ? "Fibra Natural Orgânica (Celulose)" : "Fibras Mistas de Poliéster",
        absorbency: isNatural ? "Extremamente Alta" : "Moderada",
        phRange: isNatural ? "pH 6.5 a 7.5 (Neutro Estrito)" : "pH 6.0 a 8.0",
        verdict: isNatural 
          ? "ATENÇÃO CRÍTICA! O linho natural mancha muito facilmente por migração de lignina (manchas marrons) se secar desigual ou receber água em excesso."
          : "Bastante resistente, mas exige cuidado na escovação para não desfiar as tramas entrelaçadas.",
        danger: isNatural 
          ? "Encharcamento (causa marcas amarelas e encolhimento das fibras) e produtos ácidos/alcalinos fortes."
          : "Escovar com força extrema na diagonal das tramas.",
        safetyCode: isNatural ? "S" : "W",
        steps: isNatural 
          ? [
              "Trabalhe com umidade ultra-controlada (névoa seca). Quase zero água.",
              "Use panos de microfibra brancos limpos apenas pressionando para extrair a sujeira.",
              "Use secagem acelerada forçada com ventilador para que seque de forma homogênea."
            ]
          : [
              "Use a Fórmula Limpa-Tudo Giro Clean moderadamente.",
              "Escove seguindo a direção ortogonal do entrelaçado para evitar desfiar.",
              "Extraia com pano seco de microfibra pressionando firmemente."
            ]
      };
    }

    if (feel === "veludo") {
      return {
        name: "Veludo / Soft Velvet",
        nature: "Fibras Densas de Poliéster ou Algodão",
        absorbency: "Moderada a Alta",
        phRange: "pH 6.5 a 7.5 (Neutro Estrito)",
        verdict: "Tecido luxuoso e denso. É muito resistente a rasgos, mas os pelos podem ficar 'amassados' ou lixados se limpos de forma errada.",
        danger: "Escovar no sentido contrário ao nascimento do pelo com força e colocar peso ou sentar enquanto estiver úmido (marca a fibra para sempre).",
        safetyCode: "W",
        steps: [
          "Borrife o produto em névoa fina.",
          "Escove sempre no sentido dos pelos (passe a mão para ver qual lado desliza suavemente).",
          "Após secar, passe uma escova seca e macia para erguer os pelos e devolver o brilho original."
        ]
      };
    }

    if (feel === "chenille") {
      return {
        name: "Chenille Felpudo",
        nature: "Fibra Mista (geralmente Algodão, Viscose e Poliéster)",
        absorbency: "Alta",
        phRange: "pH 7.0 (Neutro)",
        verdict: "O chenille acumula muita poeira nas frestas do relevo felpudo. Exige aspiração profunda triplicada antes de qualquer líquido.",
        danger: "Molhar sem aspirar perfeitamente (a poeira das fendas vira lama profunda na espuma) e escovas duras que desfazem os tufos felpudos.",
        safetyCode: "W/P",
        steps: [
          "Aspire por no mínimo 10 minutos em todas as fendas antes de umedecer.",
          "Use pouca água para a umidade não descer para a base de algodão do chenille.",
          "Seque com ventilação ativa direta."
        ]
      };
    }

    if (feel === "couro") {
      const isNatural = drop !== "bead"; // Leather natural absorbs very slowly, synthetic (corino) beads completely
      return {
        name: isNatural ? "Couro Legítimo Natural" : "Couro Sintético (Corino / Courvin / PU)",
        nature: isNatural ? "Proteína Animal Orgânica" : "Polímero de Plástico / Poliuretano",
        absorbency: isNatural ? "Baixa / Absorve óleos" : "Totalmente Impermeável (Nula)",
        phRange: "pH 5.5 a 7.0 (Neutro ou levemente ácido)",
        verdict: isNatural 
          ? "O couro legítimo respira e precisa de hidratação periódica. Nunca pode ser exposto a excesso de umidade que apodrece as fibras internas."
          : "Limpeza extremamente fácil. No entanto, resseca e racha se usar álcool puro ou cloro.",
        danger: isNatural
          ? "Água oxigenada, álcool puro, sabão em pó e falta de hidratação (racha o couro)."
          : "Álcool 70% puro e cloro, que desintegram a película plástica protetora.",
        safetyCode: "P",
        steps: isNatural
          ? [
              "Limpe com sabão de glicerina ou detergente neutro morno em pano levemente úmido por emulsão.",
              "Seque imediatamente com pano seco.",
              "Obrigatoriamente aplique um hidratante de couro ou vaselina líquida a cada 6 meses."
            ]
          : [
              "Use detergente neutro de louça transparente em pano úmido.",
              "Passe um pano limpo úmido para enxaguar e seque com microfibra.",
              "Aplique silicone líquido de alta qualidade para manter o brilho e flexibilidade."
            ]
      };
    }

    // Algodão / Jacquard
    return {
      name: "Algodão Têxtil / Jacquard / Tecido Misto",
      nature: "Fibras de Algodão (Natural) e Poliéster",
      absorbency: "Alta a Altíssima",
      phRange: "pH 6.5 a 7.5 (Neutro)",
      verdict: "Tecido muito confortável, mas as tramas de algodão absorvem água profundamente e podem reter sujeira que amarela o estofado se secar lentamente.",
      danger: "Encharcar a espuma profunda e secar sem ventilação (provoca cheiro de cachorro molhado e manchas escuras).",
      safetyCode: "W",
      steps: [
        "Faça aspiração prévia completa para retirar poeira.",
        "Trabalhe em quadrantes pequenos, secando com pano seco logo em seguida.",
        "Use vinagre de álcool branco no enxágue para evitar que o tecido amarele."
      ]
    };
  };

  const diagnosis = getDiagnosis();

  return (
    <div id="fabric-identifier" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-slate-800">Identificador de Tecido Interativo</h3>
          <p className="text-xs text-slate-500">Descubra em segundos a natureza do seu sofá e elimine 100% dos riscos</p>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          {/* Question 1: Feeling */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              1. Como é o toque e a textura visual do tecido?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FEEL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  id={`btn-feel-${opt.id}`}
                  onClick={() => setFeel(opt.id)}
                  className={`text-left p-3 rounded-xl border text-sm transition-all ${
                    feel === opt.id
                      ? "border-indigo-500 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <span className="font-bold block text-slate-800 mb-0.5">{opt.label}</span>
                  <span className="text-xs text-slate-500 leading-relaxed block">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Drop Test */}
          {feel && (
            <div className="pt-2 animate-fade-in">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                2. Teste das 3 gotas de água: O que acontece ao pingar água em um ponto escondido?
              </label>
              <div className="grid grid-cols-1 gap-3">
                {DROP_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    id={`btn-drop-${opt.id}`}
                    onClick={() => setDrop(opt.id)}
                    className={`text-left p-3 rounded-xl border text-sm transition-all ${
                      drop === opt.id
                        ? "border-indigo-500 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <span className="font-bold block text-slate-800 mb-0.5">{opt.label}</span>
                    <span className="text-xs text-slate-500 leading-relaxed block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {feel && drop && (
            <button
              id="btn-analyze-fabric"
              onClick={() => setShowResult(true)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Verificar Diagnóstico Seguro Giro Clean
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Result Card */}
          <div className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  Tecido Identificado
                </span>
                <h4 className="font-display font-extrabold text-2xl text-slate-800 mt-1">{diagnosis.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Natureza Química: <span className="font-medium text-slate-600">{diagnosis.nature}</span></p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">CÓDIGO</span>
                <span className="text-3xl font-display font-black text-indigo-600 bg-indigo-50 rounded-lg px-3 py-1 border border-indigo-100">
                  {diagnosis.safetyCode}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="font-semibold text-slate-500 block mb-1">Absorção de Água</span>
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-indigo-500" />
                  {diagnosis.absorbency}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="font-semibold text-slate-500 block mb-1">pH Ideal de Trabalho</span>
                <span className="font-bold text-slate-700 block">{diagnosis.phRange}</span>
              </div>
            </div>

            {/* Verdict */}
            <div className="mb-4">
              <p className="text-slate-600 text-sm leading-relaxed italic bg-indigo-50/40 p-4 rounded-xl border-l-4 border-indigo-400">
                "{diagnosis.verdict}"
              </p>
            </div>

            {/* Risks */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-xs text-red-800 mb-4">
              <span className="font-bold flex items-center gap-1.5 text-red-900 mb-1.5 uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Perigo Absoluto: Nunca faça isso!
              </span>
              <p className="leading-relaxed">{diagnosis.danger}</p>
            </div>

            {/* Step by Step Recommendations */}
            <div>
              <span className="font-bold text-sm text-slate-700 block mb-2.5">Protocolo de Limpeza Recomendado:</span>
              <ul className="space-y-2">
                {diagnosis.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              id="btn-retest-fabric"
              onClick={handleReset}
              className="flex-1 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-all"
            >
              Testar Outro Sofá
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
