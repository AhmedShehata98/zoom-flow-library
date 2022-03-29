// importing zoom flow library
import { Zoomify } from './ZoomIfy.js';
// create new object from library
var zoomFlow = new Zoomify();
var imagesGallery = document.querySelectorAll('#images-gallery .box img');
var togglerBTN = document.querySelector('#toggler');
var NavbarMenu = document.querySelector('.navgationBar');
togglerBTN.addEventListener('click', function () {
    NavbarMenu.classList.toggle('open');
    document.body.classList.toggle('prevent_Scoll');
});
imagesGallery.forEach(function (images) {
    images.addEventListener('click', function (e) {
        zoomFlow.ZoomOverlay(e.target.src);
    });
});
