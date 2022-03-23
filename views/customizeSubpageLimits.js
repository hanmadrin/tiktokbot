import limitsRangeSlider from "./limitRangeSlider.js";
import tag from "./tag.js";
const customizeSubpageLimits = async ()=>{
    const like = await limitsRangeSlider({key:'like'});
    const follow = await limitsRangeSlider({key:'follow'});
    const comment = await limitsRangeSlider({key:'comment'});
    const div = tag({name:'div',classes:['customize_page_limits_subpage_content_holder']});
    div.append(like,follow,comment);
    return div;
};
export default customizeSubpageLimits;