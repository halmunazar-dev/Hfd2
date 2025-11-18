// Basic interactive JS: typing effect, smooth scrolling, mobile nav toggle, simple form handling

document.addEventListener('DOMContentLoaded', function(){
  // Typing effect
  const phrases = [
    "Mahasiswa Sistem Informasi",
    "Pengembang Web • UI/UX Enthusiast",
    "Solusi Responsif & Modern"
  ];
  const typingEl = document.getElementById('typing');
  let pi = 0, ci = 0, forward = true;
  function tick(){
    const current = phrases[pi];
    if(forward){
      ci++;
      typingEl.textContent = current.slice(0,ci);
      if(ci === current.length){ forward = false; setTimeout(tick, 1200); return; }
    } else {
      ci--;
      typingEl.textContent = current.slice(0,ci);
      if(ci === 0){ forward = true; pi = (pi+1) % phrases.length; }
    }
    setTimeout(tick, forward ? 80 : 40);
  }
  tick();

  // Smooth scrolling
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile nav if open
      closeMobileNav();
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    siteNav.style.display = expanded ? '' : 'block';
  });

  function closeMobileNav(){
    if(window.innerWidth <= 640){
      siteNav.style.display = '';
      navToggle.setAttribute('aria-expanded','false');
    }
  }

  // Form handling (client-side only)
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      formMsg.textContent = 'Mohon lengkapi semua kolom terlebih dahulu.';
      formMsg.style.color = '#f2b0b0';
      return;
    }
    // Simulasi pengiriman
    formMsg.textContent = 'Mengirim...';
    formMsg.style.color = '#cfcfcf';
    setTimeout(()=>{
      formMsg.textContent = 'Pesan terkirim! Saya akan segera menghubungi Anda.';
      formMsg.style.color = '#bff2c7';
      form.reset();
    }, 900);
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});