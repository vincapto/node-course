import * as fs from 'fs';
import * as path from 'path';

export async function checkAccess(path, callback) {
  return new Promise(function (resolve) {
    fs.access(path, fs.constants.F_OK, async (err) => {
      if (err) {
        console.log('No such directory!');
        resolve(callback(false, path));
      } else {
        resolve(callback(true, path));
      }
    });
  });
}
