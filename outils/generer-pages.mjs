#!/usr/bin/env node
// Génère, à partir de data/apps.js :
//   - une page par application : <id>/index.html (titre, description et données structurées propres) ;
//   - nouveautes.html (dernières mises à jour) et a-propos.html ;
//   - sitemap.xml et robots.txt ;
//   - la liste de liens en bas de index.html (entre les repères « fiches:debut » et « fiches:fin »).
// À relancer après toute modification de data/apps.js :   node outils/generer-pages.mjs
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true }); fs.writeFileSync(path.join(root, p), s); };

// --- Données du site ---
const sandbox = { window: {} };
vm.runInNewContext(read("data/apps.js"), sandbox);
const SITE = sandbox.window.SITE, APPS = sandbox.window.APPS;
const BASE = (SITE.url || "https://bentarcha.github.io/benappli/").replace(/\/?$/, "/");
const PERMS = new Function("return " + /const PERMS = (\{[\s\S]*?\n  \});/.exec(read("assets/common.js"))[1])();
const CATEGORIES = { jeux: "Jeux", education: "Éducation", outils: "Outils" };
const SCHEMA_CAT = { jeux: "GameApplication", education: "EducationalApplication", outils: "UtilitiesApplication" };
const ANDROID = { 21: "5.0", 22: "5.1", 23: "6.0", 24: "7.0", 25: "7.1", 26: "8.0", 27: "8.1", 28: "9", 29: "10", 30: "11", 31: "12", 32: "12L", 33: "13", 34: "14", 35: "15", 36: "16" };

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtSize = (b) => (b / 1048576).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " Mo";
const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const isWeb = (a) => a.type === "web";
const noDot = (s) => String(s).replace(/[.\s]+$/, "");
const cut = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…");
const dlUrl = (a) => isWeb(a) ? BASE + a.url : (SITE.downloadBase || "") + encodeURIComponent(a.file);
const ICON_DL = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

// --- Pied de page commun (p = préfixe vers la racine : "" ou "../") ---
const footerLinks = (p) => `<a href="${p || "./"}">Accueil</a> · <a href="${p}nouveautes.html">Nouveautés</a> · <a href="${p}a-propos.html">À propos</a> · <a href="${p}confidentialite.html">Confidentialité</a>`;

// --- Page simple à la racine (Nouveautés, À propos) ---
function simplePage({ file, title, desc, h1, lead, body, name }) {
  const url = BASE + file;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#faf7f0" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#14130f" media="(prefers-color-scheme: dark)">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="assets/icons/parchis.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.title)}">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${BASE}assets/og-image.png">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <a class="skip" href="#contenu">Aller au contenu</a>

  <header class="hero compact">
    <div class="wrap">
      <p class="eyebrow"><a class="back" href="./">← Toutes les applications</a></p>
      <h1>${esc(h1)}</h1>
      <p class="lead">${esc(lead)}</p>
    </div>
  </header>

  <main class="wrap page" id="contenu">
${body}
  </main>

  <footer class="foot">
    <div class="wrap">
      <p id="foot-contact"></p>
      <p class="foot-links">${footerLinks("")} · Applications proposées telles quelles, sans publicité.</p>
    </div>
  </footer>

  <script src="data/apps.js"></script>
  <script src="assets/common.js"></script>
  <script src="assets/page.js" data-name="${esc(name || h1)}"></script>
</body>
</html>
`;
}

// --- Nouveautés : dernières mises à jour, de la plus récente à la plus ancienne ---
function nouveautesPage() {
  const sorted = [...APPS].sort((a, b) => b.updated.localeCompare(a.updated) || a.name.localeCompare(b.name, "fr"));
  const items = sorted.map((a) => {
    const web = isWeb(a);
    const meta = web ? `Jeu en ligne · mis en ligne le ${fmtDate(a.updated)}` : `Version ${a.version} · ${fmtDate(a.updated)}`;
    const notes = [...(a.notes || [])];
    if (a.play) notes.push("Aussi disponible sur Google Play.");
    return `      <li>
        <a class="news-ico" href="${esc(a.id)}/"><img src="${esc(a.icon)}" alt="" width="56" height="56" loading="lazy"></a>
        <div>
          <h3><a href="${esc(a.id)}/">${esc(a.name)}</a></h3>
          <p class="muted"><time datetime="${esc(a.updated)}">${esc(meta)}</time></p>
          <p>${esc(a.tagline)}</p>${notes.length ? `
          <ul class="plain">
            ${notes.map((t) => `<li>${esc(t)}</li>`).join("\n            ")}
          </ul>` : ""}
        </div>
      </li>`;
  }).join("\n");
  return simplePage({
    file: "nouveautes.html",
    title: "Nouveautés — dernières mises à jour de mes applications",
    desc: "Les applications et jeux mis à jour récemment : version, date et nouveautés, de la plus récente à la plus ancienne.",
    h1: "Nouveautés",
    lead: "Les dernières mises à jour, de la plus récente à la plus ancienne.",
    name: "Nouveautés",
    body: `    <section aria-labelledby="maj">
      <h2 id="maj">Dernières mises à jour</h2>
      <ol class="news">
${items}
      </ol>
      <p class="muted">Pour récupérer la dernière version d'une application, téléchargez-la de nouveau depuis sa fiche.</p>
    </section>`,
  });
}

// --- À propos ---
function aProposPage() {
  const nbApk = APPS.filter((a) => !isWeb(a)).length, nbWeb = APPS.filter(isWeb).length;
  const nbPlay = APPS.filter((a) => a.play).length;
  const nbLibre = APPS.filter((a) => a.libre).length;
  const plur = (n, un, plus) => `${n} ${n > 1 ? plus : un}`;
  return simplePage({
    file: "a-propos.html",
    title: "À propos — Mes applications (aucune pub)",
    desc: "Pourquoi ce site existe, ce que vous pouvez attendre de ces applications gratuites et sans publicité, et comment me contacter.",
    h1: "À propos",
    lead: "Des applications gratuites et sans publicité, réunies au même endroit.",
    body: `    <section aria-labelledby="pourquoi">
      <h2 id="pourquoi">Pourquoi ce site ?</h2>
      <p>Ce site réunit mes applications Android (${plur(nbApk, "application", "applications")} à installer) et ${plur(nbWeb, "jeu", "jeux")} à jouer directement dans le navigateur. Chacune a sa fiche : ce qu'elle fait, ce qu'elle demande à votre téléphone et ce qu'elle fait de vos données.</p>
    </section>

    <section aria-labelledby="promesses">
      <h2 id="promesses">Ce que vous pouvez attendre</h2>
      <ul class="plain">
        <li><b>Gratuit, sans publicité.</b> Aucune bannière, aucune vidéo imposée.</li>
        <li><b>Aucun compte à créer.</b> Ni ici, ni pour utiliser les applications.</li>
        <li><b>Des autorisations expliquées.</b> Chaque fiche indique, en français simple, ce que l'application demande et pourquoi. Tout est résumé sur la page <a href="confidentialite.html">Confidentialité</a>.</li>${nbLibre ? `
        <li><b>Du logiciel libre, quand c'est le cas.</b> ${plur(nbLibre, "application est basée", "applications sont basées")} sur un logiciel libre : son auteur et son code source sont indiqués sur sa fiche.</li>` : ""}
      </ul>
    </section>

    <section aria-labelledby="installer">
      <h2 id="installer">Comment les installer ?</h2>
      <p>Les applications se téléchargent ici sous forme de fichier APK${nbPlay ? `, dont ${nbPlay} ${nbPlay > 1 ? "sont aussi" : "est aussi"} sur Google Play (bouton « Google Play » sur la fiche)` : ""}. Les explications pas à pas sont sur la <a href="./#help-title">page d'accueil</a>.</p>
    </section>

    <section aria-labelledby="contact">
      <h2 id="contact">Une question, un souci, une idée ?</h2>
      <p data-contact data-subject="Message depuis le site">Écrivez-moi : </p>
      <p class="muted">Indiquez le modèle de votre téléphone et sa version d'Android : cela aide à retrouver l'origine d'un problème.</p>
    </section>

    <section aria-labelledby="soutien" data-don hidden>
      <h2 id="soutien">Soutenir le site</h2>
      <p>Tout reste gratuit. Si ces applications vous servent, vous pouvez soutenir le site, sans aucune obligation : <a data-don-link href="#" target="_blank" rel="noopener">faire un don</a>.</p>
    </section>`,
  });
}

function seo(a) {
  const web = isWeb(a);
  const title = web ? `${a.name} — jouer gratuitement en ligne` : `${a.name} — télécharger l'APK gratuit pour Android`;
  const desc = cut(web
    ? `${a.tagline} Jouez à ${a.name} gratuitement dans votre navigateur, sans publicité.`
    : `${a.tagline} Téléchargez ${a.name} gratuitement pour Android (APK), sans publicité.`, 158);
  return { title, desc };
}

function jsonLd(a, url, desc) {
  const web = isWeb(a);
  const o = {
    "@context": "https://schema.org",
    "@type": web ? "WebApplication" : "MobileApplication",
    name: a.name,
    description: desc,
    url,
    image: BASE + a.icon,
    inLanguage: "fr",
    applicationCategory: SCHEMA_CAT[a.category] || "UtilitiesApplication",
    operatingSystem: web ? "Web" : "Android " + (ANDROID[a.minSdk] || "") + "+",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    dateModified: a.updated,
  };
  if (a.altName) o.alternateName = a.altName;
  if (a.screenshots && a.screenshots.length) o.screenshot = a.screenshots.map((x) => BASE + x.src);
  if (!web) { o.downloadUrl = dlUrl(a); o.softwareVersion = a.version; }
  if (a.play) o.installUrl = a.play;
  if (a.libre) o.isBasedOn = { "@type": "SoftwareApplication", name: a.libre.nom, url: a.libre.source };
  return JSON.stringify(o).replace(/</g, "\\u003c");
}

function libreBlock(a) {
  if (!a.libre) return "";
  const l = a.libre;
  const links = [];
  if (l.sourceModifiee) links.push(`<a href="${esc(l.sourceModifiee)}" target="_blank" rel="noopener">Code source de cette version</a>`);
  links.push(`<a href="${esc(l.source)}" target="_blank" rel="noopener">Code source d'origine (${esc(l.nom)})</a>`);
  if (!l.sourceModifiee && l.modifiee) links.push(`<a id="source-demande" href="#">Demander le code source de cette version</a>`);
  return `
    <section aria-labelledby="libre">
      <h2 id="libre">Logiciel libre</h2>
      <p>${l.modifiee ? `Cette version est une adaptation modifiée de ${esc(l.nom)}, de ${esc(l.auteur)}.` : `Cette application est basée sur ${esc(l.nom)}, de ${esc(l.auteur)}.`} Elle reste diffusée sous licence ${esc(l.licence)} : vous pouvez consulter, étudier et réutiliser son code.</p>
      <p>${links.join(" · ")}</p>
    </section>`;
}

function page(a) {
  const web = isWeb(a);
  const { title, desc } = seo(a);
  const url = `${BASE}${a.id}/`;
  const target = web ? ' target="_blank" rel="noopener"' : "";
  const track = web ? `jeu/${a.id}` : `telechargement/${a.id}`;
  const trackTitle = (web ? "Jeu lancé : " : "Téléchargement : ") + a.name;
  const href = web ? "../" + a.url : dlUrl(a);
  const specs = web
    ? [["Type", "Jeu dans le navigateur"], ["Installation", "Aucune"], ["Mise en ligne", fmtDate(a.updated)]]
    : [["Version", a.version], ["Taille", fmtSize(a.size)], ["Android", "à partir de " + (ANDROID[a.minSdk] || "?")], ["Mise à jour", fmtDate(a.updated)]];
  const others = APPS.filter((x) => x.id !== a.id).map((x) =>
    `<li><a href="../${esc(x.id)}/"><img src="../${esc(x.icon)}" alt="" width="28" height="28" loading="lazy">${esc(x.name)}</a></li>`).join("\n          ");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#faf7f0" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#14130f" media="(prefers-color-scheme: dark)">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="../assets/icons/parchis.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SITE.title)}">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${BASE}assets/og-image.png">
  <script type="application/ld+json">${jsonLd(a, url, desc)}</script>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <a class="skip" href="#contenu">Aller au contenu</a>

  <header class="hero compact">
    <div class="wrap">
      <p class="eyebrow"><a class="back" href="../">← Toutes les applications</a></p>
      <h1>${esc(a.name)}</h1>${a.altName ? `\n      <p class="lead" lang="ar" dir="rtl">${esc(a.altName)}</p>` : ""}
      <p class="lead">${esc(a.tagline)}</p>
    </div>
  </header>

  <main class="wrap page" id="contenu">
    <div class="app-top">
      <img src="../${esc(a.icon)}" alt="Icône de ${esc(a.name)}" width="96" height="96">
      <div class="dlg-actions">
${a.play ? `        <a class="btn primary" href="${esc(a.play)}" target="_blank" rel="noopener" data-track="play/${a.id}" data-title="${esc("Google Play : " + a.name)}">${ICON_PLAY}Google Play</a>
        <a class="btn" href="${esc(href)}" data-track="${track}" data-title="${esc(trackTitle)}">${ICON_DL}Télécharger l'APK</a>` : `        <a class="btn primary" href="${esc(href)}"${target} data-track="${track}" data-title="${esc(trackTitle)}">${web ? ICON_PLAY : ICON_DL}${web ? "Jouer" : "Télécharger"}</a>`}
        <a class="btn" href="../#${esc(a.id)}">Voir dans la liste</a>
      </div>
    </div>${a.play ? `
    <p class="muted">Déjà installée depuis Google Play ? Désinstallez-la avant d'installer l'APK : les deux versions n'ont pas la même signature.</p>` : ""}

    <section aria-labelledby="presentation">
      <h2 id="presentation">${web ? "Le jeu" : "L'application"}</h2>
      <p>${esc(a.description)}</p>
    </section>
${a.screenshots && a.screenshots.length ? `
    <section aria-labelledby="captures">
      <h2 id="captures">Aperçu</h2>
      <div class="shots" tabindex="0" role="group" aria-label="Captures d'écran">
        ${a.screenshots.map((x) => `<img src="../${esc(x.src)}" alt="${esc(x.alt)}" width="${x.w || 390}" height="${x.h || 844}" loading="lazy">`).join("\n        ")}
      </div>
    </section>
` : ""}${a.features && a.features.length ? `
    <section aria-labelledby="contenu-app">
      <h2 id="contenu-app">Ce que vous y trouverez</h2>
      <ul class="feats">
        ${a.features.map((f) => `<li>${esc(f)}</li>`).join("\n        ")}
      </ul>
    </section>
` : ""}
    <section aria-labelledby="infos">
      <h2 id="infos">En détail</h2>
      <dl class="specs">
        ${specs.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("\n        ")}
      </dl>
      <p class="muted">Catégorie : ${esc(CATEGORIES[a.category] || a.category)} · Gratuit · Sans publicité</p>
    </section>
${web ? "" : `
    <section aria-labelledby="autorisations">
      <h2 id="autorisations">Autorisations demandées</h2>
      <ul class="perms">
        ${a.permissions.length ? a.permissions.map((p) => `<li>${esc(PERMS[p] || p.replace("android.permission.", ""))}</li>`).join("\n        ") : '<li class="none">✓ Aucune autorisation spéciale</li>'}
      </ul>
    </section>
`}
    <section aria-labelledby="savoir">
      <h2 id="savoir">Ce qu'il faut savoir</h2>
      <ul class="plain">
        ${(a.privacy || []).map((t) => `<li>${esc(t)}</li>`).join("\n        ")}
      </ul>
      <p><a href="../confidentialite.html#${esc(a.id)}">Voir la page Confidentialité</a></p>
    </section>
${libreBlock(a)}${web ? "" : `
    <section aria-labelledby="installer">
      <h2 id="installer">Comment installer ${esc(a.name)} sur Android ?</h2>
      <ol class="plain">
        <li>Ouvrez cette page depuis votre téléphone et touchez <b>Télécharger</b>.</li>
        <li>Ouvrez le fichier téléchargé (notification, ou dossier <i>Téléchargements</i>).</li>
        <li>Si Android le demande, autorisez votre navigateur à <b>installer des applications inconnues</b>, puis touchez <b>Installer</b>.</li>
      </ol>
      <p class="muted">Ces applications ne passent pas par le Play Store : Android ou Play Protect peut afficher un avertissement. Si vous avez téléchargé le fichier depuis cette page, vous pouvez poursuivre l'installation.</p>
    </section>
`}
    <section aria-labelledby="autres">
      <h2 id="autres">Autres applications</h2>
      <ul class="others">
          ${others}
      </ul>
    </section>
  </main>

  <footer class="foot">
    <div class="wrap">
      <p id="foot-contact"></p>
      <p class="foot-links">${footerLinks("../")} · Applications proposées telles quelles, sans publicité.</p>
    </div>
  </footer>

  <script src="../data/apps.js"></script>
  <script src="../assets/common.js"></script>
  <script src="../assets/page.js" data-app="${esc(a.id)}" data-name="${esc(a.name)}"></script>
</body>
</html>
`;
}

// --- Pages ---
for (const a of APPS) write(`${a.id}/index.html`, page(a));
write("nouveautes.html", nouveautesPage());
write("a-propos.html", aProposPage());

// --- sitemap.xml ---
const last = APPS.map((a) => a.updated).sort().at(-1);
const urls = [[BASE, last, "1.0"], ...APPS.map((a) => [`${BASE}${a.id}/`, a.updated, "0.8"]),
  [`${BASE}nouveautes.html`, last, "0.5"], [`${BASE}a-propos.html`, last, "0.4"],
  [`${BASE}confidentialite.html`, last, "0.3"]];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d, p]) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${d}</lastmod>\n    <priority>${p}</priority>\n  </url>`).join("\n")}
</urlset>
`);

// --- robots.txt ---
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);

// --- Liens en bas de index.html ---
const idx = read("index.html");
const links = APPS.map((a) => `<a href="${esc(a.id)}/">${esc(a.name)}</a>`).join(" · ");
const block = `<!-- fiches:debut -->\n      <nav class="foot-fiches" aria-label="Toutes les applications">Applications : ${links}</nav>\n      <!-- fiches:fin -->`;
if (!/<!-- fiches:debut -->/.test(idx)) throw new Error("Repères fiches:debut / fiches:fin introuvables dans index.html");
write("index.html", idx.replace(/<!-- fiches:debut -->[\s\S]*?<!-- fiches:fin -->/, block));

console.log(`${APPS.length} pages, sitemap.xml (${urls.length} adresses), robots.txt et liens de index.html générés.`);

// --- Numéro de version des fichiers de style et de script ---
// Ajoute « ?v=… » (empreinte du contenu) aux liens, pour que les navigateurs rechargent un fichier modifié
// au lieu de garder l'ancienne version en mémoire.
const stampPaths = ["assets/style.css", "assets/common.js", "assets/app.js", "assets/page.js", "assets/privacy.js", "data/apps.js"];
const stamp = Object.fromEntries(stampPaths.map((f) => [f, crypto.createHash("sha1").update(fs.readFileSync(path.join(root, f))).digest("hex").slice(0, 8)]));
const stampRe = /((?:\.\.\/)?(assets\/(?:style\.css|common\.js|app\.js|page\.js|privacy\.js)|data\/apps\.js))(\?v=[0-9a-f]+)?(?=")/g;
for (const f of ["index.html", "confidentialite.html", "nouveautes.html", "a-propos.html", ...APPS.map((a) => `${a.id}/index.html`)]) {
  const before = read(f);
  const after = before.replace(stampRe, (_, whole, file) => `${whole}?v=${stamp[file]}`);
  if (after !== before) write(f, after);
}
console.log("Numéros de version ajoutés aux fichiers de style et de script.");
