import { test, expect } from '@playwright/test';

test.use({ locale: 'ja' });
test('basic test', async ({ page } ) => {
    await page.goto('http://localhost:8788');
    await page.waitForURL('http://localhost:8788/login')
    expect(await page.textContent('#login')).toBe('ログイン');
    expect(await page.locator('#login').isDisabled()).toBeTruthy()
    await page.fill('#email', 'example@test.gmail.com')
    await page.fill('#password', '123456')
    await page.click('#login');
    await page.waitForURL('http://localhost:8788/app', {waitUntil : 'networkidle'})
    await page.waitForLoadState()
    //await page.waitForTimeout(500) // wait for webkit i18n render
    expect(await page.textContent('h1')).toBe('Welcome Test User. You are sigined in');
  });