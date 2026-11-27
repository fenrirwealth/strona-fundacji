import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/analytics-consent.js',import.meta.url),'utf8');
function fixture({saved,blocked=false,deniedStorage=false}={}) {
 const nodes=[],listeners={},requests=[],storage=new Map(saved?[['fundacja_privacy_v1',JSON.stringify(saved)]]:[]);
 function element(){return {hidden:false,dataset:{},handlers:{},setAttribute(){},addEventListener(k,fn){this.handlers[k]=fn;},focus(){}};}
 const document={referrer:'https://example.org/source?private=value',getElementById:id=>nodes.find(n=>n.id===id),createElement:element,body:{appendChild(n){nodes.push(n);}}};
 const location={hostname:'fundacjalepszydomlepszejutro.pl',pathname:'/kontakt',search:'?email=private@example.org',hash:'#secret'};
 const window={addEventListener(k,fn){listeners[k]=fn;}};
 const history={pushState(_s,_t,path){location.pathname=path.split('?')[0];},replaceState(){}};
 vm.runInNewContext(source,{document,location,window,history,navigator:{doNotTrack:blocked?'1':'0',language:'pl-PL'},URL,Date,localStorage:{getItem(k){if(deniedStorage)throw Error();return storage.get(k)||null;},setItem(k,v){if(deniedStorage)throw Error();storage.set(k,v);}},fetch(url,opts){requests.push({url,opts,payload:JSON.parse(opts.body).payload});return Promise.resolve({ok:true});}});
 return {nodes,requests,history,choose(choice){nodes[0].handlers.click({target:{closest:()=>({dataset:{choice}})}});},storage,listeners};
}
test('no pageview before decision or after rejection',()=>{const f=fixture();assert.equal(f.requests.length,0);assert.equal(f.nodes[0].hidden,false);f.choose('rejected');assert.equal(f.requests.length,0);assert.equal(f.nodes[0].hidden,true);});
test('accepted view excludes query, fragment and referrer path',()=>{const f=fixture();f.choose('accepted');assert.equal(f.requests.length,1);assert.equal(f.requests[0].payload.url,'/kontakt');assert.equal(f.requests[0].payload.referrer,'https://example.org');assert.equal(f.requests[0].opts.credentials,'omit');assert.equal(f.requests[0].opts.referrerPolicy,'no-referrer');assert.equal(JSON.stringify(f.requests).includes('private'),false);});
test('navigation deduplicates paths and withdrawal stops collection',()=>{const f=fixture();f.choose('accepted');f.history.pushState(null,'','/jak-pomagamy');f.history.pushState(null,'','/jak-pomagamy?private=1');assert.equal(f.requests.length,2);f.choose('rejected');f.history.pushState(null,'','/o-fundacji');assert.equal(f.requests.length,2);});
test('saved consent works and expired consent does not',()=>{const saved={version:1,choice:'accepted',expires:Date.now()+100000};assert.equal(fixture({saved}).requests.length,1);assert.equal(fixture({saved:{...saved,expires:Date.now()-1000}}).requests.length,0);});
test('Do Not Track blocks accepted collection',()=>{const f=fixture({blocked:true});f.choose('accepted');assert.equal(f.requests.length,0);});
test('blocked storage does not cause implicit consent or broken controls',()=>{const f=fixture({deniedStorage:true});assert.equal(f.requests.length,0);f.choose('accepted');assert.equal(f.requests.length,1);});
test('confirmation and administrative paths excluded',()=>{const f=fixture();f.choose('accepted');for(const p of ['/newsletter/potwierdz','/admin/','/api/kontakt','/dziekujemy'])f.history.pushState(null,'',p);assert.equal(f.requests.length,1);});
test('withdrawal in another tab stops collection',()=>{const f=fixture();f.choose('accepted');f.storage.set('fundacja_privacy_v1',JSON.stringify({version:1,choice:'rejected',expires:Date.now()+100000}));f.listeners.storage({key:'fundacja_privacy_v1'});f.history.pushState(null,'','/o-fundacji');assert.equal(f.requests.length,1);});
