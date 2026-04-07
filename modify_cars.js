const fs = require('fs');
const path = '/Users/zhangjinxian/Documents/code/AshenoneZJX.github.io/src/data/car/cars.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.forEach(car => {
  if (car.brandLogo !== undefined) {
    delete car.brandLogo;
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
