const contentTabInfo = async ()=>{
    /*window data*/
    // const windowData = await MetaData.GET({
    //     name: [{ operation: 'equal', value: 'contentWindowId'}]
    // });
    // let windowValue = '';
    // if(windowData.length==1)
    //     windowValue = windowData[0].value;
    // else
    //     await MetaData.POST({name:'contentWindowId',value:''});
    /*tab data*/
    const tabData = await MetaData.GET({
        name: [{ operation: 'equal', value: 'contentTabId'}]
    });
    let tabValue = '';
    if(tabData.length==1)
    tabValue = tabData[0].value;
    else
        await MetaData.POST({name:'contentTabId',value:''});
    
    // return {windowValue,tabValue};
    return {tabValue};
};