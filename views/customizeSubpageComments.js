import tag from "./tag.js";
import Comment from "../models/Comment.js";
import customizes from "../functions/customizes.js";
import notify from "../functions/notify.js";
import purchaseInfo from "../functions/purchaseInfo.js";
const customizeSubpageComments = async ()=>{
    let noList = true;
    const purchaseInfoValues = await purchaseInfo();
    const noListDiv = tag({name:'div',classes:['no_list_div'],html:"No comments to work with!"});
    const subHolder = tag({name:'div',classes:['sub_content_sub_holder','list_page_holder']});
    const listHolder = tag({name:'div',classes:['list_page_lists_holder']});
    const singleList = (data)=>{
        const span = tag({name:'span',classes:['list_page_lists'],html:data});
        const cross = tag({name:'div',classes:['list_page_lists_cross'],html:'+'});
        cross.addEventListener('click',()=>{
            Comment.DELETE({data:[{operation:'equal',value:data}]});
            span.remove();
            if(listHolder.children.length==0){
                noList = true;
                listHolder.append(noListDiv);
            }
        });
        span.append(cross);
        return span;
    };
    
    
    const inputHolder = tag({name:'div',classes:['list_page_input_holder']});
    const inputBox = tag({name:'input',classes:['list_page_input_box'],attributes:{placeholder:'Type Here to add Comment',maxlength:customizes().comments.config.characterLimit}});
    const inputButton = tag({name:'button',classes:['list_page_input_button'],html:'Add Comment'});
    inputButton.addEventListener('click',async ()=>{
        const inputValue = inputBox.value.trim();
        // console.log(inputButton.value);
        if(inputValue !=''){
            const similardatas = await Comment.GET({data:[{operation:'equal',value:inputValue}]});
            const allDatas = await Comment.GET({});
            if(allDatas.length < customizes().comments.config[`level${purchaseInfoValues.levelValue}limit`] ){
                if(similardatas.length>0){
                    notify({data:'Already Exists',type:'warning'});
                }else{
                    await Comment.POST({data:inputValue});
                    const newData = singleList(inputValue);
                    if(noList){
                        noList= false;
                        listHolder.replaceChildren(newData);
                    }else{
                        listHolder.append(newData);
                    }
                }
            }else{
                notify({data:'You have reached your Limit',type:'warning'});
            }
        }else{
            notify({data:'Please! Add a valid Comment',type:'warning'});
        }
    });
    inputHolder.append(inputBox,inputButton);

    
    const datas = await Comment.GET({});
    if(datas.length>0){
        noList = false;
        datas.forEach(data => {
            const value = data.data;
            const list = singleList(value);
            listHolder.append(list);
        });
    }else{
        listHolder.append(noListDiv);
    }
    subHolder.append(listHolder,inputHolder);
    return subHolder;
};
export default customizeSubpageComments;