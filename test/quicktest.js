var pdf2images = require("../lib/pdf2images.js");
var fs = require("fs");

var projectPath = __dirname.split("\\");
projectPath.pop();
projectPath = projectPath.join("\\");

var gsPath = projectPath + "\\executables\\ghostScript";

// Rewrite the ghostscript path
pdf2images.ghostscriptPath = gsPath;

// Most simple example
pdf2images.convert(__dirname + "/example.pdf", {}, function(resp){
		if(!resp.success)
		{
			console.log("Something went wrong: " + resp.error); 
			return;
		}

		var pageCount = resp.images.length;
		console.log('generated ' + pageCount + ' images..');

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
pdf2images.convert(__dirname + "/example.pdf", { useLocalGhostscript: true }, function(resp){
		if(!resp.success)
		{
			console.log("Something went wrong: " + resp.error); 
			return;
		}

		var pageCount = resp.images.length;
		console.log('generated ' + pageCount + ' images..');

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
