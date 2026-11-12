const {entries,messages}=window.ZCK_LOCALE;
const t=key=>messages[key];
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const $=selector=>document.querySelector(selector);
const posts=$('#posts'), modal=$('#article'), search=$('#search');
const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
let category='all', opener=null, currentEntry=null, noticeTimer, reducedMotion=motionQuery.matches;
try { reducedMotion ||= localStorage.getItem('zck-reduce-motion')==='true'; } catch {}
function applyMotion(){
  document.documentElement.classList.toggle('reduce-motion',reducedMotion);
  $('#motion-toggle').setAttribute('aria-pressed',String(reducedMotion));
  $('#motion-toggle').textContent=reducedMotion?t('motionOff'):t('motionOn');
}
applyMotion();
$('#motion-toggle').addEventListener('click',()=>{
  reducedMotion=!reducedMotion;
  try { localStorage.setItem('zck-reduce-motion',String(reducedMotion)); } catch {}
  applyMotion();
});
motionQuery.addEventListener('change',event=>{reducedMotion=event.matches;applyMotion()});
function updatePageVisibility(){document.documentElement.classList.toggle('page-hidden',document.hidden)}
document.addEventListener('visibilitychange',updatePageVisibility);
updatePageVisibility();
const normalize=text=>text.toLocaleLowerCase(document.documentElement.lang).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
function render(){
  const terms=normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  const found=entries.filter(e=>(category==='all'||e.categoryId===category)&&terms.every(term=>normalize([e.title,e.intro,e.category,...e.body].join(' ')).includes(term)));
  posts.replaceChildren();
  found.forEach(e=>{
    const article=document.createElement('article'); article.className='post';
    const minutes=Math.max(1,Math.ceil(e.body.join(' ').split(/\s+/).length/180));
    article.innerHTML=`<div class="post-art" aria-hidden="true"><span>${e.mark}</span></div><div class="post-meta">${escapeHTML(e.category.toLocaleUpperCase(document.documentElement.lang))} / 11.11.2026 / ${minutes} ${escapeHTML(t('minutes'))}</div><h3>${escapeHTML(e.title)}</h3><p>${escapeHTML(e.intro)}</p><button class="read" data-id="${e.id}" aria-label="${escapeHTML(t('readLabel'))} ${escapeHTML(e.title)}">${escapeHTML(t('read'))} <span>↗</span></button>`;
    posts.append(article);
  });
  $('#empty-results').hidden=found.length>0;
  $('#result-count').textContent=t('results').replace('{count}',found.length).replace('{total}',entries.length);
}
function setCategory(value){
  category=value;
  document.querySelectorAll('[data-filter]').forEach(button=>{
    const active=button.dataset.filter===category;
    button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
  });render();
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setCategory(button.dataset.filter)));
search.addEventListener('input',render);
$('#clear-search').addEventListener('click',()=>{search.value='';render();search.focus()});
$('#reset-filters').addEventListener('click',()=>{search.value='';setCategory('all');search.focus()});
function articleURL(id){const url=new URL(location.href);url.searchParams.set('wpis',id);url.hash='';return url.href}
function openArticle(id,trigger=null,updateURL=true){
  const e=entries.find(entry=>entry.id===id);if(!e)return;
  currentEntry=e;opener=trigger;
  $('#article-body').innerHTML=`<p class="eyebrow">${escapeHTML(e.category)} / ${escapeHTML(t('fiction'))} / 11.11.2026</p><h2 id="article-title">${escapeHTML(e.title)}</h2><div class="article-tools"><button class="text-control" id="share-article">${escapeHTML(t('share'))}</button><button class="text-control" id="copy-article">${escapeHTML(t('copyLink'))}</button></div>${e.body.map(p=>`<p>${escapeHTML(p)}</p>`).join('')}`;
  $('#share-article').addEventListener('click',shareArticle);
  $('#copy-article').addEventListener('click',()=>copyText(articleURL(e.id),t('linkCopied')));
  modal.setAttribute('aria-labelledby','article-title');
  if(!modal.open)modal.showModal();modal.scrollTop=0;
  if(updateURL)history.replaceState(null,'',articleURL(e.id));
}
posts.addEventListener('click',event=>{const button=event.target.closest('[data-id]');if(button)openArticle(button.dataset.id,button)});
$('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{
  if(event.target!==modal)return;
  const r=modal.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();
});
modal.addEventListener('close',()=>{
  const url=new URL(location.href);url.searchParams.delete('wpis');history.replaceState(null,'',url);
  $('#notice').hidden=true;
  currentEntry=null;if(opener?.isConnected)opener.focus();else search.focus();
});
function notify(message){
  clearTimeout(noticeTimer);const notice=$('#notice');notice.replaceChildren();notice.textContent=message;notice.hidden=false;
  (modal.open?modal:document.body).append(notice);
  noticeTimer=setTimeout(()=>notice.hidden=true,5000);
}
async function copyText(text,message){
  try{await navigator.clipboard.writeText(text);notify(message)}
  catch{
    notify(t('copyManual'));clearTimeout(noticeTimer);
    const field=document.createElement('input');field.value=text;field.readOnly=true;field.setAttribute('aria-label',t('copyField'));
    const close=document.createElement('button');close.className='text-control';close.textContent=t('close');close.addEventListener('click',()=>$('#notice').hidden=true);
    $('#notice').append(field,close);field.focus();field.select();
  }
}
$('#copy-motto').addEventListener('click',()=>copyText('O to słowo z Gdańska!',t('mottoCopied')));
async function shareArticle(){
  if(!currentEntry)return;const data={title:currentEntry.title,url:articleURL(currentEntry.id)};
  if(navigator.share){try{await navigator.share(data);return}catch(error){if(error.name==='AbortError')return}}
  await copyText(data.url,t('linkCopied'));
}
render();
openArticle(new URL(location.href).searchParams.get('wpis'),null,false);
window.addEventListener('popstate',()=>{
  const id=new URL(location.href).searchParams.get('wpis');
  if(id)openArticle(id,null,false);else if(modal.open)modal.close();
});
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(items=>items.forEach(item=>{
    if(item.isIntersecting){if(!reducedMotion)item.target.classList.add('reveal');observer.unobserve(item.target)}
  }),{threshold:.12});
  document.querySelectorAll('.section-heading,.slogans blockquote,.rule li,.seal,.motto').forEach(el=>observer.observe(el));
}
let scrollQueued=false;
function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  $('.reading-progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,window.scrollY/max)):0})`;
  scrollQueued=false;
}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}},{passive:true});
window.addEventListener('resize',updateProgress);updateProgress();
