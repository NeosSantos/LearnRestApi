'use strict';
const cache = require('apicache').middleware;

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function(app) {
    const foodCtrl = require('../controllers/foodController');
    app.route('/admin/foods')
        .post(upload.single('image'), foodCtrl.newFood);
    app.route('/admin/foods/:foodId')
        .put(upload.single('image'), foodCtrl.updateFood)
        .delete(foodCtrl.deleteFood);
        
    app.route('/foods')
        .get(foodCtrl.allFoods);

    app.route('/foods/:foodId')
        .get(foodCtrl.getFood);
    app.route('/foods/:foodId/image')
        .get(cache('5 minutes'), foodCtrl.getFoodImage);
    
};
