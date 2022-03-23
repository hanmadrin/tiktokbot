import ChromeStorageDB from "../modules/ChromeStorageDB.js";
let VideoComment = new ChromeStorageDB({
    name:'videoComments',
    attributes:{
        id:{
            type: 'string',
            primaryKey: true,
        }
    }
});
export default VideoComment;