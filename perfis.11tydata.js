/* Schema de /perfis.html.
   O FAQPage é o mesmo que já estava no arquivo original, com as seis
   perguntas verbatim. Só foram acrescentados WebPage e BreadcrumbList,
   para a página entrar no mesmo grafo das demais. */

const perguntas = [
  ["Quais são os quatro perfis financeiros da Regnumm?",
   "São quatro perfis de comportamento financeiro, definidos pelo cruzamento entre foco no tempo, presente ou futuro, e comportamento, movimento ou contenção: Visionário sem Estrutura, Executor sem Lastro, Guardião que Aprisiona e Estrategista Imóvel. Cada perfil descreve uma força que trouxe a pessoa até onde ela está, e o ponto exato em que essa mesma força passa a limitar o próximo passo."],
  ["Qual é o meu perfil financeiro?",
   "A forma mais precisa de descobrir é através do Mapa Financeiro, uma sessão de 90 minutos que identifica o perfil a partir da sua própria história, confrontada ao vivo. As descrições gerais dos quatro perfis ajudam a se reconhecer, mas a aplicação individual revela onde exatamente aquele padrão está custando caro na sua vida."],
  ["O que é o Visionário sem Estrutura?",
   "É o perfil que vive no amanhã, movendo dinheiro em direção a oportunidades futuras, mas cuja visão cresce mais rápido do que a base que deveria sustentá-la, resultando em movimento constante sem acúmulo consistente."],
  ["O que é o Executor sem Lastro?",
   "É o perfil que vive no presente, agindo sobre o que está na frente sem projetar o futuro, resultando em ciclos de avanço e recomeço onde cada ciclo não deixa base para o seguinte."],
  ["O que é o Guardião que Aprisiona?",
   "É o perfil que protege o presente com tanta força que a proteção vira prisão, mantendo o dinheiro seguro e parado, o que gera um custo de oportunidade silencioso ao longo dos anos."],
  ["O que é o Estrategista Imóvel?",
   "É o perfil orientado ao futuro que planeja com rigor mas não parte, porque a análise, que deveria proteger a decisão, vira substituto dela, deixando o plano sempre pronto e a execução sempre adiada."]
];

module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const url = ld.URL + "/perfis.html";

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "FAQPage",
            "@id": url,
            url: url,
            name: data.seoTitulo,
            description: data.seoDescricao,
            inLanguage: "pt-BR",
            publisher: ld.refNegocio,
            mainEntity: perguntas.map(([nome, resposta]) => ({
              "@type": "Question",
              name: nome,
              acceptedAnswer: { "@type": "Answer", text: resposta }
            }))
          },
          ld.pessoa,
          ld.negocio,
          ld.trilha([["Regnumm", "/"], ["Os quatro perfis", null]])
        ]
      });
    }
  }
};
