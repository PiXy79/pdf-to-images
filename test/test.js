var pdf2images = require('../lib/pdf2images.js');
var exec = require('child_process').exec;
var should = require('chai').should();
var expect = require('chai').expect;

describe('convert', function () {

	var stdout;
	var stderr;

	before(function (done) {
		var projectPath = __dirname.split('/');
		projectPath.pop();
		projectPath = projectPath.join('/');

		var ghostscriptPath = projectPath + '/executables/ghostScript';
		process.env.Path += ';' + ghostscriptPath;

		exec('gs --version', function (error, stdout, stderr) {
			if (error) {
				done(error);
			} else {
				stdout = stdout;
				stderr = stderr;
				done();
			}
		});
	});

	it('ghostscript is correctly installed', function (done) {
		expect(stderr).be.empty;
		done();
	});

	it('convert is defined', function (done) {
		should.exist(pdf2images.convert);
		pdf2images.convert.should.be.an('function');
		done();
	});
});