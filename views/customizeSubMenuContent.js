import tag from "./tag.js";
import purchaseInfo from "../functions/purchaseInfo.js";
import customizes from "../functions/customizes.js";
import customizeSubpageLimits from "./customizeSubpageLimits.js";
import customizeSubpageHashTags from "./customizeSubpageHashTags.js";
import customizeSubpageComments from "./customizeSubpageComments.js";
const customizeSubMenuContent = async ({key})=>{
    const purchaseInfoValues = await purchaseInfo();
    const premium = !customizes()[key].levels.includes(purchaseInfoValues.levelValue);
    if(premium){
        const subHolder = tag({name:'div',classes:['sub_content_sub_holder premium_sub_holder']});
        const premiumIconUrl = chrome.runtime.getURL(`../icons/premium_icon_big.png`);
        const premiumIcon = tag({name:'img',attributes:{src:premiumIconUrl}});
        const title = tag({name:'h2',html:'Premium Subscription Required'});
        subHolder.appendChild(premiumIcon);
        subHolder.appendChild(title);
        return subHolder;
    }else{
        switch(key){
            case 'limits':
                return await customizeSubpageLimits();
            case 'hashTags':
                return await customizeSubpageHashTags();
            case 'comments':
                return await customizeSubpageComments();
        }
    }
    
    
}
export default customizeSubMenuContent;