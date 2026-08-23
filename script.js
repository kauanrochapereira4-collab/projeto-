// =====================================================
// 🏠 BARRA DE NAVEGAÇÃO — Abre/fecha menu
// =====================================================
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const primaryNav = document.querySelector('.primary-nav');
const siteHeader = document.querySelector('.site-header');

if (navToggle && primaryNav) {
  navToggle.onclick = function () {
    primaryNav.classList.add('open');
  };
}
if (navClose && primaryNav && navToggle) {
  navClose.onclick = function () {
    primaryNav.classList.remove('open');
    fecharTodos();
  };
}

// 🖱️ COMPUTADOR: passa o mouse → abre submenu
document.addEventListener('mouseover', function (e) {
  if (window.innerWidth > 980) {
    var item = e.target.closest('.has-dropdown');
    if (item) {
      fecharTodos();
      item.classList.add('open');
    }
  }
});
document.addEventListener('mouseout', function (e) {
  if (window.innerWidth > 980) {
    var item = e.target.closest('.has-dropdown');
    if (item) {
      item.classList.remove('open');
    }
  }
});

// 📱 CELULAR: clica → abre submenu
document.addEventListener('click', function (e) {
  if (window.innerWidth <= 980) {
    var trigger = e.target.closest('.dropdown-trigger');
    if (trigger) {
      e.preventDefault();
      var item = trigger.closest('.has-dropdown');
      if (!item) return;
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        fecharTodos();
        item.classList.add('open');
      }
    }
  }
});

// =====================================================
// ✨ BARRA DE NAVEGAÇÃO — muda estilo ao descer
// =====================================================
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    siteHeader.classList.add('rolando');
  } else {
    siteHeader.classList.remove('rolando');
  }
});

// =====================================================
// ⚡ ELEMENTOS APARECENDO — MUITO MAIS RÁPIDO
// =====================================================
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('apareceu');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('section, .card, .priest-card, .founder-card, .grid').forEach(el => {
  el.classList.add('escondido-antes');
  observador.observe(el);
});

// =====================================================
// 📅 Ano no rodapé
// =====================================================
var ano = new Date().getFullYear();
var anoEl = document.querySelector('.js-year');
if (anoEl) anoEl.textContent = ano;

function fecharTodos() {
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.classList.remove('open');
  });
}