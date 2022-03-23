import ActionCount from "../models/ActionCount.js";
const countActionInDay = async({action,hour})=>{
    let dailySelectorDb = [];
    let total = 0;
    for(let i=0;i<24;i++){
        dailySelectorDb.push({operation:'equal',value:(hour-i)})
    }
    const actionCount = await ActionCount.GET({
        hour: dailySelectorDb,
        action: [{operation:'equal',value:action}],
    });
    if(actionCount.length==0){
        return 0;
    }else{
        for(let i=0;i<actionCount.length;i++){
            total += actionCount[i].count;
        }
        return total;
    }
}
export default countActionInDay;