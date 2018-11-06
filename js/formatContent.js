/**
 * 	formatContent.js
 * 	----------------
 *
 * 	Mise en forme du rendu final
 */


/**
 *  Modifie le href de la balise link du fichier CSS du contenu
 *
 *  @param {Event} evt l'évènement
 */
function changeCSSFile(evt) {

    var file = evt.target.files[0];
    if (!file)
        return;
    var styleElt = document.getElementById('css_link');
    styleElt.href = 'css/' + file.name;
}


// Lecture du fichier CSS
var cssFileElt = document.getElementById('css_file');
cssFileElt.addEventListener('change', changeCSSFile);
