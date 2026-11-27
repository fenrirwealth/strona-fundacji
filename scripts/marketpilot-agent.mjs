import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const endpoint='https://marketpilot.group/api/automation/publisher';
export function validateDelivery(d,repository){
 if(d.repository!==repository||!/^fenrirwealth\/[a-z0-9-]+$/.test(repository)||!/^codex\/marketpilot\/[0-9a-f-]{36}$/.test(d.branch)||d.branch!=='codex/marketpilot/'+d.jobId||d.publication!=='DRAFT_PR_ONLY'||d.verification?.status!=='VERIFIED_DRAFT'||d.artifact?.jobId!==d.jobId||d.artifact?.published!==false||d.artifact.files?.length!==1)throw Error('UNTRUSTED_DELIVERY');
 const f=d.artifact.files[0];if(f.path!==`docs/marketpilot/drafts/brief-${d.jobId}.md`||typeof f.content!=='string'||Buffer.byteLength(f.content)>24000||!f.content.includes('DRAFT — wymaga zatwierdzenia')||createHash('sha256').update(f.content).digest('hex')!==f.sha256)throw Error('UNTRUSTED_ARTIFACT');return f;
}
export async function publishDraft(d,{repository,github}){
 const f=validateDelivery(d,repository),path='/repos/'+repository;let commitSha;
 const existing=await github(path+'/git/ref/heads/'+d.branch,'GET',null,[404]);
 if(existing){const saved=await github(path+'/contents/'+f.path+'?ref='+encodeURIComponent(d.branch));if(saved.encoding!=='base64'||Buffer.from(saved.content,'base64').toString('utf8')!==f.content)throw Error('EXISTING_BRANCH_DIFFERS');commitSha=existing.object.sha;}
 else{
  const main=await github(path+'/git/ref/heads/main');const parent=await github(path+'/git/commits/'+main.object.sha);
  const tree=await github(path+'/git/trees','POST',{base_tree:parent.tree.sha,tree:[{path:f.path,mode:'100644',type:'blob',content:f.content}]});
  const commit=await github(path+'/git/commits','POST',{message:'MarketPilot: przygotowany brief '+d.jobId,tree:tree.sha,parents:[main.object.sha]});
  await github(path+'/git/refs','POST',{ref:'refs/heads/'+d.branch,sha:commit.sha});commitSha=commit.sha;
 }
 const pulls=await github(path+'/pulls?state=open&head='+encodeURIComponent(repository.split('/')[0]+':'+d.branch)+'&base=main');let pr=pulls.find(p=>p.head?.ref===d.branch);
 if(!pr)pr=await github(path+'/pulls','POST',{head:d.branch,base:'main',draft:true,title:('MarketPilot: '+d.title).slice(0,220),body:'Przygotowany brief na podstawie datowanych źródeł. Niezależna kontrola potwierdza integralność i zakres pliku. To propozycja do oceny; nie zmienia strony i nie jest dowodem wzrostu.\n\nIdentyfikator zadania: '+d.jobId+'\nWeryfikator: '+d.verification.verifier},[403]);
 return{id:d.id,lease:d.lease,branch:d.branch,commitSha,prUrl:pr?.html_url??null};
}
async function main(){
 const repository=process.env.GITHUB_REPOSITORY,token=process.env.GITHUB_TOKEN;
 if(!/^fenrirwealth\/[a-z0-9-]+$/.test(repository??'')||!token||process.env.GITHUB_REF!=='refs/heads/main')throw Error('PUBLISHER_CONFIGURATION');
 async function request(url,init={}){const response=await fetch(url,{...init,signal:AbortSignal.timeout(20000),redirect:'error'});const text=await response.text();if(text.length>500000)throw Error('RESPONSE_LIMIT');return{response,body:text?JSON.parse(text):null};}
 async function identity(){const url=new URL(process.env.ACTIONS_ID_TOKEN_REQUEST_URL);if(url.protocol!=='https:'||!url.hostname.endsWith('.actions.githubusercontent.com'))throw Error('IDENTITY_ENDPOINT');url.searchParams.set('audience','https://marketpilot.group/autonomy-publisher');const {response,body}=await request(url,{headers:{Authorization:'Bearer '+process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN}});if(!response.ok||typeof body.value!=='string')throw Error('IDENTITY_UNAVAILABLE');return body.value;}
 async function portal(payload){const {response,body}=await request(endpoint,{method:'POST',headers:{Authorization:'Bearer '+await identity(),'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw Error('PORTAL_REJECTED_'+response.status);return body.delivery;}
 const github=async(path,method='GET',payload=null,allowed=[])=>{if(!path.startsWith('/repos/'+repository+'/'))throw Error('REPOSITORY_SCOPE');const {response,body}=await request('https://api.github.com'+path,{method,headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28'},...(payload?{body:JSON.stringify(payload)}:{})});if(allowed.includes(response.status))return null;if(!response.ok)throw Error('GITHUB_REQUEST_FAILED_'+response.status);return body;};
 const d=await portal({action:'claim'});if(!d){console.log('NO_DRAFT_READY');return;}const proof=await publishDraft(d,{repository,github});const receipt=await portal({action:'complete',...proof});if(!receipt||receipt.status!=='DELIVERED')throw Error('DELIVERY_NOT_RECORDED');console.log(JSON.stringify({status:receipt.status,branch:receipt.branch,prUrl:receipt.prUrl,published:false}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)main().catch(error=>{const code=/^[A-Z_0-9]{3,80}$/.test(error?.message)?error.message:'PUBLISHER_FAILED';console.error(code);process.exitCode=1;});
