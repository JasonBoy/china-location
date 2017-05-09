const list = require('../dist/location.json');
const ChinaLocation = require('../index').ChinaLocation;

const location = new ChinaLocation(list);

console.log(location.getCurrentAddress());

const newProvince = '320000';
const newCity = '320500';
const newDistrict = '320509';
console.log('change location to: ', newProvince, newCity, newDistrict);
location.changeProvince(newProvince);
location.changeCity(newCity);
location.changeDistrict(newDistrict);

console.log(location.getCurrentAddress());