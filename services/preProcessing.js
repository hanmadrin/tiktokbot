import contentTabInfo from '../functions/contentTabInfo.js';
import featuresSettingsInfo from '../functions/featureSettingsInfo.js';
import limitSettingsInfo from '../functions/limitSettingsInfo.js';
// import purchaseInfo from '../functions/purchaseInfo.js';
import verifyPurchase from '../functions/verifyPurchase.js';
const preProcessing = async()=>{
    if(await verifyPurchase()){
        // await purchaseInfo();
        await contentTabInfo();
        // await featuresSettingsInfo();
        // await limitSettingsInfo();
    }
};
export default preProcessing;