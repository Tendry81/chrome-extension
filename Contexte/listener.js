/* Listener conncection with contents scripts */
"use strict";

this.listener = (function(){
    const exports = {};
    exports.listen = function(onmessage){
        browser.runtime.onMessage.addListener((message)=>{
            return onmessage(message);
        });
    }
    exports.send = function(tabId,message){
        browser.tabs.sendMessage(tabId,message);        
    }

    return exports;
})();