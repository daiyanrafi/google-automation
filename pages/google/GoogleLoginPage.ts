//pages/google/GoogleLoginPage.ts

import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export class GoogleLoginPage extends BasePage {
  private emailInput: Locator
  private passwordInput: Locator
  private nextButton: Locator
  private profileIcon: Locator
  private couldNotFind: Locator;  

  constructor(page: Page) {
    super(page)
    this.emailInput = page.locator('input[type="email"]')
    this.passwordInput = page.locator('input[type="password"]')
    this.nextButton = page.locator('#identifierNext')
    this.profileIcon = page.locator('img.profile-icon')
    this.couldNotFind = page.getByText('Couldn’t find your Google');
  }

  async login(email: string, password: string) {
    await this.fillInput(this.emailInput, email)
    await this.clickButton(this.nextButton)
    await this.page.waitForTimeout(2000) 
    await this.fillInput(this.passwordInput, password)
    await this.clickButton(this.nextButton)
  }
  
  async invalidLogin(email: string, password?: string) {
    await this.fillInput(this.emailInput, email)
    await this.clickButton(this.nextButton)
    await this.page.waitForTimeout(2000) 
    await this.clickButton(this.nextButton)
  }

  async isLoginSuccessful(): Promise<boolean> {
    await this.page.waitForSelector('img.profile-icon')
    return this.profileIcon.isVisible()
  }

  async wrongEmail(): Promise<boolean>{
   return this.couldNotFind.isVisible()
 }
}
