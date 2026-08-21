/* Dados aplicados automaticamente a TODO arquivo .md dentro de /conteudo/posts.
   O Felipe não precisa mexer aqui — só criar o .md. */

const semTags = (s) => String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const iso = (d) => (d instanceof Date ? d : new Date(d)).toISOString();

module.exports = {
  layout: "post.njk",
  tags: ["posts"],

  eleventyComputed: {
    // rascunho: true no front matter tira o texto do ar sem apagar o arquivo
    permalink: (data) =>
      data.rascunho ? false : `/blog/${data.page.fileSlug}/index.html`,
    eleventyExcludeFromCollections: (data) => Boolean(data.rascunho),

    seoTitulo: (data) => data.seoTitulo || `${semTags(data.titulo)} — ${data.site.nome}`,
    seoDescricao: (data) => data.seoDescricao || data.resumo,

    // Mesmo padrão de @graph das outras páginas do site, adaptado para artigo.
    // Os @id de Person e ProfessionalService são os mesmos declarados na home,
    // então o Google costura o artigo ao grafo que já existe.
    schema: (data) => {
      const s = data.site;
      const url = s.url + data.page.url;
      const imagem = s.url + (data.ogImage || s.ogImage);

      const artigo = {
        "@type": "BlogPosting",
        "@id": url + "#article",
        isPartOf: { "@id": s.url + "/blog/#blog" },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: semTags(data.titulo),
        description: data.resumo || "",
        inLanguage: s.lang,
        datePublished: iso(data.date),
        dateModified: iso(data.atualizadoEm || data.date),
        author: { "@id": s.idPessoa },
        publisher: { "@id": s.idNegocio },
        image: imagem
      };
      if (data.categoria) artigo.articleSection = data.categoria;
      if (data.palavrasChave) {
        artigo.keywords = Array.isArray(data.palavrasChave)
          ? data.palavrasChave.join(", ")
          : data.palavrasChave;
      }

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          artigo,
          {
            "@type": "Person",
            "@id": s.idPessoa,
            name: s.autor,
            url: s.url + "/"
          },
          {
            "@type": "ProfessionalService",
            "@id": s.idNegocio,
            name: s.nome,
            url: s.url + "/"
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: s.nome, item: s.url + "/" },
              { "@type": "ListItem", position: 2, name: data.blog.eyebrow, item: s.url + "/blog/" },
              { "@type": "ListItem", position: 3, name: semTags(data.titulo) }
            ]
          }
        ]
      });
    }
  }
};
