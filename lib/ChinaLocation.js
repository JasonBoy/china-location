'use strict';

class ChinaLocation {

  constructor (locationData) {
    this.locationData = locationData;

    this.currentProvinces = this.getProvinces();
    const defaultProvince = this.currentProvinces[0];
    this.currentCities = this.getCities(defaultProvince);
    const defaultCity = this.currentCities[0];
    this.currentDistricts = this.getDistricts(defaultCity, defaultProvince);

    this.activeProvince = defaultProvince.code; //province code
    this.activeCity = defaultCity.code; //city code
    this.activeDistrict = this.currentDistricts[0].code; //district code

  }

  getProvinces () {
    const provinceKeys = Object.keys(this.locationData);
    const provinces = [];
    provinceKeys.forEach((provinceKey) => {
      const provinceData = this.locationData[provinceKey];
      provinces.push({
        code: provinceData.code,
        name: provinceData.name,
      })
    });
    return provinces;
  }

  getCities(currentProvince) {
    const citiesObject = this.locationData[currentProvince.code].cities;
    const cityKeys = Object.keys(citiesObject);
    const cities = [];
    cityKeys.forEach((cityKey) => {
      const cityData = citiesObject[cityKey];
      cities.push({
        code: cityData.code,
        name: cityData.name,
      })
    });
    return cities;
  }

  getDistricts (currentCity, currentProvince) {
    const provincesObject = this.locationData[currentProvince.code];
    const currentCityObject = provincesObject.cities[currentCity.code];
    const districtsObject = currentCityObject.districts;
    const districtKeys = Object.keys(districtsObject);
    const districts = [];
    districtKeys.forEach((districtKey) => {
      districts.push({
        code: districtKey,
        name: districtsObject[districtKey],
      })
    });
    return districts;
  }

  getProvinceByCode (code) {
    return this.locationData[code];
  }

  getCityByCode (cityCode, provinceCode) {
    return this.getProvinceByCode(provinceCode).cities[cityCode];
  }

  getDistrictByCode (districtCode, cityCode, provinceCode) {
    return this.getCityByCode(cityCode, provinceCode).districts[districtCode];
  }

  getCity (code, cities) {
    return cities[code];
  }

  getDistrict (code, districts) {
    return districts[code];
  }

  changeProvince (provinceCode) {
    const currentProvince = {code: provinceCode};
    const cities = this.getCities(currentProvince);
    const defaultCity = cities[0];
    // const districts = this.getDistricts(defaultCity, pObject);

    this.currentCities = cities;
    this.activeProvince = provinceCode;

    this.changeCity(defaultCity.code);
    // this.currentDistricts = districts;
    // this.activeCity = defaultCity.code;
    // this.activeDistrict = districts[0].code;
  }

  changeCity (cityCode) {
    const districts = this.getDistricts({
      code: cityCode
    }, {
      code: this.activeProvince
    });

    this.currentDistricts = districts;
    this.activeCity = cityCode;

    this.changeDistrict(districts[0].code);
    // this.activeDistrict = districts[0].code;
  }

  changeDistrict (districtCode) {
    this.activeDistrict = districtCode;
  }

  getCurrentAddress () {
    const originalProvince = this.getProvinceByCode(this.activeProvince);
    const originalCity = this.getCity(this.activeCity, originalProvince.cities);
    const originalDistrict = this.getDistrict(this.activeDistrict, originalCity.districts);

    return {
      province: {
        code: originalProvince.code,
        name: originalProvince.name,
      },
      city: {
        code: originalCity.code,
        name: originalCity.name,
      },
      district: {
        code: this.activeDistrict,
        name: originalDistrict,
      }
    };
  }

}

module.exports = ChinaLocation;