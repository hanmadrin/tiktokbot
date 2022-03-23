import pushActionInHour from './pushActionInHour.js';
import currentHour from './currentHour.js';
const saveActionsCount= async (actions)=>{
    for(let i=0;i<actions.length;i++){
        const hour = currentHour();
        await pushActionInHour({action:actions[i],hour:hour});
    }
};
export default saveActionsCount;