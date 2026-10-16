/* Gera as quatro imagens de prévia dos perfis (1200x630), usadas como
   og:image das páginas /perfis/{slug}/ e do link que o /mapa compartilha.

   Ferramenta de uso pontual, no mesmo espírito de gerar-icones.js: as PNG
   ficam versionadas em assets/og/ e o build normal não depende deste script.
   Rodar de novo só se o texto dos perfis (_data/perfis.js), os glifos
   (_includes/glifos.njk) ou o desenho mudarem:

     node scripts/gerar-og-perfis.js

   Precisa do Google Chrome instalado. Caminho diferente do padrão do Windows:
   CHROME="/caminho/do/chrome" node scripts/gerar-og-perfis.js

   O desenho segue a og-image.png do site: fundo azul-marinho, o rótulo
   REGNUMM com traço champanhe e a Cormorant grande. O glifo do perfil ocupa o
   lugar do R apagado. Nenhuma imagem leva nome de pessoa. */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const nunjucks = require("nunjucks");

const RAIZ = path.join(__dirname, "..");
const DEST = path.join(RAIZ, "assets", "og");
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const fonte = (arquivo) => "file:///" + path.join(RAIZ, "assets", "fonts", arquivo).replace(/\\/g, "/");

const perfis = require(path.join(RAIZ, "_data", "perfis.js"));
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(RAIZ, "_includes")));
const glifo = (chave) =>
  env.renderString(`{% from "glifos.njk" import glifo %}{{ glifo(chave) }}`, { chave });

function html(perfil) {
  // Primeira palavra em branco, o resto em champanhe, como "pessoal" na og-image.
  const [primeira, ...resto] = perfil.nome.split(" ");
  const cor = perfil.tom === "warm" ? "#C9B99A" : "#8A9EAE";
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "DM Sans"; src: url("${fonte("dm-sans-latin.woff2")}") format("woff2"); font-weight: 400 800; }
@font-face { font-family: "Cormorant Garamond"; src: url("${fonte("cormorant-garamond-500-latin.woff2")}") format("woff2"); font-weight: 500; }
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #0A1628; }
.quadro { position: relative; width: 1200px; height: 630px; }
.texto { position: absolute; left: 120px; top: 150px; width: 640px; }
.rotulo { display: flex; align-items: center; gap: 18px; font: 600 20px "DM Sans"; letter-spacing: .3em; color: #C9B99A; }
.rotulo::before { content: ""; width: 56px; height: 2px; background: #C9B99A; }
h1 { margin: 52px 0 0; font: 500 104px/1 "Cormorant Garamond"; color: #F4F1EA; letter-spacing: -.01em; }
h1 span { color: #C9B99A; }
.eixo { margin-top: 34px; font: 600 20px "DM Sans"; letter-spacing: .24em; color: #8A9EAE; text-transform: uppercase; }
.glifo { position: absolute; right: 110px; top: 50%; width: 300px; height: 300px; transform: translateY(-50%); color: ${cor}; }
.glifo svg { display: block; width: 100%; height: 100%; overflow: visible; --min-u: 0; }
.rodape { position: absolute; left: 120px; bottom: 64px; font: 500 30px "Cormorant Garamond"; color: #8A9EAE; }
</style></head><body><div class="quadro">
  <div class="texto">
    <div class="rotulo">REGNUMM · MAPA FINANCEIRO</div>
    <h1>${primeira}<br><span>${resto.join(" ")}</span></h1>
    <div class="eixo">${perfil.eixo}</div>
  </div>
  <div class="glifo">${glifo(perfil.chave)}</div>
  <div class="rodape">Um dos quatro perfis financeiros · regnumm.com.br</div>
</div></body></html>`;
}

fs.mkdirSync(DEST, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "og-perfis-"));
for (const perfil of perfis) {
  const entrada = path.join(tmp, `${perfil.slug}.html`);
  const saida = path.join(DEST, `perfil-${perfil.slug}.png`);
  fs.writeFileSync(entrada, html(perfil), "utf8");
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--window-size=1200,630", `--screenshot=${saida}`, "file:///" + entrada.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("gerado:", path.relative(RAIZ, saida));
}
fs.rmSync(tmp, { recursive: true, force: true });
