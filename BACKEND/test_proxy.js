
import { spawn } from 'child_process';
import { resolve } from 'path';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log('Starting Node backend for testing...');
  const server = spawn('npm', ['run', 'dev'], { cwd: process.cwd(), shell: true });
  
  server.stdout.on('data', data => console.log(`[SERVER]: ${data}`));
  server.stderr.on('data', data => console.log(`[SERVER ERR]: ${data}`));
  
  await wait(5000); // Wait for server to start

  try {
    console.log('\n--- TESTING CONNECTION TO RENDER ---');
    console.log('Fetching /api/ai/health from local Node server (which proxies to Render)');
    
    // We send a request to the Node server
    const response = await fetch('http://localhost:5000/api/ai/health', {
      method: 'GET'
    });
    
    console.log(`Status: ${response.status}`);
    const data = await response.text();
    console.log(`Response body: ${data}`);
    
    if (response.status === 200 || response.status === 401) {
      console.log('✅ Proxy successfully connected to Render API!');
    } else {
      console.log('❌ Something might be wrong with the proxy.');
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    server.kill();
    process.exit(0);
  }
}

runTests();
