'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const WHATSAPP_URL=''; // Pega aquí el enlace oficial (https://wa.me/NUMERO) cuando exista
const mxn=n=>'$'+n.toLocaleString('es-MX')+' MXN';
const modal=h=>{$('#mb').innerHTML=h;$('#modal').showModal()};
const li=a=>'<ul>'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
const empty='<p class="empty">Contenido no disponible: no hay resultados para esta búsqueda.</p>';

/* Inicio */
$('#features').innerHTML=[['📚','Guías de cuidado animal','Información general y responsable.','guias'],['🩺','Carnet de salud digital','Vacunas, desparasitaciones y citas.','mascotas'],['🚨','Reportes de maltrato animal','Formulario anónimo (simulación).','denuncias'],['📍','Directorio de veterinarias y estéticas','Busca por tipo de servicio.','directorio'],['🔖','Identificación mediante código QR','Placa digital de demostración.','mascotas'],['🎁','Beneficios exclusivos para la comunidad','Descuentos y cupones según el plan.','planes']].map(f=>`<a class="card" href="#${f[3]}"><span class="ic">${f[0]}</span><h3>${f[1]}</h3><p>${f[2]}</p></a>`).join('');
$('#tips').innerHTML=[['🥣','Rutinas constantes','Horarios fijos de comida, paseo y descanso ayudan a reducir el estrés.'],['🦷','Revisiones periódicas','Observa dientes, oídos, piel y peso, y comenta cambios con tu veterinario.'],['🏷️','Identificación visible','Una placa con contacto actualizado facilita que tu mascota regrese a casa.']].map(t=>`<div class="card"><span class="ic">${t[0]}</span><h3>${t[1]}</h3><p>${t[2]}</p></div>`).join('');
$('#faqs').innerHTML=[['¿Los precios son reales?','Son los del modelo de negocio propuesto para este proyecto escolar. No se realizan cobros.'],['¿Las denuncias llegan a alguna autoridad?','No. El formulario es una simulación. Ante un caso real, acude a las autoridades de tu localidad.'],['¿Los aliados son reales?','No. Son datos de demostración y las etiquetas de verificación son ilustrativas.'],['¿Puedo usar las guías en lugar de ir al veterinario?','No. Son información general y no sustituyen la consulta profesional.']].map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');

/* Guías */
const CATS=['Perros','Gatos','Aves','Conejos y pequeños mamíferos','Alimentación','Higiene','Vacunación y prevención','Bienestar y comportamiento'];
const G=[
[0,'🐕','Cuidados básicos para un perro','Rutina, paseos y atención diaria.',['Los perros necesitan agua fresca, alimento adecuado a su edad, paseos diarios y tiempo de juego.','Mantén horarios estables, socialízalo con calma y revisa sus orejas, dientes y patas con regularidad.']],
[1,'🐈','Cómo preparar tu hogar para un gato','Espacios seguros y enriquecimiento.',['Ofrece areneros limpios, rascadores, lugares altos para descansar y un refugio tranquilo.','Retira plantas tóxicas y cables al alcance, y protege ventanas y balcones.']],
[2,'🦜','Cuidados básicos para aves de compañía','Jaula, dieta y descanso.',['Elige una jaula amplia, límpiala con frecuencia y colócala lejos de corrientes de aire.','Ofrece una dieta variada, agua limpia y periodos de descanso sin ruido.']],
[3,'🐇','Conejos y pequeños mamíferos','Espacio, heno y enriquecimiento.',['Los conejos necesitan espacio para moverse, heno disponible todo el día y agua limpia.','Ofrece escondites y objetos para roer, y evita cambios bruscos de temperatura.']],
[4,'💧','Recomendaciones para mantener hidratada a tu mascota','Agua limpia todos los días.',['Cambia el agua a diario, lava el bebedero y deja varios puntos de agua en casa.','En días de calor, cuida los paseos y ofrece sombra. Si bebe mucho menos o mucho más de lo habitual, consulta a tu veterinario.']],
[5,'🛁','Consejos de higiene y cuidado del pelaje','Cepillado y baño.',['Cepilla el pelaje con la frecuencia que requiera su tipo para evitar nudos y retirar pelo suelto.','Báñalo solo cuando haga falta, con productos para mascotas, y sécalo bien.']],
[6,'💉','La importancia de las vacunas y la desparasitación','Prevención con tu veterinario.',['Las vacunas y la desparasitación ayudan a prevenir enfermedades que pueden ser graves.','Tu veterinario define el calendario según especie, edad y estilo de vida. Anota las fechas para no olvidarlas.']],
[7,'⚠️','Cómo identificar señales de alerta en la salud','Cuándo conviene consultar.',['Cambios en el apetito, la energía, el peso, las heces o la respiración merecen atención.','Si notas vómito persistente, dificultad para respirar, dolor o decaimiento, acude con un veterinario.']]];
const gc=$('#gc');CATS.forEach((c,i)=>gc.add(new Option(c,i)));
function guides(){const q=$('#gq').value.toLowerCase(),c=gc.value;
const l=G.map((g,i)=>[g,i]).filter(([g])=>(c===''||g[0]==c)&&(g[2]+g[3]).toLowerCase().includes(q));
$('#glist').innerHTML=l.length?l.map(([g,i])=>`<article class="card"><span class="ic">${g[1]}</span><span class="tag">${CATS[g[0]]}</span><h3>${g[2]}</h3><p>${g[3]}</p><div class="row"><button class="btn" data-g="${i}">Leer guía</button></div></article>`).join(''):empty}
$('#gq').oninput=gc.onchange=guides;
$('#glist').onclick=e=>{const b=e.target.closest('[data-g]');if(!b)return;const g=G[b.dataset.g];modal(`<h3>${g[2]}</h3><span class="tag">${CATS[g[0]]}</span>${g[4].map(p=>'<p>'+p+'</p>').join('')}<p class="note">Información general; no sustituye la consulta con un veterinario.</p>`)};

/* Denuncias (simulación) */
const fd=$('#fd');fd.elements.f.max=new Date().toISOString().slice(0,10);
fd.onsubmit=e=>{e.preventDefault();if(!fd.reportValidity())return;fd.reset();$('#dok').textContent='✔ Simulación completada. Ninguna denuncia fue enviada, recibida ni guardada.'};

/* Directorio (datos de demostración: reemplázalos por aliados reales) */
const T=['Veterinaria','Estética','Tienda'];
const A=[
['Veterinaria Ejemplo Uno','Veterinaria','Calle Ejemplo 101, Col. Demo','Lun–Sáb 9:00–19:00','000 000 0000','Consulta general y vacunación.',1],
['Clínica Demo Huellas','Veterinaria','Av. Muestra 202, Col. Demo','Lun–Dom 24 horas','000 000 0001','Urgencias y hospitalización.',0],
['Estética Canina Ejemplo','Estética','Calle Prueba 303, Col. Demo','Mar–Dom 10:00–18:00','000 000 0002','Baño y corte de pelo.',0],
['Gatitos Demo Spa','Estética','Av. Muestra 404, Col. Demo','Lun–Vie 11:00–19:00','000 000 0003','Estética felina.',1],
['Tienda Mascotas Ejemplo','Tienda','Calle Prueba 505, Col. Demo','Lun–Sáb 10:00–20:00','000 000 0004','Alimento y accesorios.',0],
['Tienda Demo Aves y Más','Tienda','Av. Muestra 606, Col. Demo','Lun–Sáb 10:00–18:00','000 000 0005','Productos para aves y pequeños mamíferos.',0]];
const mq=a=>encodeURIComponent({Veterinaria:'veterinarias cerca de mí',Estética:'estética para mascotas cerca de mí',Tienda:'tienda de mascotas cerca de mí'}[a[1]]);
const AT=$('#at');T.forEach(t=>AT.add(new Option(t,t)));
function dir(){const q=$('#aq').value.toLowerCase(),t=AT.value;
const l=A.map((a,i)=>[a,i]).filter(([a])=>(!t||a[1]==t)&&(a[0]+a[5]).toLowerCase().includes(q));
$('#dlist').innerHTML=l.length?l.map(([a,i])=>`<article class="card"><span class="tag">${a[1]}</span>${a[6]?'<span class="tag" style="background:#ffe1d6">Aliado verificado (ilustrativo)</span>':''}<h3>${a[0]}</h3><p>${a[5]}</p><small>📍 ${a[2]}<br>🕘 ${a[3]}<br>📞 ${a[4]}<br><b>Datos de demostración</b></small><div class="row"><button class="btn ghost" data-m="${i}">Ver ubicación</button><a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${mq(a)}">Cómo llegar</a></div></article>`).join(''):empty}
$('#aq').oninput=AT.onchange=dir;
$('#dlist').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;const q=mq(A[b.dataset.m]);
$('#map').src='https://www.google.com/maps?q='+q+'&output=embed';$('#map').hidden=$('#maplink').hidden=false;$('#maphint').hidden=true;
$('#maplink').href='https://www.google.com/maps/search/?api=1&query='+q;$('#map').scrollIntoView({behavior:'smooth',block:'center'})};

/* Mis mascotas */
const EX=[{n:'Luna (ejemplo)',s:'Perro',r:'Mestiza',e:'3 años',v:'Rabia y múltiple: fechas de ejemplo',d:'Última: fecha de ejemplo',c:'Cita de ejemplo',x:1},{n:'Michi (ejemplo)',s:'Gato',r:'Doméstico',e:'2 años',v:'Triple felina: fecha de ejemplo',d:'Última: fecha de ejemplo',c:'Sin citas',x:1}];
const ld=()=>{try{return JSON.parse(localStorage.getItem('tp_demo_pets')||'[]')}catch(e){return[]}};
const st=l=>{try{localStorage.setItem('tp_demo_pets',JSON.stringify(l))}catch(e){}};
const EM={Perro:'🐶',Gato:'🐱',Ave:'🦜',Conejo:'🐰',Otro:'🐾'};
function qr(seed){let s=[...seed].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7),r='';
const fp=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="#0f4c4a"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#0f4c4a"/>`;
for(let y=0;y<21;y++)for(let x=0;x<21;x++){if((x<8&&y<8)||(x>12&&y<8)||(x<8&&y>12))continue;s=(s*1664525+1013904223)>>>0;if((s>>>28)&1)r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#0f4c4a"/>`}
return `<svg viewBox="-1 -1 23 23" width="150" role="img" aria-label="Placa QR de demostración" style="background:#fff">${r+fp(0,0)+fp(14,0)+fp(0,14)}</svg>`}
function pets(){$('#petlist').innerHTML=[...EX,...ld()].map((p,i)=>`<article class="card"><span class="ic">${EM[p.s]||'🐾'}</span><h3>${esc(p.n)}</h3><p>${esc(p.s)} · ${esc(p.r)} · ${esc(p.e)}</p><small>Vacunas: ${esc(p.v)}<br>Desparasitaciones: ${esc(p.d)}<br>Próxima cita: ${esc(p.c)}<br>Contacto: opcional</small><div class="row"><button class="btn" data-p="${i}">Ver carnet</button>${p.x?'':`<button class="btn ghost" data-x="${i-EX.length}">Quitar</button>`}</div></article>`).join('')}
$('#petlist').onclick=e=>{const b=e.target.closest('button');if(!b)return;
if(b.dataset.p){const p=[...EX,...ld()][b.dataset.p];modal(`<h3>Carnet digital · ${esc(p.n)}</h3><p class="note">Demostración con datos ficticios, sin sincronización entre dispositivos.</p>${li(['Vacunas: '+p.v,'Desparasitaciones: '+p.d,'Próxima cita: '+p.c])}<h4>Placa QR (demostración)</h4>${qr(p.n)}<p class="note">Patrón ilustrativo: no es un QR escaneable ni enlaza a datos reales.</p>`)}
else if(b.dataset.x){const l=ld();l.splice(+b.dataset.x,1);st(l);pets()}};
$('#fp').onsubmit=e=>{e.preventDefault();const f=e.target;if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));
const l=ld();l.push({n:d.n,s:d.s,r:d.r||'Raza no indicada',e:d.e||'Edad no indicada',v:'Sin registro',d:'Sin registro',c:'Sin citas'});st(l);f.reset();pets()};

/* Suscripciones */
const P=[
{g:0,n:'Plan Comunidad',h:'Huellita Básica',m:0,a:0,t:'Comenzar gratis',b:['Acceso ilimitado a guías informativas de cuidados principales','Acceso al módulo de denuncias de maltrato animal, diseñado para permitir reportes anónimos','Consulta del directorio general de aliados locales con nombre y dirección']},
{g:0,n:'Plan Cuidadores',h:'Huellita Pro',m:29,a:290,pop:1,t:'Elegir Huellita Pro',b:['Todos los beneficios del plan gratuito','Carnet de Salud Digital interactivo para hasta 2 mascotas, con vacunas, desparasitaciones y citas','Recordatorios automáticos previstos por WhatsApp o correo electrónico','Descuentos exclusivos del 5 % al 10 % en la red de aliados locales']},
{g:0,n:'Plan Familia',h:'Huellita VIP',m:59,a:590,t:'Elegir Huellita VIP',b:['Todos los beneficios del plan Huellita Pro','Carnet de Salud Digital ilimitado para familias con 3 o más mascotas','Generador de placa QR digital con acceso al perfil de contacto de la mascota en caso de extravío','Cupones de descuento acumulables','Acceso prioritario a talleres y materiales PDF de nutrición y adiestramiento']},
{g:1,n:'Plan Aliado Inicial',h:'Huellita de Plata',m:149,a:1490,t:'Registrar mi negocio',b:['Ficha completa en el directorio con nombre, dirección, teléfono, horario y logotipo','Ubicación mediante mapa interactivo','Publicación de hasta una promoción o servicio destacado al mes']},
{g:1,n:'Plan Aliado Premium',h:'Huellita de Oro',m:299,a:2990,t:'Elegir plan Premium',b:['Todos los beneficios del directorio comercial','Posicionamiento prioritario','Etiqueta «Aliado Verificado / Recomendado», cuando corresponda','Botón directo a WhatsApp','Publicación ilimitada de promociones','Difusión mensual en las redes sociales oficiales de TECNOPATITAS']}];
let yr=false;
function plans(){[0,1].forEach(g=>$('#pl'+g).innerHTML=P.map((p,i)=>[p,i]).filter(([p])=>p.g==g).map(([p,i])=>{const pr=yr?p.a:p.m,ah=p.m*12-p.a;
return `<article class="card${p.pop?' pop':''}">${p.pop?'<span class="tag" style="background:var(--co)">Más popular</span>':''}<h3>${p.h}</h3><small>${p.n}</small><div class="price">${mxn(pr)}<small>${pr?(yr?' /año':' /mes'):' · gratis'}</small></div>${ah?`<small>Anual: ${mxn(p.a)} · ahorras ${mxn(ah)} al año frente a 12 pagos mensuales</small>`:''}${li(p.b)}<div class="row"><button class="btn coral" data-s="${i}">${p.t}</button></div></article>`}).join(''))}
$$('[data-bill]').forEach(b=>b.onclick=()=>{yr=b.dataset.bill=='y';$$('[data-bill]').forEach(x=>x.setAttribute('aria-pressed',x==b));plans()});
$('#plans').onclick=e=>{const b=e.target.closest('[data-s]');if(!b)return;const p=P[b.dataset.s];
modal(`<h3>${p.h}</h3><p><b>${p.n}</b> · ${mxn(yr?p.a:p.m)} ${yr?'al año':'al mes'}</p>${li(p.b)}<p class="note">Prototipo escolar: no se realiza ningún cobro ni se piden datos bancarios. La contratación se habilitará en una futura versión.</p>`)};

/* Notificaciones (demostración local) */
const NC={vac:'Vacunas',des:'Desparasitación',cita:'Citas',promo:'Promociones de aliados',tip:'Consejos de cuidado'},on={vac:1,des:1,cita:1,promo:1,tip:1};
let N=[['vac','💉','Próxima vacuna de Luna (ejemplo)'],['des','🪱','Recordatorio de desparasitación (ejemplo)'],['cita','📅','Próxima cita veterinaria (ejemplo)'],['promo','🏷️','Nueva promoción de un aliado (ejemplo)'],['tip','💡','Consejo: ofrece agua fresca todos los días']].map((n,i)=>({id:i,c:n[0],i:n[1],t:n[2],r:0}));
function notes(){const l=N.filter(n=>on[n.c]);$('#nlist').innerHTML=l.length?l.map(n=>`<li class="card" style="${n.r?'opacity:.6':''}"><span class="ic">${n.i}</span><span style="flex:1">${n.t}${n.r?' · leída':''}</span><button class="btn ghost" data-r="${n.id}">Marcar leída</button><button class="btn ghost" data-d="${n.id}">Eliminar</button></li>`).join(''):'<li>'+empty+'</li>'}
$('#nprefs').innerHTML=Object.entries(NC).map(([k,v])=>`<label class="sw"><input type="checkbox" data-k="${k}" checked> ${v}</label>`).join('');
$('#nprefs').onchange=e=>{on[e.target.dataset.k]=e.target.checked?1:0;notes()};
$('#nlist').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.r)N.find(n=>n.id==b.dataset.r).r=1;else N=N.filter(n=>n.id!=b.dataset.d);notes()};
$('#nbtn').onclick=async()=>{if(!('Notification' in window))return modal('<p>Tu navegador no admite notificaciones.</p>');
if(await Notification.requestPermission()=='granted')new Notification('TECNOPATITAS (demostración)',{body:'Recordatorio local de ejemplo. No se envía nada a ningún servidor.'});else modal('<p>No se concedió el permiso de notificaciones.</p>')};

/* Chat de demostración */
const R=[[/plan|precio|suscrip|cuesta/,'Hay 5 planes: Huellita Básica ($0), Pro ($29/mes) y VIP ($59/mes) para dueños, y de Plata ($149/mes) y de Oro ($299/mes) para aliados. Revisa la sección Suscripciones.'],[/mascota|carnet|qr|placa/,'En «Mis mascotas» puedes ver un carnet digital y una placa QR de demostración.'],[/veterinari|est[eé]tica|aliado|tienda/,'El directorio de aliados tiene fichas de demostración con buscador y filtros.'],[/denuncia|maltrato|abuso/,'El formulario de denuncias es una simulación escolar y no envía reportes reales. Si presencias maltrato, acude a las autoridades locales.'],[/gu[ií]a|cuidado|vacuna|perro|gato/,'Consulta las guías de cuidado: son información general y no sustituyen a un veterinario.']];
function say(t,me){const d=document.createElement('div');d.className='m'+(me?' me':'');d.textContent=t;$('#msgs').append(d);$('#msgs').scrollTop=1e5}
say('¡Hola! Soy el asistente automático de demostración. Pregúntame por planes, mascotas, veterinaria o denuncia.');
if(WHATSAPP_URL)$('#wa').innerHTML=`<a href="${esc(WHATSAPP_URL)}" target="_blank" rel="noopener">WhatsApp oficial</a>`;
$('#chatBtn').onclick=()=>$('#chat').classList.toggle('open');$('#chatX').onclick=()=>$('#chat').classList.remove('open');
$('#cf').onsubmit=e=>{e.preventDefault();const v=$('#ci').value.trim();if(!v)return;say(v,1);$('#ci').value='';
setTimeout(()=>say((R.find(r=>r[0].test(v.toLowerCase()))||[0,'Soy una simulación automática. Prueba con: planes, mascotas, veterinaria o denuncia.'])[1]),400)};

/* Navegación y animaciones */
$('#menuBtn').onclick=()=>{const o=$('#menu').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',o)};
$('#menu').onclick=e=>{if(e.target.matches('a')){$('#menu').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded',false)}};
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.05});
$$('section:not(.hero)').forEach(s=>{s.classList.add('rv');io.observe(s)});
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#menu a').forEach(a=>a.classList.toggle('act',a.hash=='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
$$('section[id],footer[id]').forEach(s=>so.observe(s));
addEventListener('scroll',()=>$('#top').hidden=scrollY<600);$('#top').onclick=()=>scrollTo({top:0});
guides();dir();pets();plans();notes();
