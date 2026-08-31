const { chromium } = require('playwright');

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

  const guessRow = await page.evaluate(() => {
    const rows = document.querySelectorAll('.max-w-\\[600px\\]');
    // find the one that has a p tag with 'A'
    for (let row of rows) {
      if (row.textContent.includes('A')) {
        return {
          outer: row.className,
          outerRect: row.getBoundingClientRect(),
          inner: row.children[0].className,
          innerRect: row.children[0].getBoundingClientRect(),
          boxRect: row.children[0].children[0].getBoundingClientRect(),
          colorRect: row.children[1].getBoundingClientRect()
        };
      }
    }
  });

  const hexInputRow = await page.evaluate(() => {
    const inputs = document.querySelectorAll('.max-w-\\[600px\\]');
    // find the one with input (second row)
    for (let row of inputs) {
      if (row.querySelector('div.bg-gray-50\\/50')) { // dashed color box
        return {
          outer: row.className,
          outerRect: row.getBoundingClientRect(),
          inner: row.children[0].className,
          innerRect: row.children[0].getBoundingClientRect(),
          boxRect: row.children[0].children[0].getBoundingClientRect(),
          colorRect: row.children[1].getBoundingClientRect()
        };
      }
    }
  });

  console.log('Guess:', guessRow);
  console.log('HexInput:', hexInputRow);
  await browser.close();
})();
