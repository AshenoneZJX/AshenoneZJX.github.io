const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('localhost:8081'));
  if (page) {
    await page.setViewport({ width: 400, height: 800 });
    await page.screenshot({ path: 'narrow-view.png' });
  }
  await browser.disconnect();
})();
