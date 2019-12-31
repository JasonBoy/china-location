'use strict';

const path = require('path');
const fs = require('fs');

let listPath = process.argv[2];
if (!listPath) {
  throw new Error(
    'No data list json file provided!use [npm run reformat -- /path/to/location.json] to specify original location data'
  );
}

listPath = path.resolve(listPath);
console.log(`data list file: ${listPath}`);
const list = JSON.parse(fs.readFileSync(listPath));

const allKeys = Object.keys(list);

const buildName = path.join(__dirname, '../dist/location.json');
const buildMinName = path.join(__dirname, '../dist/location.min.json');

function processLocation() {
  return new Promise(resolve => {
    getProvince();
    console.log('Location processed!');
    //resolve with the built file name
    resolve(buildName);
  });
}

function getProvince() {
  const result = {};
  const provinceKeys = allKeys.filter(key => {
    return key.endsWith('0000');
  });
  // console.log('=======Province=======');
  provinceKeys.forEach(pk => {
    // console.log(`${pk}:${list[pk]}`);
    result[pk] = {
      code: pk,
      name: list[pk],
      cities: getCities(pk),
    };
    // const tempCities = getCities(pk);
  });
  // console.log(result);
  // console.log(`=======Province END, total: ${provinceKeys.length}=======`);

  //=====
  // getCities('310000'); //shanghai
  // getCities('810000'); //hongkong
  // getCities('320000'); //jiangsu

  // getCities(provinceKeys[0]);
  fs.writeFileSync(buildName, JSON.stringify(result, null, 2));
  fs.writeFileSync(buildMinName, JSON.stringify(result));
  return result;
}

function getCities(provinceCode) {
  const result = {};
  const justProvince = provinceCode.substring(0, 2);
  const cities = allKeys.filter((pk, index) => {
    if (pk.startsWith(justProvince)) {
      if (pk.endsWith('00')) {
        const next = index + 1;
        const nextKey = allKeys[next];
        if (!nextKey.endsWith('00')) {
          return true;
        }
        if (
          pk.substring(2, 4) != nextKey.substring(2, 4) &&
          pk.substring(2, 4) != '00'
        ) {
          return true;
        }
      }
    }
    return false;
  });
  // console.log(`=======Cities for: ${provinceCode}=======`);
  cities.forEach(ck => {
    // console.log(`${ck}:${list[ck]}`);
    result[ck] = {
      code: ck,
      name: list[ck],
      districts: getDistricts(ck),
    };
  });
  // console.log(result);
  // console.log(`=======Cities END, total: ${cities.length}=======`);

  // getDistricts(cities[0]);
  return result;
}

function getDistricts(cityCode) {
  const result = {};
  const justProvince = cityCode.substring(0, 2);
  const justCity = cityCode.substring(0, 4);
  const districts = allKeys.filter((pk, index) => {
    if (pk.startsWith(justCity)) {
      if (!pk.endsWith('00')) {
        return true;
      }
    }
    //特别行政区, 直辖市
    if (justCity.endsWith('00')) {
      if (pk.startsWith(justProvince) && !pk.endsWith('0000')) {
        return true;
      }
    }
    return false;
  });
  // console.log(`=======Districts for: ${cityCode}=======`);
  districts.forEach(ck => {
    // console.log(`${ck}:${list[ck]}`);
    result[ck] = list[ck];
  });
  // console.log(result);
  // console.log(`=======Districts END, total: ${districts.length}=======`);
  return result;
}

processLocation().then(() => console.log('Reformat list finished!'));
