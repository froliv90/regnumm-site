---
titulo: "Como publicar um texto <em>no Regnumm.</em>"
resumo: "Post de demonstração do sistema de publicação. Serve para conferir o layout e para consultar a estrutura do arquivo. Apague este arquivo antes do primeiro deploy."
categoria: "Nota técnica"
date: 2026-08-11
palavrasChave: ["publicação", "blog"]
---

> **Este é um post de demonstração, não um texto do Regnumm.**
> Ele existe para você conferir o layout e a formatação disponível.
> Apague `conteudo/posts/exemplo-como-publicar.md` antes do primeiro deploy,
> ou acrescente `rascunho: true` ao cabeçalho dele.

Para publicar um texto novo, crie um arquivo `.md` dentro de `conteudo/posts/`. O nome do arquivo vira o endereço: `como-decidir-melhor.md` publica em `/blog/como-decidir-melhor`. Depois é só commitar — a Vercel constrói a página do post e atualiza a listagem sozinha.

Nenhum HTML precisa ser editado a mão.

## O cabeçalho do arquivo

Todo texto começa com um bloco entre três traços. Só quatro campos são obrigatórios:

| Campo | Obrigatório | Para que serve |
| --- | --- | --- |
| `titulo` | sim | Título do texto. Aceita `<em>` para deixar um trecho em champagne itálico. |
| `resumo` | sim | Vai para a listagem, para o Google e para o compartilhamento em redes. |
| `date` | sim | No formato `2026-08-11`. Ordena a listagem. |
| `categoria` | não | Aparece acima do título e no cartão da listagem. |
| `palavrasChave` | não | Lista de termos que entram no schema do artigo. |
| `atualizadoEm` | não | Data de revisão, se o texto for alterado depois de publicado. |
| `rascunho` | não | `true` tira o texto do ar sem apagar o arquivo. |

## O que dá para usar no texto

Parágrafos comuns saem em DM Sans, exatamente como a prosa do resto do site. **Negrito** funciona, *itálico* também, e [links](/perfis.html) ganham o sublinhado champagne.

### Subtítulos

Dois níveis de subtítulo saem em Cormorant Garamond: `##` para as divisões principais e `###` para as internas.

#### Rótulo curto

O quarto nível vira um rótulo em caixa alta, útil para etiquetar um trecho curto.

Listas funcionam com marcador champagne:

- Primeiro ponto
- Segundo ponto
- Terceiro ponto

E citações destacadas usam o mesmo tratamento do callout que já existe na home:

> A maioria trata o sintoma como se fosse o diagnóstico. Gasto alto não é o problema, é a evidência dele.
> <cite>Felipe Rodrigues Oliveira, fundador do Regnumm</cite>

---

## Notas de rodapé

Uma referência se marca assim[^1] no meio da frase, e o texto da nota vai para o fim do arquivo. A numeração e os links de ida e volta são gerados automaticamente.[^2]

Números aparecem em IBM Plex Mono quando marcados como dado: <span class="data-stat">R$ 125</span>, <span class="data-stat">90 min</span>.

[^1]: A nota pode conter [links](https://regnumm.com.br) e formatação normal.
[^2]: Este é o mesmo mecanismo que a página de fundamentação vai usar.
