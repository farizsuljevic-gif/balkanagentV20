
(function () {
  const LANGUAGES = [
    ["en", "🇬🇧 English"],
    ["bs", "🇲🇪 Crnogorski"],
    ["de", "🇩🇪 Deutsch"],
    ["sq", "🇦🇱 Shqip"],
    ["sl", "🇸🇮 Slovenščina"],
    ["mk", "🇲🇰 Македонски"],
    ["bg", "🇧🇬 Български"],
    ["el", "🇬🇷 Ελληνικά"],
    ["ru", "🇷🇺 Русский"]
  ];

  function cookie(name) {
    const found = document.cookie.split("; ").find(x => x.startsWith(name + "="));
    return found ? decodeURIComponent(found.split("=").slice(1).join("=")) : "";
  }

  function selectedLanguage() {
    const saved = localStorage.getItem("ba-language");
    if (saved && LANGUAGES.some(([code]) => code === saved)) return saved;
    const current = cookie("googtrans").split("/").filter(Boolean).pop();
    return LANGUAGES.some(([code]) => code === current) ? current : "en";
  }

  function setGoogleCookie(code) {
    const value = code === "en" ? "/en/en" : "/en/" + code;
    document.cookie = "googtrans=" + encodeURIComponent(value) + ";path=/;max-age=31536000;SameSite=Lax";
    document.cookie = "googtrans=" + encodeURIComponent(value) + ";path=/;domain=" + location.hostname + ";max-age=31536000;SameSite=Lax";
    localStorage.setItem("ba-language", code);
  }

  function buildSelector() {
    if (document.getElementById("baGlobalLanguage")) return;
    const wrap = document.createElement("div");
    wrap.className = "ba-language-wrap notranslate";
    wrap.setAttribute("translate", "no");

    const select = document.createElement("select");
    select.id = "baGlobalLanguage";
    select.className = "language-selector";
    select.setAttribute("aria-label", "Choose language");

    LANGUAGES.forEach(([code, label]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = label;
      select.appendChild(option);
    });

    select.value = selectedLanguage();
    select.addEventListener("change", () => {
      setGoogleCookie(select.value);
      location.reload();
    });

    wrap.appendChild(select);
    document.body.appendChild(wrap);
  }

  window.googleTranslateElementInit = function () {
    if (!window.google || !google.translate) return;
    new google.translate.TranslateElement({
      pageLanguage: "en",
      includedLanguages: "en,bs,de,sq,sl,mk,bg,el,ru",
      autoDisplay: false,
      multilanguagePage: true
    }, "google_translate_element");
  };

  document.addEventListener("DOMContentLoaded", () => {
    buildSelector();

    const hidden = document.createElement("div");
    hidden.id = "google_translate_element";
    hidden.setAttribute("aria-hidden", "true");
    document.body.appendChild(hidden);

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      console.warn("Automatic translation service could not be loaded. English remains available.");
    };
    document.head.appendChild(script);
  });
})();
