import workingMapGenereator from "./workingMapGenerator.js";
import Comment from '../models/Comment.js'
const generateValidActionsForKeyword = async(keyword)=>{
    const allWorkingMap = (await workingMapGenereator()).active;
    const comments = await Comment.GET();
    const actions = allWorkingMap[keyword];
    if(comments.length>0){
        return actions;
    }else{
        const index = actions.indexOf('comment');
        if(index !== -1)
            actions.splice(index,1);
        return actions;
    }
    
}
export default generateValidActionsForKeyword;