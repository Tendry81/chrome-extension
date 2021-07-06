/* interact with selectors elements */

'use strict';

this.selectors = (function(){
    let exports = {};

    exports.selected = {
        element : document.body,
        left : 0,
        top : 0,
        width: 0,
        height: 0
    }

    exports.initControls = ()=>{
        globals.self.first('.capture-controls').then((el)=>{
            el.children[0].style.display = 'flex';
            el.children[1].style.display = 'none';
        });
    }
    let offsetScroll = { top:0, left:0,  widht:0, height:0  }; 

    (function getOffsetScroll() {
        offsetScroll.top = (document.childNodes[1] || document.childNodes[0]).scrollTop;
        offsetScroll.left = (document.childNodes[1] || document.childNodes[0]).scrollLeft;
        offsetScroll.widht = (document.childNodes[1] || document.childNodes[0]).scrollWidth;
        offsetScroll.height = (document.childNodes[1] || document.childNodes[0]).scrollHeight;

        document.addEventListener('scroll', function (ev) {
            offsetScroll.top = (document.childNodes[1] || document.childNodes[0]).scrollTop;
            offsetScroll.left = (document.childNodes[1] || document.childNodes[0]).scrollLeft;
            offsetScroll.widht = (document.childNodes[1] || document.childNodes[0]).scrollWidth;
            offsetScroll.height = (document.childNodes[1] || document.childNodes[0]).scrollHeight;
        });
    })();
    
    (function initBody(){
        globals.self.first('.screen-capture-preselect').then(function(el){
            el.style.width = `${globals.parent.style.widht}px`;
            el.style.height = `${globals.parent.style.height}px`;
        });
    })();

    let KeyIsDown = false;
    let isSelect = false;
    
    exports.start = function(x,y){        
        if(KeyIsDown){ 
            exports.isSelect = true;
        }
        else{   
            exports.initControls();

            exports.selected.element = document.elementsFromPoint(x,y)[1]
            
            ElementRect(exports.selected.element,(p)=>{ 
                exports.selected.left = p.x;
                exports.selected.top = p.y;
                exports.selected.width = p.w;
                exports.selected.height = p.h;             
            });

            (function updateHighlight(){
                globals.self.first('#preselect-higlight').then((el)=>{
                    el.style.left = `${exports.selected.left}px`;
                    el.style.top = `${exports.selected.top - offsetScroll.top}px`;
                    el.style.width = `${exports.selected.width}px`;
                    el.style.height = `${exports.selected.height}px`;
                });                
            })();
        }
        if(isSelect){
            resize(x,y)
        }
    }
    function ElementRect(el,onfinished) {
        (function getBounds(el){
            let p = {};
            p.x = el.offsetLeft;
            p.y = el.offsetTop;
            p.w = el.offsetWidth;
            p.h = el.offsetHeight;

            while(el.offsetParent){
                p.x += el.offsetParent.offsetLeft;
                p.y += el.offsetParent.offsetTop;
                if(el.offsetParent != null){
                    el = el.offsetParent;
                }
                else{
                    break;
                }
            }
            onfinished(p);
        })(el);
    }
    let initial = {};
    exports.begingSelect = (ev)=>{
        initial.X = ev.clientX;
        initial.Y = ev.clientY;
        KeyIsDown = true;        
    }
    exports.endSelect = (ev)=>{        
        KeyIsDown = false; 
        isSelect = false;       
    }
    function resize(dx,dy){        
        let x = initial.X - dx;
        let y = initial.Y - dy;

        globals.self.first('#preselect-higlight').then((el)=>{            
            el.style.width = `${x}px`;
            el.style.height = `${y}px`;
        }); 
    }
    return exports;
})();