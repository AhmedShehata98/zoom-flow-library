import {Zoomify} from './ZoomIfy.js'

let newZoomify = new Zoomify();


console.log(newZoomify);
window.addEventListener('click',(e)=>{
  if (e.target.tagName == "IMG" && !e.target.classList.contains('previewImg')) {
    newZoomify.ZoomOverlay(e.target.src )  
    // previewImage(e.target.src)
  }
})
