import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI instance on the server
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Server endpoint for Gemini AI Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, systemInstruction, botName } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem inválida ou vazia.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        reply: `Olá! Sou o ${botName || 'FoliãoBot'}. No momento, a chave da API de IA está sendo configurada no painel. Mas estou pronto para responder sobre blocos, camarote, horários e segurança!`,
        source: 'fallback',
      });
    }

    const ai = getAiClient();

    // Default system prompt specialized in the street carnival event
    const defaultInstruction = `Você é o ${botName || 'FoliãoBot'}, o assistente virtual oficial e animado do Circuito Folia Brasil 2026 promovido pela Palco Musical Entretenimento.
Seu tom é vibrante, acolhedor, prestativo e com energia de carnaval brasileiro, sempre com educação e clareza.
Você tem informações completas sobre o evento:
- Datas: 13 a 17 de Fevereiro de 2026
- Local: Circuito Avenida da Folia (3,4 km do Centro Histórico à Grande Apoteose)
- Entrada: 100% gratuita na pista para foliões de rua.
- Camarote Oficial Palco Musical: Área VIP suspensa com open bar premium, climatização e visão 360° da avenida.
- Blocos Principais: Bloco do Sol Nascente (Axé - Sab 14:30), Bateria Furiosa da Alegria (Samba - Sab 17:30), Bloco Tropi-Candeeiro (Frevo - Dom 12:30), Bloco O Grave Bate Forte (Funk - Dom 18:00), Fanfarra Carnavalesca (Seg 15:00), Saideira Real com Superbanda Palco Musical (Ter 16:30).
- Estrutura: 8 pontos de hidratação gratuita com água gelada, 3 postos médicos com UTI móvel, 450+ banheiros químicos, protocolo Não é Não de acolhimento e deck PCD acessível.
- Patrocínios: Cotas Master (Naming Rights), Ouro, Prata e Produto Oficial. Conectamos marcas a mais de 720 mil foliões.
Se o usuário perguntar como falar com atendente ou patrocinar, informe que pode clicar no botão "Book Comercial", preencher o formulário ou chamar no WhatsApp pelo painel do site.
Responda de forma sucinta e direta (máximo 2 a 3 parágrafos) usando emojis temáticos de carnaval (🎉, 🥁, ☀️, 🎊).`;

    const effectiveInstruction = systemInstruction && systemInstruction.trim().length > 10 
      ? `${systemInstruction}\n\nLembre-se: Você está representando o Circuito Folia Brasil 2026.`
      : defaultInstruction;

    // Build contents from history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user' && item.text) {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot' && item.text) {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction: effectiveInstruction,
      },
    });

    const replyText = response.text || 'Desculpe, tive uma oscilação no sinal da folia. Pode repetir sua dúvida?';

    return res.json({ reply: replyText, source: 'gemini' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(200).json({
      reply: 'Oi, folião! O trio passou com tanta animação que tive uma pequena instabilidade de conexão temporária. Pode tentar novamente em alguns segundos ou conferir as perguntas frequentes logo abaixo!',
      source: 'error_fallback',
    });
  }
});

async function startServer() {
  // Mount Vite dev server middleware in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
