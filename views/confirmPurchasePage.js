import tag from './tag.js';
import logo from './logo.js';
import initialize from './initialize.js';
import purchaseInfo from '../functions/purchaseInfo.js';   
import MetaData from '../models/MetaData.js';                         
const confirmPurchasePage = async ()=>{
    

    const purchaseInfoValues = await purchaseInfo();
    const emailValue = purchaseInfoValues.emailValue;
    const tokenValue = purchaseInfoValues.tokenValue;
    const page = tag({
        name:'div',
        classes: ['confirm_purchase_holder']
    });
    const emailInput = tag({
        name: 'input',
        attributes:{ type: 'email', placeholder: 'Type purchasing email', value: emailValue },
        classes:[ 'purchase_confirm', 'email']
    });
    const tokenInput = tag({
        name: 'input',
        attributes:{ type: 'text', placeholder: 'Type your token',value: tokenValue},
        classes:['purchase_confirm','token']
    });
    const button = tag({
        name: 'button',
        attributes:{type: 'button',},
        classes:['purchase_confirm','submit'],
        html: 'Confirm Purchase'
    });
    button.addEventListener('click',async ()=>{
        const email = emailInput.value;
        const token = tokenInput.value;
        const emailData = await MetaData.GET({
            name: [{ operation: 'equal', value: 'purchaseEmail'}]
        });
        if(emailData.length==0)
            await MetaData.POST({
                name: 'purchaseEmail',
                value: email
            });
        else
            await MetaData.PUT({
                set:{value: email},
                where:{name: [{ operation: 'equal', value: 'purchaseEmail'}]}
            });
        const tokenData = await MetaData.GET({
            name: [{ operation: 'equal', value: 'purchaseToken'}]
        });
        if(tokenData.length==0)
            await MetaData.POST({
                name: 'purchaseToken',
                value: token
            });
        else
            await MetaData.PUT({
                set:{value: token},
                where:{name: [{ operation: 'equal', value: 'purchaseToken'}]}
            });
        initialize();
    });
    const error = tag({
        name:'div',
        classes: ['purchase_error'],
        html: '*Purchase confirmation failed. Please, try again!'
    });
    // page.appendChild(tag({
    //     name:'div',
    //     html: chrome.identity.id
    // }))
    page.appendChild(logo);
    page.appendChild(emailInput);
    page.appendChild(tokenInput);
    if(tokenValue!='' || emailValue!='')
        page.appendChild(error);
    page.appendChild(button);
    // return page;
    document.body.replaceChildren(page);
}

export default confirmPurchasePage;