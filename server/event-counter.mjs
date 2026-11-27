// Anonymous counters: never forward visitor IP/UA, URLs, cookies or form values.
export function createCounter({hostname,website,clicks,serverEvents=[]},{fetchImpl=fetch,enabled=()=>process.env.MARKETING_EVENTS_ENABLED==='true',now=Date.now}={}){
 const limits=new Map();
 async function emit(event,{test=false,server=false}={}){
  if(!enabled()||!(server?serverEvents:clicks).includes(event))return false;
  try{const r=await fetchImpl('https://statystyki.novasushi.com.pl/api/send',{method:'POST',headers:{'content-type':'application/json','user-agent':'Mozilla/5.0 Fundacja-Relay/1.0'},body:JSON.stringify({type:'event',payload:{website,hostname,url:'/marketing',name:event,tag:test?'mp-test':server?'mp-server':'mp-browser'}}),signal:AbortSignal.timeout(1500)});const payload=r.ok?await r.json():null;return typeof payload?.sessionId==='string';}catch{return false;}
 }
 async function handle(request){
  const headers={'Cache-Control':'no-store'};
  if(request.method==='GET')return Response.json({ready:enabled(),version:1},{headers});
  if(request.method!=='POST')return new Response(null,{status:405,headers});
  if(request.headers.get('origin')!==`https://${hostname}`)return new Response(null,{status:403,headers});
  if(request.headers.get('dnt')==='1')return new Response(null,{status:204,headers});
  if(!enabled())return new Response(null,{status:503,headers});
  const time=now();for(const [key,v] of limits)if(time-v.start>=60000)limits.delete(key);
  const ip=(request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();
  if(!limits.has(ip)&&limits.size>=10000)return new Response(null,{status:429,headers});
  const slot=limits.get(ip)??{start:time,count:0};if(++slot.count>60)return new Response(null,{status:429,headers});limits.set(ip,slot);
  let input;try{const reader=request.body?.getReader();if(!reader)throw Error();let size=0,chunks=[];for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>256){await reader.cancel();return new Response(null,{status:413,headers});}chunks.push(value);}input=JSON.parse(new TextDecoder().decode(Buffer.concat(chunks)));}catch{return new Response(null,{status:400,headers});}
  if(!input||Object.keys(input).some(k=>!['event','test'].includes(k))||!clicks.includes(input.event)||input.test!==undefined&&typeof input.test!=='boolean')return new Response(null,{status:400,headers});
  return new Response(null,{status:await emit(input.event,{test:input.test===true})?204:503,headers});
 }
 return {handle,emit};
}
