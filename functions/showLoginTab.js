const showLoginTab = async ()=>{
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        url: 'https://*.tiktok.com/*'
    });
    if(tabs.length>0){
        if(!tabs[0].active){
            await chrome.tabs.reload(tabs[0].id);
            await chrome.tabs.update(tabs[0].id,{
                active: true
            });  
        }else{
            await chrome.tabs.reload(tabs[0].id);
        }
    }else{
        await chrome.tabs.create({
            url: 'https://tiktok.com'
        });
    }
};
export default showLoginTab;