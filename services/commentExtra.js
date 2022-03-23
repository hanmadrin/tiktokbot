import VideoComment from "../models/VideoComment.js";

const addToCommented = async(id)=>{
    const videoComments = await VideoComment.GET({
        id: [{operation:'equal',value:id}]
    });
    if(videoComments.length==0){
        await VideoComment.POST({
            id:`${id}`
        });
    }
};

const isCommented = async(id)=>{
    const videoComments = await VideoComment.GET({
        id: [{operation:'equal',value:id}]
    });
    return videoComments.length!=0;
};

export {addToCommented,isCommented};