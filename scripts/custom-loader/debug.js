import { resolveSpecifier } from './customLoader.js';
import clc from 'cli-color';

const debugSpecifier = process.argv[2];
console.log(`Debug specifier: ${clc.blue(debugSpecifier)}`);
console.log(`Resolved path: ${clc.blue(resolveSpecifier(debugSpecifier, true))}`);
