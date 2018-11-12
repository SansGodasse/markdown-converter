// Lecture d'un fichier
// --------------------

/**
 *  Lit le contenu d'un fichier
 *
 *  @param {Event} evt l'évènement
 */
function readSingleFile(evt) {
    
    var file = evt.target.files[0];
    if (!file)
        return;
    var reader = new FileReader();
    reader.onload = function(evt) {
        var contents = evt.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

/**
 *  Affiche le contenu
 *
 *  @param {string} contents le contenu à afficher
 */
function displayContents(contents) {

    var element = document.getElementById('markdown_to_convert');
    element.value = contents;
}


// Enregistrement d'un fichier
// ---------------------------

/**
 *  Créé un fichier
 *
 *  @param {Object} file un objet pouvant être vide qui va contenir le fichier
 *  @param {string} content le contenu du fichier à créer
 *  @param {string} type = 'md' le type de fichier
 */
function makeFile(content, type = 'md') {

    var data = new Blob([content], {type: 'text/' + type});

    if (file !== null) {
        window.URL.revokeObjectURL(file);
    }
    file = window.URL.createObjectURL(data);
    return file;
}

/** 
 *  Met à jour le lien de téléchargement pour le fichier
 */
function updateDownloadLink() {

    var linkElt = document.getElementById('download_link');
    if (document.getElementById('Markdown').checked) {
        linkElt.parentNode.replaceChild(createLink('md'), linkElt);
    } else if (document.getElementById('HTML').checked) {
        linkElt.parentNode.replaceChild(createLink('html'), linkElt);
    } else if (document.getElementById('fullHTML').checked) {
        linkElt.parentNode.replaceChild(createLink('html', true), linkElt);
    }
}

/**
 *  Créé un élément <a> pour télécharger
 *
 *  @param {string} fileExtension l'extension du fichier à télécharger
 *  @param {Boolean} fullHTML = false ajoute le DOCTYPE et tout le bazar pour un fichier HTML complet
 *  @return {Element} le lien
 */
function createLink(fileExtension, fullHTML = false) {

    var linkElt = document.createElement('a');
    var fileNameElt = document.getElementById('file_name');

    linkElt.id = "download_link";
    linkElt.textContent = "Télécharger le fichier ";

    switch (fileExtension) {
        case 'md':
            linkElt.href = makeFile(document.getElementById('markdown_to_convert').value, 'md');
            linkElt.appendChild(makeDOMElement('strong', 'Markdown'));
            break;
        case 'html':
            if (fullHTML) {
                var firstPart = '<!DOCTYPE html><html><head><meta charset="utf-8" /><title>Convertisseur markdown / HTML</title><!-- Polices -->        <link href="https://fonts.googleapis.com/css?family=Roboto|Shadows+Into+Light" rel="stylesheet" />        <link href="https://fonts.googleapis.com/css?family=Noto+Serif+KR|Tangerine" rel="stylesheet" />        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" /><!-- Mise en forme du contenu --><link id="css_link" href="css/style.css" rel="stylesheet" /><!-- Mise en forme des commandes et des fenêtres d\'édition --><link href="css/convertorStyle.css" rel="stylesheet" /><script type="text/javascript" src="js/marked.js"></script><script type="text/javascript" src="js/cookies.js"></script></head><body>';
                var lastPart = "</body></html>";
                linkElt.href = makeFile(firstPart + document.getElementById('markdown_converted').value + lastPart, 'html');
                linkElt.appendChild(makeDOMElement('strong', 'HTML complet'));
            } else {
                linkElt.href = makeFile(document.getElementById('markdown_converted').value, 'html');
                linkElt.appendChild(makeDOMElement('strong', 'HTML'));
            }
            break;
        default:
            linkElt.href = '#';
    }
    
    if (fileNameElt.value !== "")
        linkElt.download = fileNameElt.value + '.' + fileExtension;
    else
        linkElt.download = "mon-super-fichier." + fileExtension;

    return linkElt;
}

/**
 *  Mets à jour le texte du lien de téléchargement
 *
 *  @param {string} fileType le type de fichier désiré
 */
function updateDownloadLinkText(fileType) {

    var linkElt = document.getElementById('download_link');
    linkElt.textContent = "Télécharger le fichier ";
    linkElt.appendChild(makeDOMElement('strong', fileType));
}

/**
 *  Créé un élément du DOM
 */
function makeDOMElement(tag, content) {

    var elt = document.createElement(tag);
    elt.textContent = content;
    return elt;
}

// Lecture d'un fichier
document.getElementById('file_input').addEventListener('change', readSingleFile, false);

// Enregistrement des fichiers
var file = null;
document.getElementById('markdown_to_convert').addEventListener('keyup', function() {
    updateDownloadLink(); // Je passe par une fonction anonyme pour éviter de passer l'évènement à ma fonction
});

// Mise à jour du texte du lien de téléchargement
var fileExtensionRadioMarkdown = document.getElementById('Markdown');
var fileExtensionRadioHTML = document.getElementById('HTML');
var fileExtensionRadioFullHTML = document.getElementById('fullHTML');
fileExtensionRadioMarkdown.addEventListener('click', function() {
    updateDownloadLink();
});
fileExtensionRadioHTML.addEventListener('click', function() {
    updateDownloadLink();
});
fileExtensionRadioFullHTML.addEventListener('click', function() {
    updateDownloadLink();
});