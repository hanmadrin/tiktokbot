import features from "./features.js";
import MetaData from "../models/MetaData.js";
import purchaseInfo from "./purchaseInfo.js";
const featureSettingsInfo = async ()=>{
    const purchaseValues = await purchaseInfo();
    const featureSettingsValues = {};
    const total = features().length;
    for(let i=0;i<total;i++){
        const feature = features()[i];
        let metaValue = 'active';
        const levels = feature.levels;
        if(levels.includes(purchaseValues.levelValue)){
            const metaData = await MetaData.GET({
                name: [{ operation: 'equal', value: feature.name}]
            });
            if(metaData.length==1)
                metaValue = metaData[0].value;
            else
                await MetaData.POST({name:feature.name,value:'active'});
        } else{
            metaValue = 'premium';
        }
        // console.log(feature.name,metaValue);
        featureSettingsValues[feature.name]=metaValue;
    }
    // console.log(featureSettingsValues);
    return featureSettingsValues;
};
export default featureSettingsInfo;