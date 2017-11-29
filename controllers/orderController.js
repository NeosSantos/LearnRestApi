'use strict';

var mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    Container = mongoose.model('Container');

const utilities = require('../utilities');
const logger = utilities.logger;

exports.allOrders = (req, res, next) => {
    const pagination = utilities.parsePagination(req);
    let pIndex = pagination.pageIndex, pSize = pagination.pageSize;

    Order.find().skip(pIndex * pSize).limit(pSize)
        .exec((err, orders) => {
            if (err) return next(err);
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

exports.getOrder = (req, res, next) => {
    Order.findById(req.params.orderId, '+foodList')
        .populate('orderedBy')
        .populate('container')
        .exec((err, order) => {
            if (err) return next(err);
            if (!order) {
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
    Order.remove({ _id: req.params.orderId }, (err, order) => {
        if (err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Order successfully deleted.')
        });
    });
};
