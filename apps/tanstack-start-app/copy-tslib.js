import path from 'node:path';
import * as fs from 'node:fs';

const sourceDir = path.resolve('./', 'node_modules/tslib');
const targetDir = path.resolve('./', '.output/server/node_modules/tslib');

console.log(sourceDir, targetDir);


function copyFiles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.readdirSync(srcDir).forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

copyFiles(sourceDir, targetDir);
console.log('tslib files copied successfully.');
