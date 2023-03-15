import puppeteer from 'puppeteer';
import * as fs from "fs";


(async () => {
    let entries = JSON.parse(fs.readFileSync('data/entries.json', 'utf8'));
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1080,
            height: 1024
        }
    });
    const page = await browser.newPage();

    for (const entry of entries) {
        for (const skin of entry.skins) {
            await page.goto(skin.url);
            await sleep(2000)
            // scroll to bottom
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await click(page, '.level > .level-right > .level-item > .control > .button')
            await sleep(1000)
            await page.evaluate(() => {
                background&&background.dispose();scene.clearColor=new BABYLON.Color3.FromHexString("#33E668");
            });
            await type(page, '#adv-opts-bg-color', '#000000')
            await sleep(2000)
            //await click(page, '.column > .advanced-options > tbody > tr > .is-flex')
            await sleep(15000)


        }
    }
    await sleep(150000)
    await browser.close();

})();


async function click(page, selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}

async  function type(page, selector, text) {
    await page.waitForSelector(selector);
    await page.type(selector, text);
}

async function press(page, selector, key) {
    await page.waitForSelector(selector);
    await page.press(selector, key);

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyFilter(page, skin) {
    await page.goto(skin.url);
}


