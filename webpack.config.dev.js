import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import combineLoaders from 'webpack-combine-loaders';
let webpackConfig = {
    devtools: 'eval-source-maps',
    stats: {
        colors: true
    },
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
        new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin('bundle.css')
    ],
    module: {
        // transpile ES6/7 to ES5 via babel
        loaders: [{
                test: /(\.js|\.jsx)$/,
                include: [path.join(__dirname, 'client'),
                         path.join(__dirname, 'server/models')], //includev files only from client folder
                loaders: ['react-hot', 'babel']
            },
            // bundle LESS and CSS into a single CSS file, auto-generating -vendor-prefixes
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.(scss|css)$/,
                loader:
                    'style!css?modules=true&sourceMap=true&mportLoaders=true&localIdentName=[name]_[local]__[hash:base64:5]!autoprefixer?browsers=last 2 versions' +
                    '!sass-loader?sourceMap=true!sass-resources-loader'
            },
            {
                test: /\.png$/,
                loader: 'url?limit=10000&mimetype=image/png'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?prefix=font/&limit=5000'
            },
            {
                test: /\.ttf$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot$/,
                loader: 'file'
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js'], //enables to leave off the extension when importing

    },
    sassResources: './config/resources.scss'


};
export default webpackConfig;
