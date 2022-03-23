const sleep = async (ms) => {
    const msTenPercent = ms * 10/100;
    ms = ms-msTenPercent;
    const randomTenPercent = Math.floor(Math.random()*msTenPercent);
    ms = ms + randomTenPercent;
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default sleep;
