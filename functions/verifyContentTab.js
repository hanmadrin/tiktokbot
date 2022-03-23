import contentTabInfo from "./contentTabInfo.js";
import userLoggedIn from "./userLoggedIn.js";
const verifyContentTab = async ()=>{
    const currentContentTab = await contentTabInfo();
    // const windowId = parseInt(currentContentTab.windowValue);
    const tabId = parseInt(currentContentTab.tabValue);
    let result = false;
    // if(!isNaN(windowId) && !isNaN(tabId)){
    //     try{
    //         const tab = await chrome.tabs.get(tabId);
    //         if(tabId === tab.id && windowId === tab.windowId){
    //             const window = await chrome.windows.get(windowId);
    //             if(window.type==='popup'){
    //                 result = true;
    //             }
    //         }
    //     }catch{
    //         console.log('error in verifying content window');
    //         result = false;
    //     }
    // }
    if(!isNaN(tabId) && await userLoggedIn()){
        try{
            const tab = await chrome.tabs.get(tabId);
            if(tabId === tab.id){
                result = true;
            }
        }catch{
            result = false;
        }
    }
    return result;
};
export default verifyContentTab; 