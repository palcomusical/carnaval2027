import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  Music, 
  PartyPopper, 
  Minimize2, 
  Maximize2, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { BotConfig } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: string;
}

interface CarnivalChatbotProps {
  config: BotConfig;
  onOpenLeadModal: () => void;
  onOpenDeckModal: () => void;
}

export const CarnivalChatbot: React.FC<CarnivalChatbotProps> = ({
  config,
  onOpenLeadModal,
  onOpenDeckModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: config.welcomeMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If bot is disabled in settings, don't render anything
  if (!config.enabled) return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Update welcome message if config changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'msg-welcome') {
        return [
          {
            id: 'msg-welcome',
            sender: 'bot',
            text: config.welcomeMessage,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [config.welcomeMessage]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    // MODE 1: Regras / FAQ local pré-definidas
    if (config.mode === 'regras') {
      setTimeout(() => {
        let reply = 'Estou no modo de Respostas Automáticas. Para falar com a produção ou garantir ingressos, clique nos botões abaixo ou mande uma mensagem no WhatsApp oficial!';
        
        const matched = config.quickReplies.find((qr) => 
          text.toLowerCase().includes(qr.label.toLowerCase()) || 
          qr.label.toLowerCase().includes(text.toLowerCase())
        );

        if (matched) {
          reply = matched.answer;
        } else {
          const lower = text.toLowerCase();
          if (lower.includes('horario') || lower.includes('programacao') || lower.includes('bloco')) {
            reply = 'A folia vai de 13 a 17 de Fevereiro! Blocos diários das 11h às 21h com concentração nas praças históricas e trios elétricos Trovoada de 100 mil Watts!';
          } else if (lower.includes('ingresso') || lower.includes('camarote') || lower.includes('vip') || lower.includes('preco')) {
            reply = 'A pista da avenida é 100% gratuita! Para o Camarote VIP suspensa com open bar premium, cadastre-se na Pré-Venda exclusiva.';
          } else if (lower.includes('patrocinio') || lower.includes('marca') || lower.includes('comercial')) {
            reply = 'Oportunidades de patrocínio com cotas Master, Ouro e Prata! Acesse o Book Comercial em slides ou envie seus dados no painel de parceiros.';
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: reply,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            source: 'regras',
          },
        ]);
        setIsLoading(false);
      }, 400);
      return;
    }

    // MODE 2: IA Inteligente via Gemini API no backend server
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-5),
          systemInstruction: config.systemPrompt,
          botName: config.name,
        }),
      });

      if (!res.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply || 'Tive um pequeno tropeço no samba! Pode enviar sua pergunta de novo?',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          source: data.source,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Oi, folião! O trio elétrico está animado e houve uma pequena oscilação na rede. Você pode checar a programação completa e a aba de dúvidas aqui no site!',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          source: 'error',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvatarIcon = () => {
    switch (config.avatarIcon) {
      case 'bot':
        return <Bot className="w-5 h-5 text-amber-400" />;
      case 'music':
        return <Music className="w-5 h-5 text-amber-400" />;
      case 'party':
        return <PartyPopper className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: config.welcomeMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left or Right) */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 px-4 py-3 bg-purple-950/95 hover:bg-purple-900 text-white rounded-full border-2 border-yellow-400 shadow-2xl hover:shadow-yellow-500/20 active:scale-95 transition-all cursor-pointer group"
          aria-label="Abrir chat do carnaval"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-300">
            {getAvatarIcon()}
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold text-white block font-display leading-tight">
              {config.name}
            </span>
            <span className="text-[10px] text-yellow-300 font-bold flex items-center gap-1">
              {config.mode === 'ia' ? '⚡ IA Satubinha' : '💬 Dúvidas'}
            </span>
          </div>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div
          className={`fixed bottom-5 left-5 z-50 bg-neutral-950 border-2 border-yellow-400/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
            isMinimized
              ? 'w-72 h-14'
              : 'w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-purple-950 border-b border-purple-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-900 border border-yellow-400/40 flex items-center justify-center text-yellow-300">
                {getAvatarIcon()}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white font-display">
                    {config.name}
                  </h4>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                    config.mode === 'ia' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' : 'bg-blue-400/10 text-blue-400'
                  }`}>
                    {config.mode === 'ia' ? 'Gemini IA' : 'FAQ Guiado'}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 block">
                  Online · Atendimento Oficial 2026
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-neutral-400">
              {!isMinimized && (
                <button
                  onClick={clearChat}
                  title="Reiniciar conversa"
                  className="p-1.5 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expandir chat' : 'Minimizar'}
                className="p-1.5 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Fechar chat"
                className="p-1.5 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-neutral-950/90">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-amber-400 text-neutral-950 font-medium rounded-br-none shadow-sm'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-neutral-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-1.5 text-neutral-400 text-xs p-2 bg-neutral-900/60 rounded-xl w-fit">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] ml-1">Digitando resposta...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Reply Pills */}
              {config.quickReplies && config.quickReplies.length > 0 && (
                <div className="px-3 py-2 bg-neutral-900/40 border-t border-neutral-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
                  {config.quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qr.label)}
                      className="text-[10px] font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg px-2.5 py-1 whitespace-nowrap cursor-pointer transition-colors shrink-0"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Fast Action Shortcuts */}
              <div className="px-3 py-2 bg-neutral-900/80 border-t border-neutral-800 flex items-center justify-between text-[11px] gap-2">
                <button
                  onClick={() => { setIsOpen(false); onOpenLeadModal(); }}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>🎟️ Pré-Venda VIP</span>
                </button>
                <button
                  onClick={() => { setIsOpen(false); onOpenDeckModal(); }}
                  className="text-neutral-300 hover:text-amber-400 flex items-center gap-1 font-medium"
                >
                  <span>💼 Book Comercial</span>
                </button>
                {config.whatsappContactNumber && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=${config.whatsappContactNumber}&text=${encodeURIComponent('Olá! Estava no chat do Circuito Folia Brasil e gostaria de falar com um atendente.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Zap Direto</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="p-2.5 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={config.mode === 'ia' ? 'Pergunte qualquer coisa sobre o evento...' : 'Digite sua dúvida...'}
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 rounded-xl transition-all cursor-pointer shrink-0"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
