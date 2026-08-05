const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $('.menu-button');
const mainNav = $('#main-nav');
menuButton?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
$$('#main-nav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

const leadForm = $('#lead-form');
const formStatus = $('#form-status');
leadForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.className = 'form-status';
  if (!leadForm.checkValidity()) {
    leadForm.reportValidity();
    return;
  }
  const button = $('button[type="submit"]', leadForm);
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Šaljem...';
  formStatus.textContent = '';
  try {
    const data = Object.fromEntries(new FormData(leadForm).entries());
    const leads = JSON.parse(localStorage.getItem('ba_leads') || '[]');
    leads.unshift({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      name: data.name || '',
      company: data.company || '',
      email: data.email || '',
      phone: data.phone || '',
      package: data.package || '',
      industry: data.industry || '',
      message: data.message || '',
      status: 'Novi'
    });
    localStorage.setItem('ba_leads', JSON.stringify(leads));

    const response = await fetch(leadForm.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(leadForm)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'Slanje trenutno nije uspjelo.');
    }
    leadForm.reset();
    formStatus.textContent = 'Hvala! Vaš upit je poslat. Javićemo vam se uskoro.';
    formStatus.classList.add('success');
  } catch (error) {
    formStatus.textContent = 'Upit nije poslat. Pišite direktno na info@balkanagent.com.';
    formStatus.classList.add('error');
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});

const chatShell = $('#chat-shell');
const chatMessages = $('#chat-messages');
const chatForm = $('#chat-form');
const chatInput = $('#chat-input');

function openChat() {
  chatShell.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => chatInput.focus(), 50);
}
function closeChat() {
  chatShell.hidden = true;
  document.body.style.overflow = '';
}
$$('[data-open-chat]').forEach(button => button.addEventListener('click', openChat));
$('[data-close-chat]')?.addEventListener('click', closeChat);
chatShell?.addEventListener('click', event => { if (event.target === chatShell) closeChat(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !chatShell.hidden) closeChat(); });

function appendMessage(text, type) {
  const div = document.createElement('div');
  div.className = `chat-message ${type}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function demoReply(message) {
  const text = message.toLowerCase();
  if (/(cijen|cena|košta|kosta|paket)/.test(text)) {
    return 'Paketi su Starter 49 €, Business 79 €, Professional 199 €, dok se Enterprise paket ugovara prema potrebama firme. Izaberite paket u formi ili pošaljite upit za preporuku.';
  }
  if (/(whatsapp|instagram|messenger|viber)/.test(text)) {
    return 'Moguće integracije zavise od poslovnog naloga, dozvola platforme i tehničkih uslova. Prije ponude provjeravamo šta je zaista dostupno.';
  }
  if (/(termin|rezerv|zakaz)/.test(text)) {
    return 'Rješenje se može pripremiti za česta pitanja, provjeru dostupnosti i prikupljanje podataka za rezervaciju. Automatsko zakazivanje zavisi od sistema koji firma već koristi.';
  }
  if (/(hotel|apartman|restoran|salon|ordinacij|nekretn|autoservis|auto servis)/.test(text)) {
    return 'To je djelatnost za koju se može napraviti prilagođen AI agent. Potrebni su nam vaše usluge, cijene, radno vrijeme, česta pitanja i način na koji sada primate upite.';
  }
  if (/(kako radi|šta radi|sta radi|uslug)/.test(text)) {
    return 'Balkan Agent pravi AI asistente za prodaju, podršku i zakazivanje. Agent se obučava na podacima vaše firme i podešava prema stvarnom poslovnom procesu.';
  }
  return 'Mogu dati osnovne informacije o usluzi, cijeni, kanalima i zakazivanju. Za preciznu ponudu pošaljite upit kroz formu i opišite šta želite da automatizujete.';
}

function sendChatMessage(text) {
  const clean = text.trim();
  if (!clean) return;
  appendMessage(clean, 'user');
  chatInput.disabled = true;
  window.setTimeout(() => {
    appendMessage(demoReply(clean), 'bot');
    chatInput.disabled = false;
    chatInput.focus();
  }, 450);
}

chatForm?.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value;
  chatInput.value = '';
  sendChatMessage(text);
});
$$('.chat-suggestions button').forEach(button => button.addEventListener('click', () => sendChatMessage(button.textContent)));


// Preselect package from pricing cards
document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.getElementById('package-select');
    if (!select) return;
    const match = [...select.options].find(o => o.text.startsWith(link.dataset.package));
    if (match) select.value = match.value;
  });
});
