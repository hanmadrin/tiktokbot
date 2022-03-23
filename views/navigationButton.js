import tag from './tag.js';
const navigationButton = ({classes,html,datas})=>{
    const button = tag({
        name: 'button',
        classes,
        html,
        datas: datas,
    });
    if(!classes.includes('disabled')){
        button.addEventListener('click',function(){
            console.log(this);
        });
    }
    return button;
}

export default navigationButton;