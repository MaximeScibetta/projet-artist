/***********************************/
/*** variables "globales" (IIFE) ***/
/***********************************/

const $GalerieImageLink = document.querySelectorAll('.galerie__image-link'); // tableau de chaque <a> de la galerie se trouvant dans une figure.

/******************************************************************************/
/*** les fonctions du script (les utilisées avant celles qui les utilisent) ***/
/******************************************************************************/

/*  La fonction fZoomImage parcours chaque image de la galerie et ajoute la classe 'galerie__figure--active' à la <figure> qui la contient à celle qui subit un clic.
    - paramètres :
    - /
    - retour : /
*/
const fZoomImage = function () {

    const fImageClicked = function(e) {
        e.currentTarget.nextSibling.classList.add('galerie__figure--on-click');
        e.currentTarget.nextSibling.querySelector('.galerie__close-button').classList.add('galerie__close-button--visible');
        let j = 0;
        while ($GalerieImageLink[j]){
            $GalerieImageLink[j].classList.add('galerie__image-link--disable');
            j++;
        }
    };

    const fImageCloseButtonClicked = function(e) {
        e.currentTarget.parentNode.classList.remove('galerie__figure--on-click');
        e.currentTarget.classList.remove('galerie__close-button--visible');
        let j = 0;
        while ($GalerieImageLink[j]){
            $GalerieImageLink[j].classList.remove('galerie__image-link--disable');
            j++;
        }
    };

    const fEscapePressed = function (e) {
        if (e.keyCode === 27){
            let i = 0;
            while ($GalerieImageLink[i]){
                $GalerieImageLink[i].nextSibling.classList.remove('galerie__figure--on-click');
                $GalerieImageLink[i].nextSibling.querySelector('.galerie__close-button').classList.remove('galerie__close-button--visible');
                $GalerieImageLink[i].classList.remove('galerie__image-link--disable');
                i++;
            }
        }
    };

    const fZoomImageStart = function () {
        document.querySelector('body').classList.add('js-enable');
        document.addEventListener('keyup', fEscapePressed, false);
        let i = 0;
        while ($GalerieImageLink[i]){
            $GalerieImageLink[i].addEventListener('click', fImageClicked, false);
            $GalerieImageLink[i].parentNode.querySelector('.galerie__close-button').addEventListener('click', fImageCloseButtonClicked, false);
            i++
        }
    };
    fZoomImageStart();
}



/*****************************************************************************************************/
/*** la fonction qui démarre le script (une fois la page Web complètement téléchargée et affichée) ***/
/*****************************************************************************************************/

/* La fonction fPageIsLoaded gère le chargement de la page (démarrage du script) et se contente de régler l'horloge (aiguilles + nombres)
- paramètres : /
- retour : /
*/
const fPageIsLoaded = function () {

    fZoomImage();


};
//gestion de l'événement "load" pour démarrer le script
window.addEventListener("load", fPageIsLoaded, false);