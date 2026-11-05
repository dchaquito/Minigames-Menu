(() => {
  'use strict';
  const categories = {
    all: {name:'TODOS CONTRA TODOS',games:[
      ['Trivia relámpago','Responder correctamente la mayor cantidad de preguntas antes de que termine el tiempo.'],
      ['¿Verdadero o falso?','Se presentan afirmaciones relacionadas con los contenidos. Cada equipo levanta al mismo tiempo la mano para indicar si es verdadero o falso.'],
      ['Encuentra el intruso','Identificar el elemento que no pertenece a un conjunto.']]},
    duo: {name:'DOS CONTRA DOS',games:[
      ['Dibuja y adivina','Representar conceptos mediante dibujos para que los compañeros los identifiquen. El primero en llegar a tres gana.'],
      ['Duelo de conocimientos','Competir respondiendo ocho preguntas por turnos para conseguir más puntos. El primero en equivocarse pierde.'],
      ['Mímica','Representar conceptos mediante gestos sin hablar.']]},
    solo: {name:'TODOS CONTRA UNO',games:[
      ['El impostor','Un equipo debe descubrir cuál de los otros siete equipos posee un concepto diferente al resto.'],
      ['El interrogatorio','Responder correctamente una serie de ocho preguntas formuladas por los equipos rivales. Pierde al equivocarse tres veces.'],
      ['Contrarreloj','El equipo protagonista debe responder la mayor cantidad de preguntas en doce segundos; los demás intentan superarlo.']]},
    challenge: {name:'DESAFÍO',games:[
      ['El impuesto','Todos los equipos entregan cierta cantidad de monedas. Un equipo seleccionado puede quedarse con todas si responde correctamente una pregunta; de lo contrario, se pierden.'],
      ['La ruleta del caos','Se gira una ruleta que determina una consecuencia: perder monedas, intercambiar posiciones, regalar monedas o recibir un beneficio inesperado.'],
      ['La apuesta de Robin Hood','Se seleccionan aleatoriamente dos equipos que apuestan veinte monedas o una corona. Los demás les hacen preguntas; el primero en equivocarse pierde y paga la apuesta.']]}
  };
  const storageKey='magical-party-minigames-unlocked-v1';
  const $=id=>document.getElementById(id);
  const menu=$('menu'),game=$('game'),wheel=$('wheel'),labels=$('wheelLabels'),spin=$('spin'),status=$('status'),result=$('result');
  let unlocked={};
  try {const data=JSON.parse(localStorage.getItem(storageKey)||'{}'); if(data&&typeof data==='object')unlocked=data;}catch{}
  let active=null,rotation=0,spinning=false;
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(unlocked));}catch{}}
  function renderWheel(){
    labels.innerHTML='';
    const games=categories[active].games;
    games.forEach((g,i)=>{
      const label=document.createElement('div');label.className='wheel-label';
      // Three equal sectors. Text stays upright; only the complete wheel rotates.
      const angle=-90+i*120;
      const r=30;
      const x=50+Math.cos(angle*Math.PI/180)*r;
      const y=50+Math.sin(angle*Math.PI/180)*r;
      label.style.left=x+'%';label.style.top=y+'%';
      label.style.transform='translate(-50%,-50%)';
      label.textContent=unlocked[active+'-'+i]?g[0]:'??????';
      labels.appendChild(label);
    });
    $('progress').textContent=games.filter((_,i)=>unlocked[active+'-'+i]).length+' de '+games.length+' minijuegos desbloqueados';
  }
  function showCategory(key){
    if(spinning)return;
    active=key;rotation=0;wheel.style.transition='none';wheel.style.transform='rotate(0deg)';
    void wheel.offsetWidth;wheel.style.transition='';
    menu.classList.add('hidden');game.classList.remove('hidden');
    $('categoryLabel').textContent=categories[key].name;
    $('subtitle').textContent='¡Gira la ruleta y descubre qué jugarán!';
    result.classList.add('hidden');status.textContent='¡Gira para descubrir el minijuego!';renderWheel();
  }
  document.querySelectorAll('[data-cat]').forEach(button=>button.addEventListener('click',()=>showCategory(button.dataset.cat)));
  $('back').addEventListener('click',()=>{
    if(spinning)return;
    game.classList.add('hidden');menu.classList.remove('hidden');active=null;
    $('subtitle').textContent='Elige una categoría para comenzar';
  });
  spin.addEventListener('click',()=>{
    if(spinning||!active)return;
    spinning=true;spin.disabled=true;result.classList.add('hidden');status.textContent='La ruleta está girando…';
    const selected=Math.floor(Math.random()*3);
    // Sector 0 is centered at top. Clockwise sector centers are 0,120,240 degrees.
    // Land selected sector at top, plus 5-7 full rotations.
    const targetMod=(360-selected*120)%360;
    const currentMod=((rotation%360)+360)%360;
    const delta=((targetMod-currentMod+360)%360)+360*(5+Math.floor(Math.random()*3));
    rotation+=delta;
    // Ensure the browser paints the starting state before animating.
    requestAnimationFrame(()=>requestAnimationFrame(()=>{wheel.style.transform=`rotate(${rotation}deg)`;}));
    let finished=false;
    function finish(){
      if(finished)return;finished=true;
      wheel.removeEventListener('transitionend',onEnd);
      unlocked[active+'-'+selected]=true;save();renderWheel();
      const picked=categories[active].games[selected];
      $('resultName').textContent=picked[0];$('resultDescription').textContent=picked[1];
      result.classList.remove('hidden');status.textContent='¡MINIJUEGO DESBLOQUEADO!';
      spinning=false;spin.disabled=false;
    }
    function onEnd(e){if(e.target===wheel&&e.propertyName==='transform')finish();}
    wheel.addEventListener('transitionend',onEnd);
    setTimeout(finish,5500);
  });
})();
