module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const url = ld.URL + "/processo/";
      const etapas = [
        ["Mapa Financeiro", ld.servicos.mapa],
        ["Bússola Financeira", ld.servicos.bussola],
        ["Arquitetura Financeira", ld.servicos.arquitetura]
      ];

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": url,
            url: url,
            name: data.seoTitulo,
            description: data.seoDescricao,
            inLanguage: "pt-BR",
            about: ld.refNegocio,
            primaryImageOfPage: ld.URL + "/og-image.png"
          },
          {
            "@type": "ItemList",
            "@id": url + "#etapas",
            name: "Como funciona o Regnumm",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: etapas.length,
            itemListElement: etapas.map(([nome, servico], i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: nome,
              item: Object.assign({}, servico, { provider: ld.refNegocio })
            }))
          },
          ld.pessoa,
          ld.negocio,
          ld.trilha([["Regnumm", "/"], ["O processo", null]])
        ]
      });
    }
  }
};
