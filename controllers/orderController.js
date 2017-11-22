'use strict';

var mongoose = require('mongoose'),
    Order = mongoose.model('Order');

const logger = require('../utilities/logger');

exports.allOrders = (req, res, next) => {
    var pIndex, pSize;
    try {
        pIndex = parseInt(pIndex || '0');
    } catch (error) {
        logger.error(error);
        pIndex = 0;
    }
    try {
        pSize = parseInt(pSize || '20');
    } catch (error) {
        logger.error(error);
        pSize = 20;
    }
    Order.find().skip(pIndex * pSize).limit(pSize)
    .exec((err, orders) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: orders,
            pageIndex: pIndex,
            pageSize: pSize,
            totalCount: orders.length
        });
    });
};

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
        if(!order) {
            res.status(404).json({
                status: 1,
                msg: res.__('Order not found')
            });
            return;
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: order
        });
    });
};

exports.deleteOrder = (req, res, next) => {
    Order.remove({_id: req.params.orderId}, (err, order) => {
        if(err) return next(err);
        res.json({ 
            status: 0,
            msg: res.__('Order successfully deleted.') 
        });
    });
};
