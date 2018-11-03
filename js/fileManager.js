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

    var element = document.getElementById('file_content');
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
    
    // BUG : pas moyen de faire fonctionner le lien pour le markdown. Le html prend le dessus.
    switch (type) {
        case 'md':
            if (markdownFile !== null) {
                window.URL.revokeObjectURL(markdownFile);
            }
            markdownFile = window.URL.createObjectURL(data);
            return markdownFile;
            break;
        case 'html':
            if (htmlFile !== null) {
                window.URL.revokeObjectURL(htmlFile);
            }
            htmlFile = window.URL.createObjectURL(data);
            return htmlFile;
            break;
    }
}

/** 
 *  Met à jour le lien de téléchargement pour le fichier
 *
 *  @param {Object} options les options du lien
 */
function updateDownloadLink(options = {fileNameId: 'file_md_name', linkId: 'download_md_link', linkTextContent: 'Télécharger le fichier markdown', contentId: 'markdown_to_convert', fileExtension: 'md'}) {

    var linkElt = document.getElementById(options.linkId);
    linkElt.parentNode.replaceChild(createLink(options), linkElt);
}

/**
 *  Créé un élément <a> pour télécharger
 *
 *  @param {Object} options les options du lien
 */
function createLink(options = {fileNameId: 'file_md_name', linkId: 'download_md_link', linkTextContent: 'Télécharger le fichier markdown', contentId: 'markdown_to_convert', fileExtension: 'md'}) {

    var linkElt = document.createElement('a');
    var fileNameElt = document.getElementById(options.fileNameId);
    linkElt.id = options.linkId;
    linkElt.textContent = options.linkTextContent;
    linkElt.href = makeFile(document.getElementById(options.contentId).value, 'md');
    if (fileNameElt.value !== "")
        linkElt.download = fileNameElt.value + '.' + options.fileExtension;
    else
        linkElt.download = "mon-super-fichier" + '.' + options.fileExtension;
    return linkElt;
}

// Lecture d'un fichier
document.getElementById('file_input').addEventListener('change', readSingleFile, false);

// Enregistrement des fichiers
var markdownFile = null;
var htmlFile = null;
document.getElementById('markdown_to_convert').addEventListener('keyup', function() {
    updateDownloadLink(); // Je passe par une fonction anonyme pour éviter de passer l'évènement à ma fonction
});
document.getElementById('markdown_to_convert').addEventListener('keyup', function() {
    updateDownloadLink({fileNameId: 'file_html_name', linkId: 'download_html_link', linkTextContent: 'Télécharger le fichier HTML', contentId: 'markdown_converted', fileExtension: 'html'});
});