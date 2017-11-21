'use strict';
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

module.exports = function(app) {
    var userCtrl = require('../controllers/userController');
    var orderCtrl = require('../controllers/orderController');
    app.route('/users')
        .get(userCtrl.allUsers)
        .post(upload.single('avatar'), userCtrl.register);

    app.route('/users/:userId')
        .get(userCtrl.getUser)
        .put(upload.single('avatar'), userCtrl.updateUser)
        .delete(userCtrl.deleteUser);

    app.route('/users/:userId/avatar')
        .get(userCtrl.getAvatar)
        .put(upload.single('avatar'), userCtrl.setAvatar);

    app.route('/users/:userId/orders')
        .get(userCtrl.getOrders)
        .post(orderCtrl.newOrder);
    app.route('/users/:userId/orders/:orderId')
        .get(orderCtrl.getOrder);
};
