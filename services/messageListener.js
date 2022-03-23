import contentTabVerification from './contentTabVerification.js';
import resposneGenereator from './responseGenerator.js';
const messageListener = ({port})=>{
    port.onMessage.addListener(async (request)=>{
        if(await contentTabVerification(port.sender.tab.id)){
            const server = await resposneGenereator(request.content);
            port.postMessage(server);
        }else{
            port.postMessage({status:"ignored",message:"You are not the content tab"});
        } 
    });
};
export default messageListener;