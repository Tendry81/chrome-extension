/*  ui builder => ui builder events */

"use strict";

this.selfEvents = (function(){  

    // listener exit button */
    globals.self.get('#exit').then((btns) =>{
        for (const btn of btns) {
            btn.addEventListener('click',(ev)=>{
                globals.self.close().then(res => console.log(res));
            });
        }        
    });
    /* iframe document  preselect mous move*/
    globals.self.first('.screen-capture-preselect').then((el) =>{
        el.addEventListener('mousemove',(ev)=>{
            globals.selectors.start(ev.clientX,ev.clientY);
        });
    });   
    /*Preselect mouse capturing*/
    globals.self.first('.screen-capture-preselect').then((el) =>{
        el.addEventListener('mousedown',(ev)=>{
            
        });
    });
    globals.self.first('#preselect-higlight').then((highlight) =>{
        highlight.addEventListener('mouseup',(ev)=>{
            globals.preview.view(highlight);
        });
    });    
    /*capture fullpage */
    globals.self.first('#capture-full').then((btn_capture) =>{
        btn_capture.addEventListener('click',(ev)=>{
            globals.preview.view(document.body);
        });
    });
    /*capture visible */
    globals.self.first('#capture-visible').then((btn_capture) =>{
        btn_capture.addEventListener('click',(ev)=>{
            globals.preview.visible();
        });
    });
    /* iframe document  preview mouse event*/
    globals.self.first('.screen-capture-preview').then((el) =>{
        el.addEventListener('mousemove',(ev)=>{
            globals.preview.updateCrop(ev);
        });
    }); 
    globals.self.first('.screen-capture-preview').then((el) =>{
        el.addEventListener('mousedown',(ev)=>{
            globals.preview.begingCrop(ev);
        });
    }); 
    globals.self.first('.screen-capture-preview').then((el) =>{
        el.addEventListener('mouseup',(ev)=>{
            globals.preview.endCrop(ev);
        });
    });

    /*download*/
    globals.self.first('.controls-group #donwload').then((el) =>{
        el.addEventListener('click',(ev)=>{
            globals.printer.download(globals.preview.getSelectedRectangle());
        });
    });
    /*print system*/
    globals.self.first('.controls-group #print').then((el) =>{
        el.addEventListener('click',(ev)=>{
            globals.printer.print(globals.preview.getSelectedRectangle());
        });
    });
    /*copy clipbroad*/
    globals.self.first('.controls-group #clipbroad').then((el) =>{
        el.addEventListener('click',(ev)=>{
            globals.printer.copy(globals.preview.getSelectedRectangle());
        });
    });
})();

