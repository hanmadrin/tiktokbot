let MetaData = new ChromeStorageDB({
    name:'metaDatas',
    attributes:{
        id:{
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: 'string',
            primaryKey: true,
        },
        value:{
            type: 'string',
        }
    }
});
