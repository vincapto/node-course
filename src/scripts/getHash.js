import * as fs from 'fs';
import { createHash } from 'crypto';

export const calculateHash = async (path) => {
  try {
    console.log('PATH ', path);
    const text = await fs.promises.readFile(path, 'utf-8');
    const hash = createHash('SHA256').update(text).digest('hex');
    console.log(text);
    console.log(hash);
  } catch (error) {
    console.log('operation failed');
  }
};
