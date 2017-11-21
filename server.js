var express = require('express'),
app = express(),
port = process.env.PORT || 3333,
mongoose = require('mongoose');

const models = require('./models');
const logger = require('morgan');
const dbConfig = require('./config/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {useMongoClient: true});

const db = mongoose.connection;

db.on('error', err=> {
    console.error(`Error while connection to DB: ${err.message}`);
});
db.once('open', ()=> {console.log('DB connected successfully!'); });

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
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./routes/')(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err.message);
  res.json({
    status: 1,
    msg: err.message
  });
});

app.listen(port);
console.log(' Start started on ' + port);
