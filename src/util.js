import { dirname, join, parse, basename } from 'path';
import * as url from 'url';
import {
  createWriteStream,
  createReadStream,
  readdir,
  stat,
  promises,
  readFile,
} from 'fs';

const __filename = url.fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);
export {
  readFile,
  join,
  basename,
  createWriteStream as writeStream,
  url,
  createReadStream as readStream,
  readdir,
  stat,
  parse,
  promises,
};
