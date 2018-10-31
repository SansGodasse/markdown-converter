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
    convertMarkdown();
}

document.getElementById('file_input').addEventListener('change', readSingleFile, false);