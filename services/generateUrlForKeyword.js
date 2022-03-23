import HashTag from '../models/HashTag.js';
const generateUrlForKeyword = async (keyWord)=>{
    const commonUrl = 'https://www.tiktok.com';
    switch(keyWord){
        case 'foryou':
            return `${commonUrl}/foryou`;
        break;
        case 'following':
            return `${commonUrl}/following`;
        break;
        case 'tag':
            const allHashTags = await HashTag.GET();
            const allHashTagsLength = allHashTags.length;
            if(allHashTagsLength>0){
                const randomHashTagIndex = Math.floor(Math.random()*allHashTagsLength);
                const randomHashTag = allHashTags[randomHashTagIndex].data;
                return `${commonUrl}/tag/${randomHashTag}`;
            }else{
                return null;
            }
        break;
        default:
            return null;
        break;
    }
};
export default generateUrlForKeyword;