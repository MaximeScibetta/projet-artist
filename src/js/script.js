/***********************************/
/*** variables "globales" (IIFE) ***/
/***********************************/

const $GalerieImage = document.querySelectorAll('.galerie__image'); // tableau de chaque <image> de la galerie

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
        e.currentTarget.parentNode.classList.add('galerie__figure--on-click');
        e.currentTarget.parentNode.querySelector('.galerie__close-button').classList.add('galerie__close-button--visible');
        let j = 0;
        while ($GalerieImage[j]){
            $GalerieImage[j].removeEventListener('click', fImageClicked, false);
            $GalerieImage[j].parentNode.classList.add('galerie__figure--disable');
            j++;
        }
    };

    const fImageCloseButtonClicked = function(e) {
        e.currentTarget.parentNode.classList.remove('galerie__figure--on-click');
        e.currentTarget.classList.remove('galerie__close-button--visible');
        let j = 0;
        while ($GalerieImage[j]){
            $GalerieImage[j].addEventListener('click', fImageClicked, false);
            $GalerieImage[j].parentNode.classList.remove('galerie__figure--disable');
            j++;
        }
    };

    const fZoomImageStart = function () {
        document.querySelector('body').classList.add('js-enable')
        let i = 0;
        while ($GalerieImage[i]){
            $GalerieImage[i].addEventListener('click', fImageClicked, false);
            $GalerieImage[i].parentNode.querySelector('.galerie__close-button').addEventListener('click', fImageCloseButtonClicked, false);
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