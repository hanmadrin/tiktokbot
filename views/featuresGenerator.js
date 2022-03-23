import tag from "./tag.js";
import features from "../functions/features.js";
import featureSettingsInfo from "../functions/featureSettingsInfo.js";
import MetaData from "../models/MetaData.js";
const featuresGenerator = async ()=>{
    const featureSettingsValues = await featureSettingsInfo();
    const featuresHolder = tag({
        name: 'div',
        classes: ['features_holder']
    });
    
    features().forEach(feature => {
        //chrome.runtime.getURL('../icons/logo.png')
        const iconUrl = chrome.runtime.getURL(`../icons/${featureSettingsValues[feature.name]}_icon.png`)
        const featureCard = tag({
            name: 'div',
            classes: ['feature_card']
        });
        const cardFront = tag({
            name:'div',
            classes: ['card_front'],
            html: feature.title,
            attributes:{
                style:`background-image: url('${iconUrl}')`
            }
        });
        const cardBack = tag({
            name:'div',
            classes: ['card_back']
        });
        if(featureSettingsValues[feature.name]==='premium'){
            const div = tag({name:'div',classes:['premium_back_image_holder']});
            const img = tag({name:'img',classes:['premium_back_image'],attributes:{src:iconUrl}});
            const span = tag({name:'span',classes:['premium_back_span'],html:'Premium Subscription Required'});
            div.appendChild(img);
            cardBack.appendChild(div);
            cardBack.appendChild(span);
        }else{
            const div = tag({name:'div',classes:['regular_back_holder']});
            const button = tag({
                name: 'button',
                attributes:{type: 'button',},
                classes:['regular_back_button'],
                html: featureSettingsValues[feature.name]==='active'?'Remove Task':'Add Task'
            });
            button.addEventListener('click',async ()=>{
                if(featureSettingsValues[feature.name]==='active'){
                    featureSettingsValues[feature.name]= 'inactive';
                    const metaData = await MetaData.PUT({
                        set:{value: 'inactive'},
                        where:{name: [{ operation: 'equal', value: feature.name}]}
                    });
                    
                }else{
                    featureSettingsValues[feature.name]= 'active';
                    const metaData = await MetaData.PUT({
                        set:{value: 'active'},
                        where:{name: [{ operation: 'equal', value: feature.name}]}
                    });
                }
                button.innerHTML = featureSettingsValues[feature.name]==='active'?'Remove Task':'Add Task';
                const iconUrl = chrome.runtime.getURL(`../icons/${featureSettingsValues[feature.name]}_icon.png`);
                cardFront.setAttribute('style',`background-image: url('${iconUrl}')`);
            })
            
            div.appendChild(button);
            cardBack.appendChild(div);
        }
        const cardContainer = tag({
            name:'div',
            classes: ['card_container']
        });
        cardContainer.appendChild(cardFront);
        cardContainer.appendChild(cardBack);
        featureCard.appendChild(cardContainer);
        featuresHolder.appendChild(featureCard);
    });
    return featuresHolder;
};
export default featuresGenerator;