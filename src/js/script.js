let $pageTitle = document.head.getElementsByTagName('title')[0].innerText;


/*  La fonction fZoomImage parcours chaque image(boutton) de la galerie et ajoute la classe 'galerie__figure--active' à la <figure> qui la contient à celle qui subit un clic.
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
    const $Form = document.querySelector('.pratique__catalog-form-section__form');
    const $FormSectionTitle = document.querySelector('.pratique__catalog-form-section__title');

    const $FirstNamefield = document.getElementsByName('firstname')[0];
    const $LastNamefield = document.getElementsByName('lastname')[0];
    const $PostCodefield = document.getElementsByName('post_code')[0];
    const $Addressfield = document.getElementsByName('address')[0];
    const $Cityfield = document.getElementsByName('city')[0];
    const $Emailfield = document.getElementsByName('email')[0];

    let regexpName = /^[a-zA-Z\u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+$/;
    let regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regexpPostCode = /^[1-9][0-9][0-9][0-9]$/;

    const fCheckAField = function (field, regexp) {
        if(field.value == ''){
            field.classList.add('pratique__catalog-form-section__input--empty');
            field.parentNode.querySelector('label').classList.remove('pratique__catalog-form-section__label--valid');
            field.classList.remove('pratique__catalog-form-section__input--bad-char');
            field.setAttribute('aria-invalid', 'true');
            return false;
        }else if(regexp && !regexp.test(field.value)){
            field.classList.remove('pratique__catalog-form-section__input--empty');
            field.parentNode.querySelector('label').classList.remove('pratique__catalog-form-section__label--valid');
            field.classList.add('pratique__catalog-form-section__input--bad-char');
            field.setAttribute('aria-invalid', 'true');
            return false;
        }else{
            field.classList.remove('pratique__catalog-form-section__input--empty');
            field.parentNode.querySelector('label').classList.add('pratique__catalog-form-section__label--valid');
            field.classList.remove('pratique__catalog-form-section__input--bad-char');
            field.setAttribute('aria-invalid', 'false');
            return true;
        }
    };

    const fCheckFirstName = function () {
        return fCheckAField($FirstNamefield, regexpName);
    };
    const fCheckLastName = function () {
        return fCheckAField($LastNamefield, regexpName);
    };
    const fCheckPostCode = function () {
        return fCheckAField($PostCodefield, regexpPostCode);
    };
    const fCheckAddress = function () {
        return fCheckAField($Addressfield, false);
    };
    const fCheckCity = function () {
        console.log('5');
        return fCheckAField($Cityfield, false);
    };
    const fCheckEmail = function () {
        return fCheckAField($Emailfield, regexpEmail);
    };

    const fSubmit = function (e) {
        e.preventDefault();
        if(fCheckFirstName() * fCheckLastName() * fCheckPostCode() * fCheckAddress() * fCheckCity() * fCheckEmail()){
            $FormSectionTitle.innerText = 'Formulaire bien envoyé';
            $Form.classList.add('pratique__catalog-form-section__form--valid');
            $FormSectionTitle.classList.add('pratique__catalog-form-section__title--valid');
        }
    };

    $FirstNamefield.addEventListener('blur', fCheckFirstName, false);
    $LastNamefield.addEventListener('blur', fCheckLastName, false);
    $PostCodefield.addEventListener('blur', fCheckPostCode, false);
    $Addressfield.addEventListener('blur', fCheckAddress, false);
    $Emailfield.addEventListener('blur', fCheckEmail, false);

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

    //document.querySelector('body').classList.add('js-enable');


    if($pageTitle === 'Exposition Nicolas de Staël - Nicolas de Staël'){
        fCheckForm();
    }

    if($pageTitle === 'Galerie - Nicolas de Staël'){
        fZoomImage();
    }

};
//gestion de l'événement "load" pour démarrer le script
window.addEventListener("load", fPageIsLoaded, false);