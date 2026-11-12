const entries=[
{id:'dekret-nocnej-kapituly',category:'Dekrety',mark:'†',title:'Dekret nocny: wstyd zostaje odwołany',intro:'Kapituła uchyla obowiązek przepraszania za własną tożsamość. Moralna panika nie ma prawa weta.',body:['My, samozwańcza Kapituła Zakonu Czarnego Kału, po konsultacji z jednym szkieletem i ostatnią działającą komórką zdrowego rozsądku, ogłaszamy koniec pokuty za cudze uprzedzenia.','§ 1. Gejowska duma nie jest wnioskiem o zatwierdzenie. Chłopak może kochać chłopaka bez pieczęci komitetu do spraw cudzych sypialni.','§ 2. Kto krzyczy o upadku cywilizacji na widok dwóch trzymających się za ręce mężczyzn, powinien sprawdzić, czy jego cywilizacja nie została zbudowana z mokrego kartonu.','§ 3. Zakon wymaga lojalności wobec zasad: zgody, wolności i wzajemnego szacunku. Żadna godność zakonna nie zwalnia z myślenia.','Dekret podpisano Czarną Pieczęcią. Odwołania przyjmuje Wielki Kanclerz Nie Wasza Sprawa.']},
{id:'nekromancja-stosowana',category:'Rozważania',mark:'☾',title:'Nekromancja stosowana: trup dogmatu nie wstanie',intro:'Wskrzeszenie szkieletu to pestka. Przywrócenie sensu martwym uprzedzeniom przekracza możliwości Zakonu.',body:['W naszej fikcyjnej krypcie nekromanta wskrzesza memy, dowcipy i odwagę do bycia sobą. Nie otrzymał jednak budżetu na reanimację poglądu, że cudza orientacja jest sprawą publicznego trybunału.','Szkielet ma tę przewagę nad hipokrytą, że przynajmniej nie udaje, iż posiada kręgosłup moralny. To nisko zawieszona poprzeczka, ale Kapituła odnotowuje każdy sukces.','Gejostwo nie jest klątwą. Klątwą jest przekonanie, że własny lęk daje prawo do zarządzania cudzą miłością. Tego zaklęcia nie odprawiamy.','Reguła Czarnego Kału brzmi: wskrzeszaj humor, grzeb pogardę, pilnuj zgody. Jeśli rytuał wymaga odebrania komuś godności, to rytuał jest do wyrzucenia.']},
{id:'dekret-001',category:'Dekrety',mark:'§',title:'Dekret nr 001: o ustanowieniu powagi',intro:'Kapituła postanawia, że od dziś sprawy błahe będą rozpatrywane z pełną ceremonialnością.',body:['Z dniem ogłoszenia niniejszego dekretu ustanawia się powagę jako oficjalną oprawę wszelkich działań Zakonu. Sama treść działań pozostaje dowolna, ze wskazaniem na rozsądny brak rozsądku.','§ 1. Każde spotkanie może zostać uznane za posiedzenie Kapituły, jeżeli choć jedna osoba powie: „dobra, słuchajcie”.','§ 2. Protokół sporządza ten, kto pierwszy zapyta, czy ktoś to zapisuje. Brak protokołu nie unieważnia udanego spotkania.','§ 3. Godności nadaje się z umiarem. Dopuszcza się funkcję Wielkiego Strażnika Ładowarki oraz Pełnomocnika do Spraw Tego, Co Miało Być Na Chwilę.','Dekret wchodzi w życie natychmiast po przeczytaniu. Można go zaskarżyć, ale trzeba mieć lepszy żart.']},
{id:'pierwszy-znak',category:'Kronika',mark:'I',title:'Na początku był szkic. I strzała.',intro:'Każda legenda potrzebuje początku. Nasza mieściła się w jednym zdjęciu z WhatsAppa.',body:['Nie było konkursu, komisji ani prezentacji strategicznej na czterdzieści slajdów. Był odręczny rysunek kolegi: znak, strzała, kilka smug i trzy litery. ZCK.','Ten szkic stał się punktem wyjścia dla naszego emblematu. Zachowaliśmy jego najważniejsze motywy: stylizowaną formę, ukośną strzałę i cztery smugi. Dodaliśmy oprawę, która traktuje temat z ceremonialną przesadą.','To cała metoda Zakonu: wziąć wspólny żart, nadać mu własny język i sprawdzić, jak daleko poniesie go wyobraźnia.','Niniejszy zapis inauguruje kronikę. Dalsze wydarzenia pozostają w gestii życia i aktywności czatu.']},
{id:'sztuka-dystansu',category:'Rozważania',mark:'?',title:'Krótki traktat o sztuce dystansu',intro:'Czy inicjatywa bez celu może mieć kierunek? Owszem. Wskazuje go strzała w herbie.',body:['Wiele rzeczy trzeba w życiu traktować serio. Właśnie dlatego przydaje się miejsce, w którym można na chwilę odłożyć urzędowy ton, a potem natychmiast założyć go ponownie — dla żartu.','Dystans nie polega na tym, że nic nas nie obchodzi. Polega na umiejętności zauważenia, że tytuł Wielkiego Kanclerza Spraw Nieistotnych nie czyni nikogo ważniejszym od osoby, która po prostu przyszła posiedzieć.','Nasza reguła jest prosta: dobry żart zostawia miejsce dla wszystkich przy stole. Jeśli ktoś nie ma ochoty się śmiać, nie trzeba powoływać komisji wyjaśniającej.','A gdy ktoś zapyta, po co to wszystko? Można odpowiedzieć: żeby było co wspominać. To całkiem poważny powód.']}
];
const $=selector=>document.querySelector(selector);
const posts=$('#posts'), modal=$('#article'), search=$('#search');
const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
let category='all', opener=null, currentEntry=null, noticeTimer, reducedMotion=motionQuery.matches;
try { reducedMotion ||= localStorage.getItem('zck-reduce-motion')==='true'; } catch {}
function applyMotion(){
  document.documentElement.classList.toggle('reduce-motion',reducedMotion);
  $('#motion-toggle').setAttribute('aria-pressed',String(reducedMotion));
  $('#motion-toggle').textContent=reducedMotion?'Animacje ograniczone':'Ogranicz animacje';
}
applyMotion();
$('#motion-toggle').addEventListener('click',()=>{
  reducedMotion=!reducedMotion;
  try { localStorage.setItem('zck-reduce-motion',String(reducedMotion)); } catch {}
  applyMotion();
});
motionQuery.addEventListener('change',event=>{reducedMotion=event.matches;applyMotion()});
const normalize=text=>text.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
function render(){
  const terms=normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  const found=entries.filter(e=>(category==='all'||e.category===category)&&terms.every(term=>normalize([e.title,e.intro,e.category,...e.body].join(' ')).includes(term)));
  posts.replaceChildren();
  found.forEach(e=>{
    const article=document.createElement('article'); article.className='post';
    const minutes=Math.max(1,Math.ceil(e.body.join(' ').split(/\s+/).length/180));
    article.innerHTML=`<div class="post-art" aria-hidden="true"><span>${e.mark}</span></div><div class="post-meta">${e.category.toUpperCase()} / 11.11.2026 / ${minutes} MIN CZYTANIA</div><h3>${e.title}</h3><p>${e.intro}</p><button class="read" data-id="${e.id}" aria-label="Czytaj: ${e.title}">Czytaj wpis <span>↗</span></button>`;
    posts.append(article);
  });
  $('#empty-results').hidden=found.length>0;
  $('#result-count').textContent=`Wyniki: ${found.length} z ${entries.length}`;
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
  $('#article-body').innerHTML=`<p class="eyebrow">${e.category} / FIKCJA REDAKCYJNA / 11.11.2026</p><h2 id="article-title">${e.title}</h2><div class="article-tools"><button class="text-control" id="share-article">Udostępnij wpis</button><button class="text-control" id="copy-article">Kopiuj link</button></div>${e.body.map(p=>`<p>${p}</p>`).join('')}`;
  $('#share-article').addEventListener('click',shareArticle);
  $('#copy-article').addEventListener('click',()=>copyText(articleURL(e.id),'Link do wpisu skopiowany.'));
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
    notify('Skopiuj zaznaczony tekst:');clearTimeout(noticeTimer);
    const field=document.createElement('input');field.value=text;field.readOnly=true;field.setAttribute('aria-label','Tekst do skopiowania');
    const close=document.createElement('button');close.className='text-control';close.textContent='Zamknij';close.addEventListener('click',()=>$('#notice').hidden=true);
    $('#notice').append(field,close);field.focus();field.select();
  }
}
$('#copy-motto').addEventListener('click',()=>copyText('O to słowo z Gdańska!','Maksyma skopiowana.'));
async function shareArticle(){
  if(!currentEntry)return;const data={title:currentEntry.title,url:articleURL(currentEntry.id)};
  if(navigator.share){try{await navigator.share(data);return}catch(error){if(error.name==='AbortError')return}}
  await copyText(data.url,'Link do wpisu skopiowany.');
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
