/**
 * 	convert.js
 * 	----------
 *
 * 	Convertit le texte écrit en markdown
 */

// Id de la zone de texte en markdown
const MARKDOWN_TO_CONVERT_ID = 'markdown_to_convert';

/**
 *  Converti le MarkDown tapé dans le formulaire en html
 */
function convertMarkdown() {

    var contentHtmlElt = document.getElementById('markdown_converted');
    var markdownToConvertElt = document.getElementById(MARKDOWN_TO_CONVERT_ID);
    var finalViewElt = document.getElementById('final_view');
    var htmlCode = marked(markdownToConvertElt.value);
    contentHtmlElt.value = htmlCode;
    finalViewElt.innerHTML = htmlCode;
}

/**
 *  Change l'action de la touche tab
 *
 *  @param {Event} evt l'évènement keyup
 */
function changeTabAction(evt) {

    var keyCode = evt.keyCode || evt.which;
    if (keyCode == 9){
        evt.preventDefault();
        var s = this.selectionStart;
        this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
        this.selectionEnd = s+1;
    }
}


// Instructions
// ------------

// Formulaire d'édition markdown
var convertFormElt = document.getElementById('markdown_form');
convertFormElt.addEventListener('submit', function(evt) {
    evt.preventDefault();
    convertMarkdown();
});

// Mise à jour du contenu HTML quand on tape quelque chose dans la zone d'édition markdown
var markdownToConvertElt = document.getElementById(MARKDOWN_TO_CONVERT_ID);
markdownToConvertElt.addEventListener('keyup', function() {
    convertMarkdown();
});

// Désactivation de la touche tab dans les zones de texte
markdownToConvertElt.addEventListener('keydown', changeTabAction);
document.getElementById('markdown_converted').addEventListener('keydown', changeTabAction);