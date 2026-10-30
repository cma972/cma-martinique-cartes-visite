# Guide de mise à jour des cartes

Toutes les informations des collaborateurs sont dans **un seul fichier** : `data/agents.json`.
Vous pouvez le modifier directement sur le site de GitHub, sans rien installer.

> **Règle d’or : ne modifiez jamais le champ `"id"` d’un agent.**
> Il correspond à son adresse web et à son QR code. Tout le reste peut changer librement.

---

## 1. Modifier un fichier sur GitHub (méthode générale)

1. Ouvrez https://github.com/cma972/cma-martinique-cartes-visite
2. Cliquez sur le dossier **data**, puis sur le fichier **agents.json**.
3. Cliquez sur l’icône **crayon** (« Edit this file »), en haut à droite du fichier.
4. Faites votre modification.
5. Cliquez sur le bouton vert **Commit changes…**, écrivez une courte description (ex. « Nouveau numéro pour S. Criart »), puis **Commit changes**.
6. Patientez 1 à 2 minutes : le site se met à jour tout seul. Rechargez la carte pour vérifier.

Si un message rouge apparaît sur la carte (« Chargement impossible »), c’est souvent une virgule ou un guillemet oublié dans le fichier : voir la section 7.

---

## 2. Comprendre la fiche d’un agent

```json
{
  "id": "sabrina-criart",
  "actif": true,
  "prenom": "Sabrina",
  "nom": "Criart",
  "fonction": "Adjointe de Direction",
  "service": "Direction Entreprises – Pôle Développement Économique",
  "telephones": [
    { "type": "bureau", "numero": "0596 71 29 96" },
    { "type": "mobile", "numero": "0696 01 49 83" }
  ],
  "email": "s.criart@cma-martinique.com",
  "photo": ""
}
```

| Champ | Rôle |
| --- | --- |
| `id` | Adresse permanente. **Ne jamais modifier.** Minuscules, sans accent, mots séparés par des tirets. |
| `actif` | `true` = carte visible ; `false` = carte désactivée. |
| `prenom` / `nom` | Le nom s’affiche automatiquement en MAJUSCULES. Écrivez-le normalement (ex. `Marie-Louise`). |
| `fonction` | Intitulé du poste. |
| `service` | Service ou direction. Laissez `""` si non utilisé : la ligne disparaît. |
| `telephones` | Un ou plusieurs numéros. `type` vaut `bureau` ou `mobile`. Écrivez le numéro comme sur la carte papier. |
| `email` | Adresse professionnelle. Laissez `""` pour la masquer. |
| `photo` | Facultatif. Laissez `""` (aucune photo). |
| `logo` | Facultatif. Logo complémentaire affiché à droite du nom (ex. CMA Formation pour Yannick Prudent). Chemin du fichier image placé dans `assets/img/`. Absent ou `""` = pas de logo. |
| `logoTexte` | Description du logo pour les personnes malvoyantes (ex. `"CMA Formation – Rivière-Salée"`). |
| `etablissement` | Facultatif. `"riviere-salee"` pour les agents de CMA Formation Rivière-Salée : la carte affiche alors le nom et l’adresse de ce site. Absent = Fort-de-France. Les sites sont définis dans `"etablissements"`, en haut du fichier. |
| `emailSecondaire` | Facultatif. Deuxième adresse e-mail (ex. adresse `edu`), affichée sous « Autre e-mail ». |

**Numéros de téléphone** : un numéro peut avoir un libellé précis avec `"libelle"`, par exemple `{ "type": "bureau", "numero": "0596 68 09 14", "libelle": "Standard" }`. Sans libellé, la carte affiche « Bureau » ou « Mobile » selon le `type`.

**Particules** : un nom comme `"de Percin"` s’affiche « de PERCIN » (la particule reste en minuscules).

Les accents sont acceptés partout, sauf dans `id`.

---

## 3. Modifier les coordonnées d’un agent

Exemple : changer le mobile de Michael Rameil.

1. Ouvrez `data/agents.json` en modification (section 1).
2. Repérez le bloc `"id": "michael-rameil"`.
3. Remplacez uniquement le numéro entre guillemets : `"0696 28 70 97"` → `"0696 XX XX XX"`.
4. Validez avec **Commit changes**.

L’adresse et le QR code de l’agent ne changent pas : les cartes déjà imprimées restent valables.

- **Retirer un numéro** : supprimez sa ligne `{ "type": … }`. Attention à la virgule : il n’y a pas de virgule après le dernier numéro de la liste.
- **Changer la fonction** : modifiez le texte de `"fonction"`.

---

## 4. Ajouter une nouvelle carte

Deux étapes : ajouter la fiche, puis créer le dossier de l’agent.

### Étape A – Ajouter la fiche dans `agents.json`

1. Ouvrez `data/agents.json` en modification.
2. Allez à la **dernière fiche** de la liste (juste avant `]` puis `}` en fin de fichier).
3. Après son accolade fermante `}`, ajoutez **une virgule**, puis collez ce modèle :

```json
    {
      "id": "prenom-nom",
      "actif": true,
      "prenom": "Prénom",
      "nom": "Nom",
      "fonction": "Fonction",
      "service": "",
      "telephones": [
        { "type": "bureau", "numero": "0596 00 00 00" }
      ],
      "email": "p.nom@cma-martinique.com",
      "photo": ""
    }
```

4. Remplacez les valeurs. Pour `id` : prénom et nom en minuscules, sans accent, séparés par des tirets (ex. `jose-eloise-saint-ange`).
5. **Commit changes**.

### Étape B – Créer le dossier de l’agent

La page de chaque agent est identique : il suffit d’en copier une sous un nouveau nom.

1. Sur la page d’accueil du dépôt, ouvrez le dossier d’un agent existant (ex. **sonia-trefle**), puis le fichier **index.html**.
2. Cliquez sur l’icône **Copy raw file** (deux carrés superposés, en haut à droite du fichier) pour copier tout le contenu.
3. Revenez à la page d’accueil du dépôt et cliquez sur **Add file → Create new file**.
4. Dans le champ du nom, tapez : `prenom-nom/index.html` (exactement le même `id` qu’à l’étape A, suivi de `/index.html`). Le `/` crée le dossier automatiquement.
5. Collez le contenu copié, puis **Commit changes**.
6. Après 1 à 2 minutes, la carte est en ligne à l’adresse `https://cma972.github.io/cma-martinique-cartes-visite/prenom-nom/`.
7. Générez son QR code (section 6).

---

## 5. Désactiver ou supprimer une carte

**Recommandé : désactiver.** Dans la fiche de l’agent, remplacez `"actif": true` par `"actif": false`.
Le QR code reste lisible mais affiche « Carte non disponible » avec un lien vers le site de la CMA. Vous pouvez réactiver la carte plus tard en remettant `true`.

**Supprimer définitivement** (si l’agent a quitté l’établissement) :
1. Supprimez sa fiche dans `agents.json` (de l’accolade `{` à l’accolade `}`, avec la virgule qui la sépare de la fiche voisine).
2. Ouvrez son dossier, puis son fichier `index.html`, cliquez sur **⋯ → Delete file**, puis **Commit changes**.
Le QR code mènera alors vers une page « Page introuvable ».

---

## 6. Générer ou télécharger les QR codes

- **Tous les agents** : ouvrez `https://cma972.github.io/cma-martinique-cartes-visite/outils/qr-codes.html`.
  Chaque agent a son QR code, avec un bouton **PNG** (haute définition, nom de l’agent sous le code) et **SVG** (vectoriel, idéal pour l’imprimeur).
  Cette page n’est reliée à aucune carte et n’est pas référencée par Google.
- **Un agent depuis sa carte** : bouton **QR code** en bas de sa carte, puis PNG, SVG ou « Partager le QR code ».

- **Cartes papier avec QR code** : ouvrez `https://cma972.github.io/cma-martinique-cartes-visite/outils/impression.html`, puis cliquez sur **Imprimer**. La page prépare des planches A4 de 10 cartes (95 × 55 mm) : une feuille recto (QR code nominatif) et une feuille verso (visuel CMA). Réglages d’impression : échelle 100 %, marges « Aucune », recto verso bord long, papier épais.

Un QR code ne change jamais tant que le champ `id` reste le même.

---

## 7. En cas de problème

| Symptôme | Cause probable | Solution |
| --- | --- | --- |
| « Chargement impossible » sur toutes les cartes | Erreur de syntaxe dans `agents.json` | Vérifiez virgules et guillemets autour de la dernière modification. Vous pouvez coller le fichier sur https://jsonlint.com pour localiser l’erreur. |
| « Carte introuvable » | Le nom du dossier et le `id` ne sont pas identiques | Corrigez le nom du dossier ou le `id` pour qu’ils correspondent exactement. |
| La modification n’apparaît pas | Le site n’est pas encore à jour, ou le navigateur garde l’ancienne version | Attendez 2 minutes, puis rechargez la page. Onglet **Actions** du dépôt : une coche verte indique que la publication est terminée. |
| Erreur à annuler | — | Dans GitHub, onglet **Commits**, ouvrez la modification précédente pour retrouver l’ancien texte et le recopier. |

---

## 8. Mettre à jour le design

Le design est réparti dans des fichiers qu’il n’est pas nécessaire de toucher au quotidien :

- `assets/css/carte.css` : couleurs, tailles, espacements. Les couleurs officielles sont regroupées en haut du fichier (`--corail`, `--rouge`, etc.).
- `assets/js/carte.js` : structure de la carte et fonctions (vCard, partage, QR code).

Toute modification de ces fichiers s’applique **à toutes les cartes à la fois**. Pour un changement de design, il est conseillé de le faire avec l’aide d’un développeur ou de Claude, puis de le publier comme n’importe quelle modification.

## 9. Coordonnées de l’établissement

Le nom, l’adresse, le site internet et les réseaux sociaux de la CMA sont dans le bloc `"organisation"` en haut de `agents.json`. Une modification à cet endroit s’applique à toutes les cartes.

Un agent peut avoir ses propres réseaux sociaux en ajoutant un champ `"reseaux"` à sa fiche (voir la fiche de Yannick Prudent).
