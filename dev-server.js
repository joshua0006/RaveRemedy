import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const kill = require('tree-kill');

// Function to run a command
const runCommand = (command, args) => {
  const cmd = spawn(command, args, { 
    stdio: 'inherit',
    shell: true 
  });
  
  console.log(`Started ${command} ${args.join(' ')}`);
  
  return cmd;
};

// Start Vite dev server
const viteProcess = runCommand('npm', ['run', 'dev']);

// Start API server
const apiProcess = runCommand('node', ['server.js']);

// Handle graceful shutdown
const shutdown = () => {
  console.log('\nShutting down all processes...');
  
  kill(viteProcess.pid);
  kill(apiProcess.pid);
  
  setTimeout(() => {
    process.exit(0);
  }, 1000);
};

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown); 