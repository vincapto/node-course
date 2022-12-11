import { writeStream, join, promises } from '../util.js';

export async function moveFile(from, to) {
  try {
    await copyFile(from, to);
    await deleteFile(from);
  } catch (e) {
    console.log(e);
  }
}
export async function copyFile(from, to) {
  console.log(from, to);
  try {
    const write = writeStream(to, 'utf8');
    const read = await promises.readFile(from, 'utf-8');
    await write.write(read);
    console.log('file copied');
  } catch (e) {
    console.log(e);
  }
}
export async function deleteFile(from) {
  try {
    await promises.rm(from);
    console.log('delete');
    // await promises.rm(from, { recursive: true }, (err) => {
    //   if (err) {
    //     console.log('folder not exist');
    //     return;
    //   }
    //   console.log('file removed');
    // });
  } catch (e) {
    console.log(e);
  }
}
