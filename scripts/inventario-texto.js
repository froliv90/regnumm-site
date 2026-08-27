/*
 * Inventário do texto visível do site, na ordem em que aparece na tela.
 *
 * Lê o HTML já construído em _site/ — ou seja, o que a pessoa lê de fato,
 * com preço, data e link já resolvidos, não o template. Cada string sai
 * etiquetada com o papel que exerce na página, porque numa revisão de voz
 * o papel manda tanto quanto a frase: um rótulo tem três palavras, um botão
 * precisa caber num botão, um h1 ocupa a largura da tela.
 *
 * Uso: node scripts/inventario-texto.js > inventario-texto.md
 */

const fs = require("fs");
const path = require("path");
const { parseDocument } = require("htmlparser2");

const PAGINAS = [
  ["Home", "/", "_site/index.html"],
  ["Os quatro perfis", "/perfis.html", "_site/perfis.html"],
  ["O processo", "/processo/", "_site/processo/index.html"],
  ["O diagnóstico", "/diagnostico/", "_site/diagnostico/index.html"],
  ["O fundador", "/sobre/", "_site/sobre/index.html"],
  ["Fundamentação", "/fundamentacao/", "_site/fundamentacao/index.html"],
  ["Textos (blog)", "/blog/", "_site/blog/index.html"],
  ["Privacidade", "/privacidade/", "_site/privacidade/index.html"],
  ["Termos", "/termos/", "_site/termos/index.html"],
];

/* O papel é decidido pela classe antes da tag: é a classe que diz se aquele
   <p> é um olho-de-texto ou um parágrafo de corpo. */
const PAPEL = [
  [/hero-headline|hero-int-headline/, "TÍTULO DA PÁGINA (h1)"],
  [/secao-titulo|evidencia-h|captura-h|cta-h|autonomia-h|processo-h|sobre-h/, "TÍTULO DE SEÇÃO (h2)"],
  [/drawer-trigger-title|mapa-card-title|blog-card-title/, "TÍTULO DE BLOCO"],
  [/btn-primary|cta-btn|mapa-btn|pf-btn|oferta-btn|nav-cta|btn-linha|btn-ghost|blog-card-more/, "BOTÃO"],
  [/sec-label|eyebrow|captura-label|cta-pre|redes-label|mapa-card-label|drawer-eixo|drawer-trigger-label|pf-label|autonomia-card-tag|oferta-nome|blog-card-tag|principio-nome|story-label|post-meta/, "RÓTULO"],
  [/oferta-preco|mapa-card-preco|oferta-duvida|cta-note|mapa-note|ofertas-comparacao|oferta-entrega/, "OFERTA / PREÇO"],
  [/hero-subtitle|hero-int-sub|post-lead|captura-sub|cta-sub|hero-sub|processo-intro/, "SUBTÍTULO"],
  [/faq-q/, "PERGUNTA (FAQ)"],
  [/faq-a/, "RESPOSTA (FAQ)"],
  [/pq-sintese|pf-pergunta|callout|evidencia-quote/, "DESTAQUE"],
  [/step-continuidade|disclaimer|legal-atualizado|blog-empty/, "NOTA"],
  [/story-verb/, "JORNADA"],
  [/principio-desc/, "PRINCÍPIO"],
  [/mapa-card-detail|mapa-card-body|mapa-desc/, "CORPO"],
];

function papel(cls, tag) {
  for (const [rx, nome] of PAPEL) if (rx.test(cls)) return nome;
  if (tag === "h1") return "TÍTULO DA PÁGINA (h1)";
  if (tag === "h2") return "TÍTULO DE SEÇÃO (h2)";
  if (tag === "h3") return "SUBTÍTULO DE SEÇÃO (h3)";
  if (tag === "h4") return "RÓTULO";
  if (tag === "cite") return "ATRIBUIÇÃO";
  if (tag === "li") return "ITEM DE LISTA";
  if (tag === "th" || tag === "td") return "TABELA";
  if (tag === "button" || tag === "a") return "BOTÃO / LINK";
  if (tag === "blockquote") return "DESTAQUE";
  return "CORPO";
}

/* Tags que não têm texto para a pessoa ler. */
const MUDAS = new Set(["script", "style", "svg", "noscript", "head"]);
/* Tags que ficam dentro de um parágrafo sem quebrar o bloco. */
const INLINE = new Set(["a", "em", "strong", "span", "br", "time", "b", "i", "sup", "sub", "code"]);
/* Um <a> que é botão ou card não é texto corrido: é um bloco próprio. */
const BLOCO_MESMO = /btn-|cta-btn|mapa-btn|pf-btn|oferta-|nav-cta|blog-card|story-item/;
const ehInline = (n) =>
  INLINE.has(n.name) && !BLOCO_MESMO.test((n.attribs && n.attribs.class) || "");

const texto = (no) => {
  if (no.type === "text") return no.data;
  if (no.type !== "tag" || MUDAS.has(no.name)) return "";
  /* A quebra de linha nos títulos é decisão de composição, não acidente:
     precisa aparecer no inventário para quem for reescrever saber que ali
     existe uma quebra deliberada. */
  if (no.name === "br") return " ⏎ ";
  return (no.children || []).map(texto).join("");
};

const limpa = (s) => s.replace(/\s+/g, " ").trim();

/**
 * Percorre a árvore e emite um bloco por elemento-folha de texto.
 *
 * O texto solto de um elemento que TAMBÉM tem filho de bloco precisa sair
 * separado, na posição em que aparece. Sem isso, um caso como
 * `<p>a citação<cite>quem disse</cite></p>` perderia a citação inteira e
 * guardaria só a atribuição.
 */
function blocos(no, saida = []) {
  if (!no || no.type !== "tag" || MUDAS.has(no.name)) return saida;
  const filhos = no.children || [];
  const cls = (no.attribs && no.attribs.class) || "";
  const ehBloco = (f) => f.type === "tag" && !ehInline(f) && !MUDAS.has(f.name) && limpa(texto(f));

  if (!filhos.some(ehBloco)) {
    const t = limpa(texto(no));
    if (t.length > 1) saida.push([papel(cls, no.name), t]);
    return saida;
  }

  let acumulado = "";
  const despeja = () => {
    const t = limpa(acumulado);
    if (t.length > 1) saida.push([papel(cls, no.name), t]);
    acumulado = "";
  };
  for (const f of filhos) {
    if (ehBloco(f)) {
      despeja();
      blocos(f, saida);
    } else {
      acumulado += texto(f);
    }
  }
  despeja();
  return saida;
}

/* Nome legível de cada seção, na ordem em que a pessoa rola a página. */
const SECOES = [
  [/\bhero\b/, "Hero"],
  [/hero-int/, "Hero"],
  [/jornada/, "A jornada"],
  [/paraquem/, "Para quem é e para quem não é"],
  [/\bfaq\b/, "Perguntas frequentes"],
  [/evidencia/, "O caso real"],
  [/captura|ofertas/, "Escada de ofertas"],
  [/cta-sec/, "Chamada final"],
  [/redes/, "Redes sociais"],
  [/disclaimer/, "Aviso antes dos perfis"],
  [/autonomia/, "Autonomia"],
  [/perfis/, "Os quatro perfis"],
  [/\bblog\b/, "Listagem de textos"],
  [/legal/, "Corpo do documento"],
  [/post-body/, "Corpo do texto"],
  [/footnotes/, "Notas de rodapé"],
  [/faixa-anchor/, "Bloco do Mapa Financeiro"],
  [/faixa/, "Corpo da página"],
];
function nomeSecao(no) {
  const chave = ((no.attribs && (no.attribs.id || "")) + " " + (no.attribs && no.attribs.class || "")).trim();
  for (const [rx, nome] of SECOES) if (rx.test(chave)) return nome;
  return chave || "Seção";
}

/** Divide o <main> nas seções de primeiro nível que a pessoa vê rolando. */
const CORPO_DE_PAGINA = /post-body|legal|blog|perfis|disclaimer/;
function secoes(main) {
  const grupos = [];
  const visita = (no) => {
    for (const f of no.children || []) {
      if (f.type !== "tag") continue;
      const cls = (f.attribs && f.attribs.class) || "";
      const ehSecao =
        f.name === "section" ||
        f.name === "header" ||
        (f.name === "div" && CORPO_DE_PAGINA.test(cls));
      if (ehSecao) {
        grupos.push([nomeSecao(f), unicos(blocos(f))]);
      } else if (f.name === "article" || f.name === "div" || f.name === "main") {
        visita(f);
      } else {
        grupos.push(["Seção", unicos(blocos(f))]);
      }
    }
  };
  visita(main);
  return grupos;
}

function acha(no, teste) {
  if (!no) return null;
  if (no.type === "tag" && teste(no)) return no;
  for (const f of no.children || []) {
    const r = acha(f, teste);
    if (r) return r;
  }
  return null;
}

function unicos(lista) {
  const vistos = new Set();
  return lista.filter(([, t]) => (vistos.has(t) ? false : vistos.add(t)));
}

const linhas = [];
const eco = (s) => linhas.push(s);

eco("# Inventário do texto visível — regnumm.com.br");
eco("");
eco("Gerado de `_site/`, o HTML publicado, na ordem em que o texto aparece na tela.");
eco("Preço, data e link já vêm resolvidos: é o que a pessoa lê, não o template.");
eco("");
eco("Cada linha traz o papel do texto na página, porque o papel restringe a reescrita:");
eco("RÓTULO tem duas ou três palavras em caixa alta, BOTÃO precisa caber num botão,");
eco("TÍTULO DA PÁGINA ocupa a largura da tela e quebra em 22 caracteres por linha.");
eco("");

const primeiro = parseDocument(fs.readFileSync(PAGINAS[0][2], "utf8"));
eco("---");
eco("");
eco("## 00 · Compartilhado (aparece em todas as páginas)");
eco("");
for (const [rotulo, tag] of [["Barra de navegação", "nav"], ["Rodapé", "footer"]]) {
  eco(`### ${rotulo}`);
  eco("");
  const el = acha(primeiro, (n) => n.name === tag);
  for (const [p, t] of unicos(blocos(el))) eco(`- **${p}** · ${t}`);
  eco("");
}

for (const [nome, url, arquivo] of PAGINAS) {
  const html = fs.readFileSync(path.resolve(arquivo), "utf8");
  const doc = parseDocument(html);
  const title = limpa(texto(acha(doc, (n) => n.name === "title")));
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [, ""])[1];
  const main = acha(doc, (n) => n.name === "main");

  eco("---");
  eco("");
  eco(`## ${nome} — \`${url}\``);
  eco("");
  eco("**Aba do navegador e título no Google**");
  eco("");
  eco(`> ${title}`);
  eco("");
  eco("**Descrição no Google**");
  eco("");
  eco(`> ${limpa(desc)}`);
  eco("");
  eco("**Texto da página, na ordem da tela**");
  eco("");
  for (const [secao, itens] of secoes(main)) {
    if (!itens.length) continue;
    eco("");
    eco(`### ${secao}`);
    eco("");
    for (const [p, t] of itens) eco(`- **${p}** · ${t}`);
  }
  eco("");
}

process.stdout.write(linhas.join("\n") + "\n");
