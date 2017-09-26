const should = require('chai').should();

const list = require('../dist/location.json');
const ChinaLocation = require('../index');

describe('ChinaLocation', function () {
  it('should get default location', function () {
    const location = new ChinaLocation(list);
    const defaultLocation = location.getCurrentAddress();
    defaultLocation.province.code.should.be.equal('110000');
    defaultLocation.city.code.should.be.equal('110000');
    defaultLocation.district.code.should.be.equal('110101');
  });

  const newProvince = '320000';
  const newCity = '320500';
  const newDistrict = '320509';

  it('should change location', function () {
    const location = new ChinaLocation(list);
    location.changeProvince(newProvince);
    location.changeCity(newCity);
    location.changeDistrict(newDistrict);
    const newLocation = location.getCurrentAddress();
    newLocation.province.name.should.be.equal('江苏省');
    newLocation.city.name.should.be.equal('苏州市');
    newLocation.district.name.should.be.equal('吴江区');
  });

  it('should change location at one time', function () {
    const location = new ChinaLocation(list);
    location.changeLocation(newProvince, newCity, newDistrict);
    const newLocation = location.getCurrentAddress();
    newLocation.province.name.should.be.equal('江苏省');
    newLocation.city.name.should.be.equal('苏州市');
    newLocation.district.name.should.be.equal('吴江区');
  });

  it('should have no district', function () {
    const location = new ChinaLocation(list);
    location.changeLocation('440000', '441900');
    const newLocation = location.getCurrentAddress();
    newLocation.province.name.should.be.equal('广东省');
    newLocation.city.name.should.be.equal('东莞市');
    newLocation.district.name.should.be.equal('');
  });

});
