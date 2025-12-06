/**
* Template Name: iPortfolio - v3.6.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
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

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
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

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
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

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
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

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
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

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
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

  /**
   * Testimonials slider
   */
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

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  const themeClasses = ['theme-classic','theme-modern','theme-minimal','theme-vintage','theme-futuristic']
  const getSavedTheme = () => localStorage.getItem('theme') || 'theme-classic'
  const applyTheme = (cls) => {
    const html = document.documentElement
    const body = document.body
    themeClasses.forEach(c => html.classList.remove(c))
    themeClasses.forEach(c => body.classList.remove(c))
    html.classList.add(cls)
    body.classList.add(cls)
  }
  const setAnimating = (ms) => {
    const html = document.documentElement
    const body = document.body
    html.classList.add('theme-animating')
    body.classList.add('theme-animating')
    setTimeout(() => { html.classList.remove('theme-animating'); body.classList.remove('theme-animating') }, ms)
  }
  const selectEl = select('#styleSwitcher')
  const initTheme = () => {
    const current = getSavedTheme()
    applyTheme(current)
    if (selectEl) selectEl.value = current
    if (current === 'theme-futuristic') startParticles()
  }
  window.addEventListener('load', initTheme)
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      const val = e.target.value
      localStorage.setItem('theme', val)
      applyTheme(val)
      setAnimating(200)
      if (val === 'theme-futuristic') startParticles(); else stopParticles()
    })
  }

  const pageTurn = () => {
    const main = select('#main')
    if (!main) return
    const html = document.documentElement
    if (html.classList.contains('theme-vintage')) {
      main.classList.add('page-turning')
      setTimeout(() => { main.classList.remove('page-turning') }, 500)
    }
  }
  on('click', '.scrollto', function(e) { pageTurn() }, true)

  let particleCanvas
  let ctx
  let rafId
  let particles = []
  let mouseMoveHandler
  let resizeHandler
  let lastMoveTS = 0
  const startParticles = () => {
    if (particleCanvas) return
    particleCanvas = document.createElement('canvas')
    particleCanvas.id = 'particleCanvas'
    document.body.appendChild(particleCanvas)
    ctx = particleCanvas.getContext('2d')
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      particleCanvas.width = Math.floor(window.innerWidth * dpr)
      particleCanvas.height = Math.floor(window.innerHeight * dpr)
      particleCanvas.style.width = '100vw'
      particleCanvas.style.height = '100vh'
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    resize()
    resizeHandler = resize
    window.addEventListener('resize', resizeHandler)
    const getZones = () => {
      const z = []
      const s = document.getElementById('styleSwitcher')
      if (s) {
        const r = s.getBoundingClientRect()
        z.push({x:r.left,y:r.top,w:r.width,h:r.height})
      }
      // 排除右側邊欄區域，避免滑鼠軌跡殘留
      const header = document.getElementById('header')
      if (header) {
        const r = header.getBoundingClientRect()
        z.push({x:r.left,y:r.top,w:r.width,h:r.height})
      }
      return z
    }
    const inZone = (x,y) => {
      const zs = getZones()
      for (let i=0;i<zs.length;i++) {
        const r = zs[i]
        if (x>=r.x && x<=r.x+r.w && y>=r.y && y<=r.y+r.h) return true
      }
      return false
    }
    const addParticle = (x,y) => {
      particles.push({x,y,vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6,life:1,size:2+Math.random()*2,color:Math.random()<0.5?'#00f5ff':'#ff00e4'})
      if (particles.length>160) particles.shift()
    }
    mouseMoveHandler = (e) => {
      lastMoveTS = performance.now()
      const x = e.clientX
      const y = e.clientY
      if (inZone(x,y)) return
      addParticle(x,y)
    }
    window.addEventListener('mousemove', mouseMoveHandler)
    const step = () => {
      ctx.clearRect(0,0,particleCanvas.width,particleCanvas.height)
      const zs = getZones()
      for (let i=0;i<particles.length;i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        const idle = (performance.now() - lastMoveTS) > 250
        p.life -= idle ? 0.05 : 0.01
        // 檢查粒子是否進入排除區域，如果是則立即移除
        if (inZone(p.x, p.y)) {
          particles.splice(i,1)
          i--
          continue
        }
        if (p.life<=0) { particles.splice(i,1); i--; continue }
        ctx.globalAlpha = Math.max(p.life,0)
        ctx.beginPath()
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fill()
      }
      // 清除排除區域內的任何殘留視覺效果
      for (let i=0;i<zs.length;i++) {
        const r = zs[i]
        ctx.clearRect(r.x,r.y,r.w,r.h)
      }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
  }
  const stopParticles = () => {
    if (!particleCanvas) return
    cancelAnimationFrame(rafId)
    rafId = null
    particles = []
    particleCanvas.remove()
    particleCanvas = null
    ctx = null
    if (mouseMoveHandler) {
      window.removeEventListener('mousemove', mouseMoveHandler)
      mouseMoveHandler = null
    }
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
      resizeHandler = null
    }
  }

})()