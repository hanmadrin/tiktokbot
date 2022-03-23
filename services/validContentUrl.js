import validActionsWithCountCheck from './validActionsWithCountCheck.js';
const validContentUrl = async (url)=>{
    const validCheckedUrlWithActionsValues = await validActionsWithCountCheck();
    let isValid = false;
    for(let i=0;i<validCheckedUrlWithActionsValues.length;i++){
        if(url.indexOf(`/${validCheckedUrlWithActionsValues[i].keyword}`)!=-1){
            isValid=true;
        }
    }
    return isValid;
};
export default validContentUrl;