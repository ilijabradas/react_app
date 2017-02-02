import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackCongif from '../webpack.config.dev';

import users from './routes/users';

const compiler = webpack(webpackCongif);
let app = express();
app.use(bodyParser.json());

app.use('/api/users', users);

app.use(webpackMiddleware(compiler, {
	hot:true,
	publicPath: webpackCongif.output.publicPath,
	noInfo:true
}));
app.use(webpackHotMiddleware(compiler));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});
app.listen(3000, () => console.log('Listening on port 3000'));
