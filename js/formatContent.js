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

    var selectedOption = evt.target.selectedOptions[0];
    var fileName = selectedOption.value;
    if (!fileName)
        return;
    var styleElt = document.getElementById('css_link');
    styleElt.href = 'css/' + fileName;
}

/*
 *  Lit l'iframe et retourne les noms des fichiers css
 *
 *  @return {array} un tableau contenant les noms des fichiers css
*/
function readIframeCSS() {

    /**
     *	Lit les liens
     *
     *	@param {array} links un tableau contenant les liens
     */
    function readFilesTitles(links) {

        var fileName = '';
        var fileNames = [];
        for (var i = 0; i < links.length; i++) {
            fileName = readALink(links[i].href);
            if (fileName) {
                fileNames.push(fileName);
            }
        }
        return fileNames;
    }

    /**
     *  Lit un lien et retourne le nom du fichier CSS avec son extension
     *
     *  @param {string} href le lien
     *  @return {string} le nom du fichier ou false
     */
    function readALink(href) {

        var bitsOfHref = href.split('/');
        var fileName = bitsOfHref[bitsOfHref.length - 1];
        if (fileName) {
            var bitsOfFileName = fileName.split('.');
            if (bitsOfFileName[1] === 'css') {
                return fileName;
            }
        }
        return false;
    }

    var links = iframeCSSFolderElt.contentWindow.document.getElementsByTagName('a');
    return readFilesTitles(links);
}

/**
 *	Affiche la liste des fichiers css disponibles et met à jour la liste déroulante
 */
function showCSSFilesList() {

    /**
     *  Créé un élément avec le nom d'un fichier css
     *
     *  @param {string} fileName le nom du fichier css
     *  @param {string} tag le nom de la balise désirée
     *  @param {string} eltClass = false le nom de la classe si besoin
     *  @return {Element} l'élément désiré
     */
    function createElt(fileName, tag, eltClass = false) {

        var elt = document.createElement(tag);
        elt.textContent = fileName;
        if (eltClass) {
            elt.classList.add(eltClass);
        }
        if (tag === "option") {
            elt.value = fileName;
        }
        return elt;
    }


	var listElt = document.getElementById('css_files_list');
    var selectElt = document.getElementById('css_file_select');
	var fileNames = readIframeCSS();

	listElt.innerHTML = "";
    selectElt.innerHTML = "";

	for (var i = 0; i < fileNames.length; i++) {
		listElt.appendChild(createElt(fileNames[i], 'div', "my_list_li"));
        listElt.innerHTML += "<br />";
        //listElt.appendChild(document.createElement('br'));
        selectElt.appendChild(createElt(fileNames[i], 'option'));
	}
}


/*
	Instructions
	------------
*/

// Lecture du fichier CSS
var selectCSSFileElt = document.getElementById('css_file_select');
selectCSSFileElt.addEventListener('change', changeCSSFile);

// Lecture du dossier css avec l'iframe au chargement de la page
var iframeCSSFolderElt = document.getElementById("css_folder_iframe");
iframeCSSFolderElt.addEventListener('load', showCSSFilesList);
