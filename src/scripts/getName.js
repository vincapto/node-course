export function writeLine(data) {
  const paramList = data.split('--');
  const result = paramList.reduce((acc, next) => {
    if (next.length === 0) return acc;
    const [key, val] = next.trim().split(' ');
    return [...acc, `${key} is ${val}`];
  }, []);
  console.log(result.join(', '));
}

const parseArgs = () => {
  line.on('line', (data) => {
    if (data !== 'exit') writeLine(data);
    else goodbye();
    console.log('enter next line');
  });
};
