module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const url = ld.URL + "/privacidade/";
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
            publisher: ld.refNegocio,
            dateModified: "2026-08-12"
          },
          ld.negocio,
          ld.trilha([["Regnumm", "/"], ["Política de privacidade", null]])
        ]
      });
    }
  }
};
