// Données du catalogue — modifiez ce fichier pour changer les textes, ajouter ou retirer une application.
window.SITE = {
  "title": "Mes applications",
  "tagline": "Des applications et des jeux, à télécharger gratuitement ou à jouer en ligne.",
  // Laissez vide si les fichiers .apk sont à côté de index.html.
  // Pour les héberger ailleurs (GitHub Releases...), indiquez l'adresse du dossier, par exemple :
  // "https://github.com/VOTRE-NOM/VOTRE-DEPOT/releases/latest/download/"
  "downloadBase": "https://github.com/bentarcha/benappli/releases/latest/download/",
  // Adresse affichée en bas de page et utilisée par « Signaler un problème » (laissez vide pour la masquer).
  "contact": "belaid.bentarcha@gmail.com",
  // Compteur de visites et de téléchargements (GoatCounter, gratuit). Laissez vide pour ne rien mesurer.
  // Créez un compte sur goatcounter.com, choisissez un code (ex. « monsite ») et écrivez-le ici : "goatcounter": "monsite"
  "goatcounter": ""
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
    "id": "carbuprix",
    "name": "CarbuPrix",
    "category": "outils",
    "type": "android",
    "tagline": "Trouvez la station-service la moins chère ou la plus proche.",
    "description": "CarbuPrix compare les stations-service autour de vous et n'affiche que celles qui sont soit moins chères, soit plus proches que les autres : plus on s'éloigne, plus le prix doit baisser pour que la station mérite le détour. Les prix viennent des données officielles de la France, de l'Espagne et du Portugal. Vous choisissez votre carburant, votre position (ou une adresse sur la carte), puis ouvrez la station dans votre application de cartes.",
    "features": [
      "Deux vues : la moins chère ou la plus proche",
      "Tous les carburants : gazole, essences SP95/SP98, E85, GPL, GNC, hydrogène, AdBlue…",
      "Horaires d'ouverture, stations fermées masquées ou affichées selon vos réglages",
      "Position de l'appareil ou adresse choisie sur la carte",
      "Thème clair ou sombre, palette de couleurs au choix",
      "Une application libre, traduite par sa communauté"
    ],
    "privacy": [
      "Elle demande l'accès à votre position (précise ou approximative) pour classer les stations selon la distance. Vous pouvez aussi saisir une adresse à la place.",
      "Les prix sont téléchargés depuis les sites officiels des données publiques. Pour la France, les noms des stations et les horaires ne sont pas encore tous disponibles : l'application l'indique.",
      "Pour fonctionner, elle contacte des services publics ouverts : OpenStreetMap (recherche d'adresse), OpenFreeMap (fond de carte) et OSRM (distances par la route). Ces services peuvent recevoir votre position ou l'adresse choisie.",
      "Aucune publicité. En cas de plantage, le rapport d'erreur reste sur votre téléphone : c'est vous qui choisissez de le copier, l'enregistrer ou l'envoyer.",
      "Logiciel libre (licence AGPL-3.0) : son code est public et vérifiable."
    ],
    "tags": [
      "carburant",
      "essence",
      "gazole",
      "station-service",
      "prix",
      "carte"
    ],
    "libre": {
      "nom": "Carburoid",
      "auteur": "David García Garzón",
      "licence": "AGPL-3.0",
      "source": "https://github.com/vokimon/carburoid"
    },
    "file": "carbuprix.apk",
    "icon": "assets/icons/carbuprix.png",
    "version": "1.6.5",
    "versionCode": "1060500",
    "package": "net.canvoki.carburoid",
    "size": 37297170,
    "minSdk": 26,
    "permissions": [
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.ACCESS_WIFI_STATE",
      "android.permission.INTERNET"
    ],
    "updated": "2026-11-01"
  }
];
