/***********************************/

/*  La fonction fZoomImage parcours chaque image de la galerie et ajoute la classe 'galerie__figure--active' à la <figure> qui la contient à celle qui subit un clic.
    - paramètres : /
    - retour : /
*/
const fZoomImage = function () {
    const $GalerieImageLink = document.querySelectorAll('.galerie__image-link'); // tableau de chaque <a> de la galerie se trouvant dans une figure.
    const $GalerieFigure = document.querySelectorAll('.galerie__figure'); // tableau de chaque <a> de la galerie se trouvant dans une figure.

    const fImageClicked = function(e) {
        document.addEventListener('keyup', fEscapePressed, false);
        document.addEventListener('mousewheel', fDisableScroll, false);
        document.addEventListener('keydown', fDisableScroll, false);
        e.currentTarget.nextSibling.classList.add('galerie__figure--on-click');
        e.currentTarget.nextSibling.querySelector('.galerie__close-button').classList.add('galerie__close-button--visible');
        let j = 0;
        while ($GalerieImageLink[j]){
            $GalerieImageLink[j].classList.add('galerie__image-link--disable');
            j++;
        }
        e.stopPropagation();
        document.querySelector('body').addEventListener('click', fOutOfBox, false);
    };

    const fImageCloseButtonClicked = function(e) {
        document.removeEventListener('mousewheel', fDisableScroll, false);
        document.removeEventListener('keydown', fDisableScroll, false);
        e.currentTarget.parentNode.classList.remove('galerie__figure--on-click');
        e.currentTarget.classList.remove('galerie__close-button--visible');
        let j = 0;
        while ($GalerieImageLink[j]){
            $GalerieImageLink[j].classList.remove('galerie__image-link--disable');
            j++;
        }
        document.querySelector('body').addEventListener('click', fOutOfBox, false);
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
            document.removeEventListener('mousewheel', fDisableScroll, false);
            document.removeEventListener('keydown', fDisableScroll, false);
            document.removeEventListener('keyup', fEscapePressed, false);
            document.querySelector('body').addEventListener('click', fOutOfBox, false);
        }
    };

    const fDisableScroll = function (e){

        if (e.keyCode) {
            /^(32|33|34|35|36|38|40)$/.test(e.keyCode) && e.preventDefault();
        }else {
            e.preventDefault();
        }
    };
    
    const fOutOfBox = function (e) {
        let i = 0;
        while ($GalerieImageLink[i]){
            $GalerieImageLink[i].nextSibling.classList.remove('galerie__figure--on-click');
            $GalerieImageLink[i].nextSibling.querySelector('.galerie__close-button').classList.remove('galerie__close-button--visible');
            $GalerieImageLink[i].classList.remove('galerie__image-link--disable');
            i++;
        }
        document.querySelector('body').removeEventListener('click', fOutOfBox, false);
        document.removeEventListener('mousewheel', fDisableScroll, false);
        document.removeEventListener('keydown', fDisableScroll, false);
    };

    const fStopEventPropa = function (e) {
        e.stopPropagation();
    };

    let i = 0;
    while ($GalerieImageLink[i]){
        $GalerieImageLink[i].parentNode.querySelector('.galerie__close-button').addEventListener('click', fImageCloseButtonClicked, false);
        $GalerieImageLink[i].addEventListener('click', fImageClicked, false);
        $GalerieFigure[i].addEventListener('click', fStopEventPropa, false);
        i++
    }

};


/*  La fonction fCheckForm parcours chaque input du formulair et à la perte de focus, il verifie si un contenu est présent, si vide il ajoute les class permettant d'afficher un message d'erreur.
 - paramètres : /
 - retour : /
 */
const fCheckForm = function () {
    const $Inputs = document.querySelectorAll('.pratique__catalog-form-section__input');
    const $FormAlert = document.querySelector('.pratique__catalog-form-section__alert');
    const $FormSent = document.querySelector('.pratique__catalog-form-section__sent');
    const $Form = document.querySelector('.pratique__catalog-form-section__form');


    const fCheckAllInputs = function () {
        let i = 0, nbError = 0;
        while ($Inputs[i]){
            if ($Inputs[i].classList.contains('pratique__catalog-form-section__input--invalid')){
                nbError += 1;
            }
            i++
        }
        if (nbError){
            $FormAlert.classList.add('pratique__catalog-form-section__alert--invalid');
            $FormSent.classList.remove('pratique__catalog-form-section__sent--valid');
            return false;
        }else {
            $FormAlert.classList.remove('pratique__catalog-form-section__alert--invalid');
            return true;
        }
    };

    const fSubmit = function (e) {
        let i = 0;
        while ($Inputs[i]){
            if ($Inputs[i].value == ''){
                $Inputs[i].classList.add('pratique__catalog-form-section__input--invalid');
            }
            i++
        }
        if (!fCheckAllInputs()){
            e.preventDefault();
        }else{
            $FormSent.classList.add('pratique__catalog-form-section__sent--valid');
            e.preventDefault();
        }
    };

    const fCheckInput = function (e) {

        if (e.currentTarget.value == '' ){
            e.currentTarget.classList.add('pratique__catalog-form-section__input--invalid');
        }else {
            e.currentTarget.classList.remove('pratique__catalog-form-section__input--invalid');
        }
        fCheckAllInputs();
    };

    let i = 0;
    while ($Inputs[i]){
        $Inputs[i].addEventListener('blur', fCheckInput, false);
        i++
    }
    $Form.addEventListener('submit', fSubmit, false);
};

/*****************************************************************************************************/
/*** la fonction qui démarre le script (une fois la page Web complètement téléchargée et affichée) ***/
/*****************************************************************************************************/

/* La fonction fPageIsLoaded gère le chargement de la page (démarrage du script) et se contente de régler l'horloge (aiguilles + nombres)
- paramètres : /
- retour : /
*/
const fPageIsLoaded = function () {

    document.querySelector('body').classList.add('js-enable');
    fZoomImage();
    fCheckForm();


};
//gestion de l'événement "load" pour démarrer le script
window.addEventListener("load", fPageIsLoaded, false);