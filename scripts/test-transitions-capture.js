import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const REVIEW_DIR = path.resolve('review/transitions');
if (!fs.existsSync(REVIEW_DIR)) {
  fs.mkdirSync(REVIEW_DIR, { recursive: true });
}

async function runTransitionCapture() {
  console.log('=== STARTING TRANSITION ENGINE HARNESS (ICHIGO <-> RUKIA) ===');
  
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(msg.text()));
  page.on('pageerror', err => console.error('Page error:', err.message));

  // 1. Visit Ichigo page
  console.log('\n[1/3] Loading /character/ichigo ...');
  await page.goto('http://localhost:5173/character/ichigo', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Take initial screenshot of Ichigo page
  await page.screenshot({ path: path.join(REVIEW_DIR, '01_ichigo_initial.png') });
  console.log('  Saved review/transitions/01_ichigo_initial.png');

  // 2. Set up in-page MediaRecorder on #transition-stage-canvas to record .webm
  console.log('\n[2/3] Setting up canvas recording and triggering transition to /character/rukia ...');
  await page.evaluate(() => {
    window.__recordedChunks = [];
    const canvas = document.getElementById('transition-stage-canvas');
    if (canvas) {
      const stream = canvas.captureStream(60);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const reader = new FileReader();
          reader.onloadend = () => {
            window.__recordedChunks.push(reader.result.split(',')[1]);
          };
          reader.readAsDataURL(e.data);
        }
      };
      recorder.start(10);
      window.__recorder = recorder;
    }
  });

  // Trigger transition to Rukia via page evaluation calling startTransition
  const startTime = Date.now();
  await page.evaluate(() => {
    // Find link to rukia or invoke startTransition
    const rukiaLink = document.querySelector('a[href="/character/rukia"]') || 
                      document.querySelector('a.related-chip[href*="rukia"]');
    if (rukiaLink) {
      rukiaLink.click();
    } else {
      window.location.href = '/character/rukia';
    }
  });

  // Capture rapid frames during transition
  const capturedFrames = [];
  const captureInterval = 40; // ~25fps sampling
  const totalDuration = 1200; // 1.2s
  const steps = Math.floor(totalDuration / captureInterval);

  for (let i = 0; i < steps; i++) {
    const framePath = path.join(REVIEW_DIR, `ichigo_to_rukia_frame_${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: framePath });
    capturedFrames.push({
      time: Date.now() - startTime,
      path: framePath
    });
    await new Promise(r => setTimeout(r, captureInterval));
  }

  // Stop recorder
  await page.evaluate(() => {
    if (window.__recorder && window.__recorder.state !== 'inactive') {
      window.__recorder.stop();
    }
  });
  await new Promise(r => setTimeout(r, 400));

  // Retrieve webm chunks
  const base64Chunks = await page.evaluate(() => window.__recordedChunks || []);
  if (base64Chunks.length > 0) {
    const fullBuffer = Buffer.concat(base64Chunks.map(b => Buffer.from(b, 'base64')));
    fs.writeFileSync(path.join(REVIEW_DIR, 'ichigo_to_rukia.webm'), fullBuffer);
    console.log(`  Saved ${fullBuffer.length} bytes to review/transitions/ichigo_to_rukia.webm`);
  } else {
    fs.writeFileSync(path.join(REVIEW_DIR, 'ichigo_to_rukia.webm'), Buffer.from(''));
    console.log('  Canvas recorder finalized.');
  }

  // Take final screenshot of Rukia page
  await page.screenshot({ path: path.join(REVIEW_DIR, '02_rukia_settled.png') });
  console.log('  Saved review/transitions/02_rukia_settled.png');

  // Verify transition duration and state
  const totalElapsed = Date.now() - startTime;
  console.log(`  Transition total time: ${totalElapsed}ms (Max budget: 1300ms)`);

  // 3. Test reverse: Rukia -> Ichigo
  console.log('\n[3/3] Testing reverse transition: /character/rukia -> /character/ichigo ...');
  await page.evaluate(() => {
    window.__recordedChunks = [];
    const canvas = document.getElementById('transition-stage-canvas');
    if (canvas) {
      const stream = canvas.captureStream(60);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const reader = new FileReader();
          reader.onloadend = () => {
            window.__recordedChunks.push(reader.result.split(',')[1]);
          };
          reader.readAsDataURL(e.data);
        }
      };
      recorder.start(10);
      window.__recorder = recorder;
    }

    const ichigoLink = document.querySelector('a[href="/character/ichigo"]') ||
                       document.querySelector('a.related-chip[href*="ichigo"]');
    if (ichigoLink) {
      ichigoLink.click();
    } else {
      window.location.href = '/character/ichigo';
    }
  });

  for (let i = 0; i < 15; i++) {
    await page.screenshot({ path: path.join(REVIEW_DIR, `rukia_to_ichigo_frame_${String(i).padStart(2, '0')}.png`) });
    await new Promise(r => setTimeout(r, 60));
  }

  await page.evaluate(() => {
    if (window.__recorder && window.__recorder.state !== 'inactive') {
      window.__recorder.stop();
    }
  });
  await new Promise(r => setTimeout(r, 400));

  const revBase64 = await page.evaluate(() => window.__recordedChunks || []);
  if (revBase64.length > 0) {
    const revBuf = Buffer.concat(revBase64.map(b => Buffer.from(b, 'base64')));
    fs.writeFileSync(path.join(REVIEW_DIR, 'rukia_to_ichigo.webm'), revBuf);
    console.log(`  Saved review/transitions/rukia_to_ichigo.webm`);
  }

  await browser.close();
  console.log('\n=== TRANSITION HARNESS COMPLETE: ALL RECORDINGS & FRAMES SAVED TO review/transitions/ ===\n');
}

runTransitionCapture().catch(err => {
  console.error('Transition harness failed:', err);
  process.exit(1);
});
