# Como publicar um texto

## O caminho curto

1. Crie um arquivo `.md` dentro de `conteudo/posts/`.
2. Commite e faça push.
3. A Vercel constrói a página do post e atualiza a listagem sozinha.

Nenhum HTML precisa ser editado. O nome do arquivo vira o endereço:
`conteudo/posts/como-decidir-melhor.md` → `regnumm.com.br/blog/como-decidir-melhor`

Escolha o nome do arquivo com cuidado: **ele é a URL, e mudar depois quebra
links que já circularam.**

## O cabeçalho do arquivo

```markdown
---
titulo: "A força que <em>agora limita.</em>"
resumo: "Uma frase ou duas. Aparece na listagem, no Google e no compartilhamento."
categoria: "Comportamento financeiro"
date: 2026-08-12
---

O texto começa aqui.
```

| Campo | Obrigatório | Para que serve |
| --- | --- | --- |
| `titulo` | sim | Título do texto. Aceita `<em>` para deixar um trecho em champagne itálico, como nos títulos do site. |
| `resumo` | sim | Vai para a listagem, para a meta description e para o schema. |
| `date` | sim | Formato `2026-08-12`. Ordena a listagem, do mais recente para o mais antigo. |
| `categoria` | não | Aparece acima do título e no cartão da listagem. |
| `palavrasChave` | não | Lista de termos que entram no schema do artigo. |
| `atualizadoEm` | não | Data de revisão. Vira `dateModified` no schema. |
| `seoTitulo` | não | Sobrescreve o título da aba. O padrão já é `Título | Regnumm`. |
| `seoDescricao` | não | Sobrescreve a meta description. O padrão é o `resumo`. |
| `rascunho` | não | `true` tira o texto do ar sem apagar o arquivo. |

## O que dá para usar no texto

- `**negrito**`, `*itálico*`, `[links](/perfis.html)`
- `##` e `###` para subtítulos em Cormorant, `####` para rótulo em caixa alta
- `>` para citação destacada, com `<cite>` opcional na última linha
- Listas com `-` ou `1.`
- `---` para o divisor champagne
- Notas de rodapé com `[^1]` no texto e `[^1]: a nota` no fim do arquivo
- `<span class="data-stat">R$ 125</span>` para número em IBM Plex Mono

Imagens vão em `conteudo/imagens/` e são referenciadas como
`![descrição](/blog/imagens/arquivo.jpg)`.

## Rodar na sua máquina antes de publicar

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:8080`. Salvar o arquivo recarrega a página sozinho.

Para conferir o build exatamente como a Vercel vai fazer:

```bash
npm run build
```

## Onde ficam as coisas

| Caminho | O que é |
| --- | --- |
| `conteudo/posts/` | Os textos. É a única pasta que você precisa abrir para publicar. |
| `conteudo/imagens/` | Imagens dos textos. |
| `_data/site.json` | Domínio, autor, CNPJ, WhatsApp, chave do PostHog. |
| `_data/blog.json` | Os textos da página de listagem `/blog/`. |
| `_includes/base.njk` | Head, nav e rodapé compartilhados. |
| `_includes/post.njk` | Layout da página de post. |
| `assets/css/site.css` | Folha de estilo compartilhada. |
| `.eleventy.js` | Configuração do build. |
| `_site/` | Saída do build. Não versionada, não editar. |

`index.html` e `perfis.html` continuam sendo os arquivos originais e passam pelo
build sem nenhum processamento — o conteúdo deles sai byte a byte igual ao que
entra.
