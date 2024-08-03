//e2e/testCases/googleLoginAndSearch.spec.ts

import { test, expect, Page } from '@playwright/test'
import { GoogleLoginPage } from '../../pages/google/GoogleLoginPage'
import { GoogleSearchPage } from '../../pages/google/GoogleSearchPage'
import { googleCredentials } from '../../fixtures/constants'

export default function googleLoginAndSearchTests() {
  test.describe('Google Login and Search Test Cases', () => {
    let page: Page
    let loginPage: GoogleLoginPage
    let searchPage: GoogleSearchPage

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext()
      page = await context.newPage()

      loginPage = new GoogleLoginPage(page)
      searchPage = new GoogleSearchPage(page)
    })

    test('Should login to Google and search for "bangladesh"', async () => {
      await loginPage.navigateToSignIn()
      await loginPage.login(googleCredentials.email, googleCredentials.password)

      //for search in google****
      // await searchPage.navigateTo('https://www.google.com')
      // await page.goto('https://www.google.com')
      // await searchPage.navigateToGoogle()
      await searchPage.navigateTo()
      await searchPage.search('bangladesh')
      await page.waitForTimeout(5000)

      // Assertions
      await expect(page.locator('text=bangladesh')).toBeVisible()
    })

    test('Login with invalid credentials', async () => {
      // await loginPage.navigateTo()
      await loginPage.navigateToSignIn()
      await loginPage.invalidLogin('invalid@example.com', 'invalidpassword')
      expect(await loginPage.wrongEmail()).toBe(true)

      // expect(await loginPage.isLoginSuccessful()).toBe(false);
    })

    // test.afterAll(async () => {
    //    await page.close();
    // });
  })
}
