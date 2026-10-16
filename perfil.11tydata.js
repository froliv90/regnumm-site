/* Schema das páginas /perfis/{slug}/ (perfil.njk): WebPage do perfil, ligada
   ao negócio, com a trilha Regnumm > Os quatro perfis > nome do perfil. */

module.exports = {
  eleventyComputed: {
    schema: (data) => {
      const ld = data.ld;
      const perfil = data.perfil;
      const url = ld.URL + "/perfis/" + perfil.slug + "/";

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": url,
            url: url,
            name: perfil.nome + ": perfil financeiro",
            description: perfil.seoDescricao,
            inLanguage: "pt-BR",
            publisher: ld.refNegocio,
            primaryImageOfPage: ld.URL + "/assets/og/perfil-" + perfil.slug + ".png"
          },
          ld.trilha([["Regnumm", "/"], ["Os quatro perfis", "/perfis.html"], [perfil.nome, null]])
        ]
      });
    }
  }
};
