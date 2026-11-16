// Petit script commun aux pages de chaque application : statistiques de clic et lien de contact.
(() => {
  "use strict";
  const C = window.Common;
  if (!C) return;
  const me = document.currentScript || {};
  const name = (me.dataset && me.dataset.name) || "";

  document.querySelectorAll("[data-track]").forEach((a) =>
    a.addEventListener("click", () => C.track(a.dataset.track, a.dataset.title)));

  const mail = C.contactHref("À propos de " + name, "Bonjour,\n\nMon téléphone et sa version d'Android :\nCe qui se passe, ou mon idée :\n");
  const foot = document.getElementById("foot-contact");
  if (mail && foot) foot.append("Une question, un souci, une idée ? Écrivez-moi : ", Object.assign(document.createElement("a"), { href: mail, textContent: window.SITE.contact }));

  // Contact et don dans le corps d'une page (À propos) : l'adresse n'est jamais écrite en clair dans le HTML.
  document.querySelectorAll("[data-contact]").forEach((el) => {
    const href = C.contactHref(el.dataset.subject || "Message depuis le site", "Bonjour,\n\n");
    if (href) el.append(Object.assign(document.createElement("a"), { href, textContent: window.SITE.contact }));
    else el.remove();
  });
  const don = window.SITE.don || "";
  document.querySelectorAll("[data-don]").forEach((el) => {
    const a = el.querySelector("[data-don-link]");
    if (!/^https:\/\//.test(don) || !a) return;
    a.href = don;
    a.addEventListener("click", () => C.track("don", "Clic sur le lien de don"));
    el.hidden = false;
  });

  const ask = document.getElementById("source-demande");
  const askHref = C.contactHref("Code source de " + name, "Bonjour,\n\nJe souhaite recevoir le code source de cette version.\n");
  if (ask) { if (askHref) ask.href = askHref; else ask.remove(); }
})();
