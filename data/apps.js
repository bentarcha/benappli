// Données du catalogue — modifiez ce fichier pour changer les textes, ajouter ou retirer une application.
window.SITE = {
  "title": "Mes applications (aucune pub)",
  "tagline": "Des applications et des jeux, à télécharger gratuitement ou à jouer en ligne.",
  // Laissez vide si les fichiers .apk sont à côté de index.html.
  // Pour les héberger ailleurs (GitHub Releases...), indiquez l'adresse du dossier, par exemple :
  // "https://github.com/VOTRE-NOM/VOTRE-DEPOT/releases/latest/download/"
  // Adresse publique du site (utilisée par le plan du site et les pages de chaque application).
  "url": "https://bentarcha.github.io/benappli/",
  "downloadBase": "https://github.com/bentarcha/benappli/releases/latest/download/",
  // Adresse affichée en bas de page et utilisée par « Signaler un problème » (laissez vide pour la masquer).
  "contact": "belaid.bentarcha@gmail.com",
  // Compteur de visites et de téléchargements (GoatCounter, gratuit). Laissez vide pour ne rien mesurer.
  // Créez un compte sur goatcounter.com, choisissez un code (ex. « monsite ») et écrivez-le ici : "goatcounter": "monsite"
  "goatcounter": "benappli"
};

window.APPS = [
  {
    "id": "dama8",
    "name": "Dama",
    "category": "jeux",
    "type": "android",
    "tagline": "Jeu de dames 10×10 contre l'ordinateur, en 6 niveaux.",
    "description": "Un jeu de dames sur grand plateau de 10×10 où vous affrontez l'ordinateur. Six niveaux de difficulté vous attendent, du plus doux au plus puissant, qui peut réfléchir jusqu'à 8 secondes par coup. Votre partie est sauvegardée pour être reprise plus tard, et une musique d'ambiance accompagne le jeu.",
    "features": [
      "6 niveaux de difficulté",
      "Partie sauvegardée, à reprendre depuis le menu",
      "Nulle proposée ou acceptée par l'ordinateur",
      "Décompte de vos parties gagnées et perdues",
      "Musique d'ambiance"
    ],
    "privacy": [
      "L'application demande l'accès à Internet.",
      "Elle n'a accès ni à vos photos, ni à vos contacts, ni à vos appels, ni à votre position.",
      "Votre partie en cours est enregistrée sur le téléphone."
    ],
    "tags": [
      "dames",
      "plateau",
      "ordinateur",
      "stratégie"
    ],
    "file": "Dama8.apk",
    "icon": "assets/icons/dama8.svg",
    "screenshots": [
      { "src": "assets/captures/dama8-1.webp", "alt": "Dama8 : l'accueil du jeu de dames avec le niveau de l'ordinateur et les résultats", "w": 720, "h": 1640 },
      { "src": "assets/captures/dama8-2.webp", "alt": "Dama8 : une partie de dames contre l'ordinateur, avec la liste des coups", "w": 720, "h": 1640 }
    ],
    "version": "1.0.0",
    "versionCode": "1",
    "package": "com.example.dames_10x10",
    "size": 64516693,
    "minSdk": 24,
    "permissions": [
      "android.permission.INTERNET"
    ],
    "updated": "2026-11-12"
  },
  {
    "id": "dames-chinoises",
    "name": "Dames chinoises",
    "category": "jeux",
    "type": "android",
    "tagline": "Billes en étoile : 2 à 6 joueurs, contre l'IA ou en ligne.",
    "description": "Le jeu de dames chinoises sur son plateau en étoile : menez toutes vos billes de l'autre côté avant vos adversaires. On y joue de 2 à 6, chaque place étant tenue par un humain ou par l'IA, et un indice peut vous aider quand vous hésitez. Pour jouer avec des amis à distance, créez une partie et partagez le code à 5 caractères.",
    "features": [
      "De 2 à 6 joueurs, humains ou IA",
      "IA facile, moyenne ou difficile",
      "Indice pour trouver un bon coup",
      "Parties en ligne avec un code à 5 caractères (Internet requis)"
    ],
    "privacy": [
      "Pour les parties en ligne, l'application échange avec une base de données Firebase (Google) les informations nécessaires à la partie : code du salon et coups joués.",
      "Elle n'a accès ni à vos photos, ni à vos contacts, ni à vos appels, ni à votre position."
    ],
    "tags": [
      "billes",
      "étoile",
      "plateau",
      "en ligne",
      "famille"
    ],
    "file": "Dames-chinoises.apk",
    "icon": "assets/icons/dames-chinoises.png",
    "screenshots": [
      { "src": "assets/captures/dames-chinoises-1.webp", "alt": "Plateau de dames chinoises au début de la partie : vos billes jaunes en bas, celles de l'ordinateur en haut", "w": 780, "h": 1688 },
      { "src": "assets/captures/dames-chinoises-2.webp", "alt": "Dames chinoises en cours de partie : les billes se croisent au centre du plateau", "w": 780, "h": 1688 }
    ],
    "version": "1.0",
    "versionCode": "1",
    "package": "com.dameschinoises.app",
    "size": 5042651,
    "minSdk": 24,
    "permissions": [
      "android.permission.INTERNET"
    ],
    "updated": "2026-11-04"
  },
  {
    "id": "parchis",
    "name": "Parchís",
    "category": "jeux",
    "type": "web",
    "tagline": "Parchís à 4 joueurs et 2 dés, dans le navigateur.",
    "description": "Le Parchís à quatre joueurs et deux dés, à jouer directement dans la page, sans rien installer. Pour chaque coin du plateau, choisissez un joueur humain ou l'ordinateur (facile, normal ou difficile). Les règles de cette version sont à portée de clic : pions sortis avec un 5, barrières, doubles qui font rejouer, pions mangés qui rapportent 20 cases.",
    "features": [
      "Humains et ordinateur, au choix pour chaque coin",
      "3 niveaux d'ordinateur",
      "Règles consultables pendant la partie",
      "Journal des coups et classement final",
      "Sons activables ou coupables"
    ],
    "privacy": [
      "Le jeu s'exécute dans votre navigateur. Il peut enregistrer des réglages et la partie en cours dans le stockage de votre navigateur.",
      "Aucun compte n'est nécessaire."
    ],
    "tags": [
      "dés",
      "plateau",
      "navigateur",
      "sans installation"
    ],
    "url": "parchis.html",
    "icon": "assets/icons/parchis.svg",
    "screenshots": [
      { "src": "assets/captures/parchis-1.webp", "alt": "Parchís : le plateau et les dés en début de partie", "w": 780, "h": 1688 },
      { "src": "assets/captures/parchis-2.webp", "alt": "Parchís en pleine partie : les destinations possibles sont en pointillés", "w": 780, "h": 1688 }
    ],
    "version": "web",
    "updated": "2026-11-13"
  },
  {
    "id": "tangram",
    "name": "Tangram",
    "category": "jeux",
    "type": "android",
    "tagline": "Reconstituez des silhouettes avec les sept pièces.",
    "description": "Un tangram à jouer au doigt : déplacez et faites pivoter les pièces pour recomposer des silhouettes (un poisson, une maison, un vautour…). Les défis sont proposés en niveaux facile et difficile. Si vous séchez, vous pouvez consulter la solution, mais le défi n'est alors pas compté. Vos records sont enregistrés.",
    "features": [
      "Silhouettes à reconstituer",
      "Niveaux facile et difficile",
      "Solution consultable (le défi n'est alors pas compté)",
      "Records enregistrés",
      "Musique que l'on peut couper"
    ],
    "privacy": [
      "L'application ne demande aucune autorisation : elle n'accède pas à Internet, ni à vos photos, contacts, appels ou position.",
      "Vos records sont enregistrés sur le téléphone."
    ],
    "tags": [
      "casse-tête",
      "formes",
      "logique",
      "records"
    ],
    "file": "Tangram.apk",
    "icon": "assets/icons/tangram.png",
    "screenshots": [
      { "src": "assets/captures/tangram-1.webp", "alt": "Tangram : une silhouette à reconstituer avec les sept pièces colorées", "w": 720, "h": 1640 },
      { "src": "assets/captures/tangram-2.webp", "alt": "Tangram : la solution affichée, pièce par pièce", "w": 720, "h": 1640 }
    ],
    "version": "1.0.0",
    "versionCode": "1",
    "package": "fr.codex.tangram",
    "size": 54690810,
    "minSdk": 24,
    "permissions": [],
    "updated": "2026-10-29"
  },
  {
    "id": "mathprim",
    "name": "MathPrim",
    "altName": "رياضيات الأسد",
    "category": "education",
    "type": "android",
    "tagline": "Maths du CE1 au CM2, en français et en arabe.",
    "description": "Une application de mathématiques pour les élèves du CE1 au CM2, entièrement bilingue français–arabe (« رياضيات الأسد », les maths du lion). L'enfant choisit sa classe puis s'entraîne : calcul mental, opérations, tables, fractions, décimaux, géométrie, horloge, problèmes… Trois jeux (le compte est bon, memory de calculs, symétrie) rendent l'entraînement plus ludique. Les parents règlent le chrono, les sons et les récompenses.",
    "features": [
      "Du CE1 au CM2, interface français / arabe",
      "Calcul, fractions, décimaux, géométrie, horloge, problèmes…",
      "Jeux : le compte est bon, memory, symétrie",
      "Plusieurs profils d'enfants, récompenses choisies par les parents",
      "Voix française intégrée ; données gardées sur l'appareil"
    ],
    "privacy": [
      "Les profils d'enfants, les progrès et les réglages restent enregistrés sur l'appareil.",
      "La voix française est lue par l'application elle-même.",
      "Seules les autorisations Internet et vibration sont demandées."
    ],
    "tags": [
      "maths",
      "primaire",
      "enfants",
      "français",
      "arabe"
    ],
    "file": "MathPrim.apk",
    "icon": "assets/icons/mathprim.png",
    "screenshots": [
      { "src": "assets/captures/mathprim-1.webp", "alt": "MathPrim : l'accueil avec le défi du jour, le sprint et les thèmes de calcul", "w": 780, "h": 1688 },
      { "src": "assets/captures/mathprim-2.webp", "alt": "MathPrim : une multiplication à résoudre avec le clavier numérique", "w": 780, "h": 1688 }
    ],
    "version": "1.0",
    "versionCode": "1",
    "package": "fr.mathprim.app",
    "size": 90957054,
    "minSdk": 23,
    "permissions": [
      "android.permission.INTERNET",
      "android.permission.VIBRATE"
    ],
    "updated": "2026-11-08"
  },
  {
    "id": "plantes",
    "name": "Plantes",
    "category": "outils",
    "type": "android",
    "tagline": "Photographiez une plante, découvrez son nom.",
    "description": "Prenez une plante en photo, ou choisissez une image dans votre galerie : l'application l'envoie au service d'identification Pl@ntNet et affiche les plantes qui correspondent, ou vous prévient quand aucune n'a été reconnue. Une connexion Internet est nécessaire.",
    "features": [
      "Appareil photo ou galerie",
      "Identification par le service Pl@ntNet",
      "Connexion Internet requise"
    ],
    "privacy": [
      "Pour identifier une plante, la photo prise ou choisie est envoyée au service Pl@ntNet, qui applique sa propre politique de confidentialité.",
      "L'application demande l'accès à l'appareil photo et aux fichiers du téléphone pour cela.",
      "Les modules Google ML Kit utilisés peuvent envoyer des données techniques anonymes (performances, erreurs) à Google."
    ],
    "tags": [
      "photo",
      "nature",
      "identification",
      "Pl@ntNet"
    ],
    "file": "Plantes.apk",
    "icon": "assets/icons/plantes.webp",
    "version": "1.0",
    "versionCode": "1",
    "package": "com.example.plantes2",
    "size": 24004010,
    "minSdk": 24,
    "permissions": [
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.CAMERA",
      "android.permission.INTERNET",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE"
    ],
    "updated": "2026-10-30"
  },
  {
    "id": "stop-spam",
    "name": "Stop Spam",
    "category": "outils",
    "type": "android",
    "tagline": "Bloque automatiquement les appels de démarchage.",
    "description": "Stop Spam se déclare comme application de filtrage d'appels et bloque les appels dont le numéro commence par l'un de vos préfixes actifs. L'écran d'accueil indique si la protection est active et combien d'appels ont été bloqués aujourd'hui, cette semaine et ce mois-ci. Pour Android 12 ou plus récent.",
    "features": [
      "Blocage selon des préfixes de numéros",
      "Compteurs : jour, semaine, mois",
      "Historique des appels bloqués, avec le préfixe concerné",
      "À activer comme filtre d'appels par défaut (guide intégré)"
    ],
    "privacy": [
      "L'application lit le journal d'appels et l'état du téléphone pour reconnaître les numéros à bloquer.",
      "Elle ne demande pas l'accès à Internet.",
      "L'historique des appels bloqués est enregistré sur le téléphone, et vous pouvez l'effacer."
    ],
    "tags": [
      "téléphone",
      "démarchage",
      "appels",
      "préfixes"
    ],
    "file": "Stop-Spam.apk",
    "icon": "assets/icons/stop-spam.svg",
    "screenshots": [
      { "src": "assets/captures/stop-spam-1.webp", "alt": "Stop Spam : la protection est active, avec le compteur d'appels bloqués", "w": 720, "h": 1640 },
      { "src": "assets/captures/stop-spam-2.webp", "alt": "Stop Spam : la gestion des préfixes de démarchage téléphonique", "w": 720, "h": 1640 }
    ],
    "version": "1.0.2",
    "versionCode": "3",
    "package": "com.stopdemarchage",
    "size": 64480863,
    "minSdk": 31,
    "permissions": [
      "android.permission.ANSWER_PHONE_CALLS",
      "android.permission.POST_NOTIFICATIONS",
      "android.permission.READ_CALL_LOG",
      "android.permission.READ_PHONE_STATE"
    ],
    "updated": "2026-10-31"
  },
  {
    "id": "recherche-image",
    "name": "Recherche Image",
    "category": "outils",
    "type": "android",
    "tagline": "Retrouvez une photo grâce au texte qu'elle contient.",
    "description": "L'application lit le texte présent sur les images de votre galerie (captures d'écran, documents, tickets, affiches…) grâce à une reconnaissance de caractères intégrée. Il suffit ensuite de taper ou de dicter un mot pour retrouver les photos où il apparaît. Seules les nouvelles images sont analysées lors des mises à jour.",
    "features": [
      "Lecture du texte des images (OCR) intégrée à l'application",
      "Recherche par mot, tapé ou dicté à la voix",
      "Seules les nouvelles images sont analysées",
      "Résultats affichables en plein écran"
    ],
    "privacy": [
      "Le texte des images est lu sur le téléphone, par un module intégré à l'application ; les résultats de l'analyse sont conservés sur l'appareil.",
      "Si vous dictez un mot, la reconnaissance vocale est assurée par le service vocal d'Android (en général celui de Google) et non par l'application.",
      "Les modules Google ML Kit utilisés peuvent envoyer des données techniques anonymes (performances, erreurs) à Google."
    ],
    "tags": [
      "texte",
      "OCR",
      "galerie",
      "recherche",
      "images"
    ],
    "file": "Texte-image.apk",
    "icon": "assets/icons/recherche-image.webp",
    "version": "1.0",
    "versionCode": "1",
    "package": "com.example.recherchefichier",
    "size": 49107214,
    "minSdk": 26,
    "permissions": [
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.INTERNET",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.READ_MEDIA_IMAGES"
    ],
    "updated": "2026-03-09"
  },
  {
    "id": "visages",
    "name": "Visages",
    "category": "outils",
    "type": "android",
    "tagline": "Retrouvez une personne dans votre galerie.",
    "description": "À partir d'un visage de référence, l'application cherche la même personne dans vos photos. Trois étapes suffisent : choisir un visage, laisser l'application parcourir la galerie, consulter les résultats. La recherche se fait localement, sur le téléphone.",
    "features": [
      "Un seul visage de référence suffit",
      "Recherche locale, sur le téléphone",
      "Demande l'accès à vos photos et à l'appareil photo"
    ],
    "privacy": [
      "L'analyse des visages est effectuée sur le téléphone, avec un modèle intégré à l'application.",
      "Elle demande l'accès à vos photos et à l'appareil photo.",
      "Les modules Google ML Kit utilisés peuvent envoyer des données techniques anonymes (performances, erreurs) à Google."
    ],
    "tags": [
      "visages",
      "photos",
      "galerie",
      "recherche"
    ],
    "file": "Visages2.apk",
    "icon": "assets/icons/visages.webp",
    "version": "3.0",
    "versionCode": "3",
    "package": "com.belaid.visages",
    "size": 85481760,
    "minSdk": 33,
    "permissions": [
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.CAMERA",
      "android.permission.INTERNET",
      "android.permission.READ_MEDIA_IMAGES"
    ],
    "updated": "2026-10-20"
  },
  {
    "id": "liste-courses",
    "name": "Mes courses",
    "category": "outils",
    "type": "android",
    "tagline": "La liste de courses de la maison, partagée entre les téléphones.",
    "description": "Mes courses est un catalogue de produits courants, rangés par rayon : fruits et légumes, viandes et poissons, produits laitiers, pains et brioches, épicerie, surgelés, boissons, hygiène et entretien. Cochez un produit pour l'ajouter à la liste de courses, décochez-le une fois dans le panier. Vous pouvez aussi ajouter vos propres produits. Si vous le souhaitez, créez une « maison » et partagez son code : la liste est alors synchronisée entre les téléphones de la famille. Une fois installée, l'application apparaît sur le téléphone sous le nom « ListeCourses Maison ».",
    "features": [
      "Un catalogue de produits courants classés par rayon",
      "Ajout de vos propres produits, avec leur catégorie",
      "Liste de courses : cochez pour ajouter, décochez ou videz en un geste",
      "Partage de la liste à la famille avec un code de maison, facultatif",
      "Fonctionne sans Internet : les changements sont envoyés au retour de la connexion",
      "Trois thèmes de couleur au choix"
    ],
    "privacy": [
      "La liste est enregistrée sur le téléphone. Tant que vous ne créez pas ou ne rejoignez pas de « maison », rien ne la quitte.",
      "Si vous utilisez une maison partagée, vos articles, le nom de la maison et son code sont enregistrés sur les serveurs Firebase de Google, pour être synchronisés entre les téléphones.",
      "Le code de la maison permet de rejoindre la liste partagée : ne le donnez qu'à des personnes de confiance.",
      "Aucune publicité, et aucun outil de mesure d'audience ni de rapport d'erreurs dans l'application."
    ],
    "tags": [
      "courses",
      "liste",
      "famille",
      "supermarché",
      "partage"
    ],
    "file": "Mes-courses.apk",
    "icon": "assets/icons/liste-courses.svg",
    "screenshots": [
      { "src": "assets/captures/liste-courses-1.webp", "alt": "Mes courses : trois produits cochés dans la liste de pains et brioches", "w": 720, "h": 1640 },
      { "src": "assets/captures/liste-courses-2.webp", "alt": "Mes courses : la liste de courses du jour avec les produits cochés", "w": 720, "h": 1640 }
    ],
    "version": "1.0",
    "versionCode": "1",
    "package": "fr.maison.listecourses",
    "size": 6806976,
    "minSdk": 24,
    "permissions": [
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.INTERNET"
    ],
    "updated": "2026-10-24"
  }
];
