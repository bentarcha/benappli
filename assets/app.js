(() => {
  "use strict";

  const SITE = window.SITE || {};
  const APPS = window.APPS || [];

  const CATEGORIES = { jeux: "Jeux", education: "Éducation", outils: "Outils" };
  const ANDROID = { 21: "5.0", 22: "5.1", 23: "6.0", 24: "7.0", 25: "7.1", 26: "8.0", 27: "8.1", 28: "9", 29: "10",
    30: "11", 31: "12", 32: "12L", 33: "13", 34: "14", 35: "15", 36: "16" };
  const { PERMS, h, contactHref, track } = window.Common;
  const $ = (sel, root = document) => root.querySelector(sel);

  const ICON_DL = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_PLAY = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  const icon = (svg) => { const s = h("span", { "aria-hidden": "true", style: "display:inline-flex" }); s.innerHTML = svg; return s; };

  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const fmtSize = (b) => (b / 1048576).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " Mo";
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const isWeb = (a) => a.type === "web";

  function downloadUrl(a) {
    if (isWeb(a)) return a.url;
    const base = SITE.downloadBase || "";
    return base + encodeURIComponent(a.file).replace(/%2F/g, "/");
  }
  function absoluteUrl(path) {
    try { return new URL(path, location.href).href; } catch { return path; }
  }
  const canQr = () => /^https?:$/.test(location.protocol);

  /* ---------- Hero ---------- */
  function renderHero() {
    $("#site-title").textContent = SITE.title || "Mes applications (aucune pub)";
    document.title = (SITE.title || "Mes applications (aucune pub)") + " — téléchargements et jeux";
    $("#site-tagline").textContent = SITE.tagline || "";
    const android = APPS.filter((a) => !isWeb(a));
    const web = APPS.filter(isWeb);
    const stats = [
      [APPS.length, APPS.length > 1 ? "applications" : "application"],
      [android.length, "pour Android"],
    ];
    if (web.length) stats.push([web.length, web.length > 1 ? "jeux dans le navigateur" : "jeu dans le navigateur"]);
    stats.push(["Gratuit", ""]);
    const ul = $("#stats");
    for (const [n, label] of stats) ul.append(h("li", {}, h("b", {}, n), label ? " " + label : ""));
    const strip = $("#icon-strip");
    for (const a of APPS) strip.append(h("img", { src: a.icon, alt: "", width: 60, height: 60 }));
    const mail = contactHref("À propos de vos applications");
    if (mail) $("#foot-contact").append("Une question, un souci, une idée ? Écrivez-moi : ", h("a", { href: mail }, SITE.contact));
  }

  /* ---------- Catalogue ---------- */
  const state = { cat: "all", q: "", sort: "recent" };

  function visibleApps() {
    const q = norm(state.q).trim();
    const list = APPS.filter((a) => {
      if (state.cat !== "all" && a.category !== state.cat) return false;
      if (!q) return true;
      return norm([a.name, a.altName, a.tagline, a.description, (a.features || []).join(" "), (a.tags || []).join(" "), CATEGORIES[a.category]].join(" ")).includes(q);
    });
    const by = {
      recent: (a, b) => (b.updated || "").localeCompare(a.updated || ""),
      name: (a, b) => a.name.localeCompare(b.name, "fr"),
      size: (a, b) => (a.size || 0) - (b.size || 0),
    }[state.sort];
    return list.sort(by);
  }

  function renderChips() {
    const wrap = $("#chips");
    wrap.replaceChildren();
    const cats = ["all", ...Object.keys(CATEGORIES).filter((c) => APPS.some((a) => a.category === c))];
    for (const c of cats) {
      const n = c === "all" ? APPS.length : APPS.filter((a) => a.category === c).length;
      wrap.append(h("button", {
        class: "chip", type: "button", "aria-pressed": String(state.cat === c),
        onclick: () => { state.cat = c; renderChips(); renderGrid(); },
      }, c === "all" ? "Tout" : CATEGORIES[c], h("small", {}, n)));
    }
  }

  function renderGrid() {
    const grid = $("#grid");
    const list = visibleApps();
    grid.replaceChildren(...list.map(card));
    $("#empty").hidden = list.length > 0;
    $("#count").textContent = list.length + (list.length > 1 ? " applications" : " application");
  }

  function card(a, i) {
    const web = isWeb(a);
    const meta = [
      h("li", { class: "kind" }, web ? "Dans le navigateur" : "Android · APK"),
      !web && h("li", {}, "v" + a.version),
      !web && h("li", {}, fmtSize(a.size)),
      h("li", {}, CATEGORIES[a.category]),
    ];
    return h("article", { class: "card", style: `animation-delay:${Math.min(i, 8) * 40}ms` },
      h("div", { class: "card-top" },
        h("img", { src: a.icon, alt: "", width: 72, height: 72, loading: "lazy" }),
        h("div", {},
          h("h3", {}, h("button", { type: "button", onclick: () => openApp(a.id) }, a.name)),
          a.altName && h("span", { class: "alt", lang: "ar", dir: "rtl" }, a.altName))),
      h("p", { class: "tagline" }, a.tagline),
      h("ul", { class: "meta" }, meta),
      h("div", { class: "actions" },
        primaryButton(a),
        h("button", { class: "btn", type: "button", onclick: () => openApp(a.id) }, "Détails")));
  }

  const PLAY_NOTE = "Déjà installée depuis Google Play ? Désinstallez-la avant d'installer l'APK : les deux versions n'ont pas la même signature.";

  function playButton(a) {
    return h("a", { class: "btn primary", href: a.play, target: "_blank", rel: "noopener",
      onclick: () => track("play/" + a.id, "Google Play : " + a.name) }, icon(ICON_PLAY), "Google Play");
  }

  function primaryButton(a, secondary) {
    const web = isWeb(a);
    if (a.play && !secondary) return playButton(a);
    const attrs = { class: secondary ? "btn" : "btn primary", href: downloadUrl(a),
      onclick: () => track((web ? "jeu/" : "telechargement/") + a.id, (web ? "Jeu lancé : " : "Téléchargement : ") + a.name) };
    if (web) { attrs.target = "_blank"; attrs.rel = "noopener"; }
    else if (!/^https?:/.test(downloadUrl(a))) attrs.download = a.file;
    return h("a", attrs, icon(web ? ICON_PLAY : ICON_DL), web ? "Jouer" : (secondary ? "Télécharger l'APK" : "Télécharger"));
  }

  /* ---------- Detail dialog ---------- */
  const dlg = $("#dlg");

  function openApp(id, fromHash) {
    const a = APPS.find((x) => x.id === id);
    if (!a) return;
    const web = isWeb(a);
    const url = downloadUrl(a);
    const body = h("div", { class: "dlg" },
      h("div", { class: "dlg-head" },
        h("img", { src: a.icon, alt: "", width: 88, height: 88 }),
        h("div", {},
          h("h2", { id: "dlg-title" }, a.name),
          a.altName && h("p", { lang: "ar", dir: "rtl" }, a.altName),
          !web && h("p", {}, a.package))),
      h("p", { class: "desc" }, a.description),
      a.screenshots && a.screenshots.length && h("div", { class: "shots", tabindex: 0, role: "group", "aria-label": "Captures d'écran" },
        a.screenshots.map((x) => h("img", { src: x.src, alt: x.alt, width: x.w || 390, height: x.h || 844, loading: "lazy" }))),
      a.features && a.features.length && h("ul", { class: "feats", "aria-label": "Ce que vous y trouverez" }, a.features.map((f) => h("li", {}, f))),
      h("div", { class: "dlg-actions" }, primaryButton(a), a.play && primaryButton(a, true),
        h("button", { class: "btn", type: "button", onclick: (e) => copyText(absoluteUrl("#" + a.id), e.currentTarget, "Copier le lien de cette page") }, "Copier le lien de cette page")),
      a.play && h("p", { class: "muted" }, PLAY_NOTE),
      specs(a));

    if (!web) {
      body.append(
        h("h3", {}, "Autorisations demandées"),
        permsList(a));
    }
    if (a.libre) {
      const l = a.libre;
      const ask = contactHref(`Code source de ${a.name}`, "Bonjour,\n\nJe souhaite recevoir le code source de cette version.\n");
      body.append(
        h("h3", {}, "Logiciel libre"),
        h("p", { class: "libre" },
          l.modifiee
            ? `Cette version est une adaptation modifiée de ${l.nom}, de ${l.auteur}. `
            : `Cette application est basée sur ${l.nom}, de ${l.auteur}. `,
          `Elle reste diffusée sous licence ${l.licence} : vous pouvez consulter, étudier et réutiliser son code. `),
        h("p", { class: "libre" },
          l.sourceModifiee && [h("a", { href: l.sourceModifiee, target: "_blank", rel: "noopener" }, "Code source de cette version"), " · "],
          h("a", { href: l.source, target: "_blank", rel: "noopener" }, `Code source d'origine (${l.nom})`),
          !l.sourceModifiee && l.modifiee && ask && [" · ", h("a", { href: ask }, "Demander le code source de cette version")]));
    }
    if (canQr() && !/Android/i.test(navigator.userAgent)) {
      const box = h("div", { class: "qr" });
      try {
        const qr = qrcode(0, "M");
        qr.addData(absoluteUrl(url));
        qr.make();
        box.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true, alt: "QR code : " + a.name });
        body.append(
          h("h3", {}, web ? "Ouvrir sur votre téléphone" : "Installer depuis votre téléphone"),
          h("div", { class: "qr-box" }, box,
            h("p", {}, web ? "Scannez ce QR code avec l'appareil photo de votre téléphone pour ouvrir le jeu." :
              "Scannez ce QR code avec l'appareil photo de votre téléphone pour télécharger l'APK directement dessus.")));
      } catch (e) { /* QR optional */ }
    }

    const mail = contactHref(`À propos de ${a.name}${web ? "" : " (v" + a.version + ")"}`,
      "Bonjour,\n\nMon téléphone et sa version d'Android :\nCe qui se passe, ou mon idée :\n");
    body.append(h("p", { class: "dlg-foot" },
      mail && h("a", { href: mail }, "Signaler un problème ou proposer une idée"),
      mail && " · ",
      h("a", { href: "confidentialite.html#" + a.id }, "Confidentialité de cette application")));

    $("#dlg-body").replaceChildren(body);
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    if (!fromHash) history.replaceState(null, "", "#" + id);
  }

  function specs(a) {
    const rows = isWeb(a)
      ? [["Type", "Jeu dans le navigateur"], ["Installation", "Aucune"], ["Mise en ligne", fmtDate(a.updated)]]
      : [["Version", a.version], ["Taille", fmtSize(a.size)],
         ["Android", "à partir de " + (ANDROID[a.minSdk] || "?")], ["Mise à jour", fmtDate(a.updated)]];
    return h("dl", { class: "specs" }, rows.map(([t, d]) => h("div", {}, h("dt", {}, t), h("dd", {}, d))));
  }

  function permsList(a) {
    const ul = h("ul", { class: "perms" });
    if (!a.permissions.length) ul.append(h("li", { class: "none" }, "✓ Aucune autorisation spéciale"));
    for (const p of a.permissions) ul.append(h("li", {}, PERMS[p] || p.replace("android.permission.", "")));
    return ul;
  }

  async function copyText(text, btn, resetLabel) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const t = h("textarea", { style: "position:fixed;opacity:0" }); t.value = text; document.body.append(t); t.select();
      try { document.execCommand("copy"); } catch { /* ignore */ } t.remove();
    }
    btn.textContent = "Copié ✓";
    setTimeout(() => { btn.textContent = resetLabel; }, 1800);
  }

  dlg.addEventListener("close", () => { if (location.hash) history.replaceState(null, "", location.pathname + location.search); });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  window.addEventListener("hashchange", fromHash);
  function fromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && APPS.some((a) => a.id === id)) openApp(id, true);
  }

  /* ---------- Init ---------- */
  $("#q").addEventListener("input", (e) => { state.q = e.target.value; renderGrid(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  renderHero();
  renderChips();
  renderGrid();
  fromHash();
})();
