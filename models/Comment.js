import ChromeStorageDB from "../modules/ChromeStorageDB.js";
let Comment = new ChromeStorageDB({
    name:'comments',
    attributes:{
        id:{
            autoIncrement: true,
            primaryKey: true,
        },
        data:{
            type: 'string',
            primaryKey: true,
        }
    }
});
export default Comment;