const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  // type something in
  await page.keyboard.type('A');
  await page.keyboard.type('B');
  await page.keyboard.type('C');
  await page.keyboard.type('D');
  await page.keyboard.type('E');
  await page.keyboard.type('F');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshot_guess.png' });
  await browser.close();
})();
