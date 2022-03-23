import customizes from "./customizes.js";
import MetaData from "../models/MetaData.js";
import purchaseInfo from "./purchaseInfo.js";
const limitSettingsInfo = async()=>{
    const purchaseValues = await purchaseInfo();
    const limitsConfig = customizes().limits.config;
    const limitKeys = Object.keys(limitsConfig);
    const limitSettingValues = {};
    for(let i=0;i<limitKeys.length;i++){
        const limitKey = limitKeys[i];
        const keyConfig = limitsConfig[limitKey]
        const dbKey =keyConfig.dbKey;
        const hourlyLimit = keyConfig[`level${purchaseValues.levelValue}hourly`];
        const dailyLimit = keyConfig[`level${purchaseValues.levelValue}daily`];
        let metaValue =0;
        const metaData = await MetaData.GET({
            name: [{ operation: 'equal', value: dbKey}]
        });
        if(metaData.length==1){
            metaValue = isNaN(parseInt(metaData[0].value))?0:parseInt(metaData[0].value);
        }
        else{
            await MetaData.POST({name:dbKey,value:`${parseInt(hourlyLimit/2)}`});
            metaValue = parseInt(hourlyLimit/2);
        }
        if(metaValue > hourlyLimit){
            metaValue = hourlyLimit
        }
        limitSettingValues[limitKey] = metaValue;
        limitSettingValues[`${limitKey}-daily`] = dailyLimit;
    }
    // console.log(limitSettingValues);
    return limitSettingValues;
};
export default limitSettingsInfo;