import generateValidcontentUrlWithActions from "./generateValidcontentUrlWithActions.js";
import limitOutActions from "./limitOutActions.js";
const validActionsWithCountCheck = async ()=>{
    const validUrlWithActions = await generateValidcontentUrlWithActions();
    const validUrlWithActionsLength = validUrlWithActions.length;
    const doneActions = await limitOutActions();
    for(let i=0;i<doneActions.length;i++){
        for(let j=0;j<validUrlWithActionsLength;j++){
            const index = validUrlWithActions[j].actions.indexOf(doneActions[i]);
            if(index > -1){
                validUrlWithActions[j].actions.splice(index,1);
            }
        }
    }
    let checkedlength = validUrlWithActions.length; 
    let newList = [];
    for(let i=0;i<checkedlength;i++){
        if(validUrlWithActions[i].actions.length!=0){
            newList.push(validUrlWithActions[i]);
        }
    }
    return newList;
};
export default validActionsWithCountCheck;