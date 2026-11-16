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

  const ask = document.getElementById("source-demande");
  const askHref = C.contactHref("Code source de " + name, "Bonjour,\n\nJe souhaite recevoir le code source de cette version.\n");
  if (ask) { if (askHref) ask.href = askHref; else ask.remove(); }
})();
