import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('http://localhost:8788/');
    page.waitForURL('http://localhost:8788/login')
    expect(await page.textContent('button')).toBe('Login with Google');
  });