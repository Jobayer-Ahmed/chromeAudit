const chromeLauncher = require('chrome-launcher'),
	  lighthouse = require('lighthouse'),
	  fs = require('fs');

function main (url, option, config = null) {
	return chromeLauncher
		   .launch({chromeFlags: option.chromeFlags})
			   .then(chrome => {
				 	option.port = chrome.port;
				 	return lighthouse(url, option, config).then(result => {
				 		return chrome.kill().then(() => result.lhr);
				 	});
				 });
}

const option = {
	chromeFlags: ["--show-paint-rects"]
};

main("https://google.com.bd", option).then(result => {
	const data = JSON.stringify(result);
	let fileName = new Date();
	fileName = `${fileName.getDate()}-${fileName.getMonth()+1}-${fileName.getFullYear()}.json`
	fs.writeFile(fileName, data, 'utf8', (err) => {
		if (err) throw err;
		console.log("File Saved");
	});
});