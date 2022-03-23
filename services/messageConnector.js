import messageListener from "./messageListener.js";
const messageConnector = async ()=>{
    chrome.runtime.onConnect.addListener((port)=>{
        console.assert(port.name=='contentScript');
        if(port.name === "contentScript"){
            messageListener({port});
        }else{
            port.postMessage({status:"ignored",message:"Not obliged to reply you!"});
        }
    });
};
export default messageConnector;