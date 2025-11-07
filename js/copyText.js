function copyText(){
  try{
    const el = document.getElementById('bibtex');
    if(!el){ return; }
    // Get plain text from code block inside
    const code = el.querySelector('code');
    const text = (code ? code.innerText : el.innerText).replace(/\u00A0/g,' ');
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(text);
    }else{
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position='fixed'; ta.style.left='-9999px';
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
  }catch(e){ console.warn('copyText failed', e); }
}

