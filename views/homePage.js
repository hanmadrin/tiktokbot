import tag from './tag.js';
import topBar from './topBar.js';
import verifyContentTab from '../functions/verifyContentTab.js';
import createContentTab from '../functions/createContentTab.js';
import removeContentTab from '../functions/removeContentTab.js';
import userLoggedIn from '../functions/userLoggedIn.js';
import showLoginTab from '../functions/showLoginTab.js';
import homePageChart from './homePageChart.js';
const homePage = async ()=>{
    const table = await homePageChart();
    const page = tag({
        name: 'main',
        classes: ['main_page']
    });
    page.appendChild(await topBar({
        selected:{
            home:true
        }
    }));
    
    const contentSection = tag({
        name: 'section',
        classes: ['content_section','home_page_content_section']
    });
    const userLogged = await userLoggedIn();
    const contentTabExists = await verifyContentTab();
    const button = tag({
        name: 'button',
        attributes:{type: 'button',},
        classes:['homepage_main_button'],
        html: userLogged?(contentTabExists?'Terminate':'Start'):'Log in to Tiktok'
    });
    if(userLogged){
        if(contentTabExists){
            button.addEventListener('click',async ()=>{
                await removeContentTab();
                window.close();
            });
        }
        else{
            button.addEventListener('click',async ()=>{
                await createContentTab();
                window.close();
            });  
        }
    }else{
        button.addEventListener('click',async ()=>{
            await showLoginTab();
            window.close();
        });
    }
    contentSection.appendChild(table);
    contentSection.appendChild(button);

    page.appendChild(contentSection);
    document.body.replaceChildren(page);
}
export default homePage;