import React, { useState } from "react";
import { Shield, AlertTriangle, AlertCircle, Sparkles, Droplet, Clock, ThumbsDown } from "lucide-react";

interface StainProtocol {
  id: string;
  name: string;
  chemicalType: string;
  mechanism: string;
  immediateAction: string;
  steps: string[];
  neverDo: string;
  expertTip: string;
  iconBg: string;
}

const STAINS: StainProtocol[] = [
  {
    id: "vinho",
    name: "Vinho Tinto / Suco de Uva",
    chemicalType: "Corante Orgânico Natural (Ácido)",
    mechanism: "Oxigenação acelerada para romper as ligações do pigmento orgânico nas fibras.",
    immediateAction: "Polvilhe sal refinado comum ou bicarbonato de sódio em pó seco generosamente sobre a poça líquida para absorver a umidade por capilaridade. Deixe agir por 5 minutos e remova sem esfregar.",
    steps: [
      "Após a absorção do excesso com sal, misture 50ml de água oxigenada 10 volumes líquida com 50ml de água fria e 5 gotas de detergente neutro transparente.",
      "Aplique essa solução em cima do pigmento manchado.",
      "Pressione levemente um pano seco de microfibra branco sobre a mancha. Ela desaparecerá gradativamente por oxigenação.",
      "Passe um pano úmido em água pura para enxaguar os resíduos do detergente e seque."
    ],
    neverDo: "NUNCA jogue água fervente ou produtos com cloro, pois o calor cozinha os taninos do vinho na fibra, fixando a cor arroxeada para sempre.",
    expertTip: "O sal ou bicarbonato seco age como uma esponja molecular na mancha fresca. Ele suga 80% do líquido por pressão capilar.",
    iconBg: "bg-red-100 text-red-700"
  },
  {
    id: "cafe",
    name: "Café ou Chá Escuro",
    chemicalType: "Corante Ácido Tânico",
    mechanism: "Ácido acético fraco para quebrar as ligações ácidas do tanino.",
    immediateAction: "Pressione papel toalha seco imediatamente de fora para dentro para sugar o líquido sem espalhar.",
    steps: [
      "Prepare uma solução com 50% de água morna, 30% de vinagre de álcool branco e 20% de álcool 70%.",
      "Borrife sobre a mancha em quantidade moderada.",
      "Use uma escova de cerdas ultra-macias e faça movimentos concêntricos (das bordas para o centro) de forma extremamente leve.",
      "Extraia a umidade pressionando firmemente um pano seco de microfibra branco até que o pano saia sem resíduo marrom."
    ],
    neverDo: "NUNCA esfregue a mancha de café fresca com movimentos largos de vaivém. Isso espalha as partículas de tanino para as fibras limpas vizinhas e cria auréolas indeléveis.",
    expertTip: "Se a mancha de café for antiga, use um cubo de gelo em cima dela para amolecer a fibra sem encharcar antes de aplicar a solução ácida.",
    iconBg: "bg-amber-100 text-amber-800"
  },
  {
    id: "caneta",
    name: "Caneta Esferográfica",
    chemicalType: "Solvente Hidrofóbico + Corante Sintético",
    mechanism: "Dissolução com agente solvente polar afim para liquefazer o aglutinante da tinta.",
    immediateAction: "NUNCA aplique água pura sobre a caneta fresca. A tinta é hidrofóbica e a água fará o risco se espalhar em uma mancha azul gigante.",
    steps: [
      "Umedeça a ponta de um cotonete em Álcool Isopropílico puro ou álcool de cereais.",
      "Pressione o cotonete molhado em cima do risco de caneta de forma pontual (como se estivesse carimbando).",
      "Imediatamente pressione um papel toalha limpo seco por cima para transferir a tinta líquida. Repita o processo usando novos cotonetes e papéis até sair limpo.",
      "Para tecidos muito claros, o leite morno aplicado localmente com cotonete também dissolve muito bem o aglutinante da tinta de forma segura."
    ],
    neverDo: "NUNCA limpe caneta usando Veja Multiuso azul ou sabão em pó. Isso reage com o corante da tinta, fixando-a permanentemente na trama e criando uma mancha cinzenta impossível de remover.",
    expertTip: "A caneta exige ação cirúrgica e paciência. Limpe com cotonete carimbando milímetro por milímetro, sem pressa. A pressa borra a tinta.",
    iconBg: "bg-blue-100 text-blue-700"
  },
  {
    id: "gordura",
    name: "Gordura / Óleos / Maionese",
    chemicalType: "Lípido Hidrofóbico",
    mechanism: "Flotação e absorção mecânica por pó seco microporoso.",
    immediateAction: "NUNCA jogue água com detergente diretamente sobre a poça de gordura fresca, pois isso fará o óleo escorrer para a espuma profunda do estofado.",
    steps: [
      "Cubra a gordura completamente polvilhando Amido de Milho (Maizena) ou Talco de bebê seco.",
      "Deixe o pó agir por no mínimo 4 horas sem mexer. O amido tem porosidade afim que suga o óleo para fora da fibra têxtil por atração física.",
      "Aspire todo o pó seco com o bocal bico do aspirador de pó.",
      "Se restar uma marca leve, passe um pano úmido em água morna com 2 gotas de detergente neutro de louça puro para flotar o resíduo."
    ],
    neverDo: "NUNCA use secador de cabelo quente em manchas de gordura para secar rápido, pois o calor fixa o lípido na fibra sintetizada do poliéster.",
    expertTip: "O amido de milho é o melhor amigo de quem tem crianças em casa. Ele tira óleo de batata frita, maionese e pastel do sofá sem usar uma única gota de água.",
    iconBg: "bg-yellow-100 text-yellow-700"
  },
  {
    id: "sangue",
    name: "Sangue Fresco ou Seco",
    chemicalType: "Proteína Complexa (Hemoglobina)",
    mechanism: "Efervescência de oxigênio frio para desintegrar a cadeia de hemoglobina.",
    immediateAction: "Pressione um pano limpo em água fria sobre a mancha de sangue fresco imediatamente.",
    steps: [
      "NUNCA use água morna ou quente. A temperatura alta altera quimicamente a estrutura da proteína coagulando-a e grudando-a para sempre na fibra.",
      "Pingue 3 gotas de Água Oxigenada 10 Volumes Líquida fria diretamente sobre o sangue.",
      "Espere 30 segundos. O produto reage com o sangue criando uma espuma branca efervescente de oxigênio ativo.",
      "Pressione papel toalha seco para sugar a espuma. Repita até a espuma sair totalmente branca.",
      "Limpe o local com pano úmido em água fria."
    ],
    neverDo: "NUNCA use água quente ou passe ferro por cima do tecido com mancha de sangue. Isso fixa a mancha de forma irreversível.",
    expertTip: "A água oxigenada líquida degrada apenas a hemoglobina sem descolorir tecidos sintéticos coloridos estáveis, tornando-se muito segura.",
    iconBg: "bg-rose-100 text-rose-800"
  },
  {
    id: "chocolate",
    name: "Chocolate e Doces",
    chemicalType: "Mistura Lípido-Açúcar (Misto)",
    mechanism: "Emulsão térmica controlada para liquefazer e quebrar as gorduras vegetais.",
    immediateAction: "Use uma colher comum de cozinha para raspar levemente o excesso sólido endurecido, de fora para dentro, sem forçar as cerdas do tecido.",
    steps: [
      "Prepare uma solução com água morna (45°C) e 1 colher de sopa de detergente neutro transparente.",
      "Umedeça um pano de microfibra branco na solução morna.",
      "Passe o pano na área manchada fazendo movimentos leves de carimbo para amolecer a gordura e o cacau do chocolate.",
      "Extraia a sujeira pressionando um pano seco por cima. Repita até o pano sair totalmente limpo."
    ],
    neverDo: "NUNCA tente raspar o chocolate usando facas serrilhadas ou gilete. Isso rasga as fibras do suede ou veludo e destrói o tecido permanentemente.",
    expertTip: "A água morna é essencial aqui. A gordura do chocolate derrete a 36°C, então a água fria não funciona bem, e a água muito quente mancha. Use morna.",
    iconBg: "bg-amber-100 text-amber-950"
  },
  {
    id: "urina",
    name: "Urina de Pet (Xixi de Cachorro/Gato)",
    chemicalType: "Ácido Úrico e Amônia (Altamente Ácido)",
    mechanism: "Oxigenação para desintegrar o ácido úrico e bicarbonato para sugar umidade profunda.",
    immediateAction: "Foque na absorção de emergência! Coloque pilhas de papel toalha seco sobre o xixi e pressione com as mãos com muita força para drenar o líquido da espuma.",
    steps: [
      "NUNCA borrife perfumes ou produtos com Amônia (isso reforça o instinto do animal de urinar ali de novo!).",
      "Misture 100ml de água oxigenada 10 volumes líquida, 100ml de água morna e 1 colher de detergente neutro. Borrife no local.",
      "Polvilhe bicarbonato de sódio em pó seco generosamente por cima. Deixe agir por 3 horas até secar e formar uma crosta amarelada.",
      "Aspire a crosta totalmente. Finalize borrifando uma névoa fina de vinagre de álcool branco puro para eliminar de vez o odor."
    ],
    neverDo: "NUNCA use desinfetantes clorados ou amoníacos. A amônia é o principal componente do odor da urina; usá-la estimula o pet a demarcar o sofá novamente.",
    expertTip: "Para urinas antigas secas que ainda cheiram mal, use uma lanterna de luz negra UV no escuro. A área fluorescente revelará o ponto exato para aplicar o protocolo.",
    iconBg: "bg-emerald-100 text-emerald-800"
  },
  {
    id: "refrigerante",
    name: "Refrigerante ou Suco de Caixinha",
    chemicalType: "Corante Sintético + Açúcares (Ácido)",
    mechanism: "Neutralização ácida e remoção de açúcares cristalizados.",
    immediateAction: "Sugue o excesso pressionando panos limpos secos o quanto antes para o açúcar não colar.",
    steps: [
      "Prepare uma solução com 300ml de água filtrada morna, 50ml de álcool 70% e 1 colher de sopa de vinagre de álcool branco.",
      "Borrife sobre a mancha e deixe agir por 2 minutos.",
      "Escove de fora para dentro levemente com escova de cerdas macias.",
      "Extraia a sujeira flotada pressionando firmemente um pano de microfibra branco seco até que o toque fique apenas ligeiramente úmido."
    ],
    neverDo: "NUNCA deixe o refrigerante secar sozinho por dias. O açúcar cristaliza nas fibras do estofado, tornando-as duras, quebradiças e atraindo formigas e poeira profunda.",
    expertTip: "O vinagre de álcool branco na fórmula impede que o corante vermelho ou amarelo do refrigerante se fixe permanentemente na fibra do suede claro.",
    iconBg: "bg-orange-100 text-orange-700"
  }
];

export default function StainSolver() {
  const [activeStainId, setActiveStainId] = useState<string>("vinho");

  const activeStain = STAINS.find((s) => s.id === activeStainId) || STAINS[0];

  return (
    <div id="stain-solver" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-rose-500 rounded-lg text-white animate-pulse-soft">
          <Droplet className="w-6 h-6 fill-current" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl text-slate-800">Protocolo de Manchas Críticas</h3>
          <p className="text-xs text-slate-500">Agende e execute o salvamento cirúrgico do seu estofado</p>
        </div>
      </div>

      {/* Grid of Stain Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {STAINS.map((stain) => (
          <button
            key={stain.id}
            id={`stain-tab-${stain.id}`}
            onClick={() => setActiveStainId(stain.id)}
            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 min-h-[56px] ${
              activeStainId === stain.id
                ? "border-rose-500 bg-rose-50/60 text-rose-950 ring-2 ring-rose-500/10"
                : "border-slate-200 bg-white hover:border-slate-300 text-slate-600"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${stain.iconBg.split(" ")[0]} shrink-0`}></span>
            <span className="truncate max-w-full">{stain.name.split(" / ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Stain Content Display */}
      <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm">
        <div className="border-b border-slate-100 pb-3 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-1 rounded inline-block">
            {activeStain.chemicalType}
          </span>
          <h4 className="font-display font-extrabold text-2xl text-slate-800 mt-1">{activeStain.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">Mecanismo Químico: <span className="text-slate-600 font-medium">{activeStain.mechanism}</span></p>
        </div>

        {/* Action Immediate */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-950 mb-4 flex gap-3">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-indigo-900 uppercase tracking-wide text-[10px] mb-1">
              Ação Imediata (Primeiros 5 Minutos!)
            </span>
            <p className="leading-relaxed">{activeStain.immediateAction}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <span className="font-bold text-xs uppercase text-slate-500 tracking-wider block mb-3">
            Passo a Passo da Remoção Profissional
          </span>
          <ul className="space-y-3">
            {activeStain.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
                <span className="w-5.5 h-5.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Danger */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-xs text-red-950 mb-4 flex gap-3">
          <ThumbsDown className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-red-900 uppercase tracking-wide text-[10px] mb-1">
              PROIBIDO: NUNCA FAÇA ISSO!
            </span>
            <p className="leading-relaxed">{activeStain.neverDo}</p>
          </div>
        </div>

        {/* Expert Tip */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-950 flex gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-emerald-950 uppercase tracking-wide text-[10px] mb-1">
              Dica Pro do Especialista (Experiência Prática)
            </span>
            <p className="leading-relaxed font-medium italic">"{activeStain.expertTip}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
