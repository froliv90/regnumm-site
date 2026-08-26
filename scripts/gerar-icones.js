/* Gera os ícones do site a partir do contorno vetorial real da
   Cormorant Garamond — a mesma fonte do R fantasma do hero.

   É uma ferramenta de uso pontual: os arquivos que ela produz estão
   versionados em assets/icones/, então o build normal NÃO depende dela e as
   dependências abaixo não entram no package.json do site.

   Para rodar de novo (só é preciso se o desenho mudar):

     npm install --no-save opentype.js sharp
     curl -L -o CormorantGaramond.ttf "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf"
     node scripts/gerar-icones.js CormorantGaramond.ttf

   Por que não usar <text> no SVG, como era antes: texto depende da fonte
   instalada na máquina de quem visita. Como a Cormorant não está instalada
   em lugar nenhum, o navegador caía em Georgia — desenho diferente em cada
   sistema. Contorno vetorial renderiza igual em todos.
*/

const opentype = require("opentype.js");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ttf = process.argv[2];
if (!ttf) {
  console.error("uso: node scripts/gerar-icones.js <caminho-do-CormorantGaramond.ttf>");
  process.exit(1);
}

const DEST = path.join(__dirname, "..", "assets", "icones");
fs.mkdirSync(DEST, { recursive: true });

const ANCHOR = "#0A1628";
const ACCENT = "#C9B99A";
const QUADRO = 100;
const OCUPACAO = 0.62;   // altura do R como fração do quadro
const SUBIDA = 0.01;     // compensação óptica: sem isto o R parece caído
const TRABALHO = 1000;

const fonte = opentype.parse(fs.readFileSync(ttf).buffer);
const glifo = fonte.charToGlyph("R");

// O eixo wght desta fonte variável tem default 300 — o mesmo peso do
// .hero-bg-letter. opentype.js lê a instância padrão, então é o que sai aqui.
const eixo = fonte.tables.fvar && fonte.tables.fvar.axes.find((a) => a.tag === "wght");
console.log("peso lido:", eixo ? eixo.defaultValue : "estático");

const bbBruta = glifo.getPath(0, 0, TRABALHO).getBoundingBox();
const escala = (QUADRO * OCUPACAO) / (bbBruta.y2 - bbBruta.y1);
const bb = glifo.getPath(0, 0, TRABALHO * escala).getBoundingBox();
const dx = (QUADRO - (bb.x2 - bb.x1)) / 2 - bb.x1;
const dy = (QUADRO - (bb.y2 - bb.y1)) / 2 - bb.y1 - QUADRO * SUBIDA;
const d = glifo.getPath(dx, dy, TRABALHO * escala).toPathData(3);

/* O stroke engrossa opticamente a letra sem trocar de fonte. A Cormorant 300
   tem hastes finíssimas que somem abaixo de 32px; 0.6 é imperceptível no
   tamanho grande e 1.0 salva o ícone da aba do navegador. */
const svg = (stroke, moldura) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Regnumm">
  <rect width="100" height="100" fill="${ANCHOR}"/>${moldura ? `
  <rect x="6" y="6" width="88" height="88" fill="none" stroke="${ACCENT}" stroke-opacity=".35" stroke-width="1"/>` : ""}
  <path d="${d}" fill="${ACCENT}" stroke="${ACCENT}" stroke-width="${stroke}" stroke-linejoin="round"/>
</svg>
`;

const svgPrincipal = svg(0.6, false);
fs.writeFileSync(path.join(DEST, "favicon.svg"), svgPrincipal, "utf8");

const saidas = [
  [svg(1.0, false), 32, "favicon-32.png"],   // aba do navegador: precisa do peso extra
  [svgPrincipal, 192, "icon-192.png"],
  [svgPrincipal, 512, "icon-512.png"],
  [svg(0.6, true), 180, "apple-touch-icon.png"]
];

(async () => {
  console.log("favicon.svg".padEnd(24), svgPrincipal.length, "bytes");
  for (const [fonteSvg, tamanho, nome] of saidas) {
    const destino = path.join(DEST, nome);
    await sharp(Buffer.from(fonteSvg), { density: 2400 })
      .resize(tamanho, tamanho)
      .png({ compressionLevel: 9, palette: true })
      .toFile(destino);
    console.log(nome.padEnd(24), fs.statSync(destino).size, "bytes");
  }
})();
