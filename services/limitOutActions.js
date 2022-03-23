import features from '../functions/features.js';
import limitSettingsInfo from '../functions/limitSettingsInfo.js';
import countActionInHour from './countActionInHour.js';
import countActionInDay from './countActionInDay.js';
import currentHour from './currentHour.js';
const limitOutActions = async ()=>{
    const allFeatures = features();
    const limitSettingValues = await limitSettingsInfo();
    const hour = currentHour();
    const allActions = [];
    for(let i=0;i<allFeatures.length;i++){
        if(!allActions.includes(allFeatures[i].action))
            allActions.push(allFeatures[i].action);
    }
    let outActions = [];
    for(let i=0;i<allActions.length;i++){
        const action = allActions[i];
        const actionCount = await countActionInHour({action:action,hour:hour});
        if(limitSettingValues[action] <= actionCount){
            outActions.push(action);
        }else{
            if(limitSettingValues[`${action}-daily`] <= await countActionInDay({action:action,hour:hour}))
                outActions.push(action);
        }
    }
    return outActions;
};
export default limitOutActions;