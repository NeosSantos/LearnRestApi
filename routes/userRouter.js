'use strict';
var cache = require('apicache').middleware;
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
    var userCtrl = require('../controllers/userController');
    var orderCtrl = require('../controllers/orderController');
    app.route('/admin/users')
        .get(userCtrl.allUsers);
    app.route('/admin/users/:userId')
        .delete(userCtrl.deleteUser);
        
    app.route('/users')
        .post(upload.single('avatar'), userCtrl.register);

    app.route('/users/:userId')
        .get(userCtrl.getUser)
        .put(upload.single('avatar'), userCtrl.updateUser)
        .delete(userCtrl.deleteUser);

    app.route('/users/:userId/avatar')
        .get(cache('5 minutes'), userCtrl.getAvatar)
        .put(upload.single('avatar'), userCtrl.setAvatar);

    app.route('/users/:userId/orders')
        .get(userCtrl.getOrders)
        .post(userCtrl.makeOrder);
    app.route('/users/:userId/orders/:orderId')
        .get(userCtrl.getOrder);
};
