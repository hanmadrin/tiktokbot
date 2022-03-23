import tag from "./tag.js";
const logo = tag({
    name: 'img',
    classes: ['bar_logo'],
    attributes: {
        src: chrome.runtime.getURL('../icons/logo.png')
    }
});

// const logoHolder = tag({
//     name: 'div',
//     classes: ['logo_holder']
// });
// logoHolder.appendChild(logo);
export default logo;