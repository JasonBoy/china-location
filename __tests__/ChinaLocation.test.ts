import list from '../dist/location.json';
import ChinaLocation from '../lib/ChinaLocation';

describe('ChinaLocation', function() {
  let newProvince: string;
  let newCity: string;
  let newDistrict: string;

  beforeAll(() => {
    newProvince = '320000';
    newCity = '320500';
    newDistrict = '320509';
  });

  it('should get default location', function() {
    const location = new ChinaLocation(list);
    const defaultLocation = location.getCurrentAddress();
    expect(defaultLocation.province.code).toEqual('110000');
    expect(defaultLocation.city.code).toEqual('110000');
    expect(defaultLocation.district.code).toEqual('110101');
  });

  it('should change location', function() {
    const location = new ChinaLocation(list);
    location.changeProvince(newProvince);
    location.changeCity(newCity);
    location.changeDistrict(newDistrict);
    const newLocation = location.getCurrentAddress();
    expect(newLocation.province.name).toEqual('江苏省');
    expect(newLocation.city.name).toEqual('苏州市');
    expect(newLocation.district.name).toEqual('吴江区');
  });

  it('should change location at one time', function() {
    const location = new ChinaLocation(list);
    location.changeLocation(newProvince, newCity, newDistrict);
    const newLocation = location.getCurrentAddress();
    expect(newLocation.province.name).toEqual('江苏省');
    expect(newLocation.city.name).toEqual('苏州市');
    expect(newLocation.district.name).toEqual('吴江区');
  });

  it('should get current provinces/cities/districts', function() {
    const location = new ChinaLocation(list);
    //shanghai
    location.changeLocation('310000', '310000', '310101');
    const provinces = location.getCurrentProvinces();
    const cities = location.getCurrentCities();
    const districts = location.getCurrentDistricts();
    expect(provinces.length).toEqual(34);
    expect(cities.length).toEqual(1);
    expect(districts.length).toEqual(16);
  });

  it('should have no district', function() {
    const location = new ChinaLocation(list);
    location.changeLocation('440000', '441900');
    const newLocation = location.getCurrentAddress();
    expect(newLocation.province.name).toEqual('广东省');
    expect(newLocation.city.name).toEqual('东莞市');
    expect(newLocation.district.name).toEqual('');
  });

  it('should get new added location', function() {
    const location = new ChinaLocation(list);
    const district = location.getDistrictByCode('370614', '370600', '370000');
    expect(district).toEqual('蓬莱区');
  });
});
