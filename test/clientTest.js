var expect = require('chai').expect;
var client = require('../').connect('http://95.85.22.215:4000');

describe('browserify-client', function() {

  describe('.require(moduleName)', function() {

    it('resolves the module', function(done) {

      client.require('sum-of-two-numbers', function(err, sum) {
        expect(err).to.be.null;
        expect(sum(1, 2)).to.equal(3);
        done();
      });

    });

    it('fails to resolve a non-existent module', function(done) {

      client.require('a-module-name-that-is-unlikely', function(err) {
        expect(err.toString()).to.eql('Error: Not Found');
        done();
      });

    });

  });

  describe('.require(moduleName, "1.2.3", callback)', function() {

    it('resolves a specific version of the module', function(done) {

      client.require('plastiq', "1.0.0", function(err, plastiq) {
        expect(err).to.be.null;
        expect(typeof(plastiq.html.animation)).to.equal('function');
        done();
      });

    });

    it.skip('fails to resolve if any module is non-existent', function(done) {

      client.require({ 'a-module-name-that-is-unlikely': '1.0.0', 'plastiq': 'latest' }, function(err) {
        expect(err.toString()).to.eql('Error: Not Found');
        done();
      });

    });

  });

  describe('.require({ a: "1.2.3", b: "4.5.6" }, callback)', function() {

    it('resolves specific versions of multiple modules', function(done) {

      client.require({ plastiq: "1.0.0", 'sum-of-two-numbers': "latest" }, function(err, resolved) {
        expect(err).to.be.null;
        expect(typeof(resolved.plastiq.html.animation)).to.equal('function');
        expect(resolved['sum-of-two-numbers'].call(null, 1, 2)).to.equal(3);
        done();
      });

    });

  });

});
