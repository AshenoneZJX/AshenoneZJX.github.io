const fs = require('fs');
const filePath = '/Users/zhangjinxian/Documents/code/AshenoneZJX.github.io/src/data/car/brandDetails.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const fcb = data['方程豹'];
if (fcb) {
  console.log('Current models:', JSON.stringify(fcb.models, null, 2));
  console.log('Current lineup:', JSON.stringify(fcb.current_lineup, null, 2));
  console.log('Mermaid:', fcb.mermaid);
} else {
  console.log('方程豹 not found.');
}
