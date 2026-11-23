/** Local-only /create companion API. Intentionally unavailable in production builds. */
import type {Plugin} from 'vite';
import {writeFile, mkdir} from 'node:fs/promises';
import * as path from 'node:path';
import {createHash} from 'node:crypto';
import type {IncomingMessage, ServerResponse} from 'node:http';

const isLocal = (req:IncomingMessage) => {
 const address=req.socket.remoteAddress || '';
 return address==='127.0.0.1' || address==='::1' || address==='::ffff:127.0.0.1';
};
async function readBody(req:IncomingMessage,max=18000000){
 let length=0;const chunks:Buffer[]=[];
 for await(const chunk of req){length+=chunk.length;if(length>max) throw new Error('Request body too large.');chunks.push(chunk)}
 return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
function respond(res:ServerResponse,code:number,value:unknown){res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));}
const text = (v:unknown) => typeof v==='string';
const localized=(v:any)=>v && text(v.vi) && text(v.en);
function validData(v:any){
 return v && v.site && text(v.site.brand)&&text(v.site.logo)&&text(v.site.email)&&text(v.site.heroImage)&&localized(v.site.subline)
 &&localized(v.site.headline)&&localized(v.site.intro)&&v.about&&localized(v.about.lead)&&localized(v.about.bio)&&localized(v.about.location)&&localized(v.about.education)
 &&(v.about.cv===undefined||(text(v.about.cv)&&v.about.cv.length<=1024))
 && Array.isArray(v.projects)&&v.projects.length<=350&&v.projects.every((p:any)=>
  p&&text(p.id)&&/^[a-z0-9-]{1,80}$/.test(p.id)&&text(p.name)&&text(p.year)&&['flagship','archive'].includes(p.kind)&&
  ['in-development','released','prototype','archived'].includes(p.status)&&localized(p.category)&&localized(p.description)&&localized(p.summary)&&text(p.cover)&&Array.isArray(p.gallery)&&Array.isArray(p.technologies)&&Array.isArray(p.miniGames)&&
  (p.displayMode===undefined||['phone','wide'].includes(p.displayMode))&&
  (p.features===undefined||(Array.isArray(p.features)&&p.features.length<=60&&p.features.every((f:any)=>f&&text(f.id)&&/^[a-z0-9-]{1,80}$/.test(f.id)&&localized(f.title)&&localized(f.description)&&text(f.image)&&(f.imageType===undefined||['illustration','screenshot'].includes(f.imageType))))))
 &&Array.isArray(v.skills)&&v.skills.every((s:any)=>s&&typeof s.id==='string'&&localized(s.name)&&localized(s.description)&&Array.isArray(s.items))
 &&Array.isArray(v.socials)&&v.socials.every((s:any)=>s&&typeof s.id==='string'&&text(s.label)&&text(s.url))
 &&Array.isArray(v.experience)&&v.experience.every((e:any)=>e&&typeof e.id==='string'&&text(e.period)&&text(e.company)&&localized(e.role)&&localized(e.description));
}
export function localEditor():Plugin {
 return {name:'bna-local-content-editor',apply:'serve',configureServer(server){
  server.middlewares.use('/__editor',async (req,res,next)=>{
   if(!isLocal(req))return respond(res,403,{error:'Editor works only on localhost.'});
   try{
    if(req.method==='GET' && req.url==='/health')return respond(res,200,{ok:true,mode:'local-only'});
    if(req.method==='POST' && req.url==='/save'){
     const body=await readBody(req,22000000);
     if(!validData(body?.data))return respond(res,400,{error:'Invalid portfolio data. Nothing was written.'});
     const target=path.join(process.cwd(),'src/data/portfolio.json');
     await writeFile(target,JSON.stringify(body.data,null,2)+'\n','utf8');
     return respond(res,200,{ok:true,path:'src/data/portfolio.json'});
    }
    if(req.method==='POST' && req.url==='/upload-cv'){
     const body=await readBody(req,22000000);
     const mime=String(body?.mime||'');
     const name=String(body?.name||'');
     const raw=String(body?.base64||'');
     if(!/\.pdf$/i.test(name)||!['application/pdf','application/x-pdf',''].includes(mime)||!raw||!/^[-a-zA-Z0-9+/=]+$/.test(raw)){
      return respond(res,400,{error:'Only PDF files are supported for CV upload.'});
     }
     const bytes=Buffer.from(raw,'base64');
     if(bytes.length===0||bytes.length>15*1024*1024)return respond(res,413,{error:'CV PDF must be 15 MB or smaller.'});
     // A file extension or browser-supplied MIME type is not enough for validation.
     if(bytes.subarray(0,5).toString('ascii')!=='%PDF-')return respond(res,400,{error:'Invalid PDF signature.'});
     const short=name.replace(/\.[^/.]+$/,'').normalize('NFKD').replace(/[^\w-]+/g,'-').replace(/-+/g,'-').slice(0,45)||'cv';
     const fingerprint=createHash('sha256').update(bytes).digest('hex').slice(0,9);
     const filename=`cv-${short}-${fingerprint}.pdf`;
     const directory=path.join(process.cwd(),'public/assets/uploads');
     await mkdir(directory,{recursive:true});await writeFile(path.join(directory,filename),bytes);
     return respond(res,200,{ok:true,url:`/assets/uploads/${filename}`});
    }
    if(req.method==='POST' && req.url==='/upload'){
     const body=await readBody(req);
     const mime=String(body?.mime||'');const name=String(body?.name||'asset');const raw=String(body?.base64||'');
     const extByMime:Record<string,string>={'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/gif':'gif','image/avif':'avif'};
     if(!extByMime[mime]||!name||!raw||!/^[-a-zA-Z0-9+/=]+$/.test(raw))return respond(res,400,{error:'Only PNG, JPG, WEBP, AVIF, GIF image files are supported.'});
     const bytes=Buffer.from(raw,'base64');
     if(bytes.length>10*1024*1024)return respond(res,413,{error:'Image larger than 10 MB.'});
     const short=name.replace(/\.[^/.]+$/,'').normalize('NFKD').replace(/[^\w-]+/g,'-').replace(/-+/g,'-').slice(0,45)||'asset';
     const fingerprint=createHash('sha256').update(bytes).digest('hex').slice(0,9);
     const filename=`${short}-${fingerprint}.${extByMime[mime]}`;
     const directory=path.join(process.cwd(),'public/assets/uploads');
     await mkdir(directory,{recursive:true});await writeFile(path.join(directory,filename),bytes);
     return respond(res,200,{ok:true,url:`/assets/uploads/${filename}`});
    }
    next();
   }catch(error){return respond(res,400,{error:error instanceof Error?error.message:'Unexpected error'});}
  });
 }};
}
