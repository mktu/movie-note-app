import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('http://localhost:8788/');
    expect(await page.textContent('h1')).toBe('Welcome to Remix');
  });