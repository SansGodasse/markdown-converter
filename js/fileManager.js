// Lecture d'un fichier
// --------------------

/**
 *  Lit le contenu d'un fichier
 *
 *  @param {Event} evt l'évènement
 */
function readSingleFile(evt) {
    
    var file = evt.target.files[0];
    console.log(file);
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
    element.textContent = contents;
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
    }
}

/**
 *  Créé un élément <a> pour télécharger
 *
 *  @param {string} fileExtension l'extension du fichier à télécharger
 */
function createLink(fileExtension) {

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
            linkElt.href = makeFile(document.getElementById('markdown_converted').value, 'html');
            linkElt.appendChild(makeDOMElement('strong', 'HTML'));
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
fileExtensionRadioMarkdown.addEventListener('click', function() {
    updateDownloadLink();
});
fileExtensionRadioHTML.addEventListener('click', function() {
    updateDownloadLink();
});