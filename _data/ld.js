/* Entidades de dados estruturados do site: o que o Google lê sobre a
   Regnumm, o Felipe e os serviços. Ficam aqui para que as páginas
   referenciem os mesmos @id em vez de declarar entidades concorrentes.

   Revistas em 25/09/2026 para bater com o site e com os Termos:
   - o Mapa Financeiro é o questionário online gratuito; a sessão de R$ 125 é
     o Mapa Financeiro completo + direcionamento, um serviço à parte;
   - o preço vem de ofertas.json, e as perguntas frequentes de faq.json, as
     mesmas que a home mostra;
   - nada de "planejamento financeiro" ou "como investir": os Termos dizem
     que o serviço não inclui isso. */

const ofertas = require("./ofertas.json");
const faq = require("./faq.json");

const URL = "https://regnumm.com.br";
const ID_PESSOA = URL + "/#felipe";
const ID_NEGOCIO = URL + "/#regnumm";

const refPessoa = { "@id": ID_PESSOA };
const refNegocio = { "@id": ID_NEGOCIO };

const pessoa = {
  "@type": "Person",
  "@id": ID_PESSOA,
  name: "Felipe Rodrigues Oliveira",
  jobTitle: "Consultor comportamental financeiro",
  description:
    "Felipe Rodrigues Oliveira ajuda quem ganha bem mas não consegue acumular ou organizar as finanças, com mais de mil atendimentos no contexto financeiro. Diferente da consultoria tradicional, trabalha o comportamento e a direção financeira da pessoa, não a venda de produtos ou a montagem de planilhas. Especialista em diagnóstico comportamental financeiro e governança financeira pessoal. Fundador do Regnumm, baseado na região de Campinas.",
  url: URL,
  worksFor: refNegocio
};

const servicos = {
  mapa: {
    "@type": "Service",
    name: "Mapa Financeiro",
    description:
      "Questionário online e gratuito, de cinco a sete minutos, que identifica qual dos quatro perfis de comportamento financeiro conduz as decisões da pessoa com dinheiro, e o ponto em que esse padrão passa a limitar. O resultado aparece na hora."
  },
  mapaCompleto: {
    "@type": "Service",
    name: ofertas.sessao.nome,
    description:
      "Sessão individual de até 90 minutos com Felipe Rodrigues Oliveira, online ou presencial na região de Campinas, em que o resultado completo do Mapa Financeiro (o perfil dominante, o segundo perfil e o cruzamento entre os dois) é lido com a pessoa, olhando onde esse padrão aparece nas decisões com dinheiro."
  },
  bussola: {
    "@type": "Service",
    name: "Bússola Financeira",
    description:
      "Quatro sessões para sair do improviso e construir um sistema de decisão financeira próprio. No fim, a pessoa sai com a sua Constituição Financeira: princípios, vedações e regras de decisão escritos com as próprias palavras."
  },
  arquitetura: {
    "@type": "Service",
    name: "Arquitetura Financeira",
    description:
      "Um encontro por mês para aplicar à realidade de cada período o sistema construído na Bússola Financeira, com alguém do mesmo lado da mesa, sem produto para vender e sem comissão."
  }
};

/* Preço estruturado. O Mapa gratuito vai com zero, e o completo com o valor
   de ofertas.json: preço errado aqui vira resultado errado no Google. */
const oferta = (servico, preco) =>
  Object.assign(
    { "@type": "Offer", itemOffered: servico },
    preco === undefined ? {} : { price: String(preco), priceCurrency: "BRL" }
  );

const negocio = {
  "@type": "ProfessionalService",
  "@id": ID_NEGOCIO,
  name: "Regnumm",
  alternateName: ["Regnumm Governança Financeira"],
  url: URL,
  description:
    "Regnumm ajuda pessoas que ganham bem mas não conseguem guardar dinheiro ou organizar as finanças pessoais. Atende profissionais liberais, autônomos e executivos que sentem ansiedade financeira mesmo com boa renda, que tentaram organizar as finanças mas o problema voltou, ou que querem estruturar a vida financeira do zero. Atendimento online para todo o Brasil e presencial na região de Campinas.",
  founder: refPessoa,
  areaServed: ["Campinas", "Jundiaí", "Sorocaba", "São Paulo", "Brasil"],
  availableLanguage: "Portuguese",
  serviceType: [
    "Consultoria comportamental financeira",
    "Organização financeira pessoal",
    "Como parar de gastar mais do que ganha",
    "Ajuda para quem ganha bem mas não guarda dinheiro",
    "Como estruturar as finanças pessoais",
    "Ansiedade financeira",
    "Finanças para profissionais liberais",
    "Como sair do ciclo de gastar tudo que ganha"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Como funciona o Regnumm",
    itemListElement: [
      oferta(servicos.mapa, 0),
      oferta(servicos.mapaCompleto, ofertas.sessao.valor),
      oferta(servicos.bussola),
      oferta(servicos.arquitetura)
    ]
  }
};

/* As mesmas perguntas que a home mostra. */
const perguntas = faq.itens.map((i) => [i.pergunta, i.resposta]);

const faqPage = {
  "@type": "FAQPage",
  mainEntity: perguntas.map(([nome, resposta]) => ({
    "@type": "Question",
    name: nome,
    acceptedAnswer: { "@type": "Answer", text: resposta }
  }))
};

/* Trilha de navegação. `itens` é uma lista de [nome, caminho];
   o último item vai sem `item`, como manda a especificação. */
const trilha = (itens) => ({
  "@type": "BreadcrumbList",
  itemListElement: itens.map(([nome, caminho], i) => {
    const entrada = { "@type": "ListItem", position: i + 1, name: nome };
    if (caminho) entrada.item = URL + caminho;
    return entrada;
  })
});

module.exports = {
  URL, ID_PESSOA, ID_NEGOCIO,
  refPessoa, refNegocio,
  pessoa, negocio, servicos, faqPage, trilha
};
