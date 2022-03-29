var Zoomify = /** @class */ (function () {
    function Zoomify() {
        this.ZoomOverlay = function (imageSrcLink) {
            var zoomCount = 110;
            var zoomMode = true;
            var baseOverlay = document.createElement('main');
            var backdropOverlay = document.createElement('section');
            var imageContainer = document.createElement('div');
            var mainImageBox = document.createElement('div');
            var image = document.createElement('img');
            var optionBox = document.createElement('div');
            var closeBtnBox = document.createElement('div');
            var closeBTN = document.createElement('h3');
            var zoomControlBTNS = document.createElement('div');
            var zoomIN = document.createElement('span');
            var zoomOUT = document.createElement('div');
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
            baseOverlay.className = 'baseOverlay';
            backdropOverlay.className = 'backdropOverlay';
            imageContainer.className = 'imageContainer';
            mainImageBox.className = 'mainImageBox';
            image.className = 'previewImg';
            optionBox.className = 'optionsBox';
            closeBtnBox.className = 'closeBTN';
            closeBTN.className = 'closeIcon';
            zoomControlBTNS.className = 'zoomControlBTNS';
            zoomIN.className = 'zoomIN';
            zoomOUT.className = 'zoomOUT';
            image.src = imageSrcLink;
            var detect_platform = function () {
                if (/mobile | Mobile/.test(navigator.userAgent)) {
                    // means it's browsing in Mobile
                    eventsMobile(); // set toush event 
                }
                else {
                    // means it's browsing in DeskTop
                    eventDesktop(); // Set mouse event
                }
            };
            function eventDesktop() {
                image.addEventListener('mousedown', function () {
                    window.addEventListener('mousemove', dragAndScroll, false);
                });
                window.addEventListener('mouseup', stopDesktopScrolling);
            }
            /// Deffine scroll element with Touch screen event
            function eventsMobile() {
                image.addEventListener('touchstart', function () {
                    // Disable Default dragging
                    image.addEventListener('dragstart', function (e) {
                        e.preventDefault();
                    });
                    // 
                    imageContainer.addEventListener('touchmove', touchAndScroll, false);
                });
                window.addEventListener('touchend', stopMobileScrolling);
            }
            function touchAndScroll(e) {
                // const getStyles = window.getComputedStyle(mainImageBox);
                var positionTop = (e.touches[0].clientY) / 9;
                var positionLeft = e.touches[0].clientX;
                mainImageBox.style.top = "".concat(positionTop, "%");
                mainImageBox.style.left = "".concat(positionLeft, "px");
            }
            function dragAndScroll(_a) {
                var movementX = _a.movementX, movementY = _a.movementY;
                var getStyles = window.getComputedStyle(mainImageBox);
                var positionTop = parseInt(getStyles.top);
                var positionLeft = parseInt(getStyles.left);
                mainImageBox.style.left = "".concat(positionLeft + movementX, "px");
                mainImageBox.style.top = "".concat(positionTop + movementY, "px");
            }
            function stopDesktopScrolling() {
                window.removeEventListener('mousemove', dragAndScroll, false);
            }
            function stopMobileScrolling() {
                window.removeEventListener('touchmove', touchAndScroll, false);
            }
            // start 'zoom in' and 'zoom out' functions
            function ZOOM_OUT(zoomBy) {
                if (zoomCount <= 110) {
                    zoomOUT.classList.add('disabled');
                }
                else {
                    zoomCount = zoomCount - 10;
                    zoomOUT.classList.contains('disabled') ? zoomOUT.classList.remove('disabled') : "";
                    zoomIN.classList.contains('disabled') ? zoomIN.classList.remove('disabled') : "";
                }
                if (zoomBy === undefined) {
                    image.style.transform = "scale( ".concat(zoomCount, "%)");
                }
                else {
                    image.style.transform = "scale( ".concat(zoomBy, "%)");
                }
            }
            function ZOOM_IN(zoomBy) {
                if (zoomCount >= 180) {
                    zoomIN.classList.add('disabled');
                }
                else {
                    zoomCount = zoomCount + 10;
                    zoomIN.classList.contains('disabled') ? zoomIN.classList.remove('disabled') : "";
                    zoomOUT.classList.contains('disabled') ? zoomOUT.classList.remove('disabled') : "";
                }
                if (zoomBy === undefined) {
                    image.style.transform = "scale( ".concat(zoomCount, "%)");
                }
                else {
                    image.style.transform = "scale( ".concat(zoomBy, "%)");
                }
            }
            // end
            /// Event to close overlay
            closeBTN.addEventListener('click', function () {
                // prevent body scrolling
                baseOverlay.remove();
                if (document.body.classList.contains('prevent_Scoll')) {
                    document.body.classList.remove('prevent_Scoll');
                }
            });
            /// start Deffine zoom in & zoom out events
            zoomIN.addEventListener('click', function () {
                ZOOM_IN();
            });
            zoomOUT.addEventListener('click', function () {
                ZOOM_OUT();
            });
            image.addEventListener('dblclick', function () {
                if (zoomMode === true) {
                    ZOOM_IN(250);
                    zoomMode = false;
                }
                else {
                    ZOOM_OUT(100);
                    zoomMode = true;
                }
            });
            // Trigger functions
            detect_platform();
            /// Finally append element to body
            document.body.prepend(baseOverlay);
            // prevent body scrolling
            document.body.classList.add('prevent_Scoll');
        };
    }
    return Zoomify;
}());
export { Zoomify };
