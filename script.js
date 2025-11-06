const mods = [
features:['Self-heal','Thermal regulation','Custom textures']
},
{
id:'pulse',
title:'PulseCore™',
desc:'Bio-engineered cardiac support improving endurance and efficient oxygen usage for athletes and heavy workers.',
features:['Improved endurance','Reduced fatigue','Biocompatible']
}
];


// Inject product cards
const modsList = document.getElementById('modsList');
mods.forEach(m=>{
const card = document.createElement('div');card.className='card';
card.innerHTML = `<div><h4>${m.title}</h4><p>${m.desc}</p><div class="features">${m.features.slice(0,2).join(' · ')}${m.features.length>2?' · ...':''}</div></div><div class="card-actions"><button data-id="${m.id}" class="btn view">View</button><button data-id="${m.id}" class="ghost">Learn More</button></div>`;
modsList.appendChild(card);
});


// Modal handlers
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalFeatures = document.getElementById('modalFeatures');


modsList.addEventListener('click', e=>{
const btn = e.target.closest('button'); if(!btn) return;
const id = btn.dataset.id; const mod = mods.find(x=>x.id===id);
if(mod){
modalTitle.textContent = mod.title;
modalDesc.textContent = mod.desc;
modalFeatures.innerHTML = mod.features.map(f=>`<li>${f}</li>`).join('');
openModal();
}
});


function openModal(){modal.setAttribute('aria-hidden','false');}
function closeModal(){modal.setAttribute('aria-hidden','true');}


document.getElementById('closeModal').addEventListener('click',closeModal);
document.getElementById('modalClose').addEventListener('click',closeModal);


// Mobile menu
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click',()=>{
const nav = document.getElementById('nav');
const shown = getComputedStyle(nav).display !== 'none';
nav.style.display = shown ? 'none' : 'flex';
});


// Demo preview -> simple interaction that pulses avatar
const demo = document.getElementById('demoPreview');
demo.addEventListener('click',()=>{
const avatar = document.getElementById('avatar');
avatar.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:900,iterations:1});
});


// Contact form simple handler
const form = document.getElementById('contactForm');
form.addEventListener('submit', e=>{
e.preventDefault();
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
if(!name || !email){alert('Please enter name and email');return}
// show simple confirmation (replace with server call in real site)
alert('Thanks '+name+" — your consult request has been received. We'll contact you at "+email);
form.reset();
});


// reset
document.getElementById('resetForm').addEventListener('click',()=>form.reset());


// small accessibility: close modal on escape
document.addEventListener('keydown', e=>{if(e.key==='Escape') closeModal();});


// Book consult buttons (scroll to contact)
document.getElementById('bookBtn').addEventListener('click',()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'}));
document.getElementById('modalBook').addEventListener('click',()=>{closeModal();document.getElementById('contact').scrollIntoView({behavior:'smooth'})});