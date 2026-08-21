/* Entidades de dados estruturados do site.
   Copiadas verbatim do @graph que já existia no index.html — nenhum texto
   foi reescrito. Ficam aqui para que as páginas novas referenciem os mesmos
   @id em vez de declarar entidades concorrentes. */

const URL = "https://regnumm.com.br";
const ID_PESSOA = URL + "/#felipe";
const ID_NEGOCIO = URL + "/#regnum";

const refPessoa = { "@id": ID_PESSOA };
const refNegocio = { "@id": ID_NEGOCIO };

const pessoa = {
  "@type": "Person",
  "@id": ID_PESSOA,
  name: "Felipe Rodrigues Oliveira",
  jobTitle: "Consultor Financeiro Pessoal",
  description:
    "Felipe Rodrigues Oliveira ajuda quem ganha bem mas não consegue acumular ou organizar as finanças, com mais de mil atendimentos no contexto financeiro. Diferente da consultoria tradicional, trabalha o comportamento e a direção financeira da pessoa, não a venda de produtos ou a montagem de planilhas. Especialista em diagnóstico comportamental financeiro e governança financeira pessoal. Fundador do Regnumm (Regnum), baseado em Campinas.",
  url: URL,
  worksFor: refNegocio
};

const servicos = {
  pdf: {
    "@type": "Service",
    name: "Mapa Financeiro em PDF — relatório de perfil financeiro",
    description:
      "Relatório digital em PDF gerado a partir das respostas do Teste dos Quatro Perfis, com o perfil dominante, o perfil secundário e o cruzamento entre os dois."
  },
  mapa: {
    "@type": "Service",
    name: "Mapa Financeiro — sessão de diagnóstico financeiro pessoal",
    description:
      "Sessão individual de 90 minutos, presencial em Campinas ou online, para entender por que você não consegue guardar dinheiro mesmo ganhando bem. Felipe faz perguntas para entender seu perfil financeiro e te mostra o padrão que está travando sua vida financeira."
  },
  bussola: {
    "@type": "Service",
    name: "Bússola Financeira — processo de organização financeira pessoal",
    description:
      "Quatro sessões para organizar as finanças pessoais de vez. Você sai com um documento próprio que mostra como tomar decisões financeiras, onde colocar o dinheiro e quais prioridades seguir."
  },
  arquitetura: {
    "@type": "Service",
    name: "Arquitetura Financeira — acompanhamento financeiro mensal",
    description:
      "Acompanhamento mensal por seis meses com Felipe ao seu lado nas decisões financeiras. Sem vender produto, sem comissão. Só um profissional do seu lado ajudando você a manter o rumo financeiro que você mesmo definiu."
  }
};

const negocio = {
  "@type": "ProfessionalService",
  "@id": ID_NEGOCIO,
  name: "Regnumm",
  alternateName: ["Regnum", "Regnumm Governança Financeira"],
  url: URL,
  description:
    "Regnumm (também escrito Regnum) ajuda pessoas que ganham bem mas não conseguem guardar dinheiro ou organizar as finanças pessoais. Atende profissionais liberais, autônomos e executivos que sentem ansiedade financeira mesmo com boa renda, que tentaram organizar as finanças mas o problema voltou, ou que querem estruturar a vida financeira do zero. Atendimento presencial em Campinas e remoto para todo o Brasil.",
  founder: refPessoa,
  areaServed: ["Campinas", "Jundiaí", "Sorocaba", "São Paulo", "Brasil"],
  availableLanguage: "Portuguese",
  serviceType: [
    "Consultor financeiro pessoal",
    "Organização financeira pessoal",
    "Como parar de gastar mais do que ganha",
    "Ajuda para quem ganha bem mas não guarda dinheiro",
    "Como estruturar as finanças pessoais",
    "Ansiedade financeira",
    "Planejamento financeiro pessoal",
    "Como investir sendo autônomo",
    "Finanças para profissionais liberais",
    "Como sair do ciclo de gastar tudo que ganha"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Como funciona o Regnumm",
    itemListElement: [
      { "@type": "Offer", itemOffered: servicos.pdf },
      { "@type": "Offer", itemOffered: servicos.mapa },
      { "@type": "Offer", itemOffered: servicos.bussola },
      { "@type": "Offer", itemOffered: servicos.arquitetura }
    ]
  }
};

const perguntas = [
  ["Por que não consigo guardar dinheiro mesmo ganhando bem?",
   "Na maioria dos casos, o problema não é a quantidade de dinheiro que entra — é o padrão de decisão financeira que opera por baixo. Cada pessoa tem um jeito de decidir com dinheiro que foi se formando ao longo dos anos. Quando esse padrão não é identificado, nenhuma planilha, aplicativo ou corte de gasto resolve de forma duradoura. O problema volta porque a causa continua lá."],
  ["Preciso fazer o Mapa Financeiro antes das outras sessões?",
   "Sim. O Mapa Financeiro é a sessão inicial onde Felipe entende seu perfil financeiro. Sem esse diagnóstico, os processos seguintes perdem precisão. É como uma consulta médica antes do tratamento."],
  ["O Regnum vende algum produto financeiro ou recebe comissão?",
   "Não. O Regnumm não vende investimentos, seguros, consórcios nem nenhum produto financeiro. Felipe não recebe comissão de nenhuma instituição financeira. A remuneração vem exclusivamente do cliente — o que elimina qualquer conflito de interesse."],
  ["Funciona para autônomos e pessoas com renda variável?",
   "Sim. Médicos, advogados, consultores, empresários e outros profissionais com renda variável são grande parte dos clientes. A variabilidade da renda é frequentemente parte do padrão que o diagnóstico revela."],
  ["As sessões são presenciais ou online?",
   "As duas opções estão disponíveis. Atendimento presencial em Campinas e região, e online para qualquer cidade do Brasil."],
  ["Como me organizar financeiramente quando ganho bem mas não sobra nada no fim do mês?",
   "O primeiro passo não é cortar gasto nem montar planilha. É entender o padrão de decisão que comanda como você usa o dinheiro. Quem ganha bem e não acumula geralmente decide no improviso, sem um critério próprio que oriente as escolhas. A organização que dura começa por nomear esse padrão e construir uma direção financeira que seja sua, não uma regra genérica copiada de outra pessoa. Sem isso, qualquer método volta a falhar no primeiro mês difícil."],
  ["Qual a melhor forma de organizar a vida financeira pessoal?",
   "Não existe um método único que sirva para todos, porque cada pessoa decide com dinheiro de um jeito diferente. A forma mais eficaz começa por um diagnóstico do próprio comportamento financeiro: entender se você tende a se mover demais, a se proteger demais, a planejar sem executar ou a agir sem estrutura. A partir desse autoconhecimento, monta-se um sistema de decisão pessoal, com princípios, prioridades e regras próprias. Organização financeira que funciona é a que respeita como você de fato decide, não a que impõe um modelo de fora."],
  ["Por que toda vez que tento me organizar financeiramente o problema volta?",
   "Porque o método ataca o sintoma e não a causa. Planilhas, aplicativos e cortes de gasto organizam o de fora, mas o que comanda as decisões continua igual por dentro. Enquanto o padrão de decisão que gera o desorganizado não for identificado e reestruturado, o problema sempre volta, porque a causa permanece intacta. A solução duradoura é trabalhar o comportamento e a direção financeira, não apenas o controle dos números."],
  ["Preciso de um consultor financeiro ou consigo me organizar sozinho?",
   "Muita gente consegue se organizar sozinha, e quando esse é o caso, o honesto é dizer isso. Conteúdo gratuito e disciplina resolvem boa parte. O acompanhamento profissional faz diferença quando a pessoa já entende o que deveria fazer e mesmo assim não sustenta, porque saber não é o mesmo que mudar de comportamento. Nesse caso, ter alguém de fora que acompanha a execução e ajuda a manter a direção encurta o caminho entre saber e fazer, como um personal trainer faz com quem já viu mil vídeos de treino."],
  ["O que é governança financeira pessoal?",
   "É tratar a própria vida financeira como algo que se governa, não apenas se controla. Em vez de reagir a cada decisão de dinheiro no improviso, a pessoa constrói um conjunto próprio de princípios, vedações e regras de decisão, uma espécie de constituição pessoal que orienta as escolhas mesmo nos meses difíceis. A governança financeira pessoal foca em como você decide e para onde está indo com o dinheiro, um nível anterior ao de qual investimento ou produto escolher."]
];

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
