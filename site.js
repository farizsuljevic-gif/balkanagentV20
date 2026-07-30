(() => {
  'use strict';

  const translations = {
    en: {
      features:'Features', pricing:'Pricing', contact:'Contact', login:'Log in', start:'Start beta',
      eyebrow:'AI EMPLOYEES FOR BALKAN BUSINESSES', headline:'Your business never sleeps.<br><span>Neither does your AI team.</span>',
      sub:'Answer customers instantly, capture leads and manage bookings in 12 Balkan and European languages — 24/7.',
      demo:'Try live demo', platform:'ONE PLATFORM', everything:'Everything your team needs.',
      f1t:'AI customer support', f1p:'Instant answers based on your business information, services and frequently asked questions.',
      f2t:'Leads & bookings', f2p:'Collect customer details, requests, reservations and appointments automatically.',
      f3t:'Client dashboard', f3p:'Manage AI employees, conversations, bookings, company profile and plan from one secure workspace.',
      f4t:'Multilingual', f4p:'Serve customers across the Balkans without hiring a separate support team for every language.',
      f5t:'Built for local business', f5p:'Designed for hotels, apartments, clinics, restaurants, real estate and service companies.',
      f6t:'Human control', f6p:'You decide what the AI knows, how it speaks and when a conversation should be handed to a person.',
      liveDemo:'LIVE DEMO', trybot:'Try the programmed BalkanAgent bot.', botdesc:'Ask about prices, languages, onboarding, bookings or supported businesses.',
      botHello:'Hello! How can BalkanAgent help your business today?', botPlaceholder:'Type your question…', send:'Send',
      plans:'Simple plans for your growth.', month:'/mo', starterDesc:'1 AI employee · Website chat · Basic reporting',
      businessDesc:'Multiple channels · Bookings · Lead management', professionalDesc:'Advanced automations · Team access · Priority support', popular:'POPULAR',
      talk:'Talk to us about your business.', contactNote:'All messages currently go to', name:'Name', email:'Email', company:'Company', help:'How can we help?', sendMessage:'Send message',
      made:'Made in Montenegro 🇲🇪 · Built for the Balkans.', privacy:'Privacy', terms:'Terms',
      trustLanguages:'✓ 12 languages', trustGdpr:'✓ GDPR-ready'
    },
    me: {
      features:'Mogućnosti', pricing:'Cijene', contact:'Kontakt', login:'Prijava', start:'Pokreni beta test',
      eyebrow:'AI ZAPOSLENI ZA BALKANSKE FIRME', headline:'Vaš posao nikad ne spava.<br><span>Ni vaš AI tim.</span>',
      sub:'Odgovarajte mušterijama odmah, prikupljajte kontakte i upravljajte rezervacijama na 12 balkanskih i evropskih jezika — 24/7.',
      demo:'Isprobaj demo', platform:'JEDNA PLATFORMA', everything:'Sve što vašem timu treba.',
      f1t:'AI podrška korisnicima', f1p:'Trenutni odgovori na osnovu informacija, usluga i čestih pitanja vaše firme.',
      f2t:'Kontakti i rezervacije', f2p:'Automatski prikupite podatke, zahtjeve, rezervacije i termine.',
      f3t:'Korisnički dashboard', f3p:'Upravljajte AI zaposlenima, razgovorima, rezervacijama, profilom firme i paketom.',
      f4t:'Više jezika', f4p:'Uslužujte klijente širom Balkana bez posebnog tima za svaki jezik.',
      f5t:'Za lokalne firme', f5p:'Napravljeno za hotele, apartmane, klinike, restorane, nekretnine i uslužne firme.',
      f6t:'Ljudska kontrola', f6p:'Vi određujete šta AI zna, kako govori i kada razgovor preuzima čovjek.',
      liveDemo:'DEMO UŽIVO', trybot:'Isprobajte programirani BalkanAgent bot.', botdesc:'Pitajte o cijenama, jezicima, aktivaciji, rezervacijama ili podržanim djelatnostima.',
      botHello:'Zdravo! Kako BalkanAgent može pomoći vašem poslu danas?', botPlaceholder:'Napišite pitanje…', send:'Pošalji',
      plans:'Jednostavni paketi za vaš rast.', month:'/mj', starterDesc:'1 AI zaposleni · Chat za sajt · Osnovni izvještaji',
      businessDesc:'Više kanala · Rezervacije · Upravljanje kontaktima', professionalDesc:'Napredne automatizacije · Timski pristup · Prioritetna podrška', popular:'POPULARNO',
      talk:'Razgovarajmo o vašem poslu.', contactNote:'Sve poruke trenutno dolaze na', name:'Ime', email:'Email', company:'Firma', help:'Kako možemo pomoći?', sendMessage:'Pošalji poruku',
      made:'Napravljeno u Crnoj Gori 🇲🇪 · Za Balkan.', privacy:'Privatnost', terms:'Uslovi', trustLanguages:'✓ 12 jezika', trustGdpr:'✓ Spremno za GDPR'
    },
    de: {
      features:'Funktionen', pricing:'Preise', contact:'Kontakt', login:'Anmelden', start:'Beta starten',
      eyebrow:'KI-MITARBEITER FÜR BALKAN-UNTERNEHMEN', headline:'Ihr Unternehmen schläft nie.<br><span>Ihr KI-Team auch nicht.</span>',
      sub:'Beantworten Sie Kundenanfragen sofort, gewinnen Sie Leads und verwalten Sie Buchungen in 12 Sprachen — rund um die Uhr.',
      demo:'Live-Demo testen', platform:'EINE PLATTFORM', everything:'Alles, was Ihr Team braucht.',
      f1t:'KI-Kundensupport', f1p:'Sofortige Antworten auf Basis Ihrer Unternehmensdaten, Leistungen und häufigen Fragen.',
      f2t:'Leads & Buchungen', f2p:'Kundendaten, Anfragen, Reservierungen und Termine automatisch erfassen.',
      f3t:'Kunden-Dashboard', f3p:'KI-Mitarbeiter, Gespräche, Buchungen, Firmenprofil und Tarif zentral verwalten.',
      f4t:'Mehrsprachig', f4p:'Bedienen Sie Kunden im gesamten Balkanraum ohne ein eigenes Team für jede Sprache.',
      f5t:'Für lokale Unternehmen', f5p:'Für Hotels, Apartments, Kliniken, Restaurants, Immobilien und Dienstleister.',
      f6t:'Menschliche Kontrolle', f6p:'Sie bestimmen, was die KI weiß, wie sie spricht und wann ein Mensch übernimmt.',
      liveDemo:'LIVE-DEMO', trybot:'Testen Sie den programmierten BalkanAgent-Bot.', botdesc:'Fragen Sie nach Preisen, Sprachen, Onboarding, Buchungen oder Branchen.',
      botHello:'Hallo! Wie kann BalkanAgent Ihrem Unternehmen heute helfen?', botPlaceholder:'Frage eingeben…', send:'Senden',
      plans:'Einfache Tarife für Ihr Wachstum.', month:'/Monat', starterDesc:'1 KI-Mitarbeiter · Website-Chat · Basisberichte',
      businessDesc:'Mehrere Kanäle · Buchungen · Lead-Management', professionalDesc:'Erweiterte Automatisierung · Teamzugang · Prioritätssupport', popular:'BELIEBT',
      talk:'Sprechen wir über Ihr Unternehmen.', contactNote:'Alle Nachrichten gehen derzeit an', name:'Name', email:'E-Mail', company:'Unternehmen', help:'Wie können wir helfen?', sendMessage:'Nachricht senden',
      made:'Made in Montenegro 🇲🇪 · Für den Balkan entwickelt.', privacy:'Datenschutz', terms:'Bedingungen', trustLanguages:'✓ 12 Sprachen', trustGdpr:'✓ DSGVO-bereit'
    },
    sq: {
      features:'Veçoritë', pricing:'Çmimet', contact:'Kontakti', login:'Hyr', start:'Fillo beta',
      eyebrow:'PUNONJËS AI PËR BIZNESET E BALLKANIT', headline:'Biznesi juaj nuk fle kurrë.<br><span>As ekipi juaj AI.</span>',
      sub:'Përgjigjuni klientëve menjëherë, mblidhni kontakte dhe menaxhoni rezervime në 12 gjuhë — 24/7.',
      demo:'Provo demon', platform:'NJË PLATFORMË', everything:'Gjithçka që i duhet ekipit tuaj.',
      f1t:'Mbështetje AI për klientët', f1p:'Përgjigje të menjëhershme bazuar në informacionin, shërbimet dhe pyetjet e biznesit tuaj.',
      f2t:'Kontakte dhe rezervime', f2p:'Mblidhni automatikisht të dhëna, kërkesa, rezervime dhe termine.',
      f3t:'Paneli i klientit', f3p:'Menaxhoni punonjësit AI, bisedat, rezervimet, profilin dhe paketën.',
      f4t:'Shumëgjuhësh', f4p:'Shërbeni klientë në gjithë Ballkanin pa ekip të veçantë për çdo gjuhë.',
      f5t:'Për bizneset lokale', f5p:'Për hotele, apartamente, klinika, restorante, prona dhe shërbime.',
      f6t:'Kontroll njerëzor', f6p:'Ju vendosni çfarë di AI, si flet dhe kur bisedën e merr një person.',
      liveDemo:'DEMO LIVE', trybot:'Provo botin e programuar BalkanAgent.', botdesc:'Pyet për çmimet, gjuhët, aktivizimin, rezervimet ose bizneset e mbështetura.',
      botHello:'Përshëndetje! Si mund ta ndihmojë BalkanAgent biznesin tuaj?', botPlaceholder:'Shkruani pyetjen…', send:'Dërgo',
      plans:'Paketa të thjeshta për rritjen tuaj.', month:'/muaj', starterDesc:'1 punonjës AI · Chat në faqe · Raporte bazë',
      businessDesc:'Shumë kanale · Rezervime · Menaxhim kontaktesh', professionalDesc:'Automatizime të avancuara · Qasje ekipi · Mbështetje prioritare', popular:'POPULLORE',
      talk:'Le të flasim për biznesin tuaj.', contactNote:'Të gjitha mesazhet aktualisht shkojnë te', name:'Emri', email:'Email', company:'Kompania', help:'Si mund t’ju ndihmojmë?', sendMessage:'Dërgo mesazh',
      made:'Krijuar në Mal të Zi 🇲🇪 · Për Ballkanin.', privacy:'Privatësia', terms:'Kushtet', trustLanguages:'✓ 12 gjuhë', trustGdpr:'✓ Gati për GDPR'
    },
    hr: {}, sr: {}, bs: {}, mk: {}, sl: {}, it: {}, tr: {}, ru: {}
  };

  translations.hr = {...translations.me,
    features:'Značajke', login:'Prijava', start:'Pokreni beta verziju', eyebrow:'AI ZAPOSLENICI ZA BALKANSKE TVRTKE',
    headline:'Vaše poslovanje nikad ne spava.<br><span>Ni vaš AI tim.</span>', sub:'Odgovarajte korisnicima odmah, prikupljajte kontakte i upravljajte rezervacijama na 12 jezika — 24/7.',
    f1t:'AI korisnička podrška', f3t:'Korisnička nadzorna ploča', made:'Napravljeno u Crnoj Gori 🇲🇪 · Za Balkan.', terms:'Uvjeti'};
  translations.sr = {...translations.me,
    features:'Mogućnosti', login:'Prijava', start:'Pokreni beta test', eyebrow:'AI ZAPOSLENI ZA BALKANSKE FIRME',
    headline:'Vaš posao nikada ne spava.<br><span>Ni vaš AI tim.</span>', sub:'Odgovarajte korisnicima odmah, prikupljajte kontakte i upravljajte rezervacijama na 12 jezika — 24/7.',
    made:'Napravljeno u Crnoj Gori 🇲🇪 · Za Balkan.', terms:'Uslovi'};
  translations.bs = {...translations.me,
    headline:'Vaš posao nikada ne spava.<br><span>Ni vaš AI tim.</span>', sub:'Odgovarajte klijentima odmah, prikupljajte kontakte i upravljajte rezervacijama na 12 jezika — 24/7.',
    made:'Napravljeno u Crnoj Gori 🇲🇪 · Za Balkan.'};
  translations.mk = {...translations.en,
    features:'Можности', pricing:'Цени', contact:'Контакт', login:'Најава', start:'Започни бета', eyebrow:'AI ВРАБОТЕНИ ЗА БАЛКАНСКИ БИЗНИСИ',
    headline:'Вашиот бизнис никогаш не спие.<br><span>Ниту вашиот AI тим.</span>', sub:'Одговарајте веднаш, собирајте контакти и управувајте со резервации на 12 јазици — 24/7.',
    demo:'Пробај демо', platform:'ЕДНА ПЛАТФОРМА', everything:'Сè што му треба на вашиот тим.',
    f1t:'AI корисничка поддршка', f2t:'Контакти и резервации', f3t:'Кориснички панел', f4t:'Повеќејазично', f5t:'За локален бизнис', f6t:'Човечка контрола',
    liveDemo:'ДЕМО ВО ЖИВО', trybot:'Пробајте го програмираниот BalkanAgent бот.', botdesc:'Прашајте за цени, јазици, активирање или резервации.',
    botHello:'Здраво! Како може BalkanAgent да му помогне на вашиот бизнис?', botPlaceholder:'Напишете прашање…', send:'Испрати',
    plans:'Едноставни пакети за раст.', month:'/мес', popular:'ПОПУЛАРНО', talk:'Да разговараме за вашиот бизнис.', contactNote:'Сите пораки моментално одат на',
    name:'Име', company:'Компанија', help:'Како можеме да помогнеме?', sendMessage:'Испрати порака', made:'Создадено во Црна Гора 🇲🇪 · За Балканот.', privacy:'Приватност', terms:'Услови', trustLanguages:'✓ 12 јазици', trustGdpr:'✓ Подготвено за GDPR'};
  translations.sl = {...translations.en,
    features:'Funkcije', pricing:'Cene', contact:'Kontakt', login:'Prijava', start:'Začni beta', eyebrow:'AI ZAPOSLENI ZA BALKANSKA PODJETJA',
    headline:'Vaše podjetje nikoli ne spi.<br><span>Tudi vaša AI ekipa ne.</span>', sub:'Strankam odgovorite takoj, zbirajte kontakte in upravljajte rezervacije v 12 jezikih — 24/7.',
    demo:'Preizkusi demo', platform:'ENA PLATFORMA', everything:'Vse, kar potrebuje vaša ekipa.',
    f1t:'AI podpora strankam', f2t:'Kontakti in rezervacije', f3t:'Nadzorna plošča', f4t:'Večjezično', f5t:'Za lokalna podjetja', f6t:'Človeški nadzor',
    liveDemo:'DEMO V ŽIVO', trybot:'Preizkusite programiranega BalkanAgent bota.', botdesc:'Vprašajte o cenah, jezikih, aktivaciji ali rezervacijah.',
    botHello:'Pozdravljeni! Kako lahko BalkanAgent pomaga vašemu podjetju?', botPlaceholder:'Vnesite vprašanje…', send:'Pošlji',
    plans:'Preprosti paketi za rast.', month:'/mesec', popular:'PRILJUBLJENO', talk:'Pogovorimo se o vašem podjetju.', contactNote:'Vsa sporočila trenutno gredo na',
    name:'Ime', company:'Podjetje', help:'Kako vam lahko pomagamo?', sendMessage:'Pošlji sporočilo', made:'Izdelano v Črni gori 🇲🇪 · Za Balkan.', privacy:'Zasebnost', terms:'Pogoji', trustLanguages:'✓ 12 jezikov', trustGdpr:'✓ Pripravljeno za GDPR'};
  translations.it = {...translations.en,
    features:'Funzionalità', pricing:'Prezzi', contact:'Contatti', login:'Accedi', start:'Avvia la beta', eyebrow:'DIPENDENTI AI PER LE AZIENDE DEI BALCANI',
    headline:'La tua attività non dorme mai.<br><span>Nemmeno il tuo team AI.</span>', sub:'Rispondi subito ai clienti, acquisisci contatti e gestisci prenotazioni in 12 lingue — 24/7.',
    demo:'Prova la demo', platform:'UNA PIATTAFORMA', everything:'Tutto ciò che serve al tuo team.',
    f1t:'Assistenza clienti AI', f2t:'Contatti e prenotazioni', f3t:'Dashboard cliente', f4t:'Multilingue', f5t:'Per aziende locali', f6t:'Controllo umano',
    liveDemo:'DEMO LIVE', trybot:'Prova il bot programmato BalkanAgent.', botdesc:'Chiedi informazioni su prezzi, lingue, attivazione o prenotazioni.',
    botHello:'Ciao! Come può BalkanAgent aiutare la tua attività?', botPlaceholder:'Scrivi la tua domanda…', send:'Invia',
    plans:'Piani semplici per crescere.', month:'/mese', popular:'POPOLARE', talk:'Parliamo della tua attività.', contactNote:'Tutti i messaggi vengono attualmente inviati a',
    name:'Nome', company:'Azienda', help:'Come possiamo aiutarti?', sendMessage:'Invia messaggio', made:'Realizzato in Montenegro 🇲🇪 · Per i Balcani.', privacy:'Privacy', terms:'Termini', trustLanguages:'✓ 12 lingue', trustGdpr:'✓ Pronto per GDPR'};
  translations.tr = {...translations.en,
    features:'Özellikler', pricing:'Fiyatlar', contact:'İletişim', login:'Giriş yap', start:'Betayı başlat', eyebrow:'BALKAN İŞLETMELERİ İÇİN YAPAY ZEKA ÇALIŞANLARI',
    headline:'İşletmeniz hiç uyumaz.<br><span>Yapay zeka ekibiniz de.</span>', sub:'Müşterilere anında yanıt verin, potansiyel müşterileri toplayın ve 12 dilde rezervasyon yönetin — 7/24.',
    demo:'Canlı demoyu dene', platform:'TEK PLATFORM', everything:'Ekibinizin ihtiyacı olan her şey.',
    f1t:'Yapay zeka müşteri desteği', f2t:'Müşteri adayları ve rezervasyonlar', f3t:'Müşteri paneli', f4t:'Çok dilli', f5t:'Yerel işletmeler için', f6t:'İnsan kontrolü',
    liveDemo:'CANLI DEMO', trybot:'Programlanmış BalkanAgent botunu deneyin.', botdesc:'Fiyatlar, diller, aktivasyon veya rezervasyonlar hakkında sorun.',
    botHello:'Merhaba! BalkanAgent işletmenize bugün nasıl yardımcı olabilir?', botPlaceholder:'Sorunuzu yazın…', send:'Gönder',
    plans:'Büyümeniz için basit paketler.', month:'/ay', popular:'POPÜLER', talk:'İşletmeniz hakkında konuşalım.', contactNote:'Tüm mesajlar şu anda şu adrese gider:',
    name:'Ad', company:'Şirket', help:'Nasıl yardımcı olabiliriz?', sendMessage:'Mesaj gönder', made:'Karadağ’da üretildi 🇲🇪 · Balkanlar için.', privacy:'Gizlilik', terms:'Koşullar', trustLanguages:'✓ 12 dil', trustGdpr:'✓ GDPR uyumuna hazır'};
  translations.ru = {...translations.en,
    features:'Возможности', pricing:'Цены', contact:'Контакты', login:'Войти', start:'Начать бета-тест', eyebrow:'AI-СОТРУДНИКИ ДЛЯ БИЗНЕСА НА БАЛКАНАХ',
    headline:'Ваш бизнес никогда не спит.<br><span>Ваша AI-команда тоже.</span>', sub:'Мгновенно отвечайте клиентам, собирайте заявки и управляйте бронированиями на 12 языках — 24/7.',
    demo:'Попробовать демо', platform:'ОДНА ПЛАТФОРМА', everything:'Всё, что нужно вашей команде.',
    f1t:'AI-поддержка клиентов', f1p:'Мгновенные ответы на основе информации о вашей компании, услугах и частых вопросах.',
    f2t:'Заявки и бронирования', f2p:'Автоматически собирайте данные клиентов, запросы, бронирования и записи.',
    f3t:'Личный кабинет', f3p:'Управляйте AI-сотрудниками, диалогами, бронированиями, профилем компании и тарифом.',
    f4t:'Многоязычность', f4p:'Обслуживайте клиентов по всему Балканскому региону без отдельной команды для каждого языка.',
    f5t:'Для местного бизнеса', f5p:'Для отелей, апартаментов, клиник, ресторанов, недвижимости и сервисных компаний.',
    f6t:'Контроль человеком', f6p:'Вы решаете, что знает AI, как он общается и когда диалог передаётся человеку.',
    liveDemo:'ДЕМО', trybot:'Попробуйте запрограммированного бота BalkanAgent.', botdesc:'Спросите о ценах, языках, активации, бронированиях или поддерживаемых сферах бизнеса.',
    botHello:'Здравствуйте! Как BalkanAgent может помочь вашему бизнесу?', botPlaceholder:'Введите вопрос…', send:'Отправить',
    plans:'Простые тарифы для роста.', month:'/мес', starterDesc:'1 AI-сотрудник · Чат на сайте · Базовые отчёты',
    businessDesc:'Несколько каналов · Бронирования · Управление заявками', professionalDesc:'Расширенная автоматизация · Командный доступ · Приоритетная поддержка', popular:'ПОПУЛЯРНО',
    talk:'Расскажите нам о вашем бизнесе.', contactNote:'Все сообщения сейчас отправляются на', name:'Имя', email:'Email', company:'Компания', help:'Чем мы можем помочь?', sendMessage:'Отправить сообщение',
    made:'Создано в Черногории 🇲🇪 · Для Балкан.', privacy:'Конфиденциальность', terms:'Условия', trustLanguages:'✓ 12 языков', trustGdpr:'✓ Готово к GDPR'
  };

  const select = document.getElementById('lang');
  const menuButton = document.getElementById('menuBtn');
  const navigation = document.getElementById('nav');
  const supported = Object.keys(translations);

  function applyLanguage(code) {
    const language = supported.includes(code) ? code : 'en';
    const dictionary = translations[language];
    document.documentElement.lang = language === 'me' ? 'sr-Latn-ME' : language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((element) => {
      const value = dictionary[element.dataset.i18nHtml];
      if (typeof value === 'string') element.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const value = dictionary[element.dataset.i18nPlaceholder];
      if (typeof value === 'string') element.placeholder = value;
    });

    const hello = document.querySelector('[data-bot-hello]');
    if (hello) hello.textContent = dictionary.botHello;
    if (select) select.value = language;
    localStorage.setItem('ba_lang', language);
  }

  if (select) {
    const saved = localStorage.getItem('ba_lang');
    const browser = (navigator.language || 'en').toLowerCase().split('-')[0];
    const initial = saved || (supported.includes(browser) ? browser : 'en');
    applyLanguage(initial);
    select.addEventListener('change', (event) => applyLanguage(event.target.value));
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => navigation.classList.toggle('open'));
    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navigation.classList.remove('open')));
  }

  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const messages = document.getElementById('messages');
  if (chatForm && chatInput && messages) {
    const answers = [
      [/price|cost|cijen|preis|çmim|цена|стоимость|fiyat|prezzo/i,'Plans start at €49/month. The Business plan is €99/month and Professional is €199/month.'],
      [/language|jezik|sprache|gjuh|язык|dil|lingua/i,'BalkanAgent supports 12 Balkan and European languages and remembers the selected language.'],
      [/hotel|clinic|restaurant|real estate|apart|klin|restoran|nekretn|отел|клиник|ресторан/i,'BalkanAgent is designed for hotels, apartments, clinics, restaurants, real estate and service businesses.'],
      [/book|reserv|termin|брон|rezerv/i,'The bot can collect booking requests, customer details, dates and notes and show them in your dashboard.'],
      [/activate|aktiv|account|nalog|login|активац|аккаунт/i,'Create an account, then the BalkanAgent admin can activate your beta access from the admin panel.'],
      [/contact|email|mejl|контакт|почт/i,'Contact us at info@balkanagent.com.'],
      [/hello|hi|zdravo|hallo|привет|здравств/i,'Hello! Tell me what type of business you have and I will explain how BalkanAgent can help.']
    ];
    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const question = chatInput.value.trim();
      if (!question) return;
      const safeQuestion = question.replace(/[<>]/g, '');
      messages.insertAdjacentHTML('beforeend', `<div class="bubble user">${safeQuestion}</div>`);
      chatInput.value = '';
      const answer = (answers.find(([pattern]) => pattern.test(question)) || [])[1] || 'BalkanAgent can answer customers 24/7, collect leads and bookings, and work in multiple languages. For a tailored demo, email info@balkanagent.com.';
      setTimeout(() => {
        messages.insertAdjacentHTML('beforeend', `<div class="bubble bot">${answer}</div>`);
        messages.scrollTop = messages.scrollHeight;
      }, 300);
    });
  }
})();
