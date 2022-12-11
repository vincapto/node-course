import { readdir, stat, parse, join } from '../util.js';

const createItem = (name, type) => {
  return { name, type };
};

async function readFiles(dirname, files) {
  const folderList = [];
  const prom = files.map(async (file) => {
    const { base } = parse(file.name);
    const filePath = join(dirname, base);
    return new Promise((resolve) =>
      stat(filePath, (error, stats) => {
        if (error) {
          console.log(error);
        } else {
          if (stats.isFile())
            resolve(folderList.push(createItem(base, 'file')));
          else resolve(folderList.push(createItem(base, 'directory')));
        }
        // console.log(folderList);
      })
    );
  });
  await Promise.allSettled(prom);

  return folderList;
}

async function readFolder(dirname) {
  return new Promise(function (resolve) {
    readdir(dirname, { withFileTypes: true }, async (err, files) => {
      console.log('ENTER');
      if (err) {
        console.log(err);
        return resolve([]);
      } else {
        const list = await readFiles(dirname, files);
        return resolve(
          list.sort((a, b) =>
            a.type.localeCompare(b.type, 'en', { sensitivity: 'base' })
          )
        );
      }
    });
  });
}

export { readFolder };
