const puppeteer = require('puppeteer');
const assert = require('assert');

const xpath = '//*[@id="school-section"]/div[1]/div/a'
const xpath2 = '/html/body/header/ul/li[1]/a'
const url = 'http://localhost:3000/schools'

try{
    ( async ()=>{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url); 

        // delay(2000)

        const button = await page.waitForSelector(xpath2)
        await button.click();

        // const button = await page.
    })();
}
catch(e){node
    console.error(e);
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }