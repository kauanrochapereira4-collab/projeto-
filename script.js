// =====================================================
// 🏠 BARRA DE NAVEGAÇÃO — Abre/fecha menu
// =====================================================
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const primaryNav = document.querySelector('.primary-nav');
const siteHeader = document.querySelector('.site-header');

// ABRIR menu
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    primaryNav.classList.add('open');
  });
}

// FECHAR menu
if (navClose && primaryNav) {
  navClose.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    fecharTodos();
  });
}


// 🖱️ COMPUTADOR: passa o mouse → abre submenu
document.addEventListener('mouseover', (e) => {
  if (window.innerWidth > 980) {
    const item = e.target.closest('.has-dropdown');
    if (item) {
      fecharTodos();
      item.classList.add('open');
    }
  }
});

document.addEventListener('mouseout', (e) => {
  if (window.innerWidth > 980) {
    const item = e.target.closest('.has-dropdown');
    if (item) item.classList.remove('open');
  }
});


// 📱 CELULAR: clica → abre submenu
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 980) {
    const trigger = e.target.closest('.dropdown-trigger');
    if (trigger) {
      e.preventDefault();
      const item = trigger.closest('.has-dropdown');
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
window.addEventListener('scroll', () => {
  if (siteHeader) {
    window.scrollY > 60 
      ? siteHeader.classList.add('rolando')
      : siteHeader.classList.remove('rolando');
  }
});


// =====================================================
// ⚡ ELEMENTOS APARECENDO
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
const anoEl = document.querySelector('.js-year');
if (anoEl) anoEl.textContent = new Date().getFullYear();


// =====================================================
// 🔧 FUNÇÃO UTILITÁRIA
// =====================================================
function fecharTodos() {
  document.querySelectorAll('.has-dropdown').forEach(item => {
    item.classList.remove('open');
  });
}
