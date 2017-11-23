'use strict';
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
    var foodCtrl = require('../controllers/foodController');
    app.route('/admin/foods')
        .post(upload.single('image'), foodCtrl.newFood);
    app.route('/admin/foods/:foodId')
        .get(foodCtrl.getFood)
        .put(upload.single('image'), foodCtrl.updateFood)
        .delete(foodCtrl.deleteFood);
        
    app.route('/foods')
        .get(foodCtrl.allFoods);

    app.route('/foods/:foodId')
        .get(foodCtrl.getFood);

};
