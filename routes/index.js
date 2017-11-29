'use strict';

var listEndpoints = require('express-list-endpoints');

module.exports = function(app){
    require('./userRouter')(app);
    require('./foodRouter')(app);
    require('./orderRouter')(app);
    require('./containerRouter')(app);

    app.route('/')
        .get((req, res, next) => {
            var data = {
                apis: listEndpoints(app),
                schemas: [
                    'https://www.tripleseed.top/schemas/api-schema.json',
                    'https://www.tripleseed.top/schemas/container-schema.json',
                    'https://www.tripleseed.top/schemas/food-schema.json',
                    'https://www.tripleseed.top/schemas/order-schema.json',
                    'https://www.tripleseed.top/schemas/user-schema.json'
                ]
            };
            res.send(data);

        });
};
