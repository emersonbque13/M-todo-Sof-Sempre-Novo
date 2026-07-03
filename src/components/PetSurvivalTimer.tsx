import React, { useState, useEffect } from "react";
import { AlertCircle, Play, Pause, RotateCcw, ShieldAlert, CheckCircle, Droplet, Clock } from "lucide-react";

export default function PetSurvivalTimer() {
  const [activeStage, setActiveStage] = useState<"immediate" | "recent" | "old">("immediate");
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // 5 minute emergency countdown
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(300);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div id="pet-survival" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-amber-500 rounded-lg text-white">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-slate-800">Salvamento de Xixi de Pet</h3>
          <p className="text-xs text-slate-500">Aja rápido e salve a espuma do sofá de danos permanentes</p>
        </div>
      </div>

      {/* Select Stage */}
      <div className="flex gap-2 mb-5">
        {(["immediate", "recent", "old"] as const).map((stage) => (
          <button
            key={stage}
            id={`btn-pet-stage-${stage}`}
            onClick={() => {
              setActiveStage(stage);
              if (stage === "immediate") setSecondsLeft(300);
              else if (stage === "recent") setSecondsLeft(1800);
              else setSecondsLeft(0);
              setIsRunning(false);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all text-center ${
              activeStage === stage
                ? "border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/10"
                : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
            }`}
          >
            {stage === "immediate" && "Acabou de Acontecer"}
            {stage === "recent" && "Ocorreu há <1 hora"}
            {stage === "old" && "Xixi Antigo / Seco"}
          </button>
        ))}
      </div>

      {/* Timer Section for Immediate/Recent */}
      {activeStage !== "old" ? (
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm text-center mb-5">
          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse inline-block mb-3">
            Cronômetro Crítico de Infiltração
          </span>
          <div className="text-5xl font-display font-black text-slate-800 tracking-tight font-mono mb-4">
            {formatTime(secondsLeft)}
          </div>

          <div className="flex justify-center gap-2 mb-3">
            <button
              id="btn-timer-start"
              onClick={handleStartStop}
              className={`px-5 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 transition-all ${
                isRunning ? "bg-slate-700 hover:bg-slate-800" : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? "Pausar" : "Iniciar Drenagem"}
            </button>
            <button
              id="btn-timer-reset"
              onClick={handleReset}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </button>
          </div>

          <p className="text-xs text-slate-400">
            {activeStage === "immediate"
              ? "Você tem 5 minutos antes que o ácido úrico atravesse o tecido e contamine a espuma interna."
              : "A urina já está na fibra, mas ainda não secou em cristais de sal. Ainda dá tempo de salvar!"}
          </p>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-xs text-yellow-950 mb-5 flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-yellow-900 uppercase text-[10px] tracking-wide mb-1">
              Fase Estabilizada (Mancha Seca)
            </span>
            <p className="leading-relaxed">A urina já se cristalizou e gerou marcador territorial para o seu pet. O cronômetro não é necessário aqui, mas o protocolo químico completo de oxigenação é OBRIGATÓRIO para desintegrar os cristais profundos.</p>
          </div>
        </div>
      )}

      {/* Emergency Action Plan */}
      <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm">
        <h4 className="font-display font-extrabold text-sm text-slate-800 mb-3.5 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
          Protocolo Crítico de Emergência
        </h4>

        {activeStage === "immediate" && (
          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-extrabold flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-slate-800 block">DRENE IMEDIATAMENTE (Sem esfregar!)</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Coloque muito papel toalha ou panos secos brancos em cima da poça. Pressione com o peso do seu corpo. Troque os papéis e continue pressionando até saírem secos. NUNCA esfregue, isso empurra o xixi para os lados.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-slate-800 block">Borrife Oxigenador Giro Clean</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Misture partes iguais (100ml) de Água Oxigenada 10v Líquida (aquela de farmácia para machucado) com água morna e 1 colher de sopa de detergente neutro transparente. Borrife generosamente em cima do xixi drenado.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-slate-800 block">Polvilhe Bicarbonato Seco por Cima</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Cubra toda a área com bicarbonato em pó seco. Ele reagirá quimicamente flotando a urina de dentro da espuma. Deixe agir e secar por 3 horas até formar uma casca amarela dura. Aspire e finalize com névoa de vinagre.</p>
              </div>
            </div>
          </div>
        )}

        {activeStage === "recent" && (
          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-slate-800 block">Drene a Umidade Residual</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Pressione um pano limpo de microfibra contra o local para sugar o que restou de líquido antes de aplicar os produtos.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-slate-800 block">Solução de Oxigenação com Detergente Neutro</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Aplique a mistura de Água Oxigenada 10v líquida + água morna de forma generosa. O peróxido precisa alcançar a mesma profundidade que o xixi alcançou para quebrá-lo.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-slate-800 block">Dreno por Bicarbonato Seco</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Espalhe o bicarbonato em pó seco sobre a poça de produto. Ele vai 'puxar' a umidade profunda para a superfície durante a evaporação. Aspire após secar completamente.</p>
              </div>
            </div>
          </div>
        )}

        {activeStage === "old" && (
          <div className="space-y-4 text-xs">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-slate-800 block">Umedeça com Água Morna</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Borrife um pouco de água morna em cima da mancha antiga de xixi para amolecer e liquefazer os cristais secos de ácido úrico que estão presos na fibra.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-slate-800 block">Aplique o Protocolo Peróxido Secante</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Borrife a solução de Água Oxigenada 10v líquida + detergente neutro e cubra com bicarbonato de sódio em pó seco por 3 horas. Aspire a casca dura branca após a secagem.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-slate-800 block">Borrifada final de Vinagre Puro</strong>
                <p className="text-slate-500 mt-1 leading-relaxed">Borrife vinagre de álcool branco puro por cima da área aspirada. O pH ácido do vinagre vai neutralizar os resíduos alcalinos da urina antiga e removerá 100% de qualquer cheiro residual.</p>
              </div>
            </div>
          </div>
        )}

        {/* Warning card for foam and wood */}
        <div className="mt-4 p-3 bg-red-50 border border-red-100 text-[11px] text-red-900 rounded-lg flex items-start gap-2 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Alerta Crítico Giro Clean:</span>
            <p>Se o xixi penetrar na madeira do chassi estrutural interna do sofá, pode fazer o móvel empenar ou mofar permanentemente. A ação de absorção por pressão firme nos primeiros 5 minutos é o que determina se seu sofá sobreviverá intacto ou não.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
