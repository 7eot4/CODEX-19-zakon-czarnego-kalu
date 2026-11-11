'use strict';
const shareButton=document.querySelector('#share-card');
const shareStatus=document.querySelector('#share-status');
let cardFile=null;
// File sharing is optional. Downloads and the WhatsApp link work without JavaScript.
async function prepareSharing(){
  if(!navigator.share||!navigator.canShare)return;
  try{
    const response=await fetch('assets/zck-whatsapp.png');
    if(!response.ok)throw new Error('Download unavailable');
    cardFile=new File([await response.blob()],'ZCK-wizytowka-WhatsApp.png',{type:'image/png'});
    if(navigator.canShare({files:[cardFile]}))shareButton.hidden=false;
  }catch{cardFile=null}
}
shareButton.addEventListener('click',async()=>{
  if(!cardFile)return;
  shareButton.disabled=true;
  try{
    await navigator.share({files:[cardFile],title:'Zakon Czarnego Kału',text:'O to słowo z Gdańska!'});
    shareStatus.textContent='Grafika przekazana do wybranej aplikacji.';
  }catch(error){
    if(error.name!=='AbortError')shareStatus.textContent='Nie udało się otworzyć udostępniania. Pobierz PNG i dołącz plik w WhatsAppie.';
  }finally{shareButton.disabled=false}
});
const printButton=document.querySelector('#print-card');
printButton.hidden=false;
printButton.addEventListener('click',()=>window.print());
prepareSharing();
