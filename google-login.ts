import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Cookie } from 'puppeteer';

// Use the stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Launch non-headless browser
  const page = await browser.newPage();

  // Load cookies from a file
  const cookies: Cookie[] = require('./cookies.json');
  await page.setCookie(...cookies);

  // Navigate to the Google login page
  await page.goto('https://accounts.google.com/');

  // Wait for the page to load and allow manual CAPTCHA solving if needed
//   await page.waitForTimeout(60000); // 1 minute

  // Optional: Take a screenshot to see the result
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
