import * as readline from 'readline';
import * as path from 'path';
import * as os from 'os';
import { __dirname, join, promises, url, basename } from './util.js';
import { checkAccess } from './scripts/access.js';
import { readFolder } from './scripts/getList.js';
import * as fs from 'fs';
import { copyFile, deleteFile, moveFile } from './scripts/copyFile.js';
import { calculateHash } from './scripts/getHash.js';
import { compress, decompress } from './scripts/zip.js';
import { getInfo } from './scripts/getOsInfo.js';

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const myRoot = initDirectory(__dirname);

const changeDirectory = createChangeDirectory(__dirname);

function wrongCommand() {
  console.log(`you provided wrong command, try again`);
}

const osKeys = ['--cpus', '--homedir', '--username', '--architecture'];

async function moveDirectory(path) {
  const res = await changeDirectory(path);
  if (res) {
    myRoot.changeRoot(res);
    getCurrentDirectoryMsg(myRoot.root);
  }
}

async function getAction(str) {
  const args = str.split(' ').map((a) => a.replace('--', ''));
  const key = args[0] ? args[0] : '';
  const first = args[1] && key !== 'os' ? await changeDirectory(args[1]) : '';
  const second = args[2] && key !== 'os' ? await changeDirectory(args[2]) : '';
  switch (key) {
    case 'ls':
      printFolderList(myRoot.root);
      return;
    case 'cd':
      moveDirectory(first);
      return;
    case 'up':
      moveDirectory(await changeDirectory('..'));
      return;
    case 'compress':
      await compress(first, second);
      return;
    case 'decompress':
      await decompress(first, second);
      return;
    case 'hash':
      await calculateHash(first);
      return;
    case 'cat':
      await readFolderFile(first);
      return;
    case 'add':
      const addName = args[1] ? args[1] : 'default-name.txt';
      await createFile(path.join(myRoot.root, addName));
      return;
    case 'rn':
      const pathTo = path.parse(first).dir;
      await renameFile(first, path.join(pathTo, args[2]));
      return;
    case 'cp':
      const name = basename(first);
      await copyFile(first, join(second, name));
      return;
    case 'mv':
      await moveFile(first, join(second, basename(first)));
      return;
    case 'rm':
      await deleteFile(first);
      return;
    case 'os':
      getInfo(args[1]);
      return;
    default:
      wrongCommand();
      return;
  }
}

const userMatch = 'user';
let userName = 'user';

listenCommandLine();

function listenCommandLine() {
  greet();
  line.on('line', (data) => {
    if (data !== '.exit') getAction(data);
    else {
      goodbye();
      process.exit();
    }
  });

  line.on('close', () => {
    goodbye();
  });
}

function initDirectory(dir) {
  const init = dir;
  return {
    joinRoot(move) {
      return move ? path.join(this.root, move) : this.root;
    },
    changeRoot(move) {
      this.root = move;
    },
    root: init,
  };
}

function createChangeDirectory(dir) {
  let closureDir = dir;
  const isExist = (flag, path) => {
    if (flag) closureDir = path;
  };

  return async (move, flag = false) => {
    if (path.isAbsolute(move)) {
      await checkAccess(move, isExist);
    } else {
      const relative = myRoot.joinRoot(move);
      await checkAccess(relative, isExist);
    }

    return closureDir;
  };
}

function getCurrentDirectoryMsg(path) {
  console.log(`You are currently in ${path}`);
}

function greet() {
  const args = process.argv.slice(2);
  args.forEach((val) => {
    userName = val.match(userMatch) ? val.split('=').pop() : 'defaultUser';
  });
  console.log(`Welcome to the File Manager, ${userName}!`);
}

function goodbye() {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
}

async function printFolderList(path) {
  const list = await readFolder(path);
  console.table(list);
}

async function renameFile(from, to) {
  try {
    await fs.promises.rename(from, to, function (err) {
      if (err) console.log('something went wrong');
    });
  } catch (err) {
    console.log('something went wrong');
  }
}

async function createFile(dir) {
  try {
    await fs.promises.writeFile(dir, '', { flag: 'w' });
    console.log('file created ', dir);
  } catch (err) {
    console.log('something went wrong', err);
  }
}

async function readFolderFile(path) {
  try {
    const text = await fs.promises.readFile(path, 'utf-8');
    console.log(text);
  } catch (error) {
    console.log('operation failed');
  }
}
