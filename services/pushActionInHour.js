import ActionCount from "../models/ActionCount.js";
const pushActionInHour = async ({action,hour})=>{
    console.log('action counted',action);
    const actionCount = await ActionCount.GET({
        hour: [{operation:'equal',value:hour}],
        action: [{operation:'equal',value:action}],
    });
    if(actionCount.length==0){
        await ActionCount.POST({hour,action,count:1});
    }else{
        const newCount = (actionCount[0].count)+1;
        await ActionCount.PUT({
            set: {count:newCount},
            where:{
                hour:[{operation:'equal',value:hour}],
                action:[{operation:'equal',value:action}]
            }
        });
    }
};
export default pushActionInHour;