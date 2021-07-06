"use strict";

/* globals variable */

var browser = window.chrome||window.browser||window.msBrowser;

listener.listen((message)=>{
    switch(message.funcName){
        case "executeUi":
            ui.executeUi();
        break;
    }       
});
