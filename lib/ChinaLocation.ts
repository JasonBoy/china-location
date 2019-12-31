'use strict';

interface LocationItem {
  code: string;
  name?: string;
}
interface ProvinceLocationItem extends LocationItem {
  cities: object;
}
interface CityLocationItem extends LocationItem {
  districts: object;
}
interface Address {
  province: LocationItem;
  city: LocationItem;
  district: LocationItem;
}

class ChinaLocation {
  locationData: object;
  currentProvinces: Array<LocationItem>;
  currentCities: Array<LocationItem>;
  currentDistricts: Array<LocationItem>;
  activeProvince: string;
  activeCity: string;
  activeDistrict: string;

  constructor(locationData) {

    this.locationData = locationData;

    this.currentProvinces = this.getProvinces();
    const defaultProvince: LocationItem = this.currentProvinces[0];
    this.currentCities = this.getCities(defaultProvince);
    const defaultCity = this.currentCities[0];
    this.currentDistricts = this.getDistricts(defaultCity, defaultProvince);

    this.activeProvince = defaultProvince.code; //province code
    this.activeCity = defaultCity.code; //city code
    this.activeDistrict = this.currentDistricts[0].code; //district code
  }

  getProvinces(): Array<LocationItem> {
    const provinceKeys = Object.keys(this.locationData);
    const provinces = [];
    provinceKeys.forEach(provinceKey => {
      const provinceData = this.locationData[provinceKey];
      provinces.push({
        code: provinceData.code,
        name: provinceData.name,
      });
    });
    return provinces;
  }

  getCities(currentProvince: LocationItem): Array<LocationItem> {
    const citiesObject = this.locationData[currentProvince.code].cities;
    const cityKeys = Object.keys(citiesObject);
    const cities = [];
    cityKeys.forEach(cityKey => {
      const cityData = citiesObject[cityKey];
      cities.push({
        code: cityData.code,
        name: cityData.name,
      });
    });
    return cities;
  }

  getDistricts(
    currentCity: LocationItem,
    currentProvince: LocationItem
  ): Array<LocationItem> {
    const provincesObject = this.locationData[currentProvince.code];
    const currentCityObject = provincesObject.cities[currentCity.code];
    const districtsObject = currentCityObject.districts;
    const districtKeys = Object.keys(districtsObject);
    const districts = [];
    districtKeys.forEach(districtKey => {
      districts.push({
        code: districtKey,
        name: districtsObject[districtKey],
      });
    });
    return districts;
  }

  getProvinceByCode(code: string): ProvinceLocationItem {
    return this.locationData[code];
  }

  getCityByCode(cityCode: string, provinceCode: string): CityLocationItem {
    return this.getProvinceByCode(provinceCode).cities[cityCode];
  }

  getDistrictByCode(
    districtCode: string,
    cityCode: string,
    provinceCode: string
  ): string {
    return this.getCityByCode(cityCode, provinceCode).districts[districtCode];
  }

  getCity(code: string, cities: object): CityLocationItem {
    return cities[code];
  }

  getDistrict(code: string, districts: object): string {
    return districts[code];
  }

  changeLocation(
    provinceCode: string,
    cityCode?: string,
    districtCode?: string
  ): this {
    this.changeProvince(provinceCode, cityCode, districtCode);
    return this;
  }

  changeProvince(
    provinceCode: string,
    cityCode?: string,
    districtCode?: string
  ): void {
    const cities = this.getCities({ code: provinceCode } as LocationItem);
    let city = cities[0];
    if (cityCode) {
      let i = 0;
      for (; i < cities.length; i++) {
        const tempCity = cities[i];
        if (tempCity.code == cityCode) {
          city = tempCity;
          break;
        }
      }
    }

    this.currentCities = cities;
    this.activeProvince = provinceCode;
    this.changeCity(city ? city.code : '', districtCode);
  }

  changeCity(cityCode: string, districtCode?: string): void {
    const districts = this.getDistricts(
      {
        code: cityCode,
      },
      {
        code: this.activeProvince,
      }
    );

    this.currentDistricts = districts;
    this.activeCity = cityCode;

    let district = districts[0];
    if (districtCode) {
      let i = 0;
      for (; i < districts.length; i++) {
        const tempDistrict = districts[i];
        if (tempDistrict.code == districtCode) {
          district = tempDistrict;
          break;
        }
      }
    }

    this.changeDistrict(district ? district.code : '');
  }

  changeDistrict(districtCode: string): void {
    this.activeDistrict = districtCode;
  }

  getCurrentAddress(): Address {
    const originalProvince = this.getProvinceByCode(this.activeProvince);
    const originalCity = this.getCity(this.activeCity, originalProvince.cities);
    const originalDistrict = this.getDistrict(
      this.activeDistrict,
      originalCity.districts
    );

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
        name: originalDistrict || '',
      },
    };
  }

  getCurrentProvinces(): Array<LocationItem> {
    return this.currentProvinces;
  }

  getCurrentCities(): Array<LocationItem> {
    return this.currentCities;
  }

  getCurrentDistricts(): Array<LocationItem> {
    return this.currentDistricts;
  }
}

export default ChinaLocation;
