const { test, expect } = require('@playwright/test');

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:5173/login');
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('testpassword123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for dashboard to load
    await expect(page.getByText('Credit Score')).toBeVisible();
  });

  test('should display credit score', async ({ page }) => {
    await expect(page.getByText('750')).toBeVisible();
  });

  test('should display cards list', async ({ page }) => {
    await expect(page.getByText('**** **** **** 4242')).toBeVisible();
    await expect(page.getByText('**** **** **** 5678')).toBeVisible();
  });

  test('should display recent transactions', async ({ page }) => {
    await expect(page.getByText('Recent Transactions')).toBeVisible();
    await expect(page.getByText('Credit Card Payment')).toBeVisible();
    await expect(page.getByText('Cashback Reward')).toBeVisible();
  });

  test('should open payment dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'Pay Now' }).first().click();
    await expect(page.getByText('Pay Bill')).toBeVisible();
    await expect(page.getByLabel('Select Card')).toBeVisible();
    await expect(page.getByLabel('Amount')).toBeVisible();
  });

  test('should make a payment', async ({ page }) => {
    await page.getByRole('button', { name: 'Pay Now' }).first().click();
    await page.getByLabel('Select Card').selectOption('1');
    await page.getByLabel('Amount').fill('1000');
    await page.getByRole('button', { name: 'Confirm Payment' }).click();

    // Dialog should close
    await expect(page.getByText('Pay Bill')).not.toBeVisible();

    // New transaction should appear in the list
    await expect(page.getByText('-1000')).toBeVisible();
  });

  test('should handle failed payment', async ({ page }) => {
    // Mock the API to always fail
    await page.route('**/pay-bill', async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ success: false, message: 'Payment failed' }),
      });
    });

    await page.getByRole('button', { name: 'Pay Now' }).first().click();
    await page.getByLabel('Select Card').selectOption('1');
    await page.getByLabel('Amount').fill('1000');
    await page.getByRole('button', { name: 'Confirm Payment' }).click();

    // Should show error message
    await expect(page.getByText('Payment failed')).toBeVisible();
  });
}); 