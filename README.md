# china-location
[![npm](https://img.shields.io/npm/v/china-location.svg)](https://www.npmjs.com/package/china-location)
[![Building Status](https://travis-ci.org/JasonBoy/china-location.svg?branch=master)](https://travis-ci.org/JasonBoy/china-location)

JS Library for [中国行政区划信息](https://github.com/mumuy/data_location#中国行政区划信息)  
Simplify the usage of chinese administrative division data.

[An React Component](https://github.com/JasonBoy/react-china-location) For this

## Usage

`npm install china-location --save` or
`yarn add china-location`

```javascript
import list from 'china-location/dist/location.json';
import ChinaLocation from 'china-location';
//const ChinaLocation = require('china-location');
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

## Build your own location.json

In case the package is not packed with the latest location data, get/clone the data from [mumuy/data_location(list.json)](https://github.com/mumuy/data_location),
and clone this repo and:

```bash
git clone git@github.com:JasonBoy/china-location.git
cd china-location
npm run reformat -- /path/to/data_location/list.json
# and the location(.min).json will be output to ./dist dir
```
And in your project, you can:

```javascript
import yourNewLocation from 'path/to/location.json';
import ChinaLocation from 'china-location';
const location = new ChinaLocation(yourNewLocation);
//...
```

## LICENSE

MIT
