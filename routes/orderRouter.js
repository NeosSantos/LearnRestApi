'use strict';
module.exports = function(app) {
    const orderCtrl = require('../controllers/orderController');
    app.route('/admin/orders')
        .get(orderCtrl.allOrders);

    app.route('/admin/orders/:orderId')
        .get(orderCtrl.getOrder)
        .delete(orderCtrl.deleteOrder);
};
