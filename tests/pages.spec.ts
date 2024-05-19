import { test, expect } from '@playwright/test';
import { getSearchResultMockData } from './searchResult';

test.use({ locale: 'ja' });

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('http://localhost:8788');
  await page.waitForURL('http://localhost:8788/login')
  expect(await page.textContent('#login')).toBe('ログイン');
  expect(await page.locator('#login').isDisabled()).toBeTruthy()
  await page.fill('#email', 'example@test.gmail.com')
  await page.fill('#password', '123456')
  await page.click('#login');
  await page.waitForURL('http://localhost:8788/app')
  await page.waitForLoadState()
  await context.storageState({ path: 'state.json' });
  await context.close();
})
test('top page test', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' })
  const page = await context.newPage()
  const res = await page.goto('http://localhost:8788/app');
  expect(res?.ok).toBeTruthy()
  //await page.waitForTimeout(500) // wait for webkit i18n render
  expect(await page.textContent('h1')).toBe('Test Userさん, ようこそ Movie Note App へ！');
});

test('new note test', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'state.json' })
  const page = await context.newPage()
  const urlPattern = /https:\/\/api\.themoviedb\.org\/3\/search\/movie\?api_key=[^&]+&query=terminator&page=1&language=ja/;
  page.route(urlPattern, async (route) => {
    await route.fulfill({ json: getSearchResultMockData() })
  })
  const res = await page.goto('http://localhost:8788/app');
  expect(res?.ok).toBeTruthy()
  await page.fill('[name="search-title"]', 'terminator')
  await page.locator('li:has-text("ターミネーター4")').click()
  expect(await page.textContent('#release-date')).toContain('2009-05-20')
  //await page.waitForTimeout(500) // wait for webkit i18n render
});