const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  await page.keyboard.type('A');
  await page.keyboard.type('B');
  await page.keyboard.type('C');
  await page.keyboard.type('D');
  await page.keyboard.type('E');
  await page.keyboard.type('F');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(1000);

  const styles = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.max-w-\\[600px\\]').forEach((row, i) => {
       if (row.children.length === 2 && row.children[0].children.length === 6) {
         const lettersDiv = row.children[0];
         const colorBox = row.children[1];

         const firstLetterStyle = window.getComputedStyle(lettersDiv.children[0]);
         const colorBoxStyle = window.getComputedStyle(colorBox);

         results.push({
           type: row.textContent.includes('A') ? 'Guess' : (i === 2 ? 'Active HexInput' : 'Inactive HexInput'),
           firstLetterBorder: firstLetterStyle.borderStyle + ' ' + firstLetterStyle.borderWidth + ' ' + firstLetterStyle.borderColor,
           colorBoxBorder: colorBoxStyle.borderStyle + ' ' + colorBoxStyle.borderWidth + ' ' + colorBoxStyle.borderColor,
         });
       }
    });
    return results;
  });

  console.log(JSON.stringify(styles, null, 2));
  await browser.close();
})();
