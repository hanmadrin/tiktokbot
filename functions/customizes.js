const customizes = ()=>{
    return {
        limits:{
            title: "Limits",
            levels: ["1","2"],
            config: {
                like:{
                    title: "Liking Post Limit",
                    details: "Select number of Like you want to give in posts per hour",
                    dbKey: "likePostPerHour",
                    level1hourly: 20,
                    level1daily: 300,
                    level2hourly: 50,
                    level2daily: 500,
                    highestHourly: 50,
                    highestDaily: 500,
                },
                follow:{
                    title: "Following Limit",
                    details: "Select number of People you want to follow per hour",
                    dbKey: "followPeoplePerHour",
                    level1hourly: 10,
                    level1daily: 100,
                    level2hourly: 20,
                    level2daily: 200,
                    highestHourly: 20,
                    highestDaily: 200,
                },
                comment:{
                    title: "Comments Limit",
                    details: "Select number of comments you want to post per hour",
                    dbKey: "commentPostPerHour",
                    level1hourly: 0, 
                    level1daily: 0,
                    level2hourly: 40,
                    level2daily: 500,
                    highestHourly: 40,
                    highestDaily: 500,
                }
            }
        },
        hashTags:{
            title: "HashTags",
            levels: ["2"],
            config: {
                characterLimit: 140,
                level1limit: 5,
                level2limit: 10
            }
        },
        comments:{
            title: "Comments",
            levels: ["2"],
            config:{
                characterLimit: 150,
                level1limit: 5,
                level2limit: 10
            }
        }
    };
};
export default customizes;