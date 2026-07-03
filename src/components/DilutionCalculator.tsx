import React, { useState } from "react";
import { Calculator, Sparkles, HelpCircle, AlertCircle, RefreshCw, Droplet } from "lucide-react";

interface Formula {
  name: string;
  description: string;
  waterRatio: number; // percentage of total volume
  detergentRatio: number; // mL per 500mL
  alcoholRatio: number; // percentage of total volume
  vinegarRatio: number; // percentage of total volume
  bicarbonateRatio: number; // grams per 500mL (powder)
  bicarbMethod: string;
  steps: string[];
  safety: string;
}

const FORMULAS: Record<string, Formula> = {
  escudo: {
    name: "Fórmula Escudo Pro (Manutenção Leve)",
    description: "Ideal para poeira leve, eliminação de pelos, amaciamento de fibras semanal e cheirinho de limpeza constante.",
    waterRatio: 0.65, // 325ml in 500ml (65%)
    detergentRatio: 3, // ~3ml or 1/2 tsp in 500ml
    alcoholRatio: 0.30, // 150ml in 500ml (30%)
    vinegarRatio: 0.05, // 25ml or 1 colher sopa in 500ml (5%)
    bicarbonateRatio: 0,
    bicarbMethod: "Não recomendável nesta fórmula para manter a fluidez seca.",
    safety: "Muito segura para qualquer tecido (exceto seda). Não deixa resíduos.",
    steps: [
      "Adicione a água morna filtrada no borrifador.",
      "Adicione o álcool líquido 70%.",
      "Coloque o detergente neutro e o vinagre.",
      "Agite levemente. Aplique em forma de névoa fina mantendo 30cm de distância."
    ]
  },
  pesada: {
    name: "Fórmula Limpa-Tudo Giro Clean (Limpeza Pesada)",
    description: "O protocolo oficial para remover encardidos, braços pretos de gordura corporal, manchas de poeira e revitalizar as cores.",
    waterRatio: 0.70, // 350ml (70%)
    detergentRatio: 15, // 1 colher de sopa ou 15ml em 500ml
    alcoholRatio: 0.20, // 100ml (20%)
    vinegarRatio: 0.10, // 2 colheres de sopa ou 30ml em 500ml (10%)
    bicarbonateRatio: 0,
    bicarbMethod: "Não misture bicarbonato nesta fase líquida para evitar anular o vinagre.",
    safety: "Excelente para tecidos W e P (Suede, Veludo, Linhos de poliéster).",
    steps: [
      "Use água morna a 40°C para potencializar os tensoativos.",
      "Misture a água morna, o álcool 70% e o vinagre de álcool branco.",
      "Adicione o detergente neutro transparente e mexa suavemente sem fazer muita espuma.",
      "Borrife em quadrantes de 50x50cm e inicie a escovação suave."
    ]
  },
  odores: {
    name: "Fórmula Neutralizadora de Odores (Suor / Mofo)",
    description: "Quebra as moléculas de gordura corporal oxidada, elimina colônias de bactérias do suor e esporos de mofo de humidade antiga.",
    waterRatio: 0.40, // 200ml (40%)
    detergentRatio: 5, // 1 colher de chá ou 5ml
    alcoholRatio: 0.30, // 150ml (30%)
    vinegarRatio: 0.30, // 150ml (30%)
    bicarbonateRatio: 15, // 1 colher de sopa ou 15g em 500ml
    bicarbMethod: "ADICIONE LENTAMENTE! O bicarbonato reage com o vinagre. Espere a efervescência baixar para fechar o borrifador.",
    safety: "Perfeita para sofás que ficam em cômodos fechados ou com pets.",
    steps: [
      "Em um recipiente aberto (copo grande), misture a água, o álcool e o vinagre.",
      "Adicione o bicarbonato de sódio colherada por colherada, deixando efervescer de forma segura.",
      "Quando o gás carbônico parar de sair totalmente, despeje no borrifador e adicione o detergente.",
      "Borrife na superfície e passe uma escova macia apenas para penetrar levemente."
    ]
  },
  pets: {
    name: "Protocolo de Oxigenação Ativa (Xixi de Pet / Sangue)",
    description: "Ação química cirúrgica para quebrar as enzimas de ácido úrico da urina de animais ou hemoglobina de sangue fresco.",
    waterRatio: 0.50, // 250ml de água morna (50%)
    detergentRatio: 15, // 15ml de detergente neutro
    alcoholRatio: 0, // Sem álcool
    vinegarRatio: 0, // Sem vinagre (seria usado após secar)
    bicarbonateRatio: 30, // Bicarbonato é polvilhado SECO por cima (não no líquido)
    bicarbMethod: "ATENÇÃO: O bicarbonato NÃO entra no frasco! Ele deve ser polvilhado SECO diretamente sobre o tecido ainda úmido pela água oxigenada.",
    safety: "Use APENAS Água Oxigenada 10 Volumes Líquida. Não serve cremosa. Não use em couro natural.",
    steps: [
      "Prepare no frasco: 50% de água morna e 50% de ÁGUA OXIGENADA 10 VOLUMES LÍQUIDA + detergente neutro.",
      "Absorva ao máximo o xixi fresco com papel toalha antes de aplicar.",
      "Borrife a solução de oxigenação em abundância de forma localizada.",
      "Polvilhe o bicarbonato de sódio em pó seco por cima na hora. Vai espumar.",
      "Deixe secar por 3 horas até formar uma casca. Aspire tudo em seguida."
    ]
  }
};

export default function DilutionCalculator() {
  const [volume, setVolume] = useState<number>(500); // default 500ml
  const [selectedFormula, setSelectedFormula] = useState<string>("pesada");

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const formula = FORMULAS[selectedFormula];

  // Calculations based on current selected volume
  const calcWater = Math.round(volume * formula.waterRatio);
  const calcAlcohol = Math.round(volume * formula.alcoholRatio);
  const calcVinegar = Math.round(volume * formula.vinegarRatio);
  const calcDetergent = Math.round((volume / 500) * formula.detergentRatio);
  const calcBicarbonate = Math.round((volume / 500) * formula.bicarbonateRatio);

  // Helper translations to kitchen measurements
  const getSpoonTranslation = (ml: number, unit: "detergent" | "vinegar" | "bicarb") => {
    if (ml <= 0) return "Não utilizar";
    if (unit === "detergent") {
      if (ml < 5) return `${ml} mL (~${Math.round(ml * 20)} gotas)`;
      if (ml < 15) return `${ml} mL (~${(ml / 5).toFixed(1)} colheres de chá)`;
      return `${ml} mL (~${(ml / 15).toFixed(1)} colheres de sopa)`;
    }
    if (unit === "vinegar") {
      if (ml < 15) return `${ml} mL (~${(ml / 5).toFixed(1)} colheres de chá)`;
      return `${ml} mL (~${(ml / 15).toFixed(1)} colheres de sopa)`;
    }
    // Bicarb (g)
    if (ml < 10) return `${ml}g (~${(ml / 5).toFixed(1)} colheres de chá)`;
    return `${ml}g (~${(ml / 15).toFixed(1)} colheres de sopa)`;
  };

  return (
    <div id="dilution-calculator" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-slate-800">Calculadora de Diluições Químicas</h3>
          <p className="text-xs text-slate-500">Gere as proporções científicas exatas para o seu borrifador</p>
        </div>
      </div>

      {/* Select Formula */}
      <div className="mb-5">
        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
          Selecione o Objetivo da Limpeza
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(FORMULAS).map(([key, form]) => (
            <button
              key={key}
              id={`formula-${key}`}
              onClick={() => setSelectedFormula(key)}
              className={`text-left p-3 rounded-xl border text-xs transition-all flex flex-col justify-between h-20 ${
                selectedFormula === key
                  ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-600/20"
                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
              }`}
            >
              <span className="font-bold block text-slate-800 line-clamp-1">{form.name.replace("Giro Clean", "")}</span>
              <span className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{form.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Volume Selector */}
      <div className="mb-6 bg-white p-4 rounded-xl border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase text-slate-500">
            Tamanho do seu Borrifador / Frasco
          </label>
          <span className="text-sm font-display font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            {volume} mL
          </span>
        </div>
        <input
          id="volume-slider"
          type="range"
          min="100"
          max="2000"
          step="50"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>100 mL</span>
          <span>500 mL</span>
          <span>1000 mL (1 Litro)</span>
          <span>1500 mL</span>
          <span>2000 mL (2 Litros)</span>
        </div>

        {/* Quick select presets */}
        <div className="flex gap-2 mt-3">
          {[250, 500, 1000, 1500].map((preset) => (
            <button
              key={preset}
              id={`preset-${preset}`}
              onClick={() => setVolume(preset)}
              className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                volume === preset
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-150 bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              {preset >= 1000 ? `${preset / 1000}L` : `${preset}ml`}
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Results Box */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-2xl p-5 shadow-inner mb-5">
        <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-300">
          Receita Personalizada Giro Clean
        </span>
        <h4 className="font-display font-extrabold text-lg text-white mt-1 border-b border-indigo-800 pb-2 mb-3">
          {formula.name}
        </h4>

        <div className="space-y-3 font-sans">
          {/* Water */}
          <div className="flex justify-between items-center border-b border-indigo-800/40 pb-2">
            <span className="text-xs text-indigo-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Água Morna (~40°C):
            </span>
            <span className="text-sm font-bold font-mono">
              {calcWater} mL <span className="text-[10px] font-normal text-indigo-300">({(calcWater / 200).toFixed(1)} copos)</span>
            </span>
          </div>

          {/* Detergent */}
          <div className="flex justify-between items-center border-b border-indigo-800/40 pb-2">
            <span className="text-xs text-indigo-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Detergente Neutro Transparente:
            </span>
            <span className="text-sm font-bold font-mono">
              {getSpoonTranslation(calcDetergent, "detergent")}
            </span>
          </div>

          {/* Alcohol */}
          {calcAlcohol > 0 && (
            <div className="flex justify-between items-center border-b border-indigo-800/40 pb-2">
              <span className="text-xs text-indigo-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Álcool Líquido 70%:
              </span>
              <span className="text-sm font-bold font-mono">
                {calcAlcohol} mL
              </span>
            </div>
          )}

          {/* Vinegar */}
          {calcVinegar > 0 && (
            <div className="flex justify-between items-center border-b border-indigo-800/40 pb-2">
              <span className="text-xs text-indigo-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                Vinagre de Álcool Branco:
              </span>
              <span className="text-sm font-bold font-mono">
                {getSpoonTranslation(calcVinegar, "vinegar")}
              </span>
            </div>
          )}

          {/* Bicarbonate (if applicable) */}
          {selectedFormula === "odores" && calcBicarbonate > 0 && (
            <div className="flex justify-between items-center border-b border-indigo-800/40 pb-2">
              <span className="text-xs text-indigo-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Bicarbonato de Sódio:
              </span>
              <span className="text-sm font-bold font-mono">
                {getSpoonTranslation(calcBicarbonate, "bicarb")}
              </span>
            </div>
          )}

          {/* Pets oxigenacao details */}
          {selectedFormula === "pets" && (
            <>
              <div className="flex justify-between items-center border-b border-indigo-800/40 pb-2">
                <span className="text-xs text-indigo-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  Água Oxigenada 10v Líquida:
                </span>
                <span className="text-sm font-bold font-mono">
                  {calcWater} mL <span className="text-[10px] font-normal text-pink-300">(Proporção 1:1 com água)</span>
                </span>
              </div>
              <div className="bg-pink-950/40 border border-pink-900/30 rounded-lg p-3 text-[11px] text-pink-200 mt-2">
                <p className="font-semibold text-white mb-1">💡 Modo de Aplicação do Bicarbonato Seco:</p>
                <p className="leading-relaxed">Borrife este líquido no estofado e, EM SEGUIDA, polvilhe bicarbonato puro seco por cima da mancha úmida. O pó irá flotar a urina para fora formando uma casca seca em 3h.</p>
              </div>
            </>
          )}
        </div>

        {/* Dynamic method notice */}
        {selectedFormula !== "pets" && calcBicarbonate > 0 && (
          <p className="text-[10px] text-yellow-300 mt-2.5 leading-relaxed bg-yellow-950/30 p-2.5 rounded border border-yellow-900/20">
            <strong>📌 {formula.bicarbMethod}</strong>
          </p>
        )}
      </div>

      {/* Steps Box */}
      <div className="bg-white rounded-xl border border-slate-150 p-4">
        <span className="text-xs font-bold uppercase text-slate-700 block mb-3">Modo de Preparo e Aplicação</span>
        <ol className="space-y-2.5">
          {formula.steps.map((step, idx) => (
            <li key={idx} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 text-[11px] leading-relaxed p-3 rounded-lg border border-yellow-100 mt-4">
          <AlertCircle className="w-4.5 h-4.5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Segurança Química:</span>
            <p>{formula.safety}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
