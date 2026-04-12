const fs = require('fs');
const filePath = '/Users/zhangjinxian/Documents/code/AshenoneZJX.github.io/src/data/car/brandDetails.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const lynk = data['领克'];
if (lynk) {
  console.log(JSON.stringify(lynk, null, 2));
} else {
  console.log('Lynk & Co not found in brandDetails.json');
}
