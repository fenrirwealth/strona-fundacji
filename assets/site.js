const header=document.querySelector('header');
const progress=document.querySelector('.progress span');
const menu=document.querySelector('.menu');
const nav=header?.querySelector('nav')||null;
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
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))close()});

  nav.querySelectorAll('a[href="/#mikolaj"]').forEach(a=>a.href='/listy-do-swietego-mikolaja');
  nav.querySelectorAll('a[href="/#o-nas"]').forEach(a=>{a.href='/o-fundacji';a.textContent='O Fundacji'});
  nav.querySelectorAll('a[href="/#kontakt"]').forEach(a=>a.href='/kontakt');

  const path=location.pathname.replace(/\/$/,'')||'/';
  nav.querySelectorAll('a').forEach(a=>{
    const url=new URL(a.href,location.origin);
    const target=url.pathname.replace(/\/$/,'')||'/';
    if(url.origin===location.origin&&target===path&&!url.hash&&!a.classList.contains('navcta')) a.setAttribute('aria-current','page');
  });
}
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab,focus=false){
  tabs.forEach(item=>{
    const selected=item===tab;
    item.setAttribute('aria-selected',String(selected));
    item.tabIndex=selected?0:-1;
    const panel=document.getElementById(item.getAttribute('aria-controls'));
    if(panel) panel.hidden=!selected;
  });
  if(focus) tab.focus();
}
tabs.forEach((tab,index)=>{
  tab.tabIndex=tab.getAttribute('aria-selected')==='true'?0:-1;
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',event=>{
    let next=index;
    if(event.key==='ArrowRight') next=(index+1)%tabs.length;
    else if(event.key==='ArrowLeft') next=(index-1+tabs.length)%tabs.length;
    else if(event.key==='Home') next=0;
    else if(event.key==='End') next=tabs.length-1;
    else return;
    event.preventDefault();selectTab(tabs[next],true);
  });
});
const campaign=document.querySelector('#mikolaj .featurebox > div:first-child');
if(campaign&&!campaign.querySelector('a[href="/listy-do-swietego-mikolaja"]')){
  const link=document.createElement('a');
  link.className='post-link';link.href='/listy-do-swietego-mikolaja';link.textContent='Jak działa akcja →';
  campaign.append(link);
}
const stats=document.querySelector('#o-nas .statsgrid');
if(stats&&!document.querySelector('#o-nas-link')){
  const holder=document.createElement('div');
  holder.id='o-nas-link';holder.className='wrap';
  const link=document.createElement('a');
  link.className='post-link';link.href='/o-fundacji';link.textContent='Poznaj Fundację i dane rejestrowe →';
  holder.append(link);stats.parentElement?.after(holder);
}
const footerLinks=document.querySelector('footer .footerlinks');
if(footerLinks){
  const wanted=[['/o-fundacji','O Fundacji'],['/kontakt','Kontakt'],['/polityka-prywatnosci','Prywatność']];
  wanted.forEach(([href,label])=>{
    if(!footerLinks.querySelector(`a[href="${href}"]`)){
      const a=document.createElement('a');a.href=href;a.textContent=label;footerLinks.append(a);
    }
  });
}
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

document.querySelectorAll('[data-copy-account]').forEach(button=>button.addEventListener('click',async()=>{
  const account=button.dataset.copyAccount||'';
  const feedback=button.parentElement?.querySelector('.copy-feedback');
  try{
    await navigator.clipboard.writeText(account);
  }catch{
    const input=document.createElement('textarea');
    input.value=account;input.style.position='fixed';input.style.opacity='0';
    document.body.append(input);input.select();document.execCommand('copy');input.remove();
  }
  const original=button.textContent;
  button.textContent='Skopiowano numer konta ✓';
  if(feedback) feedback.textContent='Numer rachunku został skopiowany.';
  setTimeout(()=>{button.textContent=original;if(feedback) feedback.textContent=''},2200);
}));
