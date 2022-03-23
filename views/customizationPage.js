import tag from './tag.js';
import topBar from './topBar.js';
import customizes from '../functions/customizes.js';
import purchaseInfo from '../functions/purchaseInfo.js';
import sleep from '../functions/sleep.js';
import customizeSubMenuContent from './customizeSubMenuContent.js';
const customizationPage = async ()=>{
    let firstTimeSubMenuClicked = true;
    const page = tag({
        name: 'main',
        classes: ['main_page']
    });
    page.appendChild(await topBar({selected:{customize: true}}));
    const contentSection = tag({
        name: 'section',
        classes: ['content_section','customize_content_section']
    });
    const purchaseInfoValues = await purchaseInfo(); 
    const premiumIconUrl = chrome.runtime.getURL(`../icons/premium_icon.png`);
    
    const sideMenuHolder = tag({name:'div',classes:['side_menu_holder','not_clicked_any']});
    const subContentHolder = tag({name:'div',classes:['sub_content_holder','not_clicked_any']});

    const buttonKeys = Object.keys(customizes());
    for(let i=0;i<buttonKeys.length;i++){
        const button = tag({name:'button',classes:['side_menu_buttons','sideBarMenuButtons']});
        const span = tag({name:'span',html:customizes()[buttonKeys[i]].title})
        const premiumIcon = tag({name:'img',attributes:{src:premiumIconUrl}});
        const isPremium = !customizes()[buttonKeys[i]].levels.includes(purchaseInfoValues.levelValue);
        if(isPremium){button.appendChild(premiumIcon);}
        const subMenuContent = await customizeSubMenuContent({key:buttonKeys[i]})
        button.addEventListener('click',async ()=>{
            document.querySelectorAll('.sideBarMenuButtons').forEach(element => {element.classList.remove("selected");});
            button.classList.add("selected");
            if(firstTimeSubMenuClicked){
                document.querySelectorAll('.customize_content_section .not_clicked_any').forEach(element => {
                    element.classList.remove("not_clicked_any");
                });
                firstTimeSubMenuClicked = false;
                await sleep(1000);
            }
            subContentHolder.replaceChildren(subMenuContent);
        });
        button.appendChild(span);
        sideMenuHolder.appendChild(button);
    }


    contentSection.appendChild(sideMenuHolder);
    contentSection.appendChild(subContentHolder);
    page.appendChild(contentSection);
    document.body.replaceChildren(page);
}
export default customizationPage;