/* code injector */
let standardScripts = [
    'selector/UI_Builder.js',
    "selector/UI_BuilderEvents.js",
    "selector/selectors.js",
    "selector/preview.js", 
    "selector/print.js",
]
"use strict";

this.loader = (function(){
    const exports = {};

    exports.load = function(id){      
        for (const script of standardScripts) {
            browser.tabs.executeScript(id,{file:script}); 
            proc = true;
        }        
    }
    exports.unload = function(id){        
        globals.listener.send(id,{func:'unload'});
    }
    globals.listener.listen((msg)=>{
        if(msg.func=='unload'){
            proc = false;
        }
    });
    return exports;
})();