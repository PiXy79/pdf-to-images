var exec = require('child_process').exec;
var tmp = require('tmp');
var fs = require('fs');
var Q = require('q');
var filesource = require('filesource');

var initialized = false;

function numToNDigitStr(num, n) {
	if (num >=  Math.pow(10, n - 1)) { return num; }
	return '0' + numToNDigitStr(num, n - 1);
}

// Add Ghostscript executables path
var projectPath = __dirname.split('\\');
projectPath.pop();
projectPath = projectPath.join('\\');

exports.ghostscriptPath = projectPath + '\\executables\\ghostScript';

// for linux compability
exports.ghostscriptPath = exports.ghostscriptPath.split('\\').join('/');

exports.convert = function() {
	var deferred = Q.defer();

	var filepathOrData = arguments[0];
	var options = {};

	//var tmpFileCreated = false;

	if (arguments[2] !== null) {
		options = arguments[1];
	}

	if (!initialized) {
		if (!options.useLocalGhostscript) {
			process.env.Path += ';' + exports.ghostscriptPath;
		}
		initialized = true;
	}

	// Default to 200 dpi
	options.quality = options.quality || 200;

	filesource.getDataPath(filepathOrData, function(resp) {
		if (!resp.success) {
			deferred.reject(resp);
			return;
		}

		// get temporary filepath
		tmp.file({ prefix: 'pdf2png-', postfix: '%03d.png' }, function(err, imageFilepath/*, fd*/) {
			if (err) {
				deferred.reject({ error: 'Error getting second temporary filepath: ' + err });
				return;
			}

			exec('gs -dQUIET -dPARANOIDSAFER -dBATCH -dNOPAUSE -dNOPROMPT -sDEVICE=png16m -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -r' +
        options.quality + ' -sOutputFile=' + imageFilepath + ' ' + resp.data, function(error/*, stdout, stderr*/) {
				// Remove temp files
				resp.clean();

				if (error !== null) {
					deferred.reject({ error: 'Error converting pdf to png: ' + error });
					return;
				}

				var count = 1;
				var imagesData = [];
				var filesToRead = true;
				// Remove temp file
				fs.unlink(imageFilepath);

				while (filesToRead) {
					try {
						var fileName = imageFilepath.replace('%03d', numToNDigitStr(count, 3));
						var data = fs.readFileSync(fileName);
						imagesData.push(data);
						// Remove temp file
						fs.unlink(fileName);
						count++;
					}	catch (err) {
						if (err.code === 'ENOENT') {
							filesToRead = false;
						}
					}
				}

				deferred.resolve({ images: imagesData });
			});
		});
	});
	return deferred.promise;
};
