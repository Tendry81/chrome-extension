"use strict";

/* globals variable */
var globals = this;
var browser = window.chrome||window.browser||window.msBrowser;
var proc = false;
this.setting = (function(){
    const exports = {};

    /* creation du context menu*/
    exports.menuLoader = (onmessage)=>{
        browser.contextMenus.create(
            {
                "title":"Prendre une capture de la page",
                "id":"screen_capture",
                "contexts":["page"]                
            },
            function(){
             browser.contextMenus.onClicked.addListener((info,tab)=>{
                 if(info.menuItemId == "screen_capture"){
                    proc = true;
                    return onmessage(info,tab);
                 }
             });
         });        
    } 
    
    return exports;
})();