import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('http://localhost:8788/');
    page.waitForURL('http://localhost:8788/login')
    expect(await page.textContent('button')).toBe('Login with Google');

    await page.fill('#email', 'example@test.gmail.com')
    await page.fill('#password', '123456')
    await page.locator('#login').click();

    page.waitForURL('http://localhost:8788/app')
    expect(await page.textContent('h1')).toBe('Welcome Test User. You are sigined in');
  });