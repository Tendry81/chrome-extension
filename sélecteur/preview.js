/* build > buildEvents > selectors > preview */

'use strict';

this.preview = (function(){
    let exports = {};

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
            
            console.log(globals.self.document);
        });
    })();

    let cropper = {};
    let cropCover = {};
    function parse(e){
        return Number.parseInt(e.replace('px',''));
    }
    (function initBody(){
        globals.self.first('.screen-capture-preview').then(function(el){
            el.style.width = `${document.body.offsetWidth}px`;
            el.style.height = `${document.body.offsetHeight}px`;
        });
    })();
    exports.initPreview = function(target){
        globals.self.first('.higlight-crop').then((el)=>{   
           cropper.c = el;
            cropper.lt = el.children[0];
            cropper.lc = el.children[1];
            cropper.lb = el.children[2];
            cropper.ct = el.children[3];
            cropper.rt = el.children[4];
            cropper.rc = el.children[5];
            cropper.rb = el.children[6];
            cropper.cb = el.children[7]; 
           
            exports.initViewer(target);    
            exports.initCover(target);
        }); 
                  
    }
    function initCorners(){
        //left top//
        cropper.lt.style.top = `-5px`;
        cropper.lt.style.left = `-5px`;
        //left center//
        cropper.lc.style.top = `${(parse(cropper.c.style.height)/2)-8}px`;
        cropper.lc.style.left = `-5px`;
        //left bottom//
        cropper.lb.style.top = `${parse(cropper.c.style.height)-9}px`;
        cropper.lb.style.left = `-5px`;
        //top center//
        cropper.ct.style.top = `-5px`;
        cropper.ct.style.left = `${(parse(cropper.c.style.width)/2)-4}px`;
        //top bottom//
        cropper.cb.style.top = `${parse(cropper.c.style.height)-6}px`;
        cropper.cb.style.left = `${(parse(cropper.c.style.width)/2)-4}px`;
        //right top//
        cropper.rt.style.top = `-5px`;
        cropper.rt.style.left = `${parse(cropper.c.style.width)-6}px`;
        //left center//
        cropper.rc.style.top = `${(parse(cropper.c.style.height)/2)-6}px`;
        cropper.rc.style.left = `${parse(cropper.c.style.width)-6}px`;
        //left bottom//
        cropper.rb.style.top = `${parse(cropper.c.style.height)-6}px`;
        cropper.rb.style.left = `${parse(cropper.c.style.width)-6}px`;        
    }
    exports.initCover = (target)=>{
        globals.self.get('.higlight-cover').then((elements)=>{
            console.log(`calc(100% - ${target.style.left})`);
            //left
            elements[0].style.left = 0;
            elements[0].style.top = target.offsetTop + 'px';
            elements[0].style.height = target.style.height;
            elements[0].style.width = target.style.left;
            //top
            elements[1].style.left = 0;
            elements[1].style.top = 0;
            elements[1].style.height = target.style.top;
            elements[1].style.width = '100%';
            //right
            elements[2].style.top = target.style.top;
            elements[2].style.left = `${target.offsetLeft + target.offsetWidth}px`;
            elements[2].style.height = target.style.height;
            elements[2].style.width = `calc(100% - ${target.offsetLeft + target.offsetWidth}px)`;
            //bottom
            elements[3].style.top = `${target.offsetTop + target.offsetHeight}px`;
            elements[3].style.left = 0;
            elements[3].style.height = `calc(100% - ${target.offsetTop + target.offsetHeight}px)`;
            elements[3].style.width = '100%';
        });
    }
    exports.initViewer = (el)=>{   
        
        //cropper body// 
        cropper.c.style.top = el.offsetTop + 'px';
        cropper.c.style.left = el.offsetLeft + 'px';
        cropper.c.style.width = el.offsetWidth + 'px';
        cropper.c.style.height = el.offsetHeight + 'px';
        //
        initCorners();
    }
    exports.initControls = ()=>{
        globals.self.first('.capture-controls').then((el)=>{
            el.children[0].style.display = 'none';
            el.children[1].style.display = 'flex';
        });
    }       
    exports.view = function(el){       
        exports.initControls();         
        exports.initPreview(el);

        globals.self.first('.screen-capture-preview').then((el)=>{
            el.style.display ="block";
            globals.self.first('.screen-capture-preselect').then((e)=>{
                e.style.display ="none";
            });
        });        
    }
    let cropIsStarted = false;
    let initial = {};
    let cropType ="";
    exports.begingCrop = function(e){
        cropIsStarted = true;
        initial.X = e.pageX;
        initial.Y = e.pageY;
        initial.shiftX = e.layerX;
        initial.shiftY = e.layerY;               
        initial.target = e.target;
        
        switch (e.target.className) {
            case 'higlight-crop': cropType = "m"; 
                break;
            case 'crop-lt': cropType = "lt";        
                break;
            case 'crop-lc': cropType = "lc";           
                break;
            case 'crop-lb': cropType = "lb";                 
                break;
            case 'crop-ct': cropType = "ct";                  
                break;
            case 'crop-rt': cropType = "rt";                 
                break;
            case 'crop-rc': cropType = "rc";                  
                break;
            case 'crop-rb': cropType = "rb";                  
                break;
            case 'crop-cb': cropType = "cb";                  
                break;
            default:
                cropIsStarted = false;
                break;
        }
    }
    exports.updateCrop = function(e){
        
        if(cropIsStarted == false) return;              
        
        switch (cropType) {
            case 'm':  
                moveTo(e);
                exports.initCover(cropper.c);
                break;            
            default: 
                resize(cropType,e.pageX,e.pageY);
                exports.initCover(cropper.c);
                break;
        }
    }   
    exports.endCrop = function(e){
        if(cropIsStarted == false) return;
        cropIsStarted = false;
    }
    function moveTo(e){  

        let left = e.pageX - initial.shiftX;
        let top = e.pageY - initial.shiftY;        
        
        if(!isNaN(left)){
            initial.target.style.left =  left + 'px';
            initial.target.style.top =  top + 'px';
        }
    }
    function resize(corner,dx,dy){
        let target = initial.target.offsetParent;

        let x = target.offsetLeft;
        let y = target.offsetTop;        
        let w = target.offsetWidth;
        let h = target.offsetHeight;
        
        switch (corner) {
            
            case 'lt': 
                x = dx;
                y = dy;
                w += (initial.X - dx);
                h += (initial.Y - dy);
                break;
            case 'lc':
                x = dx;
                w += (initial.X - dx);
                break;
            case 'lb':
                x = dx;
                w += (initial.X - dx);
                h += -(initial.Y - dy);            
                break;
            case 'ct': 
                y = dy;
                h += (initial.Y - dy);               
                break;
            case 'rt':
                y = dy;
                w += -(initial.X - dx);
                h += (initial.Y - dy);
                break;
            case 'rc':
                w += -(initial.X - dx);          
                break;
            case 'rb':
                w += -(initial.X - dx);
                h += -(initial.Y - dy);
                break;
            case 'cb':
                h += -(initial.Y - dy);               
                break;
            default:
                return;
        }

        if(w <= 5 && h <= 5) { return;}
        target.style.left = x +'px';
        target.style.top = y +'px';
        target.style.width = w +'px';
        target.style.height = h +'px';

        initial.X = dx;
        initial.Y = dy;

        initCorners();
    }
    globals.listener.listen((message)=>{       
        if(message.func == 'captureVisiblePage'){            
            globals.self.first('.screen-capture-print').then((container)=>{               
                container.children[0].src = message.data; 
            });                       
        }
    }); 
    exports.visible = ()=>{    
        exports.view((document.childNodes[1] || document.childNodes[0]));
        //listener.send({func:'captureVisiblePage'});        
    }
    exports.getSelectedRectangle = function(){
        console.log(document.body.style.marginLeft);
        return {
            left:cropper.c.offsetLeft + offsetScroll.left,
            top:cropper.c.offsetTop + offsetScroll.top,
            width:cropper.c.offsetWidth,
            height:cropper.c.offsetHeight
        }
    }
    return exports; 
})();
