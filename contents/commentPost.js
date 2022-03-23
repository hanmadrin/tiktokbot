var commentedVideoIds = [];
function postComment({postId,commentText}){
    window.localStorage.setItem('tiktokBot-postId','null');
    window.localStorage.setItem('tiktokBot-commentText','null');
    console.log(window.localStorage.getItem('tiktokBot-postId')==='null');
    console.log(window.localStorage.getItem('tiktokBot-commentText')==='null');
    if(!commentedVideoIds.includes(postId)){
        commentedVideoIds.push(postId);
        const context = window.SIGI_STATE.AppContext.appContext;
        const http = new XMLHttpRequest;
        http.withCredentials=true;
        let param = `aid=1988&app_name=tiktok_web&device_platform=web_pc&device_id=${context.$wid}&region=${context.$region}&priority_region=&os=${context.$os}&referer=${document.referrer}&root_referer=&cookie_enabled=true&screen_width=${screen.width}&screen_height=${screen.height}&browser_language=${navigator.language}&browser_platform=${navigator.platform}&browser_name=${navigator.appCodeName}&browser_version=${navigator.appVersion}&browser_online=${navigator.onLine}&verifyFp=undefined&app_language=${context.$language}&timezone_name=${Intl.DateTimeFormat().resolvedOptions().timeZone}&is_page_visible=true&focus_state=true&is_fullscreen=true&history_len=${window.history.length}&battery_info=1&count=30&itemID=1&language=${navigator.language}&from_page=fyp&insertedItemID=&aweme_id=${postId}&text=${commentText}`;
        http.open("POST",`/api/comment/publish/?${param}`)
        http.onreadystatechange= function(){
            if(4==http.readyState){200==http.status?console.log("comment success"):console.log("comment fail");}
        };
        http.send();
    }
}
setTimeout(function(){
    window.location.href='https://www.tiktok.com/';
},(1000*60*10));
setInterval(function () {
    const postId = window.localStorage.getItem('tiktokBot-postId');
    const commentText = window.localStorage.getItem('tiktokBot-commentText');
    if(postId !== 'null' && commentText !== 'null'){
        postComment({postId:postId,commentText:commentText});
    }
}, 2000);