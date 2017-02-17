# Pdf2images [![Build Status](https://travis-ci.org/PiXy79/pdf2images.svg?branch=master)](https://travis-ci.org/PiXy79/pdf2images)

## Installation

Install pdf2images using [npm](http://npmjs.org/):

```
npm install pdf2images
```

## Description

***Credit for this module should go to to @nkognitoo***

This is a fork of an exsisting module known as pdf2png-mp: https://www.npmjs.com/package/pdf2png-mp.  

This update rewrite the code to better handle PDF with multiple pages and to return a promise object instead using a standard callback mechanism.

This project uses ghostscript, but there's no need to install it (if you use windows).
If you want the module to use a local installation of ghostscript, set the option useLocalGhostscript true.

If you want to use it with linux, you may replace the ghostscript-executable with something that works with linux.
Or you install ghostscript for linux.
http://www.ghostscript.com/

If you want to use it with MacOSX you can install ghostscript from this site: http://pages.uoregon.edu/koch/.

This module has been tested on Windows, Linux and MacOSX.

## Code example

```javascript
// Most simple example
pdf2images.convert(__dirname + '/test.pdf', {})
	.then(function(resp) {
		var imageCount = 1;
		resp.images.forEach(function(data) {
			fs.writeFile('test/test_' + imageCount + '.png', data, function(err) {
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
```
If an error like this appears:
Something went wrong: Error converting pdf to png: Error: Command failed: 'gs' is not recognized as an internal or external command, operable program or batch file.

Maybe you have the node file you execute in a subfolder and Pdf2images doesn't set  the path to ghostscript correctly anymore.

You can rewrite the path to the executable by setting "pdf2images.ghostscriptPath".

Look at the following example of a script, being in the subfolder /lib.
It first detects the project-root folder and then builds the absolute path to the ghostscript folder.

```javascript
var projectPath = __dirname.split("\\");
projectPath.pop();
projectPath = projectPath.join("\\");

var gsPath = projectPath + "\\executables\\ghostScript";

// Rewrite the ghostscript path
pdf2images.ghostscriptPath = gsPath;
```

## Options

bool useLocalGhostscript
	If true, the moudle won't set an envirponment attribute to the ghostscript executable.
	Set this true if you want to use an own local ghostscript installation

int quality [ = 200]
	The quality (dpi) of the output PNGs.

## Unit Test

Unit test can be executed running npm script *test* :

```
npm run test
```
