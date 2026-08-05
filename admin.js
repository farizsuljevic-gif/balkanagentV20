const ADMIN_EMAIL = 'ceo@balkanagent.com';
const ADMIN_PASSWORD = 'BA-TEST-2026';
const STORAGE_KEY = 'ba_leads';

const $ = (selector, root = document) => root.querySelector(selector);
const loginSection = $('#admin-login');
const dashboard = $('#admin-dashboard');
const loginButton = $('#admin-login-button');
const emailInput = $('#admin-email');
const passwordInput = $('#admin-password');
const loginStatus = $('#admin-login-status');
const tbody = $('#lead-table-body');
const emptyState = $('#admin-empty');
const searchInput = $('#lead-search');
const filterSelect = $('#lead-filter');

function getLeads() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveLeads(leads) { localStorage.setItem(STORAGE_KEY, JSON.stringify(leads)); }
function formatDate(value) { return new Intl.DateTimeFormat('sr-Latn-ME', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value)); }
function escapeHtml(value='') { return value.replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }

function render() {
  const all = getLeads();
  const q = searchInput.value.trim().toLowerCase();
  const status = filterSelect.value;
  const leads = all.filter(l => {
    const haystack = `${l.name} ${l.company} ${l.email} ${l.phone} ${l.package} ${l.industry}`.toLowerCase();
    return (!q || haystack.includes(q)) && (!status || l.status === status);
  });
  $('#metric-total').textContent = all.length;
  $('#metric-new').textContent = all.filter(l => l.status === 'Novi').length;
  $('#metric-contacted').textContent = all.filter(l => l.status === 'Kontaktiran').length;
  $('#metric-business').textContent = all.filter(l => (l.package || '').startsWith('BUSINESS')).length;
  tbody.innerHTML = leads.map(l => `
    <tr>
      <td>${formatDate(l.createdAt)}</td>
      <td><strong>${escapeHtml(l.name)}</strong><small>${escapeHtml(l.company || l.industry || '')}</small><details><summary>Poruka</summary><p>${escapeHtml(l.message || 'Nema poruke')}</p></details></td>
      <td>${escapeHtml(l.package || 'Nije izabran')}</td>
      <td><a href="mailto:${encodeURIComponent(l.email)}">${escapeHtml(l.email)}</a><small>${escapeHtml(l.phone || '')}</small></td>
      <td><select class="status-select" data-id="${l.id}"><option ${l.status==='Novi'?'selected':''}>Novi</option><option ${l.status==='Kontaktiran'?'selected':''}>Kontaktiran</option><option ${l.status==='Završen'?'selected':''}>Završen</option></select></td>
      <td><button class="delete-lead" data-id="${l.id}" type="button">Obriši</button></td>
    </tr>`).join('');
  emptyState.hidden = leads.length > 0;

  document.querySelectorAll('.status-select').forEach(select => select.addEventListener('change', () => {
    const leads = getLeads();
    const lead = leads.find(l => String(l.id) === select.dataset.id);
    if (lead) lead.status = select.value;
    saveLeads(leads); render();
  }));
  document.querySelectorAll('.delete-lead').forEach(button => button.addEventListener('click', () => {
    if (!confirm('Obrisati ovaj upit?')) return;
    saveLeads(getLeads().filter(l => String(l.id) !== button.dataset.id)); render();
  }));
}

function showDashboard() {
  loginSection.hidden = true; dashboard.hidden = false; render();
}
if (sessionStorage.getItem('ba_admin') === '1') showDashboard();
loginButton.addEventListener('click', () => {
  if (emailInput.value.trim().toLowerCase() === ADMIN_EMAIL && passwordInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('ba_admin','1'); loginStatus.textContent=''; showDashboard();
  } else { loginStatus.textContent = 'Pogrešan e-mail ili šifra.'; loginStatus.className = 'form-status error'; }
});
passwordInput.addEventListener('keydown', e => { if (e.key === 'Enter') loginButton.click(); });
$('#admin-logout').addEventListener('click', () => { sessionStorage.removeItem('ba_admin'); location.reload(); });
searchInput.addEventListener('input', render);
filterSelect.addEventListener('change', render);
$('#add-test-lead').addEventListener('click', () => {
  const leads = getLeads();
  leads.unshift({ id: Date.now(), createdAt: new Date().toISOString(), name: 'Test Klijent', company: 'Test firma', email: 'test@example.com', phone: '+382 67 000 000', package: 'BUSINESS — 79 € / mjesečno', industry: 'Hotel / apartmani', message: 'Želim da testiram AI recepcionera za upite i rezervacije.', status: 'Novi' });
  saveLeads(leads); render();
});
$('#export-leads').addEventListener('click', () => {
  const leads = getLeads();
  const rows = [['Datum','Ime','Firma','Email','Telefon','Paket','Djelatnost','Poruka','Status'], ...leads.map(l => [l.createdAt,l.name,l.company,l.email,l.phone,l.package,l.industry,l.message,l.status])];
  const csv = rows.map(row => row.map(v => `"${String(v || '').replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='balkan-agent-upiti.csv'; a.click(); URL.revokeObjectURL(a.href);
});
