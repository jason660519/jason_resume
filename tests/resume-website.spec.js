const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Jason Resume Website Tests', () => {
  const BASE_URL = 'file://' + path.join(__dirname, '..', 'index.html').replace(/\\/g, '/');
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check if the page loads
    await expect(page).toHaveTitle('Yifan Yu');
    
    // Check main hero section - use more specific selector
    await expect(page.locator('#hero h1')).toContainText('Yifan Yu');
    await expect(page.locator('.typed')).toBeVisible();
    
    console.log('✅ Homepage loaded successfully');
  });

  test('should have working navigation menu', async ({ page }) => {
    // Check navigation links are present
    const navItems = ['Home', 'About', 'Resume', 'Portfolio', 'Services', 'Contact'];

    for (const item of navItems) {
      const navLink = page.locator(`nav a:has-text("${item}")`);
      await expect(navLink).toBeVisible();
    }
    
    console.log('✅ Navigation menu items are all visible');
  });

  test('should display profile information correctly', async ({ page }) => {
    // Check profile image
    await expect(page.locator('.profile img')).toBeVisible();
    
    // Check about section
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#about h3')).toContainText('GCP Architect');
    
    // Check contact information
    await expect(page.locator('#about')).toContainText('+61 405142777');
    await expect(page.locator('#about')).toContainText('Sydney, Australia');
    await expect(page.locator('#about')).toContainText('a0405142777@gmail.com');
    
    console.log('✅ Profile information displayed correctly');
  });

  test('should have working social media links', async ({ page }) => {
    // Check social media links are present
    const socialLinks = ['facebook', 'linkedin', 'line', 'wechat'];

    for (const social of socialLinks) {
      await expect(page.locator(`.social-links .${social}`)).toBeVisible();
    }
    
    console.log('✅ All social media links are visible');
  });

  test('should scroll to contact section', async ({ page }) => {
    // Use the actual navigation link structure from the HTML
    await page.click('a[href="https://jason660519.github.io/jason_resume/#contact"]');
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // Check if contact section is visible
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#contact h2')).toContainText('Contact');
    
    console.log('✅ Successfully scrolled to contact section');
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Navigate to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check form presence
    await expect(page.locator('#contactForm')).toBeVisible();
    
    // Check required form fields
    await expect(page.locator('#contactForm input[name="name"]')).toBeVisible();
    await expect(page.locator('#contactForm input[name="email"]')).toBeVisible();
    await expect(page.locator('#contactForm input[name="user_subject"]')).toBeVisible();
    await expect(page.locator('#contactForm textarea[name="message"]')).toBeVisible();
    
    // Check submit button
    await expect(page.locator('#contactForm button[type="submit"]')).toBeVisible();
    await expect(page.locator('#contactForm button[type="submit"]')).toContainText('Send Message');
    
    console.log('✅ Contact form has all required fields');
  });

  test('should validate contact form fields', async ({ page }) => {
    // Navigate to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check HTML5 validation attributes
    const nameField = page.locator('#contactForm input[name="name"]');
    const emailField = page.locator('#contactForm input[name="email"]');
    const subjectField = page.locator('#contactForm input[name="user_subject"]');
    const messageField = page.locator('#contactForm textarea[name="message"]');
    
    // These fields should be required
    await expect(nameField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('required');
    await expect(subjectField).toHaveAttribute('required');
    await expect(messageField).toHaveAttribute('required');
    
    console.log('✅ Contact form validation attributes are correct');
  });

  test('should have Web3Forms configuration', async ({ page }) => {
    // Navigate to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check Web3Forms hidden fields (they should be attached but not visible since they're hidden)
    await expect(page.locator('input[name="access_key"]')).toBeAttached();
    await expect(page.locator('input[name="subject"]')).toBeAttached();
    await expect(page.locator('input[name="from_name"]')).toBeAttached();
    
    // Check form action points to Web3Forms
    const form = page.locator('#contactForm');
    await expect(form).toHaveAttribute('action', 'https://api.web3forms.com/submit');
    await expect(form).toHaveAttribute('method', 'POST');
    
    // Check access key is configured
    const accessKey = await page.locator('input[name="access_key"]').getAttribute('value');
    expect(accessKey).toBeTruthy();
    expect(accessKey).toMatch(/^[a-f0-9\-]{36}$/); // UUID format
    
    console.log('✅ Web3Forms configuration is correct');
    console.log(`Access Key: ${accessKey}`);
  });

  test('should test contact form submission functionality', async ({ page }) => {
    // Navigate to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Fill out the form with test data
    await page.fill('#contactForm input[name="name"]', 'Playwright Test User');
    await page.fill('#contactForm input[name="email"]', 'test@example.com');
    await page.fill('#contactForm input[name="user_subject"]', 'Playwright Automated Test');
    await page.fill('#contactForm textarea[name="message"]', 'This is a test message sent from Playwright automated testing to verify the contact form functionality is working correctly.');
    
    console.log('✅ Form filled with test data');
    
    // Test form submission (Note: This will actually send an email!)
    // Uncomment the following lines if you want to test actual submission
    /*
    try {
      // Monitor network request
      const [response] = await Promise.all([
        page.waitForResponse('https://api.web3forms.com/submit'),
        page.click('#contactForm button[type="submit"]')
      ]);
      
      // Check if the request was sent
      expect(response.status()).toBe(200);
      
      // Log the response for debugging
      const responseBody = await response.json();
      console.log('Contact form response:', responseBody);
      
      if (responseBody.success) {
        console.log('✅ Contact form submitted successfully!');
      } else {
        console.log('❌ Contact form submission failed:', responseBody.message);
      }
    } catch (error) {
      console.log('Contact form submission test skipped or failed:', error.message);
    }
    */
    
    console.log('ℹ️ Contact form submission test completed (actual submission commented out to avoid spam)');
  });

  test('should check responsive design elements', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile navigation toggle is visible
    await expect(page.locator('.mobile-nav-toggle')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Check if full navigation is visible
    await expect(page.locator('#navbar')).toBeVisible();
    
    console.log('✅ Responsive design elements work correctly');
  });

  test('should check if external assets load correctly', async ({ page }) => {
    // Check if main CSS loads
    const stylesheets = await page.locator('link[rel="stylesheet"]').count();
    expect(stylesheets).toBeGreaterThan(0);
    
    // Check if main JavaScript loads
    const scripts = await page.locator('script[src]').count();
    expect(scripts).toBeGreaterThan(0);
    
    console.log(`✅ Found ${stylesheets} stylesheets and ${scripts} external scripts`);
  });

  test('should display portfolio and services sections', async ({ page }) => {
    // Check if portfolio section exists (even if commented out)
    const portfolioSection = page.locator('#portfolio');
    const servicesSection = page.locator('#services');
    
    // These sections should exist in the DOM
    await expect(portfolioSection).toBeAttached();
    await expect(servicesSection).toBeAttached();
    
    console.log('✅ Portfolio and services sections are present in the DOM');
  });
});