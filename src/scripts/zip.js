import * as zlib from 'zlib';
import * as path from 'path';
import { createWriteStream, createReadStream } from 'fs';

export const compress = async (zipPath, to) => {
  try {
    const name = path.parse(path.basename(zipPath)).name;
    const newPath = path.join(to, name + '.br');
    const writeStream = createWriteStream(newPath);
    const readStream = createReadStream(zipPath);
    console.log(name, newPath);
    const brotli = zlib.createBrotliCompress();
    readStream
      .on('error', function (e) {
        console.log('operation failed');
      })
      .pipe(brotli)
      .pipe(writeStream);
  } catch (error) {
    console.log('asd');
  }
};

export const decompress = async (zipPath, to) => {
  try {
    const newPath = path.join(
      to,
      path.basename(zipPath.replace('.br', '.txt'))
    );
    const writeStream = createWriteStream(newPath);
    const readStream = createReadStream(zipPath);
    const brotli = zlib.createBrotliDecompress();
    readStream
      .on('error', function (e) {
        console.log('operation failed');
      })
      .pipe(brotli)
      .pipe(writeStream);
  } catch (error) {
    console.log(error);
  }
};
