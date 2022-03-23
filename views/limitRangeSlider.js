import tag from "./tag.js";
import customizes from "../functions/customizes.js";
import limitSettingsInfo from "../functions/limitSettingsInfo.js";
import purchaseInfo from "../functions/purchaseInfo.js";
import notify from "../functions/notify.js";
import MetaData from "../models/MetaData.js";
const limitsRangeSlider = async ({key})=>{
    const min = 0;
    const max = customizes().limits.config[key].highestHourly;
    const limitSettingValues = await limitSettingsInfo();
    
    const value = limitSettingValues[key];
    const purchaseValues = await purchaseInfo();
    const highest = customizes().limits.config[key][`level${purchaseValues.levelValue}hourly`];
    const dbKey = customizes().limits.config[key].dbKey;
    const superHolder = tag({name:'div',classes:['limit_range_slider_super_holder']});
    const hasPremiumRange = max!==highest;
    const availablePercentage = highest/(max-min)*100;
    const premiumRangeMiddle = availablePercentage/2 + 50;
    const descriptionHolder = tag({name:'div',classes:['limit_range_slider_description_holder']})
    const title = tag({name:'div',classes:['limit_ramge_slider_title'],html: customizes().limits.config[key].title});
    const counter = tag({name:'span',classes:['limit_range_slider_counter'],html:`:(${value})`});
    title.append(counter);
    const details = tag({name:'div',classes:['limit_ramge_slider_details'],html: customizes().limits.config[key].details});
    const note = tag({name:'div',classes:['limit_ramge_slider_note'],html: `Note: your daily limit is : ${customizes().limits.config[key][`level${purchaseValues.levelValue}daily`]}`});
    descriptionHolder.append(title,details,note);
    const sliderHolder = tag({
        name:'div',
        classes:['limit_range_slider_holder']
    });
    const slider = tag({
        name:'input',
        classes:['limit_range_slider'],
        attributes: {
            type:'range',step:1,
            min,max,value
        }
    });
    const maxLimitPoint =  tag({name:'div',classes:['limit_range_slider_points max'],html:`${max}`});
    const minLimitPoint =  tag({name:'div',classes:['limit_range_slider_points min'],html:`${min}`});
    const highestLimitPoint =  tag({name:'div',classes:['limit_range_slider_points highest'],html:`${highest}`});
    const limitPointHolder = tag({name:'div',classes:['limit_range_slider_points_holder']});
    limitPointHolder.append(minLimitPoint);
    if(hasPremiumRange){
        limitPointHolder.append(highestLimitPoint);
        highestLimitPoint.setAttribute('style',`left:${availablePercentage}%`);
        const premiumIconUrl = chrome.runtime.getURL(`../icons/premium_icon.png`);
        const premiumIcon = tag({name:'img',classes:['limit_range_slider_premium_icon'],attributes:{src:premiumIconUrl}});
        const premiumIconHolder = tag({name:'div',classes:['limit_range_slider_premium_icon_holder']});
        premiumIconHolder.setAttribute('style',`left:${premiumRangeMiddle}%`);
        premiumIconHolder.append(premiumIcon);
        slider.setAttribute('style',`background-size:${availablePercentage}% 100%,100% 100%;`);
        sliderHolder.append(premiumIconHolder);
    }
    limitPointHolder.append(maxLimitPoint);
    slider.addEventListener('input',()=>{
        if(slider.value > highest){
            slider.value = highest; 
            notify({data:'Premium Subscription Required',type:'warning'});  
        } 
        counter.innerText = `:(${slider.value})`;
    });
    slider.addEventListener('change',async ()=>{
        let value = slider.value;
        if(slider.value > highest){
            value = highest;   
        }

        await MetaData.PUT({
            set: {value:`${value}`},
            where: {name:[{operation:'equal',value:dbKey}]}
        });
    });
    const premiumRange = tag({
        name:'div',
        classes:['limit_range_slider_premium_range']
    });
    // premiumRange.setAttribute("style",`width:`)
    sliderHolder.append(slider);
    superHolder.append(descriptionHolder,sliderHolder,limitPointHolder);
    return superHolder;
};
export default limitsRangeSlider;