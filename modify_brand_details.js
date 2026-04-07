const fs = require('fs');

const logos = {
  "本田": "/brand-logos/honda.png",
  "特斯拉": "/brand-logos/tesla.png",
  "大众": "/brand-logos/volkswagen.svg",
  "长城": "/brand-logos/Great_Wall_Motor.png",
  "丰田": "/brand-logos/toyota.png",
  "宝马": "/brand-logos/bmw.svg",
  "奥迪": "/brand-logos/audi.png",
  "奔驰": "/brand-logos/mercedes.png",
  "凯迪拉克": "/brand-logos/cadillac.png",
  "小米": "/brand-logos/xiaomi.png",
  "领克": "/brand-logos/lingke.svg",
  "小鹏": "/brand-logos/xpeng.svg",
  "日产": "/brand-logos/nissan.svg",
  "理想": "/brand-logos/lixiang.svg",
  "蔚来": "/brand-logos/nio.svg",
  "问界": "/brand-logos/aito.svg",
  "雷克萨斯": "/brand-logos/lexus.svg",
  "别克": "/brand-logos/buick.png",
  "福特": "/brand-logos/ford.png"
};

const brandDetailsPath = '/Users/zhangjinxian/Documents/code/AshenoneZJX.github.io/src/data/car/brandDetails.json';
const data = JSON.parse(fs.readFileSync(brandDetailsPath, 'utf8'));

for (const brand in data) {
  if (logos[brand]) {
    // Insert brandLogo right after region
    const newObj = {};
    for (const key in data[brand]) {
      newObj[key] = data[brand][key];
      if (key === 'region') {
        newObj['brandLogo'] = logos[brand];
      }
    }
    // Fallback if region was not found
    if (!newObj['brandLogo']) {
      newObj['brandLogo'] = logos[brand];
    }
    data[brand] = newObj;
  }
}

fs.writeFileSync(brandDetailsPath, JSON.stringify(data, null, 2));
