// importing zoom flow library
import {Zoomify} from './ZoomIfy.js'

// create new object from library
const zoomFlow : Zoomify = new Zoomify();
const imagesGallery = document.querySelectorAll<HTMLElement>('#images-gallery .box img') ;
const togglerBTN    = document.querySelector<HTMLButtonElement>('#toggler') ;
const NavbarMenu    = document.querySelector<HTMLDivElement>('.navgationBar') ;


togglerBTN.addEventListener('click' , ()=>{
    NavbarMenu.classList.toggle('open');
    document.body.classList.toggle('prevent_Scoll');
})

imagesGallery.forEach( (images : HTMLImageElement) =>{
    images.addEventListener('click' , (e)=>{
        zoomFlow.ZoomOverlay((e.target as HTMLImageElement).src);
    })
})