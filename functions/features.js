const features = ()=>{
    return [
        {
            name:"likeVideosFromForYouPage",
            levels: ["1","2"],
            title: "Like videos from 'For You' page",
            page: 'foryou',
            action: 'like'
        },
        {
            name:"likeVideosFromFollowingPage",
            levels: ["1","2"],
            title: "Like videos from 'Following' page",
            page:'following',
            action:'like'  
        },
        {
            name:"likeVideosFromHashTagSearchPage",
            levels: ["2"],
            title: "Like videos from 'HashTag Search' page", 
            page:'tag',
            action:'like'  
        },
        {
            name:"followPeopleFromForYouPage",
            levels: ["1","2"],
            title: "Follow people from 'For You' page",
            page:'foryou',
            action:'follow' 
        },
        {
            name:"followPeopleFromHashTagSearchPage",
            levels: ["2"],
            title: "Follow people from 'HashTag Search' page",
            page:'tag',
            action:'follow' 
        },
        {
            name: "commentVideosOnForYouPage",
            levels: ["2"],
            title: "Comment Videos on 'For you' Page",
            page:'foryou',
            action:'comment'
        },
        {
            name: "commentVideosOnFollowingPage",
            levels: ["2"],
            title: "Comment Videos on 'Following' Page",
            page:'following',
            action:'comment'
        },
        {
            name: "commentVideosOnHashTagSearchPage",
            levels: ["2"],
            title: "Comment Videos on 'HashTag Serach' Page",
            page:'tag',
            action:'comment'
        },
        // {
        //     name:"likePeoplesCommentInVideos",
        //     levels: ["2"],
        //     title: "Like people's comment in videos",
        //     pages:['tag'],
        //     actions:['likeComment']    
        // },
        
        // {
        //     name:"followPeopleFromComments",
        //     levels: ["2"],
        //     title: "Follow people from comments",  
        // },
        
        // {
        //     name: "visitProfileRandomly",
        //     levels: ["1","2"],
        //     title: "Visit profile before Folllowing people",  
        // },
    ];
};
export default features;