# Guide de publication sur GitHub (Mac)

Ce guide met le site en ligne gratuitement avec **GitHub Pages**, uniquement depuis le navigateur (Safari ou Chrome). Aucune commande Terminal n’est nécessaire.

Durée : 20 à 30 minutes la première fois.

Compte GitHub utilisé : **cma972**. Le nouveau dépôt sera **cma972/cma-martinique-cartes-visite**, totalement séparé de `cma972/rapport-cma-2025`.

Adresse publique obtenue à la fin :

```
https://cma972.github.io/cma-martinique-cartes-visite/
```

---

## Avant de commencer : GitHub Pages en bref

**Avantages**
- Gratuit, sans limite de durée, en HTTPS.
- Adresses permanentes : chaque agent garde la même adresse et le même QR code.
- Mise à jour en ligne : on modifie un fichier sur GitHub, le site se met à jour en 1 à 2 minutes.
- Historique complet : chaque modification est enregistrée et peut être annulée.

**Limites à connaître**
- **Dépôt public obligatoire** avec un compte GitHub gratuit. Les fichiers du site (dont `agents.json`) sont donc lisibles par toute personne qui visite la page du dépôt. Ce sont les coordonnées professionnelles déjà imprimées sur les cartes papier, mais elles doivent être validées pour une diffusion publique. Un dépôt **privé** avec GitHub Pages nécessite un abonnement payant (GitHub Pro, Team ou Enterprise).
- L’adresse dépend du nom du compte (`cma972.github.io`). Si l’établissement souhaite plus tard une adresse du type `cartes.cma-martinique.com`, GitHub Pages le permet gratuitement (réglage « Custom domain »), mais **il faut le décider avant d’imprimer les QR codes**, car l’adresse changerait.
- Usage prévu pour un site léger : largement suffisant pour une dizaine de cartes.

---

## Étape 0 – Récupérer le dossier du projet

1. Téléchargez le fichier **cma-martinique-cartes-visite.zip** que je vous ai transmis.
2. Dans le Finder, double-cliquez dessus : un dossier **cma-martinique-cartes-visite** apparaît.
3. Placez-le où vous voulez (par exemple dans **Documents**). Il est indépendant de tout autre projet.

En l’ouvrant, vous devez voir : `index.html`, `404.html`, `README.md`, deux guides, et les dossiers `assets`, `data`, `outils` et un dossier par agent (`anne-catherine-brunet`, `henri-salomon`, …, `sonia-trefle`).

---

## Étape 1 – Créer le dépôt (repository)

1. Allez sur https://github.com et connectez-vous (**Sign in**) avec le compte **cma972**.
   Vérifiez en haut à droite, en cliquant sur la photo de profil, que le nom affiché est bien **cma972**.
2. Cliquez sur le **+** en haut à droite, puis **New repository**.
3. Remplissez :
   - **Owner** : `cma972` (ou l’organisation de la CMA si vous en avez créé une, voir l’encadré plus bas).
   - **Repository name** : `cma-martinique-cartes-visite`
   - **Description** (facultatif) : `Cartes de visite numériques – CMA Martinique`
   - **Visibility** : **Public** (obligatoire pour GitHub Pages gratuit).
   - **Add a README file** : **ne pas cocher** (le dossier en contient déjà un).
   - **.gitignore** et **license** : laisser sur **None**.
4. Cliquez sur **Create repository**.

**Vérifier l’indépendance avec `rapport-cma-2025`**
- L’adresse de la page doit être `https://github.com/cma972/cma-martinique-cartes-visite`.
- La page affiche « Quick setup » : le dépôt est vide, il ne contient rien de l’autre projet.
- Le dépôt `rapport-cma-2025` n’est ni ouvert ni modifié à aucun moment de ce guide.

> **Organisation institutionnelle (facultatif).** Une organisation GitHub (gratuite) permet de rattacher le site à la CMA plutôt qu’à un compte personnel, et de donner l’accès à plusieurs personnes du service communication. L’adresse devient alors `https://NOM-ORGANISATION.github.io/cma-martinique-cartes-visite/`. Pour en créer une : photo de profil → **Your organizations** → **New organization** → plan **Free**. À décider avant d’imprimer les QR codes.

---

## Étape 2 – Importer les fichiers

1. Sur la page du dépôt vide, cliquez sur le lien **uploading an existing file** (dans la phrase « …or upload an existing file »).
2. Dans le Finder, ouvrez le dossier **cma-martinique-cartes-visite**.
3. Sélectionnez **tout son contenu** : cliquez dans le dossier puis **Cmd + A**.
   ⚠️ Sélectionnez le *contenu* du dossier, pas le dossier lui-même : `index.html` doit se retrouver à la racine du dépôt.
4. **Glissez-déposez** la sélection dans la zone « Drag files here » de GitHub.
   Les sous-dossiers (`assets`, `data`, dossiers des agents…) sont conservés automatiquement. Si les dossiers ne sont pas conservés avec Safari, utilisez Google Chrome pour cette étape.
5. Attendez que la liste des fichiers ait fini de se charger (environ 30 fichiers).
6. En bas, dans **Commit changes**, écrivez : `Première version des cartes de visite`.
7. Cliquez sur **Commit changes**.

**Vérifier l’import**
La page du dépôt doit afficher à la racine : `404.html`, `GUIDE-MISE-A-JOUR.md`, `GUIDE-PUBLICATION-GITHUB.md`, `README.md`, `index.html`, et les dossiers `anne-catherine-brunet`, `assets`, `cassandre-marie-louise`, `data`, `evariste-merkiled`, `henri-salomon`, `loren-gallonde`, `michael-rameil`, `outils`, `robine-opont-saintirel`, `sabrina-criart`, `sonia-trefle`, `yannick-prudent`.

Ouvrez `assets` : il doit contenir `css`, `fonts`, `img`, `js`, `vendor`.

Si un dossier manque, recommencez l’étape 2 avec seulement ce dossier (GitHub ajoutera les fichiers sans effacer les autres).

---

## Étape 3 – Activer GitHub Pages

1. Dans le dépôt, cliquez sur l’onglet **Settings** (roue dentée, en haut).
2. Dans le menu de gauche, rubrique **Code and automation**, cliquez sur **Pages**.
3. Dans **Build and deployment** :
   - **Source** : `Deploy from a branch`
   - **Branch** : `main`, dossier `/ (root)`
4. Cliquez sur **Save**.
5. Patientez 1 à 3 minutes puis rechargez la page **Settings → Pages**. Un encadré indique :
   « Your site is live at **https://cma972.github.io/cma-martinique-cartes-visite/** ».
   Cette adresse est l’adresse publique du site. Envoyez-la-moi : je préparerai les QR codes définitifs.
6. Vérifiez que **Enforce HTTPS** est coché (c’est le cas par défaut).

---

## Étape 4 – Vérifier le fonctionnement

### 4.1 Le site et chaque carte
- Ouvrez `https://cma972.github.io/cma-martinique-cartes-visite/` : une page d’accueil neutre s’affiche, **sans liste d’agents**.
- Ouvrez chaque carte en ajoutant l’identifiant de l’agent suivi de `/` :

| Agent | Adresse (à ajouter après `…/cma-martinique-cartes-visite/`) |
| --- | --- |
| Anne Catherine BRUNET | `anne-catherine-brunet/` |
| Henri SALOMON | `henri-salomon/` |
| Cassandre MARIE-LOUISE | `cassandre-marie-louise/` |
| Evariste MERKILED | `evariste-merkiled/` |
| Sabrina CRIART | `sabrina-criart/` |
| Loren GALLONDE | `loren-gallonde/` |
| Michael RAMEIL | `michael-rameil/` |
| Robine OPONT-SAINTIREL | `robine-opont-saintirel/` |
| Yannick PRUDENT | `yannick-prudent/` |
| Sonia TREFLE | `sonia-trefle/` |

Pour chacune : le nom, la fonction, le service et les coordonnées sont-ils exacts ?

### 4.2 Les boutons (sur smartphone)
- **Appeler** : lance l’appel (si l’agent a deux numéros, propose d’abord de choisir Bureau ou Mobile).
- **Envoyer un e-mail** : ouvre la messagerie avec l’adresse déjà remplie.
- **Site de la CMA** : ouvre cma-martinique.com.
- **Partager** : WhatsApp, SMS, e-mail, copier le lien, et « Partager… » (menu du téléphone).
- **QR code** : affiche le QR code, téléchargeable en PNG ou SVG.

### 4.3 Le fichier contact (vCard)
- **iPhone (Safari)** : touchez **Ajouter à mes contacts** → la fiche contact s’ouvre → **Créer un nouveau contact**. Vérifiez les accents (« Secrétaire Générale »), les numéros et l’e-mail.
- **Android (Chrome)** : touchez **Ajouter à mes contacts** → le fichier `.vcf` est téléchargé → touchez la notification ou ouvrez-le depuis **Téléchargements** → choisissez **Contacts**.
- Si la carte est ouverte depuis WhatsApp ou Instagram, le navigateur intégré peut bloquer le téléchargement : utilisez le menu **⋯ → Ouvrir dans le navigateur**.

### 4.4 Les QR codes
- Ouvrez `…/outils/qr-codes.html` sur un ordinateur.
- Avec l’appareil photo d’un **iPhone**, puis d’un **Android**, scannez le QR code affiché à l’écran : la bonne carte doit s’ouvrir.
- Testez aussi un QR code imprimé (taille conseillée : au moins 2 × 2 cm).

---

## Étape 5 – Modifications ultérieures

Toutes les opérations courantes sont décrites dans **GUIDE-MISE-A-JOUR.md** :

| Je veux… | Section du guide |
| --- | --- |
| Modifier les coordonnées d’un agent | 3 |
| Ajouter une nouvelle carte | 4 |
| Désactiver ou supprimer une carte | 5 |
| Générer les QR codes | 6 |
| Mettre à jour le design | 8 |

**Publier une nouvelle version** : il n’y a rien de plus à faire. Chaque **Commit changes** sur GitHub publie automatiquement la nouvelle version en 1 à 2 minutes. L’onglet **Actions** du dépôt affiche une coche verte quand la publication est terminée.

**Remplacer plusieurs fichiers d’un coup** (par exemple après une évolution du design) : **Add file → Upload files**, glissez les fichiers modifiés en respectant leur dossier, puis **Commit changes**. Les fichiers portant le même nom sont remplacés.
