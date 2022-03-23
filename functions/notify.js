import tag from "../views/tag.js";
import sleep from "./sleep.js";
const notify = async ({data,type})=>{
    const notificationHolder = tag({name:'div',classes:['notification_holder']});
    const notification = tag({name:'div',classes:['notification',type],html:data});
    notificationHolder.appendChild(notification);
    document.body.appendChild(notificationHolder);
    await sleep(2000);
    notificationHolder.remove();
};
export default notify;