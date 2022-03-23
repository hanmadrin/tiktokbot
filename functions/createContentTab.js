import MetaData from '../models/MetaData.js';
import contentTabInfo from './contentTabInfo.js';
const createContentTab = async ()=>{
    await contentTabInfo();
    // const screens = await chrome.system.display.getInfo();
    // let width = 2000;
    // screens.forEach(screen => {
    //     if(screen.workArea.width < width) width = screen.workArea.width;
    // });
    // const currentWindow = await chrome.windows.getCurrent();
    // await chrome.windows.update(currentWindow.id,{
    //     left:500,
    //     width: width-500,
    //     state:'normal'
    // });
    // let window = await chrome.windows.create({
    //     type:'popup', 
    //     focused:true,
    //     url:'https://tiktok.com',
    //     width:500,
    //     left:0
    // });
    // const windowId = window.id;
    // const tabId = window.tabs[0].id;
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        url: 'https://*.tiktok.com/*'
    });
    let tab = {};
    if(tabs.length>0){
        tab = tabs[0];
        if(!tabs[0].active){
            await chrome.tabs.reload(tabs[0].id);
            await chrome.tabs.update(tabs[0].id,{
                active: true
            });
            
        }else{
            await chrome.tabs.reload(tabs[0].id);
        }
    }else{
        tab = await chrome.tabs.create({
            url: 'https://tiktok.com/following'
        });
    }
    console.log(tab);
    await MetaData.PUT({
        set: {value: `${tab.id}`},
        where: {name: [{ operation: 'equal', value: 'contentTabId'}]}
    });
    // await MetaData.PUT({
    //     set: {value: `${windowId}`},
    //     where: {name: [{ operation: 'equal', value: 'contentWindowId'}]}
    // });
};
export default createContentTab;