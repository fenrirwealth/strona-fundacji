function navigateImmediately(href,replace=false){
  const destination=new URL(href,location.href);
  if(replace) location.replace(destination.href); else location.assign(destination.href);
}

if('scrollRestoration' in history) history.scrollRestoration='manual';
if(!location.hash){
  scrollTo({top:0,left:0,behavior:'auto'});
  addEventListener('pageshow',()=>scrollTo({top:0,left:0,behavior:'auto'}),{once:true});
}

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
document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
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

const contactLayout=document.querySelector('.contact-layout');
if(contactLayout&&location.pathname.replace(/\/$/,'')==='/kontakt'){
  contactLayout.innerHTML=`<div class="contact-form-intro reveal visible"><p class="eyebrow">Napisz do nas</p><h2 class="display">Odpowiemy na Twoją wiadomość.</h2><p class="lead">Wybierz temat i opisz krótko, jak chcesz pomóc albo czego potrzebujesz. Wiadomość trafi bezpośrednio do Fundacji.</p><div class="quick-call"><div><span>Masz szybkie pytanie?</span><strong>+48 570 747 779</strong></div><a href="tel:+48570747779">Zadzwoń teraz</a></div></div><div class="contact-panel reveal visible" id="formularz"><h3>Formularz kontaktowy</h3><form class="contact-form" action="/api/kontakt" method="post" data-contact-form><div class="form-field"><label for="contact-name">Imię i nazwisko</label><input id="contact-name" name="name" autocomplete="name" required maxlength="120"></div><div class="form-field"><label for="contact-email">Adres e-mail</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="180"></div><div class="form-field"><label for="contact-phone">Telefon <span>(opcjonalnie)</span></label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="40"></div><div class="form-field"><label for="contact-topic">Temat</label><select id="contact-topic" name="topic" required><option value="">Wybierz temat</option><option value="wyprawka-szkolna">Wyprawka szkolna</option><option value="paczka-swiateczna">Paczka świąteczna</option><option value="biezace-potrzeby">Bieżące potrzeby dzieci i rodzin</option><option value="wsparcie-materialne">Dary i wsparcie materialne</option><option value="chce-pomoc">Chcę pomóc Fundacji</option><option value="wolontariat">Wolontariat</option><option value="wspolpraca">Współpraca</option><option value="dokumenty">Statut i sprawozdania</option><option value="inne">Inny temat</option></select></div><div class="form-field form-field-wide"><label for="contact-message">Wiadomość</label><textarea id="contact-message" name="message" required minlength="10" maxlength="3000"></textarea></div><div class="form-honeypot" aria-hidden="true"><label for="contact-website">Strona internetowa</label><input id="contact-website" name="website" tabindex="-1" autocomplete="off"></div><label class="consent-row form-field-wide"><input type="checkbox" name="consent" required><span>Zgadzam się na przetwarzanie podanych danych w celu odpowiedzi na wiadomość. <a href="/polityka-prywatnosci">Polityka prywatności</a>.</span></label><button class="form-submit form-field-wide" type="submit">Wyślij wiadomość</button><p class="form-status form-field-wide" data-form-status aria-live="polite"></p></form></div>`;
  const iconPaths={
    name:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    email:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
    phone:'<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/>',
    topic:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M8 3v4m8-4v4M7 12h10m-10 4h6"/>',
    message:'<path d="M21 11a8 8 0 0 1-8 8H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M7 8h10M7 12h7"/>',
    send:'<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>'
  };
  const icon=(name)=>'<svg class="contact-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+iconPaths[name]+'</svg>';
  Object.keys(iconPaths).filter(name=>name!=='send').forEach(name=>{
    document.querySelector('label[for="contact-'+name+'"]')?.insertAdjacentHTML('afterbegin',icon(name));
  });
  const quickCall=document.querySelector('.quick-call');
  const panel=document.querySelector('#formularz');
  if(quickCall&&panel){
    panel.prepend(quickCall);
    quickCall.querySelector('a')?.insertAdjacentHTML('afterbegin',icon('phone'));
  }
  document.querySelector('.form-submit')?.insertAdjacentHTML('beforeend',icon('send'));
  const topic=document.querySelector('#contact-topic');
  const requestedTopic=new URLSearchParams(location.search).get('temat');
  if(topic&&requestedTopic&&[...topic.options].some(option=>option.value===requestedTopic)) topic.value=requestedTopic;
  const materialLink=document.querySelector('.bank-support a[href^="mailto:"]');
  if(materialLink){materialLink.href='/kontakt?temat=wsparcie-materialne#formularz';materialLink.textContent='Zapytaj o aktualne potrzeby →'}
  const form=document.querySelector('[data-contact-form]');
  form?.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const submit=form.querySelector('.form-submit');
    const status=form.querySelector('[data-form-status]');
    const payload=Object.fromEntries(new FormData(form).entries());
    submit.disabled=true;form.setAttribute('aria-busy','true');status.dataset.state='';status.textContent='Wysyłamy wiadomość…';
    try{
      const response=await fetch(form.action,{method:'POST',headers:{'content-type':'application/json','accept':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json().catch(()=>({}));
      if(!response.ok||data.ok!==true) throw new Error(data.message||'Nie udało się wysłać wiadomości.');
      form.reset();status.dataset.state='success';status.textContent='Dziękujemy. Wiadomość została wysłana do Fundacji.';navigateImmediately('/dziekujemy?wyslano=1');
    }catch(error){
      status.dataset.state='error';status.textContent=`${error.message||'Nie udało się wysłać wiadomości.'} Możesz też zadzwonić: +48 570 747 779.`;
    }finally{submit.disabled=false;form.removeAttribute('aria-busy')}
  });
}
