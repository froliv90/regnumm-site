module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const url = ld.URL + "/sobre/";

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": url,
            url: url,
            name: data.seoTitulo,
            description: data.seoDescricao,
            inLanguage: "pt-BR",
            mainEntity: ld.refPessoa,
            primaryImageOfPage: ld.URL + "/felipe.png"
          },
          Object.assign({}, ld.pessoa, {
            image: ld.URL + "/felipe.png",
            mainEntityOfPage: { "@id": url },
            sameAs: [
              "https://www.instagram.com/feliperoliv/",
              "https://www.linkedin.com/in/felipe-rodrigues-oliveira/",
              "https://www.tiktok.com/@feliperoliv"
            ]
          }),
          ld.negocio,
          ld.trilha([["Regnumm", "/"], ["O fundador", null]])
        ]
      });
    }
  }
};
