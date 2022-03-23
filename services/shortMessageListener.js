const shortMessageListener = ()=>{
    chrome.runtime.onMessage.addListener(function(content, sender, sendResponse) {
        if (content.request === "tabIdVerificationForContentScript") {
            sendResponse({tabId: sender.tab.id});
        }
        if (content.request === "userLoggedIn") {
            sendResponse({logged: true});
        }
        // if(content.request === '')
    });
}
export default shortMessageListener;