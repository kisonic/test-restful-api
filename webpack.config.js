var webpack = require('webpack');

module.exports = {
	entry: ["babel-polyfill", "./app/index.js"],
	output: {
		path: __dirname + '/public',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel",
				exclude: [/node_modules/, /public/, /server/]
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer-loader",
				exclude: [/node_modules/, /public/, /server/]
			},
			{
				test: /\.styl$/,
				loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader",
				exclude: [/node_modules/, /public/, /server/]
			}
		]
	}
}
