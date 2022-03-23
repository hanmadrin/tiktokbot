import ChromeStorageDB from "../modules/ChromeStorageDB.js";
let HashTag = new ChromeStorageDB({
    name:'hashTags',
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
export default HashTag;