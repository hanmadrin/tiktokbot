import contentTabInfo from "../functions/contentTabInfo.js";
import userLoggedIn from "../functions/userLoggedIn.js";
const contentTabVerification = async (tabId)=>{
    const contentTabInfoValues = await contentTabInfo();
    if(`${tabId}`===contentTabInfoValues.tabValue && await userLoggedIn())
        return true;
    else
        return false;
};
export default contentTabVerification;