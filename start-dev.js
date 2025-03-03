import { spawn } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Setup require for CommonJS modules
const require = createRequire(import.meta.url);
const kill = require('tree-kill');

// Log function
const log = (prefix, data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => console.log(`[${prefix}] ${line}`));
};

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if .env file exists, if not create one with placeholder values
const envPath = join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('[Setup] Creating .env file with placeholder values');
  const envContent = `# Stripe API Keys - Get these from your Stripe Dashboard
STRIPE_SECRET_KEY=sk_test_your_test_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key

# Environment - Update this for production
URL=http://localhost:5173
`;
  fs.writeFileSync(envPath, envContent);
}

// Function to run a command
const runCommand = (command, args, prefix) => {
  console.log(`[${prefix}] Starting: ${command} ${args.join(' ')}`);
  
  const cmd = spawn(command, args, { 
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true 
  });
  
  cmd.stdout.on('data', (data) => log(prefix, data));
  cmd.stderr.on('data', (data) => log(`${prefix}:error`, data));
  
  cmd.on('close', (code) => {
    console.log(`[${prefix}] Process exited with code ${code}`);
  });
  
  return cmd;
};

// Start both servers
console.log('[Dev] Starting development environment...');

// Start backend server
const serverProcess = runCommand('node', ['server.js'], 'Server');

// Wait 2 seconds before starting frontend to allow server to initialize
setTimeout(() => {
  // Start Vite dev server
  const viteProcess = runCommand('npm', ['run', 'dev'], 'Vite');
  
  // Handle graceful shutdown
  const shutdown = () => {
    console.log('\n[Dev] Shutting down all processes...');
    
    kill(viteProcess.pid);
    kill(serverProcess.pid);
    
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  };
  
  // Handle termination signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}, 2000);

console.log('[Dev] Development environment starting. Press Ctrl+C to stop all processes.'); 