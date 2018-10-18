const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = (env, root) => ({
	mode: 'production',

	plugins: [
		new CleanWebpackPlugin(["dist"], {
			root: root,
		}),
		// new HtmlWebpackPlugin({
		// 	title: "Akella",
		// }),
	],
});