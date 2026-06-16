import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage'


test.describe ("Login Page Visual Test", () => {

    let homepage: HomePage
    let loginpage: LoginPage

    test.beforeEach (async ({page}) => {

        homepage = new HomePage (page)
        loginpage = new LoginPage (page)
    
        await homepage.visit()
        await homepage.clickSignIn()

    })


    test ("Login form", async ({page}) => {
        await loginpage.snapshotLoginForm()
    })


    test ("Login Error Message", async ({page}) => {
        await loginpage.login ('wrong username', 'wrong password')
        await loginpage.snapshotErrorMessage()
    })
})