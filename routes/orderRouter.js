'use strict';
module.exports = function(app) {
    var orderCtrl = require('../controllers/orderController');
    app.route('/admin/orders')
        .get(orderCtrl.allOrders)
        .post(orderCtrl.newOrder);

    app.route('/admin/orders/:orderId')
        .get(orderCtrl.getOrder)
        .put(orderCtrl.updateOrder)
        .delete(orderCtrl.deleteOrder);
};
