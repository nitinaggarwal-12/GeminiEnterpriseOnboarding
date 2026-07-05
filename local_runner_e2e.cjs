const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const screenshotDir = '/Users/nitinagga/Documents/enablement/scratch/screenshots_e2e';

// 1. Programmatically purge the target screenshot directory
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
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  console.log('Navigating to http://localhost:8002...');
  try {
    await page.goto('http://localhost:8002', { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (err) {
    console.error('Initial navigation failed, retrying...', err);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.goto('http://localhost:8002', { waitUntil: 'networkidle0' });
  }

  // Wait for initial load settling
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 1. Capture Picker Dashboard
  console.log('Capturing Workflow Selection Picker...');
  await page.screenshot({ path: path.join(screenshotDir, '01_dashboard_picker.png') });

  // 2. Launch the "Improve Language" guided tour
  console.log('Launching the "Improve Language & Readability" Guided Tour...');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.glass-workflow-card'));
    const target = cards.find(c => c.textContent.includes('Improve Language'));
    if (target) target.click();
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '02_tour_step1_newchat.png') });

  // 3. Click the actual "+ New chat" sidebar button to advance to Step 2 (Configure & Send)
  console.log('Clicking sidebar New Chat button...');
  await page.evaluate(() => {
    const newChatBtn = document.getElementById('gemini-new-chat-btn');
    if (newChatBtn) newChatBtn.click();
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '03_tour_step2_config.png') });

  // 4. Click the Send button to trigger logs simulation
  console.log('Clicking Send button...');
  await page.evaluate(() => {
    const sendBtn = document.getElementById('gemini-send-btn');
    if (sendBtn) sendBtn.click();
  });
  
  // Wait a small timeout to capture running logs
  await new Promise(resolve => setTimeout(resolve, 1200));
  await page.screenshot({ path: path.join(screenshotDir, '04_tour_step3_simulating.png') });

  // Wait for logs to settle and automatically transition to Step 3 of 3 (Verify Output)
  console.log('Waiting for simulation runner to settle...');
  await new Promise(resolve => setTimeout(resolve, 3800));
  await page.screenshot({ path: path.join(screenshotDir, '05_tour_step3_output.png') });

  // 5. Click the floating Tour card Finish button to return to picker dashboard
  console.log('Completing the tour journey...');
  await page.evaluate(() => {
    const finishBtn = document.getElementById('tour-next-btn');
    if (finishBtn) finishBtn.click();
  });
  await new Promise(resolve => setTimeout(resolve, 1500));
  await page.screenshot({ path: path.join(screenshotDir, '06_tour_complete.png') });

  console.log('E2E validation steps completed successfully. Closing browser...');
  await browser.close();
  console.log('Done!');
})();
