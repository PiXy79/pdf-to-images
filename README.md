pdf2images
============

Install:
npm install pdf2images

***Credit for this module should go to to @nkognitoo***

This is a fork of an exsisting module known as pdf2png-mp: https://www.npmjs.com/package/pdf2png-mp.  

This update rewrite the code to better handle PDF with multiple pages.

This project uses ghostscript, but there's no need to install it (if you use windows).
If you want the module to use a local installation of ghostscript, set the option useLocalGhostscript true.

If you want to use it with linux, you may replace the ghostscript-executable with something that works with linux.
Or you install ghostscript for linux.
http://www.ghostscript.com/

How to use:

```javascript
// Most simple example
pdf2png.convert(__dirname + "/example.pdf", {}, function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);	
		return;
	}
	
	var pageCount = resp.images.length;
	console.log('generated ' + pageCount + ' images..);

	var count = 0;
	resp.images.forEach(function(data) {
		fs.writeFile("test/example_" + count + ".png", data, function(err) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("The file was saved!");
			}
		});
		count++;
	});
});


// Example using a local ghostscript installation
pdf2png.convert(__dirname + "/example.pdf", { useLocalGhostscript: true }, function(resp){
	if(!resp.success)
	{
		console.log("Something went wrong: " + resp.error);
		
		return;
	}
	
	var pageCount = resp.images.length;
	console.log('generated ' + pageCount + ' images..);

	var count = 0;
	resp.images.forEach(function(data) {
		fs.writeFile("test/example_" + count + ".png", data, function(err) {
			if(err) {
				console.log(err);
			}
			else {
				console.log("The file was saved!");
			}
		});
		count++;
	});
});
```

If an error like this appears:
Something went wrong: Error converting pdf to png: Error: Command failed: 'gs' is not recognized as an internal or external command, operable program or batch file.

Maybe you have the node file you execute in a subfolder and Pdf2Png doesn't set  the path to ghostscript correctly anymore.
You can rewrite the path to the executable by setting "pdf2png.ghostscriptPath".
Look at the following example of a script, being in the subfolder /lib.
It first detects the project-root folder and then builds the absolute path to the ghostscript folder.

```javascript
var projectPath = __dirname.split("\\");
projectPath.pop();
projectPath = projectPath.join("\\");

var gsPath = projectPath + "\\executables\\ghostScript";

// Rewrite the ghostscript path
pdf2png.ghostscriptPath = gsPath;
```

Options:
bool useLocalGhostscript
	If true, the moudle won't set an envirponment attribute to the ghostscript executable.
	Set this true if you want to use an own local ghostscript installation

bool returnFilePath
	If you set this true, the module won't return you file-data, it will return you a path to a temporary file instead, containing the image.
	Don't forget to remove this temporary file.

int quality [ = 100]
	The quality of the PNG
	Can be higher and lower, play with it
