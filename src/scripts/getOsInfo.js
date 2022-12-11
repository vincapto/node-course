import os from 'node:os';

export function getInfo(str) {
  switch (str) {
    case 'EOL':
      console.log(JSON.stringify(os.EOL));
      return;
    case 'cpus':
      console.table(
        os.cpus().map((a) => ({ model: a.model, speed: `${a.speed}GHz` }))
      );
      return;
    case 'homedir':
      console.log(os.homedir());
      return;
    case 'username':
      console.log(os.userInfo().username);
      return;
    case 'architecture':
      console.log(os.arch());
      return;
    default:
      break;
  }
}
