import path from 'path';
import webpack from 'webpack';
let webpackConfig = {
	devtools: 'eval-source-maps',
    entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/index.js')
    ],
    output: {
        path: '/'
    },
    plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            include: path.join(__dirname, 'client'), //includev files only from client folder
            loaders: ['react-hot','babel']
        }]
    },
    resolve: {
    	extensions: ['', '.js'] //enables to leave off the extension when importing
    }

};
export default webpackConfig;
