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
          // O Mapa é gratuito; os R$ 125 são do Mapa completo, a sessão.
          // Antes, o preço da sessão ia pendurado no Mapa gratuito.
          Object.assign({}, ld.servicos.mapa, {
            "@id": url + "#mapa-financeiro",
            provider: ld.refNegocio,
            areaServed: ld.negocio.areaServed,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: ld.URL + "/mapa/"
            }
          }),
          Object.assign({}, ld.servicos.mapaCompleto, {
            "@id": url + "#mapa-financeiro-completo",
            provider: ld.refNegocio,
            areaServed: ld.negocio.areaServed,
            // Preço que o Google lê. Vem de _data/ofertas.json, nunca à mão.
            offers: {
              "@type": "Offer",
              price: String(data.ofertas.sessao.valor),
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: ld.URL + "/diagnostico/"
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
