const userLoggedIn = async ()=>{
    const cookie = await chrome.cookies.getAll({url: 'https://tiktok.com',name:'cmpl_token'});
        return cookie.length!=0;
}

export default userLoggedIn;