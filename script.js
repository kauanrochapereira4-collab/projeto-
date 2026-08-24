// =====================================================
// 🏠 MENU — Abre/fecha apenas com CLIQUE no celular
// =====================================================
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const primaryNav = document.querySelector('.primary-nav');
const siteHeader = document.querySelector('.site-header');

// ABRIR menu lateral
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    primaryNav.classList.add('open');
  });
}

// FECHAR menu lateral
if (navClose && primaryNav) {
  navClose.addEventListener('click', function (e) {
    e.preventDefault();
    primaryNav.classList.remove('open');
    fecharTodosSubmenus();
  });
}

// ✅ CELULAR: submenu SÓ abre ao CLICAR
document.addEventListener('click', function (e) {
  const trigger = e.target.closest('.dropdown-trigger');
  if (trigger) {
    e.preventDefault();
    e.stopPropagation();
    const itemPai = trigger.closest('.has-dropdown');
    if (!itemPai) return;

    const estaAberto = itemPai.classList.contains('open');
    fecharTodosSubmenus(); // fecha os outros

    if (!estaAberto) {
      itemPai.classList.add('open');
    }
  }

  // Clicar fora do submenu → fecha
  if (!e.target.closest('.primary-nav')) {
    fecharTodosSubmenus();
  }
});

// ✅ COMPUTADOR: abre ao passar o mouse
document.addEventListener('mouseover', function (e) {
  if (window.innerWidth > 980) {
    const item = e.target.closest('.has-dropdown');
    if (item) {
      fecharTodosSubmenus();
      item.classList.add('open');
    }
  }
});

document.addEventListener('mouseout', function (e) {
  if (window.innerWidth > 980) {
    const item = e.target.closest('.has-dropdown');
    if (item && !item.contains(e.relatedTarget)) {
      item.classList.remove('open');
    }
  }
});

// =====================================================
// ✨ Efeito na barra ao rolar a página
// =====================================================
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) {
    siteHeader.classList.add('rolando');
  } else {
    siteHeader.classList.remove('rolando');
  }
});

// =====================================================
// ⚡ Elementos aparecendo ao rolar
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
// 📅 Ano automático no rodapé
// =====================================================
const anoEl = document.querySelector('.js-year');
if (anoEl) anoEl.textContent = new Date().getFullYear();

// =====================================================
// 🛠️ Função auxiliar
// =====================================================
function fecharTodosSubmenus() {
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.classList.remove('open');
  });
}
