/*
 * Qual commit gerou o site que está no ar.
 *
 * A Vercel injeta VERCEL_GIT_COMMIT_SHA em todo build feito a partir do Git.
 * Publicar esse valor é o que permite a alguém de fora perguntar "o que está
 * publicado agora?" sem precisar de token nem de acesso ao painel.
 *
 * Fora da Vercel o valor é "local": o build da máquina não representa nada
 * publicado, e marcar isso evita confundir um preview local com produção.
 */
module.exports = () => ({
  commit: process.env.VERCEL_GIT_COMMIT_SHA || "local",
  ref: process.env.VERCEL_GIT_COMMIT_REF || "local",
  publicadoEm: new Date().toISOString(),
});
