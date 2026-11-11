'use strict';
function languageTarget(value,current=location.href){
  const source=new URL(current);
  const target=new URL(value,source);
  // Keep article links and section anchors when changing the language.
  target.search=source.search;target.hash=source.hash;
  return target.href;
}
document.querySelector('#language')?.addEventListener('change',event=>{
  location.assign(languageTarget(event.target.value));
});
