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
 *	Affiche la liste des fichiers css disponibles
 */
function showCSSFilesList() {

	/**
	 *	Créé un élément "li" avec le nom d'un fichier css
	 *
	 *	@param {string} fileName le nom du fichier css
	 *	@return {Element} l'élément "li"
	 */
	function createLiElt(fileName) {

		var liElt = document.createElement('li');
		liElt.textContent = fileName;
		return liElt;
	}

	var listElt = document.getElementById('css_files_list');
	var fileNames = readIframeCSS();

	listElt.innerHTML = "";

	for (var i = 0; i < fileNames.length; i++) {
		listElt.appendChild(createLiElt(fileNames[i]));
	}
}


/*
	Instructions
	------------
*/

// Lecture du fichier CSS
var cssFileElt = document.getElementById('css_file');
cssFileElt.addEventListener('change', changeCSSFile);

// Lecture du dossier css avec l'iframe au chargement de la page
var iframeCSSFolderElt = document.getElementById("css_folder_iframe");
iframeCSSFolderElt.addEventListener('load', showCSSFilesList);
