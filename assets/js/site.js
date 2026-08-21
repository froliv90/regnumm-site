/* Comportamentos compartilhados do site.
   Extraído dos <script> que ficavam no fim de index.html e perfis.html.
   Nenhum comportamento foi alterado. */

(function () {
  'use strict';

  // ── Nav muda de fundo ao rolar ──
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── Reveal na entrada em viewport ──
  var alvos = document.querySelectorAll('.r');
  if (alvos.length) {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('v'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      alvos.forEach(function (el) { obs.observe(el); });
    } else {
      // navegador sem suporte: mostra tudo em vez de esconder
      alvos.forEach(function (el) { el.classList.add('v'); });
    }
  }

  // ── Menu do celular ──
  var botaoMenu = document.getElementById('nav-toggle');
  if (nav && botaoMenu) {
    var fecharMenu = function () {
      nav.classList.remove('menu-aberto');
      document.body.classList.remove('menu-travado');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir o menu');
    };

    botaoMenu.addEventListener('click', function () {
      var abrindo = !nav.classList.contains('menu-aberto');
      nav.classList.toggle('menu-aberto', abrindo);
      document.body.classList.toggle('menu-travado', abrindo);
      botaoMenu.setAttribute('aria-expanded', String(abrindo));
      botaoMenu.setAttribute('aria-label', abrindo ? 'Fechar o menu' : 'Abrir o menu');
    });

    // Clicar num link fecha o painel: sem isto, navegar por âncora na mesma
    // página deixa o menu aberto por cima do conteúdo.
    document.querySelectorAll('#nav-links a').forEach(function (a) {
      a.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });

    // Voltar para o desktop com o painel aberto deixaria a trava de rolagem presa.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) fecharMenu();
    }, { passive: true });
  }

  // ── FAQ ──
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var aberto = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!aberto) item.classList.add('open');
    });
  });

  // ── Cliques em redes sociais, em qualquer bloco do site ──
  document.querySelectorAll('a[aria-label="Instagram"], a[aria-label="LinkedIn"], a[aria-label="TikTok"]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (!window.posthog) return;
      var local = el.closest('.hero-social') ? 'hero'
        : el.closest('.mapa-social') ? 'mapa_card'
        : el.closest('#redes') ? 'redes_bar'
        : 'rodape';
      posthog.capture('social_click', { network: el.getAttribute('aria-label'), location: local });
    });
  });

  // Botões da página de perfis — evento e propriedades preservados como eram.
  document.querySelectorAll('.perfis a.pf-btn, .perfis ~ .cta-sec a.cta-btn').forEach(function (el) {
    el.addEventListener('click', function () {
      if (!window.posthog) return;
      var drawer = el.closest('.drawer');
      var perfil = drawer
        ? drawer.querySelector('.drawer-trigger-title').textContent.trim()
        : 'cta_final';
      posthog.capture('mapa_cta_click', { location: 'perfis_page', perfil: perfil });
    });
  });
})();

// ── Drawers ──
// Global porque o markup usa onclick="toggleDrawer(this)", como já era.
function toggleDrawer(btn) {
  var drawer = btn.parentElement;
  var abrindo = !drawer.classList.contains('open');
  drawer.classList.toggle('open', abrindo);
  if (!abrindo || !window.posthog) return;

  var titulo = drawer.querySelector('.drawer-trigger-title');
  if (!titulo) return;
  var nome = titulo.textContent.trim();

  // A página de perfis já emitia 'perfil_aberto' antes desta refatoração.
  // O nome do evento é preservado para não quebrar o histórico do PostHog.
  if (drawer.closest('.perfis')) posthog.capture('perfil_aberto', { perfil: nome });
  else posthog.capture('drawer_aberto', { titulo: nome });
}

// ── Captura → WhatsApp ──
function enviarCaptura() {
  var nome = (document.getElementById('cap-nome') || {}).value || '';
  var area = (document.getElementById('cap-area') || {}).value || '';
  var momento = (document.getElementById('cap-momento') || {}).value || '';
  nome = nome.trim(); area = area.trim();

  if (window.posthog) {
    posthog.capture('lead_whatsapp', { tem_nome: !!nome, area: area || null, momento: momento || null });
  }

  var msg = 'Olá, Felipe! Gostaria de agendar o Mapa Financeiro.';
  if (nome) msg += '\n\nMeu nome é ' + nome + '.';
  if (area) msg += '\nÁrea de atuação: ' + area + '.';
  if (momento) msg += '\nMomento atual: ' + momento + '.';

  window.open('https://wa.me/5519982578517?text=' + encodeURIComponent(msg), '_blank');
}
