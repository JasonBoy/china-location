# china-location
[![npm](https://img.shields.io/npm/v/china-location.svg)](https://www.npmjs.com/package/china-location)
[![Building Status](https://travis-ci.org/JasonBoy/china-location.svg?branch=master)](https://travis-ci.org/JasonBoy/china-location)

NPM module for [中国行政区划信息](https://github.com/mumuy/data_location#中国行政区划信息)  
Simplify the use of chinese administrative division data.

[An React Component](https://github.com/JasonBoy/react-china-location) For this

## Usage

`npm install china-location --save` or
`yarn add china-location`

```javascript
const list = require('china-location/dist/location.json');
const ChinaLocation = require('china-location');
const location = new ChinaLocation(list);

//get default location
//{
//  province: {code: '110000', name: '北京市'},
//  city: {code: '110000', name: '北京市'},
//  district: {code: '110101', name: '东城区'}
//}
const defaultLocation = location.getCurrentAddress();

//change location
const newProvince = '320000';
const newCity = '320500';
const newDistrict = '320509';
//use select html tag to change different part
location.changeProvince(newProvince);
location.changeCity(newCity);
location.changeDistrict(newDistrict);
//or you can change location at one time
location.changeLocation(newProvince, newCity, newDistrict);
//{
//  province: {code: '320000', name: '江苏省'},
//  city: {code: '320500', name: '苏州市'},
//  district: {code: '320509', name: '吴江区'}
//}
const newLocation = location.getCurrentAddress();

```

## LICENSE

MIT
