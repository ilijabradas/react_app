import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import config_passport from './config/passport';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackCongif from '../webpack.config.dev';

import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';

import authCheckMiddleware from './middleware/authCheckMiddleware';

import database from './config/database';
import connect from './models/index';
// connect to the database and load models
connect(database.url);
const compiler = webpack(webpackCongif);
let app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
config_passport(passport); // pass passport for configuration
// required for passport
app.use(passport.initialize());
app.use('/api', authCheckMiddleware);
// routes ======================================================================
authRoutes(app, passport); // load our auth routes and pass in our app and fully configured passport
apiRoutes(app, passport);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackCongif.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
app.listen(3000, () => console.log('Listening on port 3000'));
