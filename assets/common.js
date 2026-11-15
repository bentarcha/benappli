/* Éléments partagés par toutes les pages : libellés des autorisations, petit assistant DOM, contact et statistiques. */
(() => {
  "use strict";

  const SITE = window.SITE || {};

  const PERMS = {
    "android.permission.INTERNET": "Accéder à Internet",
    "android.permission.ACCESS_NETWORK_STATE": "Voir l'état de la connexion réseau",
    "android.permission.CAMERA": "Utiliser l'appareil photo",
    "android.permission.READ_EXTERNAL_STORAGE": "Lire les fichiers du téléphone",
    "android.permission.WRITE_EXTERNAL_STORAGE": "Écrire des fichiers sur le téléphone",
    "android.permission.READ_MEDIA_IMAGES": "Lire vos photos",
    "android.permission.ACCESS_FINE_LOCATION": "Connaître votre position précise",
    "android.permission.ACCESS_COARSE_LOCATION": "Connaître votre position approximative",
    "android.permission.ACCESS_WIFI_STATE": "Voir l'état de la connexion Wi-Fi",
    "android.permission.VIBRATE": "Faire vibrer le téléphone",
    "android.permission.POST_NOTIFICATIONS": "Afficher des notifications",
    "android.permission.READ_PHONE_STATE": "Connaître l'état du téléphone (appels entrants)",
    "android.permission.READ_CALL_LOG": "Lire le journal d'appels",
    "android.permission.ANSWER_PHONE_CALLS": "Répondre aux appels ou les rejeter",
  };

  /** Tiny DOM helper: h("div", {class: "x"}, "text", childNode) */
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === false || v == null) continue;
      if (k === "class") el.className = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  /* ---------- Contact ---------- */
  const contactHref = (subject, body) => {
    if (!SITE.contact) return null;
    if (!/@/.test(SITE.contact)) return SITE.contact; // une adresse web (formulaire...) plutôt qu'un e-mail
    const q = [];
    if (subject) q.push("subject=" + encodeURIComponent(subject));
    if (body) q.push("body=" + encodeURIComponent(body));
    return "mailto:" + SITE.contact + (q.length ? "?" + q.join("&") : "");
  };

  /* ---------- Statistiques (GoatCounter), uniquement si un code est renseigné dans data/apps.js ---------- */
  function endpoint() {
    const c = String(SITE.goatcounter || "").trim();
    if (!c) return null;
    if (/^https:\/\//i.test(c)) return c;
    return /^[a-z0-9-]+$/i.test(c) ? `https://${c}.goatcounter.com/count` : null;
  }
  function loadStats() {
    const url = endpoint();
    if (!url || !/^https?:$/.test(location.protocol)) return; // jamais en ouverture directe du fichier
    const s = document.createElement("script");
    s.async = true;
    s.dataset.goatcounter = url;
    s.src = "https://gc.zgo.at/count.js";
    document.head.append(s);
  }
  /** Compte un clic (téléchargement, partie lancée...). Sans effet si les statistiques sont désactivées. */
  function track(path, title) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({ path, title, event: true });
      }
    } catch (e) { /* les statistiques ne doivent jamais gêner le site */ }
  }

  window.Common = { PERMS, h, contactHref, track, statsEnabled: () => !!endpoint() };
  loadStats();
})();
