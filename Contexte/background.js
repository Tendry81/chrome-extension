/* background script manager */

listener.listen((message)=>{
    if(message.func == 'donwloadData'){
        dowload(message.data,message.type);            
    } 
});
function dowload(data,type){
    const date = new Date();
    const $filname = `Screenshot_${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getTime()}.${type}`;
    function onDownload(id){
        if(id === undefined){
            console.log('fail to download :'+chrome.runtime.lastError);
        }
        else{
            console.log('success');
        }
    }
    browser.downloads.download({
        url:data,
        filename: $filname,
        conflictAction:'uniquify'
    },onDownload);
}
browser.runtime.onInstalled.addListener(()=>{
    setting.menuLoader((info,tab)=>{        
        loader.load(tab.id,(res)=>{
          
        });      
    });
});
browser.browserAction.onClicked.addListener(()=>{
   browser.tabs.query({active:true,currentWindow:true},(tab)=>{
       console.log(tab[0].id);
        if(proc == true){
            globals.loader.unload(tab[0].id);
        }
        else{
            loader.load(tab[0].id,(res)=>{                
            });
        }
   });
});

