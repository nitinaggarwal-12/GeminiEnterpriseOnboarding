const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const screenshotDir = '/Users/nitinagga/Documents/enablement/scratch/screenshots_e2e';

// 1. Programmatically purge the target screenshot directory (Rule: Visual Gallery Housekeeping)
if (fs.existsSync(screenshotDir)) {
  const files = fs.readdirSync(screenshotDir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      fs.unlinkSync(path.join(screenshotDir, file));
    }
  }
  console.log(`Purged existing screenshots in ${screenshotDir}`);
} else {
  fs.mkdirSync(screenshotDir, { recursive: true });
  console.log(`Created screenshot directory: ${screenshotDir}`);
}

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  console.log('Navigating to http://localhost:8002...');
  try {
    await page.goto('http://localhost:8002', { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (err) {
    console.error('Initial navigation failed, retrying in 2 seconds...', err);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.goto('http://localhost:8002', { waitUntil: 'networkidle0' });
  }

  // Wait for initial animation
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Step 1: Capture Landing Dashboard
  console.log('Capturing Dashboard Landing Page...');
  await page.screenshot({ path: path.join(screenshotDir, '01_dashboard.png') });

  // Helper function for DOM-level clicks (Rule: DOM-Level Clicks for Spots)
  async function clickElementByText(selector, text) {
    await page.evaluate((sel, txt) => {
      const elements = Array.from(document.querySelectorAll(sel));
      const target = elements.find(el => el.textContent.includes(txt));
      if (target) {
        target.click();
        console.log(`Clicked: ${txt}`);
      } else {
        console.error(`Not found: ${txt}`);
      }
    }, selector, text);
  }

  // Step 2: Navigate to first usecase
  console.log('Navigating to first Use Case: "1. Improve Language & Readability"...');
  await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.usecase-item'));
    const target = items.find(el => el.textContent.includes('Improve Language'));
    if (target) target.click();
  });
  // Inject Mandatory Settling Delay (Rule: Inject Mandatory Settling Delays)
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '02_usecase_nav.png') });

  // Step 3: Switch to Configuration Tab
  console.log('Switching to Configuration Tab...');
  await clickElementByText('button.stepper-tab-btn', 'Configuration');
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '03_usecase_config.png') });

  // Step 4: Click Execute Walkthrough
  console.log('Triggering Execute Walkthrough...');
  await clickElementByText('button.btn-primary', 'Execute Walkthrough');
  
  // Wait a small timeout to capture the running simulation log state
  await new Promise(resolve => setTimeout(resolve, 1500));
  await page.screenshot({ path: path.join(screenshotDir, '04_usecase_simulating.png') });

  // Wait for simulation to finish (usually ~5-6 seconds)
  console.log('Waiting for agent logs to settle...');
  await new Promise(resolve => setTimeout(resolve, 6000));
  await page.screenshot({ path: path.join(screenshotDir, '05_usecase_output.png') });

  // Step 5: Switch to Design Patterns
  console.log('Switching to Design Patterns / Architectural Breakdown...');
  await clickElementByText('button.stepper-tab-btn', 'Design Patterns');
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '06_usecase_patterns.png') });

  console.log('E2E validation steps completed successfully. Closing browser...');
  await browser.close();
  console.log('Done!');
})();
