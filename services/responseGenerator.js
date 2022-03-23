import validContentUrl from './validContentUrl.js';
import validActionsWithCountCheck from "./validActionsWithCountCheck.js";
import { isCommented,addToCommented } from './commentExtra.js';
import Comment from '../models/Comment.js';
import saveActionsCount from './saveActionsCount.js';
import sleep from '../functions/sleep.js';
const resposneGenereator = async (content)=>{

    const availableWorks = await validActionsWithCountCheck();
    const totalAvailableWorks = availableWorks.length;
    const currentUrlIndex = (url)=>{
        for(let i=0;i<totalAvailableWorks;i++){
            if(url.includes(availableWorks[i].keyword))
                return i;
        }
    };
    const getNextUrl = (url)=>{
        const i= currentUrlIndex(url);
        return ((i+1)<totalAvailableWorks)?availableWorks[i+1].url:availableWorks[0].url;
        
    };
    // console.log(content);
    if(availableWorks.length!=0){
        // console.log('availableWorksexits',availableWorks);
        const randomValidRedirectUrl = availableWorks[Math.floor(Math.random()*totalAvailableWorks)].url;
        if(await validContentUrl(content.baseUrl)){
            if(content.pageHasVideos){
                if(content.detailedVideo.exists){
                    if(content.detailedVideo.code!==null){
                        const nextUrl = getNextUrl(content.baseUrl);
                        const availableActions = availableWorks[currentUrlIndex(content.baseUrl)].actions;
                        // console.log('availableActionsForThisUrl',availableActions);
                        let performableActions = [];
                        let commentText = '';
                        for(let i=0;i<availableActions.length;i++){
                            if(!content.detailedVideo[availableActions[i]])
                                performableActions.push(availableActions[i]);
                        }
                        if(performableActions.includes('comment')){
                            if(await isCommented(`${content.detailedVideo.code}`)){
                                const index = performableActions.indexOf('comment');
                                if(index !== -1)
                                    performableActions.splice(index,1);
                            }else{
                                await addToCommented(`${content.detailedVideo.code}`);
                            } 
                            const allComments = await Comment.GET();
                            const allCommentLength = allComments.length;
                            if(allCommentLength>0){
                                const randomCommentIndex = Math.floor(Math.random()*allCommentLength);
                                const randomComment = allComments[randomCommentIndex].data;
                                commentText = randomComment;
                            }
                        }
                        console.log('performableActions',performableActions);
                        if(performableActions.length!=0){
                            await saveActionsCount(performableActions);
                            return {commentText,order:'performActions',postId:content.detailedVideo.code,actions:performableActions,nextUrl:nextUrl,redirect:(!(content.detailedVideo.hasNextButton))}
                        }else{
                            if(content.detailedVideo.hasNextButton)
                                return {order:'nextVideo',nextUrl:nextUrl};
                            else
                                return {order:'redirectToValidPage',redirectUrl:nextUrl}; 
                        }
                    }else
                        return {order:'redirectToValidPage',redirectUrl:content.baseUrl};
                }else
                    return {order:'redirectToValidPage',redirectUrl:content.baseUrl};
            }else
                return {order:'redirectToValidPage',redirectUrl:randomValidRedirectUrl};
        }else
            return {order: 'redirectToValidPage',redirectUrl:randomValidRedirectUrl};
    }else
        return {order: 'waitUntillNextHour'}
    
};
export default resposneGenereator;