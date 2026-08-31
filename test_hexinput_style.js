const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    document.querySelectorAll('.max-w-\\[600px\\]').forEach((row, i) => {
       if (row.children.length === 2 && row.children[0].children.length === 6) {
         if (i > 0) { // ALL future rows + current row ? No, i=1 is current row (after Target/Last Guess which is i=0)
           const isCurrentRow = i === 1; // Actually i=0 is the headers "Target / Last Guess" ? Let's check dom
         }
       }
    });
  });

  await browser.close();
})();
