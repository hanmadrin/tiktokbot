import ActionCount from "../models/ActionCount.js";
const countActionInHour = async ({action,hour})=>{
    const actionCount = await ActionCount.GET({
        hour: [{operation:'equal',value:hour}],
        action: [{operation:'equal',value:action}],
    });
    if(actionCount.length==0){
        return 0;
    }else{
        return actionCount[0].count;
    }
};
export default countActionInHour;