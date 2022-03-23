import ActionCount from "../models/ActionCount.js";
const countActionInTotal =async (action)=>{
    const actions = await ActionCount.GET({
        action:[{operation:'equal',value:action}]
    });
    let total =0;
    for(let i=0;i<actions.length;i++){
        total += actions[i].count;
    }
    return total;
};
export default countActionInTotal;