import generateValidActionsForKeyword from "./generateValidActionsForKeyword.js";
import generateUrlForKeyword from "./generateUrlForKeyword.js";
import workingMapGenereator from "./workingMapGenerator.js";
const generateValidcontentUrlWithActions = async()=>{
    const activeWorkingMap = (await workingMapGenereator()).active;
    const activeWorkingMapKeys = Object.keys(activeWorkingMap);
    let urlWithActions = [];
    let singleUrlWithActions = {};
    for(let i=0;i<activeWorkingMapKeys.length;i++){
        singleUrlWithActions = {};
        const keyword = activeWorkingMapKeys[i];
        singleUrlWithActions.url = await generateUrlForKeyword(keyword);
        singleUrlWithActions.actions = await generateValidActionsForKeyword(keyword);
        singleUrlWithActions.keyword = keyword;
        if(singleUrlWithActions.url!==null){
            urlWithActions.push(singleUrlWithActions);
        }
    }
    return urlWithActions;
};  
export default generateValidcontentUrlWithActions;