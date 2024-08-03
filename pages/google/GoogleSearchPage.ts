//pages/google/GoogleSearchPage.ts

import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export class GoogleSearchPage extends BasePage {
   private searchInput: Locator
   private searchButton: Locator

   constructor(page: Page) {
      super(page)
      this.searchInput = page.locator('input[name="q"]')
      this.searchButton = page.locator('input[type="submit"]')
   }

   // async navigateToGoogle() {
   //    await this.navigateToGoogle()
   // }

   async navigateTo() {
      await this.page.goto('https://www.google.com')
   }

   async search(query: string) {
      await this.fillInput(this.searchInput, query)
      await this.clickButton(this.searchButton)
   }
}
