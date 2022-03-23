import tag from './tag.js';
import topBar from './topBar.js';
const homePage = async ()=>{
    const page = tag({
        name: 'main',
        classes: ['main_page']
    });
    page.appendChild(await topBar({
        selected:{
            like:false,
            follow: false,
            comment: false,
            about: true
        }
    }));
    const contentSection = tag({
        name: 'section',
        classes: ['content_section']
    });
    page.appendChild(contentSection);
    document.body.replaceChildren(page);
}
export default homePage;