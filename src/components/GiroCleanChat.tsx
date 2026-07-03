import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, MessageCircle, HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import GiroCleanLogo from "./GiroCleanLogo";

interface Message {
  role: "user" | "model";
  text: string;
}

const QUICK_QUESTIONS = [
  "Meu gato fez xixi no veludo, o que eu faço agora?",
  "Posso usar sabão em pó para limpar meu sofá de suede?",
  "Como remover mancha de café antiga no linho?",
  "Qual a diferença de tecido sintético para tecido natural?"
];

export default function GiroCleanChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Olá! Sou o seu Consultor Giro Clean no Bolso. Tenho experiência prática em química têxtil, higienização de estofados e remoção de manchas.\n\nQual é o tecido do seu sofá ou qual problema/mancha você gostaria de resolver hoje com total segurança?"
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("Buscando soluções com base na minha experiência prática...");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Encourage loading message cycle
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      const messages = [
        "Analisando a compatibilidade química com as fibras...",
        "Calculando o pH ideal para desintegrar as manchas...",
        "Buscando o protocolo de segurança adequado...",
        "Pronto, formulando resposta definitiva..."
      ];
      let i = 0;
      interval = setInterval(() => {
        setStatusMsg(messages[i % messages.length]);
        i++;
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      } else {
        throw new Error(data.error || "Erro ao responder");
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Ops! Tive um pequeno problema ao me conectar com minha inteligência central Giro Clean. Verifique se o servidor está ativo ou se a sua chave `GEMINI_API_KEY` está configurada corretamente nos Secrets."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="giroclean-chat" className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col h-[550px] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-deep to-brand-light text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <GiroCleanLogo variant="icon-only" size={40} className="w-10 h-10 bg-white/15 backdrop-blur-sm shadow-inner animate-pulse-soft border border-white/20" />
          <div>
            <h4 className="font-display font-bold text-sm text-white">Consultor de Bolso Giro Clean</h4>
            <p className="text-[10px] text-sky-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Especialista Online com IA
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs shadow-sm ${
                msg.role === "user" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 border border-slate-200"
              }`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl text-xs leading-relaxed white-space-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white text-slate-800 rounded-tl-none border border-slate-150 shadow-sm"
              }`}>
                {msg.text.split("\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-white text-indigo-600 border border-slate-200 flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-white text-slate-400 border border-slate-150 p-3 rounded-2xl rounded-tl-none text-xs flex flex-col gap-1.5 shadow-sm">
                <span className="font-semibold text-[10px] text-indigo-500 uppercase tracking-wide">Giro Clean está pensando...</span>
                <span>{statusMsg}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Recommended Questions */}
      {messages.length === 1 && !isLoading && (
        <div className="p-3 bg-white border-t border-slate-150">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Perguntas Frequentes dos Alunos:</span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                id={`btn-quick-q-${idx}`}
                onClick={() => handleSend(q)}
                className="text-[10px] text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 font-medium px-2.5 py-1.5 rounded-full transition-all text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder="Pergunte sobre manchas, produtos, tecidos..."
          disabled={isLoading}
          className="flex-1 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3.5 py-2 text-xs outline-none transition-all disabled:bg-slate-50"
        />
        <button
          id="btn-chat-send"
          onClick={() => handleSend(input)}
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-all disabled:opacity-40 shrink-0"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
}
