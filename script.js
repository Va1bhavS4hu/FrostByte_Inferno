// scripts.js
// Simple interactive behavior: nav toggle, modal, form handling, basic accessibility

document.addEventListener('DOMContentLoaded', ()=> {
  // header nav toggle for small screens
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(nav.style.display === 'flex') { nav.style.display = ''; }
      else { nav.style.display = 'flex'; nav.style.flexDirection = 'column'; nav.style.gap = '10px'; }
    });
  }

  // modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseButtons = Array.from(document.querySelectorAll('.modal-close'));
  const serviceButtons = Array.from(document.querySelectorAll('[data-service]'));
  const bookDemoBtn = document.getElementById('book-demo');
  const yearSpan = document.getElementById('year');
  yearSpan.textContent = new Date().getFullYear();

  function openModal(title, body){
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  modalCloseButtons.forEach(b => b.addEventListener('click', closeModal));
  modal.addEventListener('click', (e)=> { if(e.target===modal) closeModal(); });

  serviceButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const name = btn.dataset.service;
      const details = {
        'NightVision':'NightVision extends perception into near-infrared bands using a bio-safe photoreceptor interface. Adaptive brightness, clinician-tuned.',
        'NeuralBoost':'NeuralBoost is a low-latency cognitive augmentation layer that helps recall and learning — opt-in cloud sync, strict privacy.',
        'DermalArmor':'DermalArmor uses a subdermal lattice to reduce impact & UV transfer. Flexible, custom-fitted, with periodic maintenance.',
        'SensorySuite':'SensorySuite combines thermal, ultrasonic and proximity sensing with adjustable filters and alerts.'
      }[name] || 'Detailed info coming soon.';
      openModal(name, details);
    });
  });

  if(bookDemoBtn){
    bookDemoBtn.addEventListener('click', ()=> {
      openModal('Book a Demo', 'Thanks — to book a demo, send a request through the contact form or email hello@biomods.example (demo slots limited).');
    });
  }

  // contact form handling (front-end only)
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const clearBtn = document.getElementById('clear-form');
  if(clearBtn) clearBtn.addEventListener('click', ()=> form.reset());

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const message = formData.get('message')?.toString().trim();
      if(!name || !email || !message){
        formMsg.textContent = 'Please complete all fields.';
        formMsg.style.color = '#ffbaba';
        return;
      }
      // Simulated success (no backend)
      formMsg.textContent = `Request received. We'll contact ${name} at ${email} within 48 hours.`;
      formMsg.style.color = '#b8ffda';
      form.reset();
    });
  }

  // plan buttons show modal
  Array.from(document.querySelectorAll('[data-plan]')).forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const plan = btn.dataset.plan;
      openModal(plan + ' plan', `You selected the ${plan} plan. Our team will follow up to finalize details and schedule a consultation.`);
    });
  });

  // small accessibility: ESC closes modal
  document.addEventListener('keydown', (e)=> {
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
});
