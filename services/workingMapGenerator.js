import featureSettingsInfo from "../functions/featureSettingsInfo.js";
import features from "../functions/features.js";
const workingMapGenereator = async ()=>{
    const featuresSettingInfoValues = await featureSettingsInfo();
    const allFeatureNames = Object.keys(featuresSettingInfoValues);
    let activeFeatureNames = [];
    for(let i=0;i<allFeatureNames.length;i++){
        const featureValue = featuresSettingInfoValues[allFeatureNames[i]]
        if(featureValue ==='active')
            activeFeatureNames.push(allFeatureNames[i]);
    }
    let activeWorkingMap = {};
    let allWorkingMap = {};
    features().forEach(feature => {
        if(allWorkingMap[feature.page]===undefined){allWorkingMap[feature.page] = [];}
        allWorkingMap[feature.page].push(feature.action);
        if(activeFeatureNames.includes(feature.name)){
            if(activeWorkingMap[feature.page]===undefined){activeWorkingMap[feature.page] = [];}
            activeWorkingMap[feature.page].push(feature.action);
        }
    });
    
    return {active: activeWorkingMap,all:allWorkingMap};
};
export default workingMapGenereator;