(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }


  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  new PureCounter();

})()


function toggleCalc() {
  let toggleCheck = document.getElementById("cal-check");
  let calcWrap = document.getElementById("Calc-Wrap-main");
  toggleCheck.classList.toggle("active")
  calcWrap.classList.toggle("active-calc")
}

function CopySym() {
  var copySymbol = document.getElementById("Copy-Sym");
  copySymbol.select();
  copySymbol.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copySymbol.value);
  alert("Symbol Copied!")
}
function CopyWapp() {
  var copyWapp = document.getElementById("Copy-this");
  copyWapp.select();
  copyWapp.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyWapp.value);
  alert("WhatsApp Phone Number Copied!")
}

function copyEquals() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '=';
  CopySym();
}
function copyNoEquals() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '≠';
  CopySym();
}
function copyAprox() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '≈';
  CopySym();
}
function copyPlus() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '+';
  CopySym();
}
function copyMinus() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '-';
  CopySym();
}
function copyMultiply() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '*';
  CopySym();
}
function copyDot() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '⋅';
  CopySym();
}
function copyDivide() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '÷';
  CopySym();
}
function copyPerpen() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '⊥';
  CopySym();
}
function copyCaret() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '^';
  CopySym();
}
function copyRoot() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '√';
  CopySym();
}
function copy3Root() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∛';
  CopySym();
}
function copy4Root() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∜';
  CopySym();
}
function copySigma() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∑';
  CopySym();
}
function copyPercent() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '%';
  CopySym();
}
function copyPermille() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '‰';
  CopySym();
}
function copyNoEx() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∄';
  CopySym();
}
function copyEx() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∃';
  CopySym();
}
function Angle() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∠';
  CopySym();
}
function copyRight() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '∟';
  CopySym();
}
function copyDeg() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '°';
  CopySym();
}

function copyWapp() {
  var copySym = document.getElementById("Copy-Sym")
  copySym.value = '7719421910';
  CopySym();
}