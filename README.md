# Cartes de visite numériques – CMA Martinique

Mini-site de cartes de visite numériques des collaborateurs de la Chambre de Métiers et de l’Artisanat de Martinique.

Chaque collaborateur a sa propre adresse web permanente, par exemple :

```
https://cma972.github.io/cma-martinique-cartes-visite/anne-catherine-brunet/
```

Cette adresse affiche uniquement sa carte : coordonnées, bouton « Ajouter à mes contacts » (fichier vCard), appel, e-mail, site de la CMA, partage et QR code.

Ce projet est indépendant du dépôt `rapport-cma-2025`.

## Documentation

| Document | Pour quoi faire |
| --- | --- |
| [GUIDE-PUBLICATION-GITHUB.md](GUIDE-PUBLICATION-GITHUB.md) | Mettre le site en ligne la première fois (Mac, pas à pas) |
| [GUIDE-MISE-A-JOUR.md](GUIDE-MISE-A-JOUR.md) | Modifier une carte, en ajouter, en désactiver, publier une nouvelle version |

## Contenu du dossier

```
cma-martinique-cartes-visite/
├── index.html                 Page d’accueil neutre (aucune liste d’agents)
├── 404.html                   Page affichée pour une adresse inconnue
├── data/
│   └── agents.json            ← LE SEUL FICHIER À MODIFIER au quotidien
├── anne-catherine-brunet/     Un dossier par agent (nom = adresse permanente)
│   └── index.html             Page identique pour tous les agents
├── …                          (un dossier par agent)
├── outils/
│   └── qr-codes.html          Génération des QR codes (réservée au service communication)
└── assets/                    Design, polices, logo, scripts (à ne pas modifier)
```

## Principes techniques

- Site 100 % statique : HTML, CSS, JavaScript, un fichier JSON. Pas de base de données, pas de compte, aucun abonnement.
- Hébergement gratuit sur GitHub Pages, en HTTPS.
- Les polices (Roboto Slab, Montserrat, Bebas Neue, licence libre OFL) et la bibliothèque QR code (qrcode-generator, licence MIT) sont hébergées dans le site : aucun appel à un service extérieur.
- Les pages sont marquées « noindex » : elles ne sont pas référencées par Google.
- La carte ouverte depuis un QR code est la seule affichée : il n’existe pas d’annuaire public.
