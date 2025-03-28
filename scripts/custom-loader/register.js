import { register } from 'node:module';

register('./customLoader.js', import.meta.url);
