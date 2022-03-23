chrome.runtime.sendMessage({ request: "tabIdVerificationForContentScript" }, async (response) => {
    const currentTabId = response.tabId;
    const contentTabInfoValues = await contentTabInfo();
    chrome.runtime.sendMessage({ request: "userLoggedIn" },async (response)=>{
        if(`${currentTabId}`===contentTabInfoValues.tabValue && response.logged){
            const shadowScreenHolder = document.createElement('div');
            shadowScreenHolder.id='shadow_screen_holder';
            document.body.append(shadowScreenHolder);
            shadowScreen({wait:false})            
            const injectScript = document.createElement("script");
            injectScript.setAttribute("type","text/javascript"),
            injectScript.src = chrome.runtime.getURL("./contents/commentPost.js");
            document.head.insertBefore(injectScript,document.head.children[0])
            await sleep(2000);
            try{
                await contentScript({tabId:currentTabId});
            }catch(e){
                await sleep(5000);
                window.location.href="https://www.tiktok.com"
            }
            
        }
    });
});
async function contentScript ({tabId}){
    //connect to service worker
    const port = chrome.runtime.connect({name: "contentScript"});
    //gather basic page info
    const baseUrl = window.location.href;
    const pageHasVideosInfo = pageHasVideosVerify();
    //wait for sometime
    await sleep(2000);
    //open videos if page has one
    if(pageHasVideosInfo.status){
        if(pageHasVideosInfo.typeA.length>0){
            document.querySelector(typeAEleborateSelector()).click();
        }else{
            document.querySelector(typeBEleborateSelector()).click();
        }
    }
    //wait sometime to load opened videos
    await sleep(2000);
    //gather detailed info if page had video and clicked one
    let detailedVideoInfoValues =  await detailedVideoInfo();
    // post a detailed report to service worker
    port.postMessage({port,
        content: {
            // request:'regularRequest',
            baseUrl: baseUrl,
            pageHasVideos:pageHasVideosInfo.status,
            detailedVideo: detailedVideoInfoValues
        }
    });
    // listen for responses from service worker
    port.onMessage.addListener(async (server)=>{
        console.log(!server?server.order:server);
        switch(server.order){
            case 'redirectToValidPage':
                window.location.href=server.redirectUrl;
            break;
            case 'nextVideo':
                document.querySelector(elaboratedVideoNextButtonSelector()).click(); 
                await sleep(5000);
                detailedVideoInfoValues =  await detailedVideoInfo();  
                port.postMessage({port,
                    content: {
                        // request:'regularRequest',
                        baseUrl: baseUrl,
                        pageHasVideos:pageHasVideosInfo.status,
                        detailedVideo: detailedVideoInfoValues
                    }
                }); 
            break;
            case 'performActions':
                await sleep(5000);
                actions = server.actions;
                for(let i=0;i<actions.length;i++){
                    await sleep(1000);
                    switch(actions[i]){
                        case 'like':
                            console.log('liking video');
                            document.querySelector(elaboratedVideoLikeButtonSelector()).click();
                        break;
                        case 'follow':
                            console.log('folloing creator');
                            document.querySelector(elaboratedVideoFollowButtonSelector()).click(); 
                        break;
                        case 'comment':
                            console.log('commenting on video');
                            postComment({postId:server.postId,commentText:server.commentText})
                        break;
                    }
                }
                await sleep(5000);
                if(server.redirect)
                    window.location.href=server.nextUrl;
                else{
                    document.querySelector(elaboratedVideoNextButtonSelector()).click();
                    await sleep(2000);
                    detailedVideoInfoValues =  await detailedVideoInfo();  
                    port.postMessage({port,
                        content: {
                            // request:'regularRequest',
                            baseUrl: baseUrl,
                            pageHasVideos:pageHasVideosInfo.status,
                            detailedVideo: detailedVideoInfoValues
                        }
                    }); 
                }
                    
            break;
            case 'waitUntillNextHour':
                shadowScreen({wait:true});
            break;
            default: 
                console.log('do not know what server asking for');
            break;
        }
    });
};


async function detailedVideoInfo(){
    await sleep(2000);
    let info = {};
    const elaboratedVideoHolder = document.querySelector(elaboratedVideoSelector());
    const unFollowButtonExists = document.querySelector(elaboratedVideoUnFollowButtonSelector())!==null;
    const followButtonExists = document.querySelector(elaboratedVideoFollowButtonSelector())!==null;
    const nextButton = document.querySelector(elaboratedVideoNextButtonSelector());
    if(elaboratedVideoHolder!==null){
        info.exists = true;
        info.code = videoUrlCode();
        // info.currentUrl = window.location.href;
        info.like = document.querySelector(elaboratedVideoLikeSVGSelector()).getAttribute('fill')==='rgba(254, 44, 85, 1.0)';
        info.follow = unFollowButtonExists || !followButtonExists;
        info.comment = document.querySelector(elaboratedVideoCommentSectionSelector())===null;
        info.hasNextButton = nextButton!==null?!(nextButton.disabled):false;
    }else{
        info.exits = false;
    }
    return info;
}




function videoUrlCode(){
    //https://www.tiktok.com/@dilekhay/video/7040790114498350341?is_copy_url=1&is_from_webapp=v1&lang=en
    let url = window.location.href;
    if(url.split('?').length==2){
        url = url.split('?')[0];
        if(url.split('/').length==6){
            return url.split('/')[5];
        }
    }
    return null;

}
function postComment({postId,commentText}){
    window.localStorage.setItem('tiktokBot-postId',postId);
    window.localStorage.setItem('tiktokBot-commentText',commentText);
}
function shadowScreen({wait}){
    const shadowScreen = document.createElement('div');
    shadowScreen.className='tiktokBot_shadow_screen';
    if(wait){
        const span = document.createElement('span');
        span.innerText = 'TiktokBot will continue next hour';
        shadowScreen.append(span);
    }else{
        const span = document.createElement('span');
        span.innerText = 'TiktokBot Working';
        shadowScreen.append(span);
    }
    document.getElementById('shadow_screen_holder').replaceChildren(shadowScreen);
}
function pageHasVideosVerify(){
    const typeA = document.querySelectorAll(typeASelector());
    const typeB = document.querySelectorAll(typeBSelector());
    return {status:(typeA.length!==0 || typeB.length !==0),typeA,typeB};
}
async function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

function elaboratedVideoSelector(){return '.tiktok-7t2h2f-DivBrowserModeContainer.e1xqvjno0';}
function elaboratedVideoLikeSVGSelector(){return `${elaboratedVideoSelector()} button.tiktok-zhw1g9-ButtonActionItem.e1bs7gq20:nth-child(1) svg`;}
function elaboratedVideoFollowButtonSelector(){ return `${elaboratedVideoSelector()} .e1c82oqe6.tiktok-5xuix8-Button-StyledFollowButton.ehk74z00`;}
function elaboratedVideoUnFollowButtonSelector(){ return `${elaboratedVideoSelector()} .e1c82oqe6.tiktok-co112j-Button-StyledFollowButton.ehk74z00`;}
function elaboratedVideoCommentSectionSelector(){return `${elaboratedVideoSelector()} .tiktok-1xjmtjf-DivBottomCommentContainer.ezjghlj4`;}
function elaboratedVideoNextButtonSelector(){return `${elaboratedVideoSelector()} .tiktok-2xqv0y-ButtonBasicButtonContainer-StyledVideoSwitchV2.e1xqvjno15`;}
function elaboratedVideoLikeButtonSelector(){return `${elaboratedVideoSelector()} .tiktok-zhw1g9-ButtonActionItem.e1bs7gq20:nth-child(1)`;}

function typeASelector(){return '.tiktok-1p48f7x-DivItemContainer.e1eulw5o0';}
function typeBSelector(){return '.tiktok-x6y88p-DivItemContainerV2.e1z53d07'}
function typeAEleborateSelector(){return `${typeASelector()} .tiktok-wc6k4c-DivActionItemContainer.e1e0ediu0 .tiktok-1xiuanb-ButtonActionItem.e1bs7gq20:nth-child(2)`;}
function typeBEleborateSelector(){return `${typeBSelector()} > div:nth-child(1) a`;}

async function trainGeneratingResult(){
    await sleep(5000);
    document.querySelector(elaboratedVideoNextButtonSelector()).addEventListener('click',async function(){
        const values = await detailedVideoInfo();
        console.log('infos',values);
    });
}
// trainGeneratingResult();