var express = require('express'),
app = express(),
port = process.env.PORT || 3333,
mongoose = require('mongoose');

const models = require('./models');
const logger = require('./utilities/logger');
const dbConfig = require('./config/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useMongoClient: true});

const db = mongoose.connection;

db.on('error', err=> {
    logger.error(`Error while connection to DB: ${err.message}`);
});
db.once('open', ()=> {logger.info('DB connected successfully!'); });

var i18n = require("i18n");
i18n.configure({
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
    cookie: 'lang',
    queryParameter: 'lang',
    directory: __dirname + '/i18n'
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'Options') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use(require('morgan')('combined', {stream: logger.stream}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(i18n.init);

require('./routes/')(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  logger.error(err.message);
  res.json({
    status: 1,
    msg: err.message
  });
});

app.listen(port);
logger.info('Start started on ' + port);
