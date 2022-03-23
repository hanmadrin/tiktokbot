import MetaData from '../models/MetaData.js';
import contentTabInfo from './contentTabInfo.js';
const removeContentTab = async ()=>{
    const contentValue =  await contentTabInfo();
    // const windowId = parseInt(contentValue.windowValue);
    // await chrome.windows.remove(windowId);
    const tabId = parseInt(contentValue.tabValue);
    await chrome.tabs.remove(tabId);
    await MetaData.PUT({
        set: {value: ''},
        where: {name: [{ operation: 'equal', value: 'contentTabId'}]}
    });
    // await MetaData.PUT({
    //     set: {value: ''},
    //     where: {name: [{ operation: 'equal', value: 'contentWindowId'}]}
    // });
};
export default removeContentTab;