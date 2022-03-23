import sleep from "../functions/sleep.js";
import logo from "./logo.js";
import tag from "./tag.js";
const loaderPage = async ()=>{
    const loaderHolder = tag({
        name: 'div',
        classes: ['loader_page']
    });
    const loader = tag({
        name: 'div',
        classes: ['loader']
    });
    
    loaderHolder.appendChild(logo);
    loaderHolder.appendChild(loader);
    document.body.replaceChildren(loaderHolder);
    await sleep(300);
};


export default loaderPage;