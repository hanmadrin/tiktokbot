import topBar from './topBar.js';
import loaderPage from './loaderPage.js';
import verifyUser from '../functions/verifyPurchase.js';
import confirmPurchasePage from './confirmPurchasePage.js';
import homePage from './homePage.js';
const initialize = async ()=> {
    await loaderPage();
    const verified = await verifyUser();
    if(verified)
        await homePage();
    else
        await confirmPurchasePage();
}
export default initialize;