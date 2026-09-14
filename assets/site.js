const header=document.querySelector('header');
const progress=document.querySelector('.progress span');
const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
function updateChrome(){
  const y=window.scrollY||document.documentElement.scrollTop;
  if(header) header.classList.toggle('scrolled',y>8);
  if(progress){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=max?`${Math.min(100,y/max*100)}%`:'0%';
  }
}
updateChrome();
addEventListener('scroll',updateChrome,{passive:true});
if(menu&&nav){
  const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Otwórz menu')};
  menu.addEventListener('click',()=>{
    const open=!nav.classList.contains('open');
    nav.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}
document.querySelectorAll('[role="tab"]').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('[role="tab"]').forEach(item=>{
    const selected=item===tab;
    item.setAttribute('aria-selected',String(selected));
    const panel=document.getElementById(item.getAttribute('aria-controls'));
    if(panel) panel.hidden=!selected;
  });
}));
const dialog=document.querySelector('#lightbox');
if(dialog){
  const img=dialog.querySelector('img'),caption=dialog.querySelector('.lightcaption');
  document.querySelectorAll('.gallery button').forEach(btn=>btn.addEventListener('click',()=>{
    img.src=btn.dataset.image;img.alt=btn.dataset.caption||'';caption.textContent=btn.dataset.caption||'';dialog.showModal();
  }));
  dialog.querySelector('.close')?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
