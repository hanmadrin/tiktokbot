import ChromeStorageDB from "../modules/ChromeStorageDB.js";
let User = new ChromeStorageDB({
    name:'users',
    attributes:{
        id:{
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
            type: 'string',
            primaryKey: true,
        },
        followed:{
            type: 'boolean',
        }
        // profileVisited:
    }
});
export default User;