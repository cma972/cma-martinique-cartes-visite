/* ==========================================================================
   Cartes de visite numériques – CMA Martinique
   Affiche la carte de l'agent dont l'identifiant correspond au nom du dossier
   (ex. /anne-catherine-brunet/). Les données viennent de data/agents.json.
   Aucun fichier de ce script n'a besoin d'être modifié pour mettre à jour
   une carte : tout se fait dans data/agents.json.
   ========================================================================== */
(function () {
  "use strict";

  /* ----- Icônes (traits simples, 24×24) -------------------------------- */
  var ICONES = {
    telephone: '<path d="M5 3.5h3.2l1.6 4-2.1 1.3a11 11 0 0 0 5.5 5.5l1.3-2.1 4 1.6V17a2.5 2.5 0 0 1-2.7 2.5A15.5 15.5 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5Z"/>',
    mobile: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    email: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    web: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5c-2.6-2.7-3.9-5.9-3.9-9.5S9.4 5.2 12 2.5Z"/>',
    lieu: '<path d="M12 21.5s-7-6.1-7-11.6a7 7 0 0 1 14 0c0 5.5-7 11.6-7 11.6Z"/><circle cx="12" cy="9.8" r="2.6"/>',
    ajouter: '<circle cx="9.5" cy="8" r="4"/><path d="M2.5 20.5c.6-3.9 3.4-6 7-6s6.4 2.1 7 6M19 8v6M16 11h6"/>',
    partager: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><path d="M14 14h3v3h-3zM20 14v.01M17 20h4M14 20v.01M20 17v3"/>',
    fermer: '<path d="M6 6l12 12M18 6 6 18"/>',
    fleche: '<path d="m9 5 7 7-7 7"/>',
    copier: '<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>',
    telecharger: '<path d="M12 3.5v12M7 10.5l5 5 5-5M4 20.5h16"/>',
    sms: '<path d="M4.5 4.5h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-5 3.5v-3.5h-.5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
    whatsapp: '<path d="M3.5 20.5 4.8 16A8.8 8.8 0 1 1 8 19.3Z"/><path d="M9 8.2c.3-.6.7-.6 1-.6l.6.1.9 2.1-.7 1c.6 1.2 1.6 2.2 2.8 2.8l1-.7 2.1.9c0 .4 0 .8-.5 1.3-.6.6-1.6.8-2.6.4a9.4 9.4 0 0 1-4.9-4.9c-.4-1-.3-1.9.3-2.4Z"/>',
    facebook: '<path d="M14.5 21.5v-8h2.8l.5-3.3h-3.3V8.1c0-.9.4-1.7 1.8-1.7h1.6V3.6s-1.4-.3-2.8-.3c-2.8 0-4.4 1.7-4.4 4.7v2.2H8v3.3h3.2v8"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8h.01"/>',
    natif: '<path d="M12 15.5V3.5M7.5 8 12 3.5 16.5 8"/><path d="M8 11.5H6.5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H16"/>'
  };

  function icone(nom) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONES[nom] + "</svg>";
  }

  /* Monogramme CMA, tracé vectoriel repris du fichier d'impression officiel */
  var LOGO_CMA =
    '<path d="M 258.41 66.2 L 246.07 66.2 L 243.29 74.38 C 243.29 74.38 253.06 75.61 259.55 69.47Z M 258.41 66.2"/>' +
    '<path d="M 235.32 61.55 C 235.32 64.83 235.97 67.96 237.16 70.8 L 247.89 40.44 C 240.41 44.45 235.32 52.4 235.32 61.55"/>' +
    '<path d="M 265.2 42.45 C 262.61 41.13 259.09 40.13 256.26 39.82 L 256.18 39.82 L 264.01 62.83 C 266.33 58.66 268.55 49.75 265.2 42.45"/>' +
    '<path d="M 209.55 71.86 C 211.64 72.16 214.04 72.06 216.61 71.56 C 216 69.91 211.88 58.57 211.64 57.92 C 211.31 60.08 211.19 61 209.55 71.86 M 223.73 57.92 C 223.5 58.53 219.79 68.38 218.75 71.11 C 220.84 70.55 223.01 69.75 225.2 68.71 C 224.68 64.89 223.8 58.45 223.73 57.92"/>' +
    '<path d="M 208.02 50.86 C 206.9 51.62 205.05 53.26 203.64 56.39 C 201.05 62.14 203.46 67.07 204.91 69.27Z M 208.02 50.86"/>' +
    '<path d="M 212.62 48.99 C 213.84 52.02 217.87 62 218.08 62.52 C 218.29 61.99 222.25 51.72 223.36 48.87 C 218.95 48.19 215.04 48.3 212.62 48.99"/>' +
    '<path d="M 232.12 55.42 C 231.4 52.66 230.04 50.79 227.34 49.95 L 229.75 65.89 C 233.04 62.74 232.84 58.18 232.12 55.42"/>' +
    '<path d="M 235.14 80.73 C 206.9 80.73 190.67 73.29 190.67 61.76 C 190.67 50.27 205.96 43.01 231.38 42.18 C 232.09 42.15 233.09 42.13 234.37 42.11 C 234.91 42.11 235.35 41.66 235.34 41.11 C 235.34 41.01 235.32 40.9 235.29 40.8 C 235.03 40.04 234.3 39.52 233.48 39.54 C 232.46 39.55 231.66 39.57 231.08 39.59 C 200.93 40.53 182.87 49.75 182.87 61.7 C 182.87 76.76 207.36 83.38 232.8 83.38 C 243.97 83.38 255.84 82.22 268.38 79.9 C 269.03 79.78 269.46 79.15 269.34 78.5 C 269.33 78.45 269.32 78.39 269.3 78.33 C 269.04 77.58 268.27 77.13 267.5 77.28 C 255.36 79.58 244.57 80.73 235.14 80.73"/>' +
    '<path d="M 247.89 60.37 L 256.48 60.37 L 252.21 47.18Z M 247.89 60.37"/>';

  /* Recto : reproduction vectorielle du recto imprimé (985 × 563 + marge) */
  function recto(site) {
    return (
      '<svg viewBox="0 0 985 640" role="img" aria-label="CMA Martinique – CMA, artisan de votre réussite">' +
      "<defs>" +
      '<linearGradient id="degrade-pli" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#B92A31"/><stop offset=".2" stop-color="#A6151B"/><stop offset="1" stop-color="#A31519"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<g class="ruban">' +
      '<path class="ruban-lame" fill="#FFFFFF" d="M330 526C352 452 392 262 408 178c6-30 22-47 44-50l73 12c-17 80-37 178-53 242-16 68-52 112-142 144Z"/>' +
      '<path class="ruban-pli" fill="url(#degrade-pli)" d="M446 129 598 52c14-6 32-7 50-4l297 77c-40 25-73 60-125 71-14 2-30 1-44-2L525 141Z"/>' +
      "</g>" +
      '<svg x="38" y="36" width="224" height="115" viewBox="182.6 39.3 87.6 44.9" fill="#FFFFFF" fill-rule="evenodd" aria-hidden="true">' + LOGO_CMA + "</svg>" +
      '<rect x="86" y="163" width="136" height="38" rx="7" fill="#FFFFFF"/>' +
      '<text class="badge-texte" x="154" y="193" text-anchor="middle">MARTINIQUE</text>' +
      '<text class="site" x="45" y="447">' + echapper(site) + "</text>" +
      '<text class="slogan"><tspan class="cma" x="530" y="388">CMA,</tspan><tspan x="530" y="452">artisan</tspan><tspan x="530" y="515">de votre réussite</tspan></text>' +
      "</svg>"
    );
  }

  /* ----- Outils --------------------------------------------------------- */
  function echapper(texte) {
    return String(texte == null ? "" : texte)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* 0596 71 32 22 → +596596713222 (Martinique, indicatif +596) */
  function numeroInternational(numero) {
    var n = String(numero).replace(/[^\d+]/g, "");
    if (n.charAt(0) === "+") return n;
    if (n.indexOf("00") === 0) return "+" + n.slice(2);
    if (n.length === 10 && n.charAt(0) === "0") return "+596" + n.slice(1);
    return n;
  }

  function nomComplet(agent) {
    return agent.prenom + " " + agent.nom.toUpperCase();
  }

  function slugDepuisAdresse() {
    if (window.CMA_AGENT) return window.CMA_AGENT;
    var morceaux = location.pathname.split("/").filter(function (m) { return m && m !== "index.html"; });
    return decodeURIComponent(morceaux[morceaux.length - 1] || "");
  }

  /* Adresse permanente de la carte (utilisée pour le QR code et le partage) */
  function adresseCarte(org, agent) {
    if (window.CMA_ADRESSE_APERCU) return window.CMA_ADRESSE_APERCU;
    var base = (org.adresseDuSitePublic || "").trim();
    if (base) return base.replace(/\/?$/, "/") + agent.id + "/";
    return new URL("./", location.href).href;
  }

  var toastMinuterie;
  function toast(message) {
    var el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(toastMinuterie);
    toastMinuterie = setTimeout(function () { el.classList.remove("visible"); }, 2400);
  }

  function telechargerFichier(blob, nomFichier) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = nomFichier;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function copier(texte) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texte).catch(function () { return copierAncien(texte); });
    }
    return copierAncien(texte);
  }
  function copierAncien(texte) {
    return new Promise(function (ok, ko) {
      var zone = document.createElement("textarea");
      zone.value = texte;
      zone.setAttribute("readonly", "");
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.appendChild(zone);
      zone.select();
      var reussi = false;
      try { reussi = document.execCommand("copy"); } catch (e) { reussi = false; }
      zone.remove();
      reussi ? ok() : ko();
    });
  }

  /* ----- vCard (format 3.0, UTF-8 : accents conservés) ------------------ */
  function vcardEchapper(v) {
    return String(v || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  }

  function creerVcard(org, agent, adresse) {
    var a = org.adresse || {};
    var lignes = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:" + vcardEchapper(agent.nom) + ";" + vcardEchapper(agent.prenom) + ";;;",
      "FN:" + vcardEchapper(agent.prenom + " " + agent.nom),
      "ORG:" + vcardEchapper(org.nom.replace(/’/g, "'")) + (agent.service ? ";" + vcardEchapper(agent.service) : "")
    ];
    if (agent.fonction) lignes.push("TITLE:" + vcardEchapper(agent.fonction.replace(/’/g, "'")));
    (agent.telephones || []).forEach(function (t) {
      var type = t.type === "mobile" ? "CELL,VOICE,WORK" : "WORK,VOICE";
      lignes.push("TEL;TYPE=" + type + ":" + numeroInternational(t.numero));
    });
    if (agent.email) lignes.push("EMAIL;TYPE=INTERNET,WORK:" + agent.email);
    if (a.rue) {
      lignes.push("ADR;TYPE=WORK:;;" + vcardEchapper(a.rue + (a.complement ? ", " + a.complement : "")) + ";" +
        vcardEchapper(a.ville) + ";;" + vcardEchapper(a.codePostal) + ";" + vcardEchapper(a.pays));
    }
    if (org.siteWeb) lignes.push("URL;TYPE=WORK:" + org.siteWeb);
    if (adresse) lignes.push("NOTE:" + vcardEchapper("Carte de visite numérique : " + adresse));
    lignes.push("END:VCARD");
    return lignes.join("\r\n") + "\r\n";
  }

  /* ----- QR code -------------------------------------------------------- */
  function creerQr(texte) {
    var qr = window.qrcode(0, "M");
    qr.addData(texte, "Byte");
    qr.make();
    return qr;
  }

  function qrEnSvg(qr, couleur) {
    var n = qr.getModuleCount(), marge = 4, taille = n + marge * 2, d = "";
    for (var l = 0; l < n; l++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(l, c)) d += "M" + (c + marge) + " " + (l + marge) + "h1v1h-1z";
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + taille + " " + taille + '" shape-rendering="crispEdges">' +
      '<rect width="100%" height="100%" fill="#FFFFFF"/><path fill="' + couleur + '" d="' + d + '"/></svg>';
  }

  /* PNG haute définition avec le nom de l'agent sous le code */
  function qrEnPng(qr, couleur, legende, sousLegende) {
    var n = qr.getModuleCount(), marge = 4, module = Math.floor(1200 / (n + marge * 2));
    var cote = module * (n + marge * 2), bas = legende ? 190 : 0;
    var canvas = document.createElement("canvas");
    canvas.width = cote;
    canvas.height = cote + bas;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = couleur;
    for (var l = 0; l < n; l++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(l, c)) ctx.fillRect((c + marge) * module, (l + marge) * module, module, module);
      }
    }
    if (legende) {
      ctx.textAlign = "center";
      ctx.fillStyle = "#A81A18";
      ctx.font = '400 64px "Roboto Slab", Georgia, serif';
      ctx.fillText(legende, cote / 2, cote + 50, cote - 80);
      ctx.fillStyle = "#625A5B";
      ctx.font = '500 34px "Montserrat", Arial, sans-serif';
      ctx.fillText(sousLegende || "", cote / 2, cote + 120, cote - 80);
    }
    return new Promise(function (ok) { canvas.toBlob(ok, "image/png"); });
  }

  /* ----- Construction de la page --------------------------------------- */
  function lienAdresse(a) {
    var requete = [a.rue, a.complement, a.codePostal + " " + a.ville, a.pays].filter(Boolean).join(", ");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(requete);
  }

  function ligneCoordonnee(href, iconeNom, libelle, valeur, classeValeur, externe) {
    return '<li><a class="ligne" href="' + echapper(href) + '"' + (externe ? ' target="_blank" rel="noopener"' : "") + ">" +
      '<span class="ligne__icone">' + icone(iconeNom) + "</span>" +
      '<span class="ligne__texte"><span class="ligne__libelle">' + echapper(libelle) + "</span>" +
      '<span class="ligne__valeur' + (classeValeur ? " " + classeValeur : "") + '">' + valeurHtml(valeur, classeValeur) + "</span></span>" +
      '<span class="ligne__fleche">' + icone("fleche") + "</span></a></li>";
  }

  /* Une adresse e-mail ne se coupe qu'après le « @ », jamais sur un tiret */
  function valeurHtml(valeur, classe) {
    var i = String(valeur).indexOf("@");
    if (classe !== "email" || i < 0) return echapper(valeur);
    return echapper(valeur.slice(0, i)) + '<wbr><span class="insecable">' + echapper(valeur.slice(i)) + "</span>";
  }

  function htmlCarte(org, agent) {
    var tels = agent.telephones || [];
    var reseaux = agent.reseaux || org.reseaux || [];
    var a = org.adresse || {};
    var h = "";

    h += '<section class="recto">' + recto(org.siteWebAffiche) + "</section>";
    h += '<section class="verso">';

    /* Identité */
    h += '<header class="identite">';
    if (agent.photo) h += '<img class="photo" src="' + echapper(agent.photo) + '" alt="" width="76" height="76">';
    h += '<div class="identite__texte"><h1 class="nom"><span class="prenom">' + echapper(agent.prenom) + '</span> <span class="patronyme">' + echapper(agent.nom) + "</span></h1>";
    if (agent.fonction) h += '<p class="fonction">' + echapper(agent.fonction) + "</p>";
    if (agent.service) h += '<p class="service">' + echapper(agent.service) + "</p>";
    h += "</div>";
    if (agent.logo) h += '<img class="logo-agent" src="' + echapper((window.CMA_RACINE || "../") + agent.logo) + '" alt="' + echapper(agent.logoTexte || "") + '">';
    h += "</header>";

    /* Bouton principal */
    h += '<button type="button" class="btn-contact" data-action="vcard">' + icone("ajouter") + "<span>Ajouter à mes contacts</span></button>";

    /* Actions rapides */
    h += '<nav class="actions" aria-label="Contacter">';
    if (tels.length) h += '<button type="button" class="action" data-action="appeler"><span class="pastille">' + icone("telephone") + "</span>Appeler</button>";
    if (agent.email) h += '<a class="action" href="mailto:' + echapper(agent.email) + '"><span class="pastille">' + icone("email") + "</span>Envoyer un\u00a0e\u2011mail</a>";
    if (org.siteWeb) h += '<a class="action" href="' + echapper(org.siteWeb) + '" target="_blank" rel="noopener"><span class="pastille">' + icone("web") + "</span>Site de la CMA</a>";
    h += "</nav>";

    /* Coordonnées */
    h += '<section aria-labelledby="titre-coordonnees"><h2 class="bloc-titre" id="titre-coordonnees">Coordonnées</h2><ul class="coordonnees">';
    tels.forEach(function (t) {
      var mobile = t.type === "mobile";
      h += ligneCoordonnee("tel:" + numeroInternational(t.numero), mobile ? "mobile" : "telephone", mobile ? "Mobile" : "Bureau", t.numero, "tel");
    });
    if (agent.email) h += ligneCoordonnee("mailto:" + agent.email, "email", "E-mail", agent.email, "email");
    if (org.siteWeb) h += ligneCoordonnee(org.siteWeb, "web", "Site internet", org.siteWebAffiche || org.siteWeb, "", true);
    h += "</ul></section>";

    /* Bloc institutionnel */
    h += '<section class="institution" aria-label="Établissement">';
    h += '<p class="institution__nom">' + echapper(org.nom) + "</p>";
    if (a.rue) {
      h += '<a class="institution__adresse" href="' + echapper(lienAdresse(a)) + '" target="_blank" rel="noopener">' +
        echapper(a.rue + (a.complement ? " - " + a.complement : "")) + "<br>" + echapper(a.codePostal + " " + a.ville) + "</a>";
    }
    if (reseaux.length || org.siteWeb) {
      h += '<hr class="institution__sep"><ul class="reseaux">';
      reseaux.forEach(function (r) {
        h += '<li><a class="reseau" href="' + echapper(r.url) + '" target="_blank" rel="noopener"><span class="pastille">' + icone(r.type) + "</span>" +
          '<span class="reseau__texte">' + echapper(r.libelle).replace(/_/g, "_<wbr>") + "<small>" + (r.type === "facebook" ? "Facebook" : "Instagram") + "</small></span></a></li>";
      });
      if (org.siteWeb) {
        h += '<li><a class="reseau" href="' + echapper(org.siteWeb) + '" target="_blank" rel="noopener"><span class="pastille">' + icone("web") + "</span>" + '<span class="reseau__texte">' + echapper(org.siteWebAffiche) + "<small>Site officiel</small></span></a></li>";
      }
      h += "</ul>";
    }
    h += "</section>";

    /* Partage */
    h += '<div class="partage">' +
      '<button type="button" class="btn-secondaire" data-action="partager">' + icone("partager") + "Partager</button>" +
      '<button type="button" class="btn-secondaire" data-action="qr">' + icone("qr") + "QR code</button>" +
      "</div>";

    h += '<p class="pied">Carte de visite numérique · <a href="' + echapper(org.siteWeb) + '" target="_blank" rel="noopener">' + echapper(org.nomCourt) + "</a></p>";
    h += "</section>";
    return h;
  }

  function htmlMessage(org, titre, texte) {
    return '<section class="recto">' + recto(org.siteWebAffiche) + "</section>" +
      '<section class="verso"><div class="message"><h1>' + echapper(titre) + "</h1><p>" + echapper(texte) + "</p>" +
      '<a class="btn-contact" href="' + echapper(org.siteWeb) + '">' + icone("web") + "<span>Visiter le site de la CMA</span></a></div></section>";
  }

  /* ----- Fenêtres ------------------------------------------------------- */
  function ouvrirFeuille(id, titre, contenu) {
    var ancienne = document.getElementById(id);
    if (ancienne) ancienne.remove();
    var d = document.createElement("dialog");
    d.className = "feuille";
    d.id = id;
    d.setAttribute("aria-labelledby", id + "-titre");
    d.innerHTML = '<div class="feuille__corps"><div class="feuille__entete"><h2 class="feuille__titre" id="' + id + '-titre">' + echapper(titre) + "</h2>" +
      '<button type="button" class="btn-fermer" data-fermer aria-label="Fermer">' + icone("fermer") + "</button></div>" + contenu + "</div>";
    document.body.appendChild(d);
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.closest("[data-fermer]")) d.close();
    });
    d.addEventListener("close", function () { d.remove(); });
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    return d;
  }

  function boutonChoix(attrs, iconeNom, texte, detail) {
    return "<li><" + (attrs.href ? "a" : "button type=\"button\"") + ' class="choix__btn"' +
      Object.keys(attrs).map(function (k) { return " " + k + '="' + echapper(attrs[k]) + '"'; }).join("") + ">" +
      '<span class="pastille">' + icone(iconeNom) + "</span><span>" + echapper(texte) +
      (detail ? "<small>" + echapper(detail) + "</small>" : "") + "</span></" + (attrs.href ? "a" : "button") + "></li>";
  }

  /* ----- Démarrage ------------------------------------------------------ */
  function demarrer(donnees) {
    var org = donnees.organisation;
    var racine = document.getElementById("carte");
    if (window.CMA_ACCUEIL) {
      document.title = org.nomCourt + " – Cartes de visite";
      racine.innerHTML = htmlMessage(org, "Cartes de visite numériques", "Scannez le QR code d’un collaborateur pour afficher sa carte de visite.");
      return;
    }
    var slug = slugDepuisAdresse();
    var agent = (donnees.agents || []).filter(function (x) { return x.id === slug; })[0];

    if (!agent) {
      document.title = "Carte introuvable – " + org.nomCourt;
      racine.innerHTML = htmlMessage(org, "Carte introuvable", "Cette carte de visite n’existe pas ou a été déplacée.");
      return;
    }
    if (agent.actif === false) {
      document.title = org.nomCourt;
      racine.innerHTML = htmlMessage(org, "Carte non disponible", "Cette carte de visite n’est plus active. Retrouvez la CMA Martinique sur son site internet.");
      return;
    }

    var nom = nomComplet(agent);
    var adresse = adresseCarte(org, agent);
    var fichier = (agent.prenom + "-" + agent.nom).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9-]+/g, "-");
    document.title = nom + " – " + org.nomCourt;
    racine.innerHTML = htmlCarte(org, agent);

    var actions = {
      vcard: function () {
        var blob = new Blob([creerVcard(org, agent, adresse)], { type: "text/vcard;charset=utf-8" });
        telechargerFichier(blob, fichier + ".vcf");
      },

      appeler: function () {
        var tels = agent.telephones || [];
        if (tels.length === 1) { location.href = "tel:" + numeroInternational(tels[0].numero); return; }
        ouvrirFeuille("feuille-appel", "Appeler " + agent.prenom, '<ul class="choix">' + tels.map(function (t) {
          return boutonChoix({ href: "tel:" + numeroInternational(t.numero) }, t.type === "mobile" ? "mobile" : "telephone", t.numero, t.type === "mobile" ? "Mobile" : "Bureau");
        }).join("") + "</ul>");
      },

      partager: function () {
        var message = "Carte de visite de " + nom + " – " + org.nomCourt;
        var html = '<ul class="choix">';
        if (navigator.share) html += boutonChoix({ "data-partage": "natif" }, "natif", "Partager…", "Applications de votre téléphone");
        html += boutonChoix({ href: "https://wa.me/?text=" + encodeURIComponent(message + " : " + adresse), target: "_blank", rel: "noopener" }, "whatsapp", "WhatsApp");
        html += boutonChoix({ href: "sms:?&body=" + encodeURIComponent(message + " : " + adresse) }, "sms", "SMS");
        html += boutonChoix({ href: "mailto:?subject=" + encodeURIComponent(message) + "&body=" + encodeURIComponent("Bonjour,\n\nVoici ma carte de visite numérique :\n" + adresse + "\n\n" + nom + "\n" + (agent.fonction || "") + "\n" + org.nom) }, "email", "E-mail");
        html += boutonChoix({ "data-partage": "copier" }, "copier", "Copier le lien", adresse);
        html += "</ul>";
        var f = ouvrirFeuille("feuille-partage", "Partager ma carte", html);
        f.addEventListener("click", function (e) {
          var b = e.target.closest("[data-partage]");
          if (!b) return;
          if (b.getAttribute("data-partage") === "natif") {
            navigator.share({ title: message, text: message, url: adresse }).then(function () { f.close(); }).catch(function () {});
          } else {
            copier(adresse).then(function () { f.close(); toast("Lien copié"); }, function () { toast("Copie impossible : sélectionnez le lien"); });
          }
        });
      },

      qr: function () {
        var qr = creerQr(adresse);
        var couleur = "#A81A18";
        var html = '<div class="qr-cadre">' + qrEnSvg(qr, couleur) + "</div>" +
          '<p class="qr-legende"><strong>' + echapper(nom) + "</strong>" + echapper(adresse) + "</p>" +
          '<div class="qr-actions">' +
          '<button type="button" class="btn-secondaire" data-qr="png">' + icone("telecharger") + "PNG</button>" +
          '<button type="button" class="btn-secondaire" data-qr="svg">' + icone("telecharger") + "SVG</button>";
        var partageFichiers = !!(navigator.canShare && window.File && navigator.canShare({ files: [new File([""], "test.png", { type: "image/png" })] }));
        if (partageFichiers) html += '<button type="button" class="btn-secondaire" data-qr="partager">' + icone("partager") + "Partager le QR code</button>";
        html += "</div>";
        var f = ouvrirFeuille("feuille-qr", "Mon QR code", html);
        f.addEventListener("click", function (e) {
          var b = e.target.closest("[data-qr]");
          if (!b) return;
          var choix = b.getAttribute("data-qr");
          if (choix === "svg") {
            telechargerFichier(new Blob([qrEnSvg(qr, couleur)], { type: "image/svg+xml" }), "QR-" + fichier + ".svg");
            return;
          }
          qrEnPng(qr, couleur, nom, org.nomCourt).then(function (blob) {
            if (choix === "png") { telechargerFichier(blob, "QR-" + fichier + ".png"); return; }
            var image = new File([blob], "QR-" + fichier + ".png", { type: "image/png" });
            navigator.share({ files: [image], title: "QR code – " + nom }).catch(function () {});
          });
        });
      }
    };

    racine.addEventListener("click", function (e) {
      var b = e.target.closest("[data-action]");
      if (b && actions[b.getAttribute("data-action")]) actions[b.getAttribute("data-action")]();
    });
  }

  function erreur() {
    document.getElementById("carte").innerHTML =
      '<section class="verso"><div class="message"><h1>Chargement impossible</h1><p>Vérifiez votre connexion puis rechargez la page.</p></div></section>';
  }

  /* Fonctions partagées avec la page outils/qr-codes.html */
  window.CMA_OUTILS = {
    creerQr: creerQr, qrEnSvg: qrEnSvg, qrEnPng: qrEnPng,
    telechargerFichier: telechargerFichier, nomComplet: nomComplet, echapper: echapper
  };
  if (window.CMA_PAGE_OUTILS) return;

  if (window.CMA_DONNEES) {
    demarrer(window.CMA_DONNEES);
  } else {
    fetch((window.CMA_RACINE || "../") + "data/agents.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(demarrer)
      .catch(erreur);
  }
})();
