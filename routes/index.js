'use strict';

var listEndpoints = require('express-list-endpoints');

module.exports = function(app){
    require('./userRouter')(app);
    require('./foodRouter')(app);
    require('./orderRouter')(app);
    require('./containerRouter')(app);

    app.route('/')
        .get((req, res, next) => res.send(listEndpoints(app)));
};
