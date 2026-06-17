import fs from 'fs';
import path from 'path';

function scanAll(dir: string, depth = 0) {
  if (depth > 5) return;
  try {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          if (f !== 'node_modules' && f !== 'proc' && f !== 'sys' && f !== 'dev' && f !== '.git') {
            scanAll(full, depth + 1);
          }
        } else {
          // Look for any files modified in the last hour OR with extensions or typical names
          const ageMs = Date.now() - stat.mtimeMs;
          if (ageMs < 3 * 3600 * 1000) { // 3 hours
            console.log(`NEW PREVIEW FILE: ${full} Size: ${stat.size} Modified: ${stat.mtime}`);
          }
        }
      } catch(e) {}
    }
  } catch(e) {}
}

console.log('--- STARTING COMPREHENSIVE SCAN FOR NEW FILES ---');
scanAll(process.cwd());
scanAll('/tmp');
console.log('--- COMPREHENSIVE SCAN COMPLETE ---');
