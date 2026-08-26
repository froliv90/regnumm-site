module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const url = ld.URL + "/diagnostico/";

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
          Object.assign({}, ld.servicos.mapa, {
            "@id": url + "#mapa-financeiro",
            provider: ld.refNegocio,
            areaServed: ld.negocio.areaServed,
            // Preço estruturado que o Google lê. Vem de _data/ofertas.json,
            // nunca escrito à mão: preço errado aqui vira rich result errado.
            offers: {
              "@type": "Offer",
              price: String(data.ofertas.sessao.valor),
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: ld.URL + "/#ofertas"
            }
          }),
          ld.pessoa,
          ld.negocio,
          ld.trilha([["Regnumm", "/"], ["O diagnóstico", null]])
        ]
      });
    }
  }
};
