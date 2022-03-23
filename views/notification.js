import tag from './tag.js';
const notification = (message,type)=>{
    const notificationHolder = tag({
        name: 'div',
        classes:['notification_holder']
    });
    const notification = tag({
        name: 'div',
        classes: ['notification',`${type}`],
        html: message
    });
    notificationHolder.appendChild(notification);
    return notificationHolder;
}

export default notification;