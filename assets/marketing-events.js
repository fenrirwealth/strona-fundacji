(function(){
 'use strict';
 if(window.__mpCounter||navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true)return;
 var host=location.hostname,ken=host==='kenpol.pro',fund=host==='fundacjalepszydomlepszejutro.pl';
 if(!(ken||fund)||/^\/(api|admin|panel|concierge|pomoc)(\/|$)/.test(location.pathname))return;
 window.__mpCounter=true;
 document.addEventListener('click',function(e){
  if(!e.isTrusted)return;
  if(fund){try{var choice=JSON.parse(localStorage.getItem('fundacja_privacy_v1'));if(choice?.version!==1||choice.choice!=='accepted'||choice.expires<=Date.now())return;}catch{return;}}
  var el=e.target&&e.target.closest?e.target.closest('a,button'):null;if(!el)return;
  var event='',href=el.getAttribute('href')||'',url;
  try{url=new URL(href,location.origin);}catch{return;}
  if(href.indexOf('tel:')===0)event='phone_clicked';
  else if(href.indexOf('mailto:')===0)event='email_clicked';
  else if(ken&&((url.origin===location.origin&&/^\/(kontakt|wycena)\/?$/.test(url.pathname))||(url.hostname==='zglos.kenpol.pro'&&/^\/oferta(\/|$)/.test(url.pathname))))event='inquiry_opened';
  else if(fund&&((/^((www\.)?siepomaga\.pl)$/.test(url.hostname)&&/^\/(lepszy-dom-lepsze-jutro|dzieciece-marzenia26)(\/|$)/.test(url.pathname))||url.hostname==='portal.fundacjalepszydomlepszejutro.pl'))event='support_opened';
  else if(fund&&el.hasAttribute('data-copy-account'))event='bank_details_copied';
  else if(fund&&url.origin===location.origin&&url.pathname==='/kontakt')event='contact_opened';
  if(event)fetch('/api/marketing-event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event:event,test:new URLSearchParams(location.search).get('mp_test')==='1'}),credentials:'omit',referrerPolicy:'no-referrer',keepalive:true}).catch(function(){});
 },true);
})();
