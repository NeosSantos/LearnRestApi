'use strict';
const cache = require('apicache').middleware;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function(app) {
    const userCtrl = require('../controllers/userController');
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
