const currentHour = ()=>{
    const miliSeconds = new Date().getTime();
    const hour = Math.floor(miliSeconds/1000/3600);
    return hour;
};
export default currentHour;