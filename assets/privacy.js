(() => {
  "use strict";
  const SITE = window.SITE || {};
  const APPS = window.APPS || [];
  const { PERMS, h, contactHref, statsEnabled } = window.Common;
  const $ = (s) => document.querySelector(s);

  // Statistiques : le texte dépend de la configuration réelle du site.
  if (statsEnabled()) {
    $("#stats-note").replaceChildren(
      "Ce site compte les visites et les clics sur « Télécharger » et « Jouer » avec GoatCounter, un outil de statistiques respectueux de la vie privée. ",
      "D'après sa documentation, il ne collecte aucune donnée personnelle identifiable et ne conserve ni l'adresse IP ni l'identifiant du navigateur.");
  }

  // Une fiche par application, générée depuis le catalogue pour rester toujours à jour.
  const list = $("#priv-list");
  for (const a of APPS) {
    const web = a.type === "web";
    const perms = web ? null : a.permissions || [];
    list.append(
      h("article", { class: "priv-app", id: a.id },
        h("header", {},
          h("img", { src: a.icon, alt: "", width: 48, height: 48, loading: "lazy" }),
          h("div", {},
            h("h3", {}, a.name),
            h("span", { class: "priv-kind" }, web ? "Jeu dans le navigateur" : "Application Android"))),
        !web && h("div", {},
          h("h4", {}, "Autorisations demandées"),
          h("ul", { class: "perms" },
            perms.length
              ? perms.map((p) => h("li", {}, PERMS[p] || p.replace("android.permission.", "")))
              : h("li", { class: "none" }, "✓ Aucune autorisation"))),
        h("div", {},
          h("h4", {}, "Ce qu'il faut savoir"),
          h("ul", { class: "plain" }, (a.privacy || []).map((t) => h("li", {}, t))))));
  }

  const mail = contactHref("Question sur la confidentialité");
  if (mail) $("#contact-line").replaceChildren("Écrivez à ", h("a", { href: mail }, SITE.contact), ".");

  // Ouvre directement la fiche demandée (#id) en la mettant en évidence.
  if (location.hash) {
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView();
  }
})();
