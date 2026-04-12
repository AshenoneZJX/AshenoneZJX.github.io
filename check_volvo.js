const fs = require('fs');
const filePath = '/Users/zhangjinxian/Documents/code/AshenoneZJX.github.io/src/data/car/brandDetails.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let volvo;
for (let key in data) {
  if (key.includes('沃尔沃') || key.toLowerCase().includes('volvo')) {
    volvo = data[key];
    console.log('Found key:', key);
    break;
  }
}
if (volvo) {
  console.log(JSON.stringify(volvo, null, 2));
} else {
  console.log('Volvo not found');
}
