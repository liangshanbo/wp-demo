var fs = require('fs');
var path = require('path');
var glob = require('glob');

function entries(globPath, ingore) {
	var files = glob.sync(globPath);
	var entries = {},
		entry, dirname, basename;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		basename = path.basename(entry, '.js');
		entries[filter(path.join(dirname, basename).slice(), ingore)] = './' + entry;
	}

	return entries;
}

function filter(globPath, ingore) {
	if (globPath.indexOf(ingore) > -1) {
		return globPath.slice(globPath.indexOf(ingore) + ingore.length + 1);
	}
	return globPath;
}

// console.log(entries('./src/js_es6/conf/**/*.js','js_es6'));

// return false;

module.exports = {
	entry: entries('./src/js/conf/**/*.js', 'conf'),
	output: {
		path: __dirname + '/dist/js/conf/',
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/',
			query: {
				presets: ['es2015']
			}
		}]
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			a:__dirname + '/src/js/conf/index/a.js',
			$: __dirname + '/src/js/vendors/zepto.js',
			vue: __dirname + '/src/js/vendors/vue.js',
			ajax:__dirname + '/src/js/utils/async/ajax.js'
		}
	},
	devtool: 'source-map',
	devServer: {
		contentBase: "./", //本地服务器所加载的页面所在的目录
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},

}