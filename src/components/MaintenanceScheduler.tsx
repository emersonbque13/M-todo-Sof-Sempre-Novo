import React, { useState } from "react";
import { Calendar, CheckSquare, Square, Sparkles, Trophy, Users, Info, ArrowRight } from "lucide-react";

interface Schedule {
  title: string;
  weekly: string[];
  monthly: string[];
  semiannual: string[];
  annual: string[];
}

const HEAVY_SCHEDULE: Schedule = {
  title: "Cronograma de Tráfego Intenso (Pets ou Crianças)",
  weekly: [
    "Aspiração profunda das fendas, cantos e almofadas (2x por semana).",
    "Remoção rápida de pelos com o truque do rodo pequeno de borracha seco."
  ],
  monthly: [
    "Limpeza de gordura corporal dos braços e encostos com pano úmido em água morna e detergente neutro transparente.",
    "Aplicação rápida de névoa da Fórmula Escudo Pro Giro Clean para proteger as fibras por estática."
  ],
  semiannual: [
    "Aplicação localizada de névoa neutralizadora de odores no assento principal.",
    "Teste de absorção rápido de 3 gotas para verificar se há pontos de ressecamento (especialmente em couro)."
  ],
  annual: [
    "Realização da Higienização Manual Completa (Fórmula Limpa-Tudo Giro Clean + extração por pano de microfibra)."
  ]
};

const MODERATE_SCHEDULE: Schedule = {
  title: "Cronograma de Tráfego Moderado (Uso Comum do Dia a Dia)",
  weekly: [
    "Aspiração de poeira superficial rápida aos finais de semana (1x por semana)."
  ],
  monthly: [
    "Aplicação leve de névoa da Fórmula Escudo Pro para amaciar as fibras e dar perfume."
  ],
  semiannual: [
    "Limpeza de manutenção leve de braços com pano levemente úmido e detergente neutro."
  ],
  annual: [
    "Higienização manual completa para remoção de ácaros e resíduos corporais acumulados."
  ]
};

export default function MaintenanceScheduler() {
  const [hasPets, setHasPets] = useState<boolean>(true);
  const [hasKids, setHasKids] = useState<boolean>(true);
  const [useFreq, setUseFreq] = useState<"heavy" | "moderate">("heavy");

  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState<number>(0);

  const getSchedule = (): Schedule => {
    if (hasPets || hasKids || useFreq === "heavy") {
      return HEAVY_SCHEDULE;
    }
    return MODERATE_SCHEDULE;
  };

  const schedule = getSchedule();

  const toggleTask = (taskKey: string) => {
    setCheckedTasks((prev) => {
      const isChecking = !prev[taskKey];
      if (isChecking) {
        setStreak((s) => s + 1);
      } else {
        setStreak((s) => Math.max(0, s - 1));
      }
      return {
        ...prev,
        [taskKey]: isChecking,
      };
    });
  };

  return (
    <div id="maintenance-scheduler" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-slate-800">Cronograma de Cuidados Anual</h3>
          <p className="text-xs text-slate-500">Gere e gerencie uma rotina personalizada de cuidados do seu sofá</p>
        </div>
      </div>

      {/* Inputs to customize routine */}
      <div className="bg-white border border-slate-150 rounded-xl p-4 mb-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block text-slate-500 font-semibold mb-1.5">Tem animais de estimação?</label>
          <div className="flex gap-1">
            <button
              id="btn-pets-yes"
              onClick={() => setHasPets(true)}
              className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                hasPets ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Sim 🐾
            </button>
            <button
              id="btn-pets-no"
              onClick={() => setHasPets(false)}
              className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                !hasPets ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Não
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1.5">Tem crianças em casa?</label>
          <div className="flex gap-1">
            <button
              id="btn-kids-yes"
              onClick={() => setHasKids(true)}
              className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                hasKids ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Sim 👶
            </button>
            <button
              id="btn-kids-no"
              onClick={() => setHasKids(false)}
              className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                !hasKids ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Não
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1.5">Frequência de visitas/uso?</label>
          <div className="flex gap-1">
            <button
              id="btn-use-heavy"
              onClick={() => setUseFreq("heavy")}
              className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                useFreq === "heavy" ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Intenso
            </button>
            <button
              id="btn-use-mod"
              onClick={() => setUseFreq("moderate")}
              className={`flex-1 py-1.5 rounded-lg border font-bold transition-all ${
                useFreq === "moderate" ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Moderado
            </button>
          </div>
        </div>
      </div>

      {/* Trophy Section */}
      {streak > 0 && (
        <div className="bg-emerald-900 text-emerald-50 border border-emerald-800 rounded-xl p-3 mb-5 flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400 shrink-0 animate-bounce" />
            <div>
              <span className="font-bold block text-white">Excelente Trabalho!</span>
              <p className="text-[11px] text-emerald-200">Você já marcou {streak} tarefas de conservação.</p>
            </div>
          </div>
          <span className="font-display font-extrabold text-white text-base bg-emerald-850 px-2 py-0.5 rounded border border-emerald-800">
            SOFÁ + PROTEGIDO!
          </span>
        </div>
      )}

      {/* Routine list */}
      <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            Cronograma Ativo
          </span>
          <h4 className="font-display font-extrabold text-xl text-slate-800 mt-1">{schedule.title}</h4>
        </div>

        {/* Weekly tasks */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Semanalmente</span>
          <div className="space-y-1.5">
            {schedule.weekly.map((task, idx) => {
              const taskKey = `weekly-${idx}`;
              const isChecked = !!checkedTasks[taskKey];
              return (
                <button
                  key={taskKey}
                  id={`btn-task-${taskKey}`}
                  onClick={() => toggleTask(taskKey)}
                  className="w-full text-left flex items-start gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0 mt-0.5 hover:text-slate-400" />
                  )}
                  <span className={`text-xs ${isChecked ? "line-through text-slate-450" : "text-slate-600"}`}>
                    {task}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Monthly tasks */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Mensalmente</span>
          <div className="space-y-1.5">
            {schedule.monthly.map((task, idx) => {
              const taskKey = `monthly-${idx}`;
              const isChecked = !!checkedTasks[taskKey];
              return (
                <button
                  key={taskKey}
                  id={`btn-task-${taskKey}`}
                  onClick={() => toggleTask(taskKey)}
                  className="w-full text-left flex items-start gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0 mt-0.5 hover:text-slate-400" />
                  )}
                  <span className={`text-xs ${isChecked ? "line-through text-slate-450" : "text-slate-600"}`}>
                    {task}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Semiannual tasks */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Semestralmente</span>
          <div className="space-y-1.5">
            {schedule.semiannual.map((task, idx) => {
              const taskKey = `semiannual-${idx}`;
              const isChecked = !!checkedTasks[taskKey];
              return (
                <button
                  key={taskKey}
                  id={`btn-task-${taskKey}`}
                  onClick={() => toggleTask(taskKey)}
                  className="w-full text-left flex items-start gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0 mt-0.5 hover:text-slate-400" />
                  )}
                  <span className={`text-xs ${isChecked ? "line-through text-slate-450" : "text-slate-600"}`}>
                    {task}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Annual tasks */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Anualmente</span>
          <div className="space-y-1.5">
            {schedule.annual.map((task, idx) => {
              const taskKey = `annual-${idx}`;
              const isChecked = !!checkedTasks[taskKey];
              return (
                <button
                  key={taskKey}
                  id={`btn-task-${taskKey}`}
                  onClick={() => toggleTask(taskKey)}
                  className="w-full text-left flex items-start gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0 mt-0.5 hover:text-slate-400" />
                  )}
                  <span className={`text-xs ${isChecked ? "line-through text-slate-450" : "text-slate-600"}`}>
                    {task}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Escudo Pro formula tip */}
        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] text-indigo-950 flex gap-2.5">
          <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">💡 Dica de Especialista (Experiência Prática):</span>
            <p className="leading-relaxed mt-0.5">Sempre borrife a <strong>Fórmula Escudo Pro</strong> (água + álcool + um toque de amaciante de altíssima qualidade + vinagre) quinzenalmente. A estática gerada pelo pano ao aplicar amortece o pouso da poeira, agindo como um escudo invisível.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
