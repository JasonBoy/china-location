(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ChinaLocation"] = factory();
	else
		root["ChinaLocation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChinaLocation = function () {
  function ChinaLocation(locationData) {
    _classCallCheck(this, ChinaLocation);

    if (!(this instanceof ChinaLocation)) {
      return new ChinaLocation(locationData);
    }

    this.locationData = locationData;

    this.currentProvinces = this.getProvinces();
    var defaultProvince = this.currentProvinces[0];
    this.currentCities = this.getCities(defaultProvince);
    var defaultCity = this.currentCities[0];
    this.currentDistricts = this.getDistricts(defaultCity, defaultProvince);

    this.activeProvince = defaultProvince.code; //province code
    this.activeCity = defaultCity.code; //city code
    this.activeDistrict = this.currentDistricts[0].code; //district code
  }

  _createClass(ChinaLocation, [{
    key: 'getProvinces',
    value: function getProvinces() {
      var _this = this;

      var provinceKeys = Object.keys(this.locationData);
      var provinces = [];
      provinceKeys.forEach(function (provinceKey) {
        var provinceData = _this.locationData[provinceKey];
        provinces.push({
          code: provinceData.code,
          name: provinceData.name
        });
      });
      return provinces;
    }
  }, {
    key: 'getCities',
    value: function getCities(currentProvince) {
      var citiesObject = this.locationData[currentProvince.code].cities;
      var cityKeys = Object.keys(citiesObject);
      var cities = [];
      cityKeys.forEach(function (cityKey) {
        var cityData = citiesObject[cityKey];
        cities.push({
          code: cityData.code,
          name: cityData.name
        });
      });
      return cities;
    }
  }, {
    key: 'getDistricts',
    value: function getDistricts(currentCity, currentProvince) {
      var provincesObject = this.locationData[currentProvince.code];
      var currentCityObject = provincesObject.cities[currentCity.code];
      var districtsObject = currentCityObject.districts;
      var districtKeys = Object.keys(districtsObject);
      var districts = [];
      districtKeys.forEach(function (districtKey) {
        districts.push({
          code: districtKey,
          name: districtsObject[districtKey]
        });
      });
      return districts;
    }
  }, {
    key: 'getProvinceByCode',
    value: function getProvinceByCode(code) {
      return this.locationData[code];
    }
  }, {
    key: 'getCityByCode',
    value: function getCityByCode(cityCode, provinceCode) {
      return this.getProvinceByCode(provinceCode).cities[cityCode];
    }
  }, {
    key: 'getDistrictByCode',
    value: function getDistrictByCode(districtCode, cityCode, provinceCode) {
      return this.getCityByCode(cityCode, provinceCode).districts[districtCode];
    }
  }, {
    key: 'getCity',
    value: function getCity(code, cities) {
      return cities[code];
    }
  }, {
    key: 'getDistrict',
    value: function getDistrict(code, districts) {
      return districts[code];
    }
  }, {
    key: 'changeLocation',
    value: function changeLocation(provinceCode, cityCode, districtCode) {
      this.changeProvince.apply(this, arguments);
    }
  }, {
    key: 'changeProvince',
    value: function changeProvince(provinceCode, cityCode, districtCode) {
      var currentProvince = { code: provinceCode };
      var cities = this.getCities(currentProvince);
      var city = cities[0];
      if (cityCode) {
        var i = 0;
        for (; i < cities.length; i++) {
          var tempCity = cities[i];
          if (tempCity.code == cityCode) {
            city = tempCity;
            break;
          }
        }
      }
      // const districts = this.getDistricts(defaultCity, pObject);

      this.currentCities = cities;
      this.activeProvince = provinceCode;

      this.changeCity(city ? city.code : '', districtCode);
      // this.currentDistricts = districts;
      // this.activeCity = defaultCity.code;
      // this.activeDistrict = districts[0].code;
    }
  }, {
    key: 'changeCity',
    value: function changeCity(cityCode, districtCode) {
      var districts = this.getDistricts({
        code: cityCode
      }, {
        code: this.activeProvince
      });

      this.currentDistricts = districts;
      this.activeCity = cityCode;

      var district = districts[0];
      if (districtCode) {
        var i = 0;
        for (; i < districts.length; i++) {
          var tempDistrict = districts[i];
          if (tempDistrict.code == districtCode) {
            district = tempDistrict;
            break;
          }
        }
      }

      this.changeDistrict(district ? district.code : '');
      // this.activeDistrict = districts[0].code;
    }
  }, {
    key: 'changeDistrict',
    value: function changeDistrict(districtCode) {
      this.activeDistrict = districtCode;
    }
  }, {
    key: 'getCurrentAddress',
    value: function getCurrentAddress() {
      var originalProvince = this.getProvinceByCode(this.activeProvince);
      var originalCity = this.getCity(this.activeCity, originalProvince.cities);
      var originalDistrict = this.getDistrict(this.activeDistrict, originalCity.districts);

      return {
        province: {
          code: originalProvince.code,
          name: originalProvince.name
        },
        city: {
          code: originalCity.code,
          name: originalCity.name
        },
        district: {
          code: this.activeDistrict,
          name: originalDistrict || ''
        }
      };
    }
  }, {
    key: 'getCurrentProvinces',
    value: function getCurrentProvinces() {
      return this.currentProvinces;
    }
  }, {
    key: 'getCurrentCities',
    value: function getCurrentCities() {
      return this.currentCities;
    }
  }, {
    key: 'getCurrentDistricts',
    value: function getCurrentDistricts() {
      return this.currentDistricts;
    }
  }]);

  return ChinaLocation;
}();

module.exports = ChinaLocation;

/***/ })
/******/ ]);
});
//# sourceMappingURL=china-location.js.map