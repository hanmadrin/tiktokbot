import navigationButton from "./navigationButton.js";
import tag from "./tag.js";
import logo from "./logo.js";
import featuresPage from './featuresPage.js';
import customizationPage from './customizationPage.js';
import aboutPage from './aboutPage.js';
import homePage from "./homePage.js";
import loaderPage from "./loaderPage.js";
import sleep from "../functions/sleep.js";

const topBar = ({selected})=>{
    const section  = tag({
        name: 'section',
        classes: ['top_bar_section'],
    });
    const buttonHolder = tag({
        name: 'div',
        classes: ['nav_button_holder']
    });
    logo.addEventListener('click',async ()=>{
        await loaderPage();
        await homePage();
    });
    /* features page*/
    const features = navigationButton({
        classes:[
            'navigation_button',
            selected.features?'selected':''
        ],
        html:'Features'
    });
    features.addEventListener('click',async ()=>{
        await loaderPage();
        await featuresPage();
    })
    /* customize page*/
    const customize = navigationButton({
        classes:[
            'navigation_button',
            selected.customize?'selected':''
        ],
        html:'Customize'
    });
    customize.addEventListener('click',async ()=>{
        await loaderPage();
        await customizationPage();
    })
    /* home page*/
    const home = navigationButton({
        classes:[
            'navigation_button',
            selected.home?'selected':'' 
        ],
        html:'Home'
    });
    home.addEventListener('click',async ()=>{
        await loaderPage();
        await homePage();
    })

    section.appendChild(logo);
    buttonHolder.appendChild(home);
    buttonHolder.appendChild(features);
    buttonHolder.appendChild(customize);
    section.appendChild(buttonHolder);

    return section;
}

export default topBar;