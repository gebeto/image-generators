const path = require("path");
const webpackMerge = require("webpack-merge");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const envConfig = (env, root) => require(`./configs/webpack.${env}.js`)(env, root);

const config = {
	entry: path.resolve(__dirname, "src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},

	resolve: {
		extensions: [".css", ".ts", ".tsx", ".js", ".jsx", ".png", ".ttf"],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(otf|ttf)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "fonts/",
					},
				}
			},
			{
				test: /\.(png|jpg)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						outputPath: "images/",
					},
				}
			},
		]
	},

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			inject: false,
		}),
	]
};

module.exports = (env) => webpackMerge(config, envConfig(env, __dirname));