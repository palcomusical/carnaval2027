import { BotConfig, SiteSettings } from '../types';

export const DEFAULT_BOT_CONFIG: BotConfig = {
  enabled: true,
  name: 'FoliãoBot IA',
  avatarIcon: 'sparkles',
  welcomeMessage: '🎉 Olá, folião! Eu sou o assistente oficial do Circuito Folia Brasil 2026. Como posso te ajudar hoje?',
  mode: 'ia',
  systemPrompt: `Você é o FoliãoBot, assistente oficial e animado do Circuito Folia Brasil 2026 promovido pela Palco Musical Entretenimento.
Seu objetivo é tirar dúvidas sobre horários dos blocos, mapa, pontos de hidratação gratuitos, segurança, ingressos para o Camarote Oficial VIP e oportunidades para marcas patrocinadoras.
Responda sempre com entusiasmo, clareza, simpatia e emojis festivos brasileiros.
Caso o usuário pergunte sobre patrocínio ou parcerias, motive-o a conhecer as cotas oficiais ou acessar o "Book Comercial".`,
  quickReplies: [
    {
      label: 'Qual a programação dos blocos?',
      answer: 'O circuito acontece de 13 a 17 de Fevereiro! Sábado tem Bloco do Sol Nascente às 14:30 e Bateria Furiosa às 17:30. Domingo tem Frevo às 12:30 e Baile Funk às 18:00. Segunda tem Fanfarra e Terça a Super Saideira Real! 🥁',
    },
    {
      label: 'A entrada na rua é gratuita?',
      answer: 'Sim! 100% gratuita na pista para todo mundo. Quem quiser uma experiência suspensa com open bar premium pode se cadastrar para o Camarote Oficial VIP! 👑',
    },
    {
      label: 'Como funciona o Camarote VIP?',
      answer: 'O Camarote Oficial Palco Musical conta com visão 360° da avenida, open bar completo, climatização, sanitários privativos e apresentações exclusivas nos intervalos dos trios. 🎟️',
    },
    {
      label: 'Como patrocinar o evento?',
      answer: 'Temos Cotas Master (Naming Rights), Ouro, Prata e Produto Oficial com exclusividade comercial para mais de 720.000 foliões. Você pode abrir o "Book Comercial" nos slides no topo do site ou falar com a gerência! 💼',
    },
    {
      label: 'Tem água de graça no circuito?',
      answer: 'Sim! Temos 8 Estações de Hidratação Gratuita com água gelada ao longo dos 3,4 km do circuito e caminhões nebulizadores para refrescar os foliões! 💧',
    },
  ],
  whatsappContactNumber: '5511987654321',
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  eventName: 'A Melhor Prévia de Carnaval',
  tagline: 'De Satubinha - MA · A Festa Mais Esperada do Ano',
  organizer: 'Depósito de Bebidas do Marcelo & Palco Musical',
  organizerEmail: 'contato@previadesatubinha.com.br',
  organizerPhone: '(99) 98123-4567',
  datesSummary: '07 de Fevereiro · A partir das 19h',
  targetDate: '2026-02-07T19:00:00',
  location: 'Depósito de Bebidas do Marcelo · Satubinha - MA',
  expectedAttendance: '+5.000 foliões confirmados de toda a região',
  noticeBannerEnabled: true,
  noticeBannerText: '🔥 07 DE FEV: A Melhor Prévia de Carnaval de Satubinha-MA com Laylson Vaquerama & Saudany no Depósito de Bebidas do Marcelo! A partir das 19h.',
  vipLote: '1º Lote Antecipado / Abadás',
  vipLoteStatus: 'ultimas_vagas',
  heroBackgroundUrl: '/assets/aistudio/f7fd3274a1e9749f55ab0fad51c26b96_7e0ae475.jpg',
  heroBackgroundType: 'image',
};
