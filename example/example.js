
var pdf2images = require('../lib/pdf2images.js');
var fs = require('fs');

var projectPath = __dirname.split('\\');
projectPath.pop();
projectPath = projectPath.join('\\');

var gsPath = projectPath + '\\executables\\ghostScript';

// Rewrite the ghostscript path
pdf2images.ghostscriptPath = gsPath;

// Test multiple page PDF
pdf2images.convert(__dirname + '/test.pdf', {})
	.then(function(resp) {
		var imageCount = 1;
		resp.images.forEach(function(data) {
			fs.writeFile('example/test_' + imageCount + '.png', data, function(err) {
				if(err) {
					console.log(err);
				}
				else {
					//console.log('The file was saved!');
				}
			});
			imageCount++;
		});	
	},
	function(err) {
		console.log('Something went wrong: ' + err.error); 
	}
);		

// Example using a local ghostscript installation
pdf2images.convert(__dirname + '/example.pdf', { useLocalGhostscript: true })
	.then(function(resp) {
		var imageCount = 1;
		resp.images.forEach(function(data) {
			fs.writeFile('example/example_' + imageCount + '.png', data, function(err) {
				if(err) {
					console.log(err);
				}
				else {
					//console.log('The file was saved!');
				}
			});
			imageCount++;
		});	
	},
	function(err) {
		console.log('Something went wrong: ' + err.error); 
	}
);		

