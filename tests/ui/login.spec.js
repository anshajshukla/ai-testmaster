const { test, expect } = require('@playwright/test');

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.getByLabel('Email Address').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByLabel('Email Address').fill('test@example.com');
    await page.getByLabel('Password').fill('testpassword123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('http://localhost:5173/');
    
    // Should show credit score
    await expect(page.getByText('Credit Score')).toBeVisible();
    
    // Should show cards list
    await expect(page.getByText('Your Cards')).toBeVisible();
  });

  test('should navigate to forgot password', async ({ page }) => {
    await page.getByText('Forgot password?').click();
    // Add assertions for forgot password page when implemented
  });
}); 