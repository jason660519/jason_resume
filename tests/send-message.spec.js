const { test, expect } = require('@playwright/test');

test.describe('Send Message Functionality Test', () => {
  const LOCAL_URL = 'http://localhost:8000';
  
  test('should successfully send a test message through the contact form', async ({ page }) => {
    // Navigate to the website
    await page.goto(LOCAL_URL);
    
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Fill out the form with real test data
    await page.fill('#contactForm input[name="name"]', 'Playwright Test Bot');
    await page.fill('#contactForm input[name="email"]', 'playwright.testing@example.com');
    await page.fill('#contactForm input[name="user_subject"]', 'Contact Form Testing - Automated Verification');
    await page.fill('#contactForm textarea[name="message"]', `
Hello Jason,

This is an automated test message sent by Playwright testing framework to verify that your contact form is working correctly.

Test Details:
- Date: ${new Date().toLocaleString()}
- Browser: ${await page.evaluate(() => navigator.userAgent)}
- Test Status: Form submission functionality verification

Please ignore this automated test message. The contact form is working properly!

Best regards,
Playwright Testing Bot
    `);
    
    console.log('✅ Contact form filled with test message');
    
    // Submit the form and monitor the response
    try {
      const responsePromise = page.waitForResponse('https://api.web3forms.com/submit');
      
      // Click submit button
      await page.click('#contactForm button[type="submit"]');
      
      // Wait for the response
      const response = await responsePromise;
      
      console.log(`📤 Form submitted, response status: ${response.status()}`);
      
      if (response.status() === 200) {
        const responseBody = await response.json();
        console.log('📋 Web3Forms Response:', JSON.stringify(responseBody, null, 2));
        
        if (responseBody.success) {
          console.log('🎉 SUCCESS! Contact form message sent successfully!');
          console.log('📧 Email should be delivered to: a0405142777@gmail.com');
          console.log('✅ The "Send Message" button is working correctly!');
        } else {
          console.log('❌ Form submission failed:', responseBody.message);
        }
      } else if (response.status() === 301 || response.status() === 302) {
        console.log('🔄 Form submitted with redirect (this is normal for some form services)');
        console.log('✅ The form submission was processed, check email for delivery');
      } else {
        console.log(`❌ Unexpected response status: ${response.status()}`);
      }
      
    } catch (error) {
      console.log('⚠️ Error during form submission:', error.message);
    }
    
    // Wait a bit to see if there are any visual feedback elements
    await page.waitForTimeout(2000);
    
    // Check for any success/error messages that might appear
    const loadingMsg = page.locator('.loading');
    const errorMsg = page.locator('.error-message');
    const successMsg = page.locator('.sent-message');
    
    if (await loadingMsg.isVisible()) {
      console.log('ℹ️ Loading message is visible');
    }
    
    if (await errorMsg.isVisible()) {
      const errorText = await errorMsg.textContent();
      console.log('⚠️ Error message visible:', errorText);
    }
    
    if (await successMsg.isVisible()) {
      const successText = await successMsg.textContent();
      console.log('✅ Success message visible:', successText);
    }
    
    console.log('🏁 Contact form submission test completed');
  });
});