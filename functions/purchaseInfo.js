import MetaData from '../models/MetaData.js';

const purchaseInfo = async ()=>{
    /*email data*/
    const emailData = await MetaData.GET({
        name: [{ operation: 'equal', value: 'purchaseEmail'}]
    });
    let emailValue = '';
    if(emailData.length==1)
        emailValue = emailData[0].value;
    else
        await MetaData.POST({name:'purchaseEmail',value:''});
    /*token data*/
    const tokenData = await MetaData.GET({
        name: [{operation: 'equal', value: 'purchaseToken'}]
    });
    let tokenValue = '';
    if(tokenData.length==1)
        tokenValue = tokenData[0].value;
    else
        await MetaData.POST({name:'purchaseToken',value:''});
    /*level data*/
    const levelData = await MetaData.GET({
        name: [{operation: 'equal', value: 'purchaseLevel'}]
    });
    let levelValue = '';
    if(levelData.length==1)
        levelValue = levelData[0].value;
    else
        await MetaData.POST({name:'purchaseLevel',value:''});

    return {emailValue,tokenValue,levelValue};
}

export default purchaseInfo;