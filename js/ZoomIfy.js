var Zoomify=(function(){function Zoomify(){var _this=this;this.zoomCount=110;this.ZoomOverlay=function(imageSrcLink){var baseOverlay=document.createElement('main');var backdropOverlay=document.createElement('section');var imageContainer=document.createElement('div');var mainImageBox=document.createElement('div');var image=document.createElement('img');var optionBox=document.createElement('div');var closeBtnBox=document.createElement('div');var closeBTN=document.createElement('span');var zoomControlBTNS=document.createElement('div');var zoomIN=document.createElement('span');var zoomOUT=document.createElement('div');baseOverlay.appendChild(backdropOverlay);backdropOverlay.appendChild(imageContainer);imageContainer.appendChild(mainImageBox);backdropOverlay.appendChild(optionBox);mainImageBox.appendChild(image);optionBox.appendChild(closeBtnBox);closeBtnBox.appendChild(closeBTN);closeBTN.appendChild(document.createTextNode('X'));optionBox.appendChild(zoomControlBTNS);zoomControlBTNS.appendChild(zoomIN);zoomIN.appendChild(document.createTextNode('+'));zoomControlBTNS.appendChild(zoomOUT);zoomOUT.appendChild(document.createTextNode('-'));baseOverlay.className='baseOverlay';backdropOverlay.className='backdropOverlay';imageContainer.className='imageContainer';mainImageBox.className='mainImageBox';image.className='previewImg';optionBox.className='optionsBox';closeBtnBox.className='closeBTN';closeBTN.className='closeIcon';zoomControlBTNS.className='zoomControlBTNS';zoomIN.className='zoomIN';zoomOUT.className='zoomOUT';image.src=imageSrcLink;closeBTN.addEventListener('click',function(){return baseOverlay.remove()});zoomIN.addEventListener('click',function(){if(_this.zoomCount>=180){zoomIN.classList.add('disabled')}else{_this.zoomCount=_this.zoomCount+10;zoomIN.classList.contains('disabled')?zoomIN.classList.remove('disabled'):"";zoomOUT.classList.contains('disabled')?zoomOUT.classList.remove('disabled'):""}
image.style.transform="scale( ".concat(_this.zoomCount,"%)")});zoomOUT.addEventListener('click',function(){if(_this.zoomCount<=110){zoomOUT.classList.add('disabled')}else{_this.zoomCount=_this.zoomCount-10;zoomOUT.classList.contains('disabled')?zoomOUT.classList.remove('disabled'):"";zoomIN.classList.contains('disabled')?zoomIN.classList.remove('disabled'):""}
image.style.transform="scale( ".concat(_this.zoomCount,"%)")});image.addEventListener('mousedown',function(){window.addEventListener('mousemove',dragAndScroll,!1)});window.addEventListener('mouseup',stopScrolling);function dragAndScroll(_a){var movementX=_a.movementX,movementY=_a.movementY;var getStyles=window.getComputedStyle(mainImageBox);var positionTop=parseInt(getStyles.top);var positionLeft=parseInt(getStyles.left);mainImageBox.style.left="".concat(positionLeft+movementX,"px");mainImageBox.style.top="".concat(positionTop+movementY,"px")}
function stopScrolling(){window.removeEventListener('mousemove',dragAndScroll,!1)}
document.body.prepend(baseOverlay)}}
return Zoomify}());export{Zoomify}