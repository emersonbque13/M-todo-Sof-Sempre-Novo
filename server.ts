import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Shared Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API endpoint for Giro Clean AI Consultant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    if (!ai) {
      // Graceful fallback if API key is not configured yet
      return res.json({
        text: "Olá! Eu sou o Consultor de Higienização Giro Clean. Para que eu possa te ajudar de forma personalizada e inteligente com inteligência artificial, você precisa configurar a chave `GEMINI_API_KEY` nas configurações de Secrets do AI Studio. \n\nNo entanto, você ainda pode utilizar todas as ferramentas e calculadoras interativas do Método Sófa Sempre Novo® disponíveis no painel ao lado!",
      });
    }

    // Prepare system instructions based on the professional persona
    const systemInstruction = `Você é o Consultor Virtual da Giro Clean, o assistente oficial do MÉTODO SOFÁ SEMPRE NOVO®.
Você possui mais de 30 anos de experiência prática em higienização e impermeabilização de estofados, especialista em química aplicada à limpeza, pH dos produtos, conservação têxtil e remoção de manchas críticas.

Sua missão é ajudar o usuário a limpar e cuidar do seu sofá com total segurança, evitando erros comuns que destroem tecidos (como usar cloro, água sanitária, receitas caseiras ácidas misturadas de forma errada, ou encharcar o estofado).

Diretrizes de resposta:
1. Sempre responda em português do Brasil (PT-BR).
2. Escreva de forma acolhedora, amigável e profissional, como um professor paciente ensinando um amigo ou um novo funcionário da empresa.
3. Seja prático: explique O QUE fazer, COMO fazer, POR QUE fazer, QUANDO fazer e, muito importante, QUANDO NÃO fazer.
4. Se o usuário mencionar um tecido ou tipo de mancha, faça o diagnóstico seguro.
5. Lembre-se de priorizar a integridade do tecido: na dúvida, recomende fazer o teste de toque/absorção antes ou em um local escondido do sofá.
6. Não utilize termos químicos incompreensíveis sem explicá-los de forma extremamente simples (ex: se falar em pH ácido para urina, explique que neutraliza com pH alcalino leve, etc).
7. Mantenha o foco em higienização de sofás, colchões, poltronas e estofados domésticos. Se perguntarem algo totalmente fora do tema, traga gentilmente de volta ao assunto.`;

    const chatHistory = Array.isArray(history)
      ? history.map((msg: any) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }))
      : [];

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message });
    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na API de Chat:", error);
    return res.status(500).json({
      error: "Ocorreu um erro ao processar sua pergunta. Tente novamente mais tarde.",
      details: error.message,
    });
  }
});

// Setup Vite or static serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
