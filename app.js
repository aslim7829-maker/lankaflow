(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* nav */
const nav=$('#nav'),menu=$('#menu'),burger=$('#burger');
addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>40),{passive:true});
const setMenu=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')};
burger.onclick=()=>setMenu(!menu.classList.contains('open'));
$$('#menu a').forEach(a=>a.onclick=()=>setMenu(false));
/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(el=>rm?el.classList.add('in'):io.observe(el));
$$('[data-count]').forEach(el=>{const n=+el.dataset.count;if(rm)return;let t0;const f=t=>{t0??=t;const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)});
/* toast */
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)};
/* workflow */
const S=[['New order',[['Customer','Nimal Perera'],['Location','Nugegoda'],['Order','2 products'],['COD','Rs. 6,450']]],
['Finding best rider…',[['Available riders','3'],['Best match','Kasun'],['ETA to pickup','7 min']]],
['Pickup confirmed ✓',[['Order','#5821'],['Rider','Kasun'],['Pickup','Colombo 05']]],
['Out for delivery',[['ETA','18 min'],['Customer tracking','Active']]],
['Delivered ✓',[['OTP','Verified'],['COD','Rs. 6,450'],['Proof of delivery','Captured']]]];
const stage=$('#stage'),st=$$('.steps button');
const show=i=>{st.forEach((b,j)=>{b.setAttribute('aria-selected',i===j);b.tabIndex=i===j?0:-1});const[h,r]=S[i];stage.style.animation='none';stage.offsetWidth;stage.style.animation='';stage.innerHTML=`<h3>${h}</h3><dl>${r.map(x=>`<dt>${x[0]}</dt><dd>${x[1]}</dd>`).join('')}</dl>`};
st.forEach((b,i)=>{b.textContent=`${i+1}. ${b.textContent}`;b.onclick=()=>show(i);b.onkeydown=e=>{const k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(k){const n=(i+k+5)%5;show(n);st[n].focus()}}});show(0);
/* solution tabs */
const T={'E-commerce':['Handle dozens of daily orders without managing dozens of riders.','Bulk delivery creation|Customer tracking|COD reconciliation|Delivery analytics'],
'Restaurants':['Keep your orders. We\'ll handle the last mile.','Dispatch from your own order flow|Live tracking links|Cash records per rider'],
'Retail':['Turn every store into a delivery hub.','Multi-branch dispatch|Zone-based assignment|Store-level reporting'],
'Pharmacy':['Dependable local delivery for time-sensitive orders.','Proof of delivery with OTP|Priority dispatch|Delivery records'],
'Grocery':['Scheduled and on-demand deliveries from one screen.','Bulk order import|Vehicle matching|Failed delivery handling'],
'Social Commerce':['Turn WhatsApp and Instagram orders into deliveries.','Create deliveries manually in seconds|Share tracking by link|COD per order']};
const tb=$('#tabs'),tp=$('#tabp');
Object.keys(T).forEach((k,i)=>{const b=document.createElement('button');b.role='tab';b.textContent=k;b.onclick=()=>pick(k);tb.append(b)});
const pick=k=>{$$('button',tb).forEach(b=>b.setAttribute('aria-selected',b.textContent===k));tp.innerHTML=`<h3>${T[k][0]}</h3><ul>${T[k][1].split('|').map(x=>`<li>${x}</li>`).join('')}</ul>`};pick('E-commerce');
/* settlement */
$('#settle').onclick=()=>{const c=$('#settlecard');c.classList.add('flash');const n=$('#net');n.textContent='Rs. 284,650 − 38,100 − 4,250 = Rs. 242,300';toast('Demo settlement shown')};
/* FAQ */
const F=[['What is LANKA FLOW?','A delivery infrastructure platform for Sri Lankan businesses to dispatch, track and reconcile deliveries.'],
['Do I need my own riders?','No. You can use LANKA FLOW\'s delivery network, or bring your own riders onto the platform.'],
['How do deliveries get assigned?','Dispatch matches each order to an available delivery option by zone, vehicle type and timing.'],
['Can customers track their orders?','Yes. Each delivery can generate a tracking link for the customer.'],
['Do you support cash on delivery?','Yes. COD amounts and delivery fees are recorded per delivery to support reconciliation.'],
['Can I connect WhatsApp orders?','You can create deliveries from WhatsApp orders. Direct integrations are planned; ask us about current options.'],
['Can I integrate my website?','API and plugin integrations are part of the Business plan. Talk to our team about your setup.'],
['Where is LANKA FLOW available?','We are starting in Colombo and surrounding zones. Contact us to confirm your area.'],
['Do you provide dedicated riders?','Dedicated riders can be arranged for higher-volume businesses, subject to zone and volume.'],
['How is pricing calculated?','Pricing depends on zone, volume and delivery requirements. Contact us for a quote.']];
const acc=$('#acc');acc.className='acc';
F.forEach(([q,a],i)=>{acc.insertAdjacentHTML('beforeend',`<h3><button aria-expanded="false" aria-controls="p${i}" id="q${i}">${q}<span aria-hidden="true">+</span></button></h3><div class="pn" id="p${i}" role="region" aria-labelledby="q${i}"><p>${a}</p></div>`)});
$$('button',acc).forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')==='true';$$('button',acc).forEach(x=>{x.setAttribute('aria-expanded',false);x.lastChild.textContent='+';$('#'+x.getAttribute('aria-controls')).style.maxHeight=0});if(!o){b.setAttribute('aria-expanded',true);b.lastChild.textContent='−';const p=$('#'+b.getAttribute('aria-controls'));p.style.maxHeight=p.scrollHeight+'px'}});
/* modal */
const modal=$('#modal'),mc=$('#mc');let last;
const open=h=>{last=document.activeElement;mc.innerHTML=h;modal.hidden=false;document.body.style.overflow='hidden';(mc.querySelector('input,button')||$('#mx')).focus()};
const close=()=>{modal.hidden=true;document.body.style.overflow='';last&&last.focus()};
$('#mx').onclick=close;modal.onclick=e=>{if(e.target===modal)close()};
addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const f=$$('button,input,select,textarea',modal).filter(x=>!x.disabled);const a=f[0],z=f.at(-1);if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
const fld=(id,l,t='text',req=1)=>`<label for="${id}">${l}</label><input id="${id}" name="${id}" type="${t}" ${req?'required':''}>`;
const demo=()=>{open(`<h2 id="mt" style="font-size:24px">Create delivery</h2><p class="small">Demo only. Nothing is sent anywhere.</p><form id="df" novalidate>${fld('cn','Customer name')}${fld('ph','Phone number','tel')}${fld('pu','Pickup')}${fld('dr','Drop-off')}${fld('pk','Package')}${fld('cd','COD amount (Rs.)','number')}<p class="err" id="de" role="alert"></p><button class="btn p">Find a rider</button></form>`);
$('#df').onsubmit=e=>{e.preventDefault();const bad=$$('input',e.target).find(i=>!i.value.trim());if(bad){$('#de').textContent='Please fill in: '+bad.previousElementSibling.textContent;bad.focus();return}
mc.innerHTML='<h2 id="mt" style="font-size:24px">Finding the best delivery option…</h2><div class="spin" role="status"></div>';
setTimeout(()=>{mc.innerHTML='<h2 id="mt" style="font-size:24px" class="ok">Rider found ✓</h2><p><b>Kasun</b> · Bike<br>7 min to pickup<br>Estimated delivery: 29 min</p><button class="btn p" id="cf">Confirm dispatch</button>';$('#cf').focus();
$('#cf').onclick=()=>{const link='https://track.lankaflow.example/d/'+Math.random().toString(36).slice(2,8);mc.innerHTML=`<h2 id="mt" style="font-size:24px" class="ok">Delivery created ✓</h2><p>Tracking link generated.</p><p class="small">${link}</p><button class="btn p" id="cp">Copy tracking link</button>`;$('#cp').focus();
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText(link)}catch{const t=document.createElement('textarea');t.value=link;document.body.append(t);t.select();document.execCommand('copy');t.remove()}toast('Tracking link copied')}}},1000)}};
const contact=()=>{open(`<h2 id="mt" style="font-size:24px">Talk to our team</h2><form id="cf2" novalidate>${fld('bn','Business name')}${fld('yn','Your name')}${fld('wa','WhatsApp number','tel')}<label for="bt">Business type</label><select id="bt">${['E-commerce','Restaurant','Retail','Pharmacy','Grocery','Social commerce','Other'].map(x=>`<option>${x}</option>`).join('')}</select>${fld('dd','Approximate deliveries/day','number',0)}<label for="ms">Message</label><textarea id="ms" rows="3"></textarea><p class="err" id="ce" role="alert"></p><button class="btn p">Send request</button></form>`);
$('#cf2').onsubmit=e=>{e.preventDefault();for(const id of['bn','yn','wa'])if(!$('#'+id).value.trim()){$('#ce').textContent='Please fill in: '+$('label[for='+id+']').textContent;$('#'+id).focus();return}
mc.innerHTML='<h2 id="mt" style="font-size:24px" class="ok">Thanks — your request has been received.</h2><p>We\'ll be in touch.</p><p class="small">Prototype: this form is not transmitted anywhere.</p><button class="btn p" id="dn">Done</button>';$('#dn').onclick=close}};
const soon=()=>{open('<h2 id="mt" style="font-size:24px">Coming soon</h2><p>This page isn\'t part of the prototype yet.</p><button class="btn p" id="dn">Got it</button>');$('#dn').onclick=close};
const M={demo,contact,soon};$$('[data-open]').forEach(b=>b.onclick=()=>{setMenu(false);M[b.dataset.open]()});
})();
