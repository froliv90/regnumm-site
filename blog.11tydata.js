/* Dados da página de listagem /blog/. Os textos ficam em _data/blog.json. */

const semTags = (s) => String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

module.exports = {
  eleventyComputed: {
    seoTitulo: (data) => data.blog.seoTitulo,
    seoDescricao: (data) => data.blog.seoDescricao,

    schema: (data) => {
      const s = data.site;
      const posts = (data.collections.posts || []).slice().reverse();

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Blog",
            "@id": s.url + "/blog/#blog",
            name: data.blog.seoTitulo,
            description: data.blog.seoDescricao,
            url: s.url + "/blog/",
            inLanguage: s.lang,
            author: { "@id": s.idPessoa },
            publisher: { "@id": s.idNegocio },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              "@id": s.url + p.url + "#article",
              headline: semTags(p.data.titulo),
              description: p.data.resumo || "",
              datePublished: new Date(p.date).toISOString(),
              url: s.url + p.url
            }))
          },
          { "@type": "Person", "@id": s.idPessoa, name: s.autor, url: s.url + "/" },
          { "@type": "ProfessionalService", "@id": s.idNegocio, name: s.nome, url: s.url + "/" },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: s.nome, item: s.url + "/" },
              { "@type": "ListItem", position: 2, name: data.blog.eyebrow, item: s.url + "/blog/" }
            ]
          }
        ]
      });
    }
  }
};
