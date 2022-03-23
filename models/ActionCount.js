import ChromeStorageDB from "../modules/ChromeStorageDB.js";
let ActionCount = new ChromeStorageDB({
    name:'actionCounts',
    attributes:{
        id:{
            autoIncrement: true,
            primaryKey: true,
        },
        hour:{
            type: 'number',
        },
        action:{
            type: 'string',
        },
        count:{
            type: 'number',
            default: 0
        }
    }
});
export default ActionCount;