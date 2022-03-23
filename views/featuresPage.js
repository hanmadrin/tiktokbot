import tag from './tag.js';
import topBar from './topBar.js';
import featuresGenerator from './featuresGenerator.js';
const featuresPage = async ()=>{
    const page = tag({
        name: 'main',
        classes: ['main_page']
    });
    page.appendChild(await topBar({
        selected:{
            features: true,
            customize: false,
            about: false
        }
    }));
    const contentSection = tag({
        name: 'section',
        classes: ['content_section','features_page_content_section']
    });
    contentSection.appendChild(await featuresGenerator());






    page.appendChild(contentSection);
    document.body.replaceChildren(page);
}
export default featuresPage;