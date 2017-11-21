'use strict';

var mongoose = require('mongoose'),
    Order = mongoose.model('Order');

exports.newOrder = (req, res, next) => {
    var order = new Order(req.body);
    
    order.save((err, _order) => {
        if(err) return next(err);
        res.json(_order);
    });
};

exports.getOrder = (req, res, next) => {
    Order.findById(req.params.orderId, (err, order) => {
        if(err) return next(err);
        res.json(order);
    });
};

exports.updateOrder = (req, res, next) => {
    Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new:true}, (err, order) => {
        if(err) return next(err);
        res.json(order);
    });
};

exports.deleteOrder = (req, res, next) => {
    Order.remove({_id: req.params.orderId}, (err, order) => {
        if(err) return next(err);
        res.json({ message: 'Order successfully deleted.' });
    });
};
