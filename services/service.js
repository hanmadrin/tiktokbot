import preProcessing from "./preProcessing.js";
import messageConnector from "./messageConnector.js";
import shortMessageListener from "./shortMessageListener.js";
// import validActionsWithCountCheck from "./validActionsWithCountCheck.js";
const serviceWorker = async ()=>{
    shortMessageListener();
    await preProcessing();
    await messageConnector();
    // console.log(await validActionsWithCountCheck());
};
serviceWorker();
