'use strict';
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
    var foodCtrl = require('../controllers/foodController');
    app.route('/foods')
        .get(foodCtrl.allFoods)
        .post(upload.single('image'), foodCtrl.newFood);

    app.route('/foods/:foodId')
        .get(foodCtrl.getFood)
        .put(upload.single('image'), foodCtrl.updateFood)
        .delete(foodCtrl.deleteFood);
};
