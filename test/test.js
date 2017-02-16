var pdf2images = require('../lib/pdf2images.js');
var exec = require('child_process').exec;
const should = require('chai').should();
const expect = require('chai').expect;

describe('convert', function() {
    
    var stdout;
    var stderr;

    before(function(done) {
        exec('gs --version', function (error, stdout, stderr) {
            if (error) {
                done(error);
            } 
            stdout = stdout;
            stderr = stderr;
            done();
        });
    });

    it('ghostscript is correctly installed', function(done) {
        expect(stderr).be.empty;
        done();
    });

    it('convert is defined', function(done) {
        should.exist(pdf2images.convert);
        pdf2images.convert.should.be.an('function');
        done();
    });
});