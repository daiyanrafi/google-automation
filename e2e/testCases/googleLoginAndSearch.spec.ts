// // //e2e/testCases/googleLoginAndSearch.spec.ts

// import { test, expect, Page } from '@playwright/test'
// import { GoogleLoginPage } from '../../pages/google/GoogleLoginPage'
// import { GoogleSearchPage } from '../../pages/google/GoogleSearchPage'
// import { googleCredentials } from '../../fixtures/constants'
// import * as fs from 'fs'

// export default function googleLoginAndSearchTests() {
//   test.describe('Google Login and Search Test Cases', () => {
//     let page: Page
//     let loginPage: GoogleLoginPage
//     let searchPage: GoogleSearchPage

//     test.beforeAll(async ({ browser }) => {
//       const context = await browser.newContext()
//       page = await context.newPage()

//       //  Load cookies from the JSON file
//       const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'))
//       await context.addCookies(cookies)

//       loginPage = new GoogleLoginPage(page)
//       searchPage = new GoogleSearchPage(page)
//     })

//     test('Should login to Google and search for "bangladesh"', async () => {
//       await loginPage.navigateToSignIn()
//       await loginPage.login(googleCredentials.email, googleCredentials.password)

//       await searchPage.navigateTo()
//       await searchPage.search('bangladesh')
//       await page.waitForTimeout(5000)

//       // Assertions
//       await expect(page.locator('text=bangladesh')).toBeVisible()
//     })

//     test('Login with invalid credentials', async () => {
//       // await loginPage.navigateTo()
//       await loginPage.navigateToSignIn()
//       await loginPage.invalidLogin('invalid@example.com', 'invalidpassword')
//       expect(await loginPage.wrongEmail()).toBe(true)
//     })
//   })
// }

// e2e/testCases/googleLoginAndSearch.spec.ts

import { test, expect, Page } from '@playwright/test'
import { GoogleLoginPage } from '../../pages/google/GoogleLoginPage'
import { GoogleSearchPage } from '../../pages/google/GoogleSearchPage'
import * as fs from 'fs'

export default function googleLoginAndSearchTests() {
  test.describe('Google Login and Search Test Cases', () => {
    let page: Page
    let searchPage: GoogleSearchPage

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext()

      // Load cookies from the JSON file
      const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'))
      await context.addCookies(cookies)

      page = await context.newPage()
      searchPage = new GoogleSearchPage(page)
    })

    // test('Should search for "bangladesh"', async () => {
    //   await searchPage.navigateTo()
    //   await searchPage.search('bangladesh')
    //   await page.waitForTimeout(5000)

    //   // Assertions
    //   await expect(page.locator('text=bangladesh')).toBeVisible()
    // })

    test('Google login and search', async ({ page }) => {
      // Open the browser and go to the Google sign-in page
      await page.goto('https://accounts.google.com/signin/v2/identifier?hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
      
      // Type the email and proceed
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', 'trashyou14@gmail.com');
      await page.click('#identifierNext');
      
      // Type the password and proceed
      // await page.waitForSelector('input[type="password"]', { visible: true });
      await page.type('input[type="password"]', 'yourpassword');
      // await page.waitForSelector('#passwordNext', { visible: true });
      await page.click('#passwordNext');
      
      // Wait for navigation to complete
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    
      // Verify login by checking for an element that is present only after login
      await expect(page.locator('body')).toContainText('expected text after login');
      
      // Perform a Google search
      await page.goto('https://www.google.com/');
      await page.waitForSelector('input[name="q"]');
      await page.type('input[name="q"]', 'Playwright');
      await page.press('input[name="q"]', 'Enter');
      
      // Wait for the search results to load and display
      await page.waitForSelector('#search');
      await expect(page.locator('#search')).toContainText('Playwright');
    });

    // // Optionally, keep the invalid login test as it is
    // test('Login with invalid credentials', async () => {
    //   const context = await page.context().newContext()
    //   page = await context.newPage()
    //   const loginPage = new GoogleLoginPage(page)

    //   await loginPage.navigateToSignIn()
    //   await loginPage.invalidLogin('invalid@example.com', 'invalidpassword')
    //   expect(await loginPage.wrongEmail()).toBe(true)
    // })

  })
}
