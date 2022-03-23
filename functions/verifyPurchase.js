import sleep from './sleep.js';
import purchaseInfo from './purchaseInfo.js';
import MetaData from '../models/MetaData.js';

const verifyUser = async () =>{
    const purchaseInfoValues = await purchaseInfo();
    
    await sleep(200);
    
    await MetaData.PUT({
        set: {value:''},
        where:{name:[{operation:'equal',value:'purchaseLevel'}]}
    });
    return false;
    
    await MetaData.PUT({
        set: {value:'1'},
        where:{name:[{operation:'equal',value:'purchaseLevel'}]}
    });
    return true;

    await MetaData.PUT({
        set: {value:'2'},
        where:{name:[{operation:'equal',value:'purchaseLevel'}]}
    });
    return true;

};
export default verifyUser;