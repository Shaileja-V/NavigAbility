describe('Should open google maps', async () => {
    const xpath = '//*[@id="school-section"]/div[1]/div/a'
    const url = 'http://localhost:3000/schools'

    await page.goto(url)
    // let childTab;

    // beforeEach(async () => {
    //     await page.goto(url)
    //     await page.waitForSelector(xpath)
    //     childTab = await page.waitForEvent('tabcreated')
    // })

    // test('Should open google maps', async () => {

    //     await page.click(xpath)


    //     // await childTab.waitForLoadState('networkidle')
    //     // const pageTtile =  await 
    // })

    // let parentGUID;
    // let childGUID;

    // // get parent GUID
    // parentGUID = await this.driver.getWindowHandle();

    // // click element to launch new tab
    // await this.driver.elementClick('//a[@id="test"]');

    // // wait until new tab loads
    // await this.driver.pause(2000);

    // // get all GUID's
    // const allGUIDs = await this.driver.getWindowHandles();

    // // check all GUID's and see which one is the child
    // for (let i = 0; i < allGUIDs.length; i++) {
    //     if (allGUIDs[i] !== parentGUID) {
    //         childGUID = allGUIDs[i];
    //     }
    // }

    // // switch to child tab
    // await this.driver.switchToWindow(childGUID);

    // // assert content on the new page here
    // // ...
    // // ...
    // // ...

    // // close tab
    // await this.driver.closeWindow();

    // // switch to parent window/tab
    // await this.driver.switchToWindow(parentGUID);
})