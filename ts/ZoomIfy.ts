export class Zoomify {
    
    ZoomOverlay : Function = (imageSrcLink : string ) => {
        
        let   zoomCount : number =  110;
        let   zoomMode  : Boolean = true;
        const baseOverlay       : HTMLElement = document.createElement('main');
        const backdropOverlay   : HTMLElement = document.createElement('section');
        const imageContainer    : HTMLDivElement   = document.createElement('div');
        const mainImageBox      : HTMLDivElement   = document.createElement('div');
        const image             : HTMLImageElement = document.createElement('img');
        const optionBox         : HTMLDivElement   = document.createElement('div');
        const closeBtnBox       : HTMLDivElement   = document.createElement('div');
        const closeBTN          : HTMLHeadingElement  = document.createElement('h3');
        const zoomControlBTNS   : HTMLDivElement   = document.createElement('div');
        const zoomIN            : HTMLSpanElement  = document.createElement('span');
        const zoomOUT           : HTMLDivElement  = document.createElement('div');


        /// append html Elements
        baseOverlay.appendChild(backdropOverlay);
        backdropOverlay.appendChild(imageContainer);
        imageContainer.appendChild(mainImageBox);
        backdropOverlay.appendChild(optionBox);
        mainImageBox.appendChild(image);
        optionBox.appendChild(closeBtnBox);
        closeBtnBox.appendChild(closeBTN);
        closeBTN.appendChild(document.createTextNode('x'));
        optionBox.appendChild(zoomControlBTNS);
        zoomControlBTNS.appendChild(zoomIN);
        zoomIN.appendChild(document.createTextNode('+'));
        zoomControlBTNS.appendChild(zoomOUT);
        zoomOUT.appendChild(document.createTextNode('-'));

        ///seting up the elements class's and id's
        baseOverlay.className = 'baseOverlay'
        backdropOverlay.className = 'backdropOverlay'
        imageContainer.className = 'imageContainer'
        mainImageBox.className = 'mainImageBox'
        image.className = 'previewImg';
        optionBox.className = 'optionsBox';
        closeBtnBox.className = 'closeBTN';
        closeBTN.className = 'closeIcon';
        zoomControlBTNS.className = 'zoomControlBTNS';
        zoomIN.className = 'zoomIN';
        zoomOUT.className = 'zoomOUT';
        image.src= imageSrcLink;


        let detect_platform = ():void => {
            if (/mobile | Mobile/.test(navigator.userAgent)) {
                // means it's browsing in Mobile
                eventsMobile(); // set toush event 
            }else{
                // means it's browsing in DeskTop
                eventDesktop();   // Set mouse event
            }
        }

        function eventDesktop():void{
            image.addEventListener('mousedown' , () => {
                window.addEventListener('mousemove' , dragAndScroll,false)
            })
            
            window.addEventListener('mouseup' , stopDesktopScrolling)
        }

        /// Deffine scroll element with Touch screen event
        function eventsMobile():void {
            image.addEventListener('touchstart' , () =>{
                // Disable Default dragging
                image.addEventListener('dragstart',(e)=>{
                    e.preventDefault()
                })
                // 
                imageContainer.addEventListener('touchmove' , touchAndScroll ,false)
            })

            window.addEventListener('touchend' , stopMobileScrolling)

            
        }

        function touchAndScroll(e : TouchEvent):void{
            
            // const getStyles = window.getComputedStyle(mainImageBox);
            const positionTop =  (e.touches[0].clientY)  / 9  ;
            const positionLeft = e.touches[0].clientX ;
            mainImageBox.style.top =  `${positionTop }%`
            mainImageBox.style.left = `${positionLeft }px`            
        }

        function dragAndScroll ({movementX , movementY }) :void{
            const getStyles = window.getComputedStyle(mainImageBox);
            const positionTop =  parseInt(getStyles.top );
            const positionLeft = parseInt(getStyles.left) ;
            
            mainImageBox.style.left = `${positionLeft + movementX}px`
            mainImageBox.style.top = `${positionTop + movementY}px`
        }
        
        function stopDesktopScrolling() :void {
            window.removeEventListener('mousemove',dragAndScroll,false)
        }

        function stopMobileScrolling ():void{
            window.removeEventListener('touchmove',touchAndScroll,false)
        }

        // start 'zoom in' and 'zoom out' functions
        function ZOOM_OUT (zoomBy? : number):void{
            if (zoomCount <= 110) {
                zoomOUT.classList.add('disabled')
            }else{
                zoomCount = zoomCount - 10   
                zoomOUT.classList.contains('disabled') ? zoomOUT.classList.remove('disabled') : "" ;
                zoomIN.classList.contains('disabled') ? zoomIN.classList.remove('disabled') : "" ;
            }

            if( zoomBy === undefined){
                image.style.transform = `scale( ${zoomCount}%)`
            }else{
                image.style.transform = `scale( ${zoomBy}%)`
            }
        }

        function ZOOM_IN (zoomBy? : number):void{
            if (zoomCount >= 180) {
                zoomIN.classList.add('disabled')
            }else{
                zoomCount = zoomCount + 10   
                zoomIN.classList.contains('disabled') ? zoomIN.classList.remove('disabled') : "" ;
                zoomOUT.classList.contains('disabled') ? zoomOUT.classList.remove('disabled') : "" ;
            }
            if( zoomBy === undefined){
                image.style.transform = `scale( ${zoomCount}%)`
            }else{
                image.style.transform = `scale( ${zoomBy}%)`
            }
        }
        // end

        /// Event to close overlay
        closeBTN.addEventListener('click', () =>{
        // prevent body scrolling
        baseOverlay.remove()
            if (document.body.classList.contains('prevent_Scoll')) {
                document.body.classList.remove('prevent_Scoll');
            }
        })
        
        /// start Deffine zoom in & zoom out events
        zoomIN.addEventListener('click' , () => {
            ZOOM_IN();
        })
        zoomOUT.addEventListener('click' , () => {
            ZOOM_OUT();
        })

        image.addEventListener('dblclick' , ()=>{
            if (zoomMode === true) {
                ZOOM_IN(250);
                zoomMode = false;
            }else{
                ZOOM_OUT(100);
                zoomMode = true;
            }

        })


        // Trigger functions
        detect_platform();

        /// Finally append element to body
        document.body.prepend(baseOverlay);
        // prevent body scrolling
        document.body.classList.add('prevent_Scoll');
    }


}