# Mon site de téléchargements

Site statique : aucune installation, aucun serveur. Il suffit de déposer le dossier sur un hébergeur de pages.

## Voir le site chez soi
Double-cliquez sur `index.html` (tout fonctionne sans serveur). Seul le QR code, qui a besoin d'une vraie adresse web, n'apparaît qu'une fois le site en ligne.

## Contenu du dossier
| Élément | Rôle |
|---|---|
| `index.html` | La page d'accueil |
| `assets/style.css`, `assets/app.js` | L'apparence et le fonctionnement du catalogue |
| `data/apps.js` | **Le catalogue** : textes, versions, tailles, contact, compteur. C'est le seul fichier à modifier au quotidien |
| `confidentialite.html` | La page de confidentialité (générée depuis le catalogue) |
| `assets/og-image.png` | L'image affichée quand on partage le lien |
| `assets/icons/` | Les icônes des applications |
| `*.apk`, `parchis.html` | Vos applications et votre jeu en ligne |

## Modifier un texte
Ouvrez `data/apps.js` avec le Bloc-notes : chaque application a un `name`, un `tagline` (phrase courte) et une `description`.

## Ajouter une application
1. Copiez le `.apk` dans ce dossier et son icône dans `assets/icons/`.
2. Dans `data/apps.js`, copiez un bloc existant et changez : `id`, `name`, `file`, `icon`, `version`, `size` (en octets), `updated`.
   - Taille : clic droit sur le fichier > Propriétés > « Taille » en octets.
3. Pour un jeu jouable dans le navigateur, copiez le bloc de `parchis` (`"type": "web"`).

## Mettre le site en ligne gratuitement
**GitHub Pages ou Cloudflare Pages** hébergent le site. Attention aux limites de taille : GitHub refuse les fichiers de plus de 100 Mo dans un dépôt classique, et vos APK les plus lourds s'en approchent (MathPrim : 91 Mo).

Solution la plus sûre : mettre les APK dans les **Releases** du dépôt GitHub (jusqu'à 2 Go par fichier), puis indiquer dans `data/apps.js` :

```js
"downloadBase": "https://github.com/VOTRE-NOM/VOTRE-DEPOT/releases/latest/download/"
```

Les boutons « Télécharger » pointeront alors vers les Releases. Les fichiers `.apk` n'ont plus besoin d'être dans le dépôt du site.

## Contact et confidentialité
- L'adresse affichée en bas de page se règle dans `data/apps.js` (`"contact"`). Chaque fiche propose aussi « Signaler un problème », qui ouvre un e-mail déjà rempli. Mettez `""` pour tout masquer.
- La page `confidentialite.html` se construit toute seule à partir du catalogue (autorisations de chaque APK). Les phrases « Ce qu'il faut savoir » sont dans le champ `privacy` de chaque application : relisez-les et adaptez-les si une application change.
- Si vous ajoutez une application, ajoutez-lui aussi ses lignes `privacy`.

## Aperçu quand on partage le lien
`index.html` contient les balises qui affichent un titre, un texte et l'image `assets/og-image.png` quand le lien est partagé sur WhatsApp, Facebook, Telegram…
L'adresse du site est déjà indiquée : `https://bentarcha.github.io/benappli/`. Si vous changez de nom de dépôt ou d'hébergeur, modifiez-la dans les 3 lignes `og:url`, `og:image` et `twitter:image` en haut de `index.html`. Après modification, les réseaux gardent l'ancien aperçu en mémoire un moment ; le « débogueur de partage » de Facebook permet de le rafraîchir.

## Compteur de visites et de téléchargements (facultatif)
Le site utilise [GoatCounter](https://www.goatcounter.com), gratuit et respectueux de la vie privée. Rien n'est mesuré tant que vous ne l'activez pas :
1. Créez un compte sur goatcounter.com et choisissez un code (par exemple `monsite`).
2. Dans `data/apps.js`, écrivez : `"goatcounter": "monsite"`.
3. Remettez le site en ligne. Les visites apparaissent dans votre tableau de bord GoatCounter, ainsi que les clics sur « Télécharger » (`telechargement/…`) et « Jouer » (`jeu/…`) dans la liste des événements.

Le comptage ne fonctionne qu'en ligne, jamais quand vous ouvrez `index.html` directement depuis votre disque. La page de confidentialité l'indique automatiquement.

## Crédits
QR code : [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (licence MIT), dans `assets/vendor/`.

## Pages par application, plan du site (référencement)

Chaque application a sa propre page (`carbuprix/`, `dama8/`...) avec son titre, sa description et des données structurées pour les moteurs de recherche. Elles sont **générées** à partir de `data/apps.js`, ainsi que `sitemap.xml`, `robots.txt` et la liste de liens en bas de `index.html`.

Après toute modification de `data/apps.js` (nouvelle application, texte changé…), relancez :

```
node outils/generer-pages.mjs
```

(Node.js est nécessaire ; ne modifiez pas à la main les pages générées, elles seraient écrasées.)

Pour apparaître dans Google : ajoutez le site dans **Search Console** (propriété « Préfixe d'URL » `https://bentarcha.github.io/benappli/`), puis envoyez `sitemap.xml` dans « Sitemaps ». Note : `robots.txt` n'est pris en compte par les moteurs que s'il est à la racine du domaine ; sur un site de projet GitHub Pages, c'est le plan du site envoyé dans Search Console qui compte.
