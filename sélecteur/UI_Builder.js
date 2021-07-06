/*  ui builder */
var globals = this;
var browser = window.chrome||window.browser||window.msBrowser;

"use strict";
this.parent = document.body; 

this.self = (function(){
    let exports = {};
    var iframe = null;
    /*init element interfaces */   
    (function build(){
        let src = browser.runtime.getURL("ui.html");
        let css = browser.runtime.getURL("ui.css");

        function getIframeContent(){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET',src,false);
            xmlhttp.send();

            return xmlhttp.responseText;
        }
        function getStyles(){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET',css,false);
            xmlhttp.send();
            
            return xmlhttp.responseText;
        }
        (function createIframe(){
            iframe = document.createElement("iframe");
            iframe.id = "iframe-screen-capture";        
            iframe.setAttribute("style","z-index: 2147483647; border: medium none; top: 0px; left: 0px; margin: 0px; clip: auto; position: fixed !important; background-color: transparent; width: 100%; height: 100%; display: block;");
            document.body.append(iframe);
            iframe.contentWindow.document.write(getIframeContent().replace(/(\r\n|\n|\r)/gm,''));
            
            let iframeCss = document.createElement('style');
            iframeCss.textContent = getStyles();

            iframe.contentWindow.addEventListener('contextmenu',function(e){
                //e.preventDefault();
            });

            iframe.contentWindow.document.head.appendChild(iframeCss);  
                        
        })();

        (function initBtnIcons(){    
            const exitBtn = iframe.contentWindow.document.querySelectorAll('#exit img');
            exitBtn[0].src = browser.runtime.getURL('icons/icon_exit.png');
            exitBtn[1].src = browser.runtime.getURL('icons/icon_exit.png');        
            iframe.contentWindow.document.querySelector('#capture-full img')
            .src = browser.runtime.getURL('icons/menu-fullpage.svg');
            iframe.contentWindow.document.querySelector('#capture-visible img')
            .src = browser.runtime.getURL('icons/menu-visible.svg');
            iframe.contentWindow.document.querySelector('#print img')
            .src = browser.runtime.getURL('icons/print.png');
            iframe.contentWindow.document.querySelector('#donwload img')
            .src = browser.runtime.getURL('icons/download.png');
            iframe.contentWindow.document.querySelector('#clipbroad img')
            .src = browser.runtime.getURL('icons/copy.svg');
            iframe.contentWindow.document.querySelector('.capture-controls')
            .setAttribute('style',`background-image : url(${browser.runtime.getURL('icons/texture.png')}), linear-gradient(hsla(0,0%,32%,.99), hsla(0,0%,27%,.95));`);
        })();
    })();
    /* End */

    /* elements selectors function */
    exports.document = document.getElementById('iframe-screen-capture').contentWindow.document;
    exports.self = document.getElementById('iframe-screen-capture');
    exports.window =  document.getElementById('iframe-screen-capture').contentWindow;
    exports.get = function($){
        let elements = exports.document.querySelectorAll($);
        let promise = new Promise((resolve,reject)=>{
            if (elements != undefined){
                resolve(elements);
            }
            else{
                reject('No element found');
            }
        });

        return promise;
    }
    exports.first = function($){
        let promise = new Promise((resolve,reject)=>{
            exports.get($).then((element)=>{
                if (element[0] != undefined){
                    resolve(element[0]);
                }
                else{
                    reject('No element found');
                }
            });            
        });
        return promise;
    }
    exports.getAt = function($,index){
        let element = exports.get($)[index];
        let promise = new Promise((resolve,reject)=>{
            if (element != undefined){
                resolve(element);
            }
            else{
                reject('No element found');
            }
        });
        
        return promise;
    }
    /* End */

    /* Self methodes */
    globals.listener.listen((msg)=>{
        if(msg.func == 'unload'){
            exports.close();
        }
    });
    exports.close = function(){        
        let promise = new Promise((resolve,reject)=>{            
            if (exports.self != undefined){
                exports.self.remove();
                globals.listener.send({func:'unload'});
                resolve(true);
            }
            else{
                reject(false);
            }
        });

        return promise;
    }
    return exports;
})();