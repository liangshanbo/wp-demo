const fs = require('fs');
const cp = require('child_process');
let originReg = /ssh.*\.git/g;

fs.readFile('./.git/config', {
	encoding: "utf-8"
}, (err, data) => {
	let result = data.match(originReg);
	if (result) {
		let origin = result[0],
			name = reurnData();
		// cp.exec('git push --force origin develop:' + name, function(err, out, outerr) {
		cp.exec('git push --force origin develop:release', function(err, out, outerr) {
			if (err || outerr) {
				console.log(err || outerr);
			} else {
				console.log(out);
			}
		});
		// });
	}
});

function reurnData() {
	var date = new Date();
	return date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds();
}