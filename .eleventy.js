const footnote = require("markdown-it-footnote");

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

const semTags = (s) => String(s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

module.exports = function (eleventyConfig) {
  // ── Markdown: HTML inline liberado, aspas tipográficas, notas de rodapé ──
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ html: true, typographer: true, breaks: false });
    md.use(footnote);

    // Tabela larga precisa rolar dentro do próprio bloco. Sem isto ela estoura
    // a viewport no celular e, como o body tem overflow-x: hidden, o excedente
    // fica cortado e inalcançável.
    md.renderer.rules.table_open = () => '<div class="tabela-scroll">\n<table>\n';
    md.renderer.rules.table_close = () => '</table>\n</div>\n';
  });

  // ── Arquivos copiados sem processamento ──
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("felipe.png");
  eleventyConfig.addPassthroughCopy("og-image.png");
  eleventyConfig.addPassthroughCopy({ "conteudo/imagens": "blog/imagens" });

  // ── Filtros ──
  eleventyConfig.addFilter("dataBR", (d) => {
    const dt = d instanceof Date ? d : new Date(d);
    return `${dt.getUTCDate()} de ${MESES[dt.getUTCMonth()]} de ${dt.getUTCFullYear()}`;
  });

  eleventyConfig.addFilter("dataISO", (d) => {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("dataRFC", (d) => {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString();
  });

  eleventyConfig.addFilter("semTags", semTags);

  // ── Preço ──────────────────────────────────────────────────────────────
  // Vem sempre de _data/ofertas.json. Nenhum template escreve valor na mão.
  eleventyConfig.addFilter("brl", (valor) =>
    typeof valor === "number" && valor > 0
      ? "R$ " + valor.toLocaleString("pt-BR")
      : "Grátis",
  );

  /* A frase comparativa entre PDF e sessão é CONTA, nunca texto fixo.
     Escrita como string, ela erraria em silêncio na primeira mudança de preço. */
  eleventyConfig.addFilter("diferenca", (maior, menor) =>
    "R$ " + Math.abs(maior - menor).toLocaleString("pt-BR"),
  );

  /** Monta o link de WhatsApp já com a mensagem preenchida. */
  eleventyConfig.addFilter("whatsapp", (texto, numero) =>
    "https://wa.me/" + (numero || "5519982578517") +
    "?text=" + encodeURIComponent(texto || ""),
  );

  eleventyConfig.addFilter("tempoLeitura", (conteudo) => {
    const palavras = semTags(conteudo).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palavras / 200));
  });

  // ── Coleção de posts, do mais antigo para o mais novo ──
  // (a listagem inverte com `| reverse`, então o mais recente aparece primeiro)
  eleventyConfig.addCollection("posts", (colecao) =>
    colecao.getFilteredByGlob("conteudo/posts/*.md").sort((a, b) => a.date - b.date)
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    // .html do site atual é copiado como está, sem passar por template engine.
    // Isso protege index.html e perfis.html de qualquer processamento acidental.
    htmlTemplateEngine: false,
    // O markdown dos posts NÃO passa por Nunjucks: chaves e { } no texto
    // do Felipe nunca vão quebrar o build.
    markdownTemplateEngine: false,
    templateFormats: ["njk", "md", "html"]
  };
};
