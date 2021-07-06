/* print image */

'use strict';

this.printer = (function(){
    let exports = {};  
    let target = document.body;
    let imgData = null;

    function toImage(rect,ondrawfinish){
        globals.self.first('.screen-capture-print').then((container)=>{
            
            imgData = container.children[0];
           
            html2canvas(target,{backgroundColor:'white'}).then((canv)=>{
                //img.src = canv.toDataURL('image/png');
                draw(canv,rect);        
            });
           function draw(srcObj,rect){
                let canv = document.createElement('canvas');
                canv.width = rect.width;
                canv.height = rect.height;

                let ctx = canv.getContext('2d');
                ctx.drawImage(srcObj,rect.left,rect.top,rect.width,rect.height,0,0,rect.width,rect.height);
                
                if(container.children[1]){container.children[1].remove();}
                imgData.src = canv.toDataURL(`image/png`); 
                
                ondrawfinish(canv);
            }
        });        
    }    
    exports.download = (rect)=>{
        globals.self.first('.print-format input:checked').then((format)=>{           
            toImage(rect,(canv)=>{
                const size = {
                    w:canv.width,
                    h:canv.height
                }

                if(format.value != 'pdf'){
                    browser.runtime.sendMessage({
                        func:'donwloadData',
                        data: canv.toDataURL('image/png'),
                        type:format.value
                    }); 
                }
                else {
                    const date = new Date();
                    const $filname = `Screenshot_${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getTime()}.${format.value}`;
    
                    let orientation = 'portrait';
                    if(size.w > size.h){
                        orientation = 'landscape';
                    }
                    let doc = new jsPDF(orientation,'pt',[size.h,size.w]);
                    doc.addImage(canv.toDataURL('image/png'),'PNG',0,0,size.w,size.h);
                    doc.save($filname);
                } 
            });                               
        });                               
        globals.self.close();     
    }   
    exports.print = (rect)=>{
        globals.self.first('.print-format input:checked').then((format)=>{           
            toImage(rect, (canv) => {
                const size = {
                    w: canv.width,
                    h: canv.height
                }
                let orientation = 'portrait';
                if (size.w > size.h) {
                    orientation = 'landscape';
                }
                let doc = new jsPDF(orientation, 'pt', [size.h, size.w]);
                doc.addImage(canv.toDataURL('image/png'), 'PNG', 0, 0, size.w, size.h);
                //window.print();
            });                               
        });                               
        globals.self.close();
    }
    exports.copy = (rect)=>{
        globals.self.first('.print-format input:checked').then((format)=>{           
            toImage(rect, (canv) => {
                const size = {
                    w: canv.width,
                    h: canv.height
                }
                let orientation = 'portrait';
                if (size.w > size.h) {
                    orientation = 'landscape';
                }
                let doc = new jsPDF(orientation, 'pt', [size.h, size.w]);
                doc.addImage(canv.toDataURL('image/png'), 'PNG', 0, 0, size.w, size.h);
                //window.print();
            });                               
        });                               
        globals.self.close();
    }
    return exports;
})();