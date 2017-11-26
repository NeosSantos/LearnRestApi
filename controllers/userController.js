'use strict';

var path = require('path');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),    
    Order = mongoose.model('Order');
var logger = require('../utilities/logger');

exports.allUsers = (req, res, next) => {
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
    
    User.find().skip(pIndex * pSize).limit(pSize)
    .exec((err, users) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: users,
            pageIndex: pIndex,
            pageSize: pSize,
            totalCount: users.length
        });
    });
};

exports.register = (req, res, next) => {
    var user = new User(req.body);
    if(req.file) {
        user.avatar = { stream: req.file.buffer, mime: req.file.mimetype };
    }
    
    user.save((err, usr) => {
        if(err) return next(err);
        var u = usr.toObject();
        delete u.avatar;
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: u
        });
    });
};

exports.getUser = (req, res, next) => {
    const needImg = req.query.avatar === 'true';
    var prop = (needImg ? '+':'-') + 'avatar';

    User.findById(req.params.userId, (err, usr) => {
        if(err) return next(err);
        if(!usr) {
            res.status(404).json({
                status: 1,
                msg: res.__('User not found')
            });
            return;
        }
        
        var _usr = usr.toObject();
        if(needImg) {
            var base64 = new Buffer(usr.avatar.stream, 'binary').toString('base64');
            var dataURI = 'data:' + usr.avatar.mime + ';base64,' + base64;
            _usr.avatar = dataURI;
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: _usr
        });
    });
};

exports.updateUser = (req, res, next) => {
    User.findById(req.params.userId, (err, usr) => {
        if(err) return next(err);
        if(!usr) {
            res.status(400).json({
                status: 1,
                msg: res.__('User not found')
            });
            return;
        }
        //TODO: which field can be modified?
        usr.phone = req.body.phone;
        if(req.file) {
            user.avatar = { stream: req.file.buffer, mime: req.file.mimetype };
        }
        res.json({
            status: 1,
            data: usr
        });
    });
    // User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true}, (err, usr) => {
    //     if(err) return next(err);
    //     res.json(usr);
    // });
};

exports.deleteUser = (req, res, next) => {
    User.remove({_id: req.params.userId}, (err, usr) => {
        if(err) return next(err);
        res.json({ 
            status: 0,
            msg: res.__('User successfully deleted.')
        });
    });
};

exports.getAvatar = (req, res, next) => {
    User.findById(req.params.userId, 'avatar', (err, usr) => {
        if(err) return next(err);
        if(!usr){
            res.status(404).json({
                status: 1,
                msg: res.__('User not found')
            });
            return;
        }
        if(!usr.avatar) {
            res.contentType('image/png');
            res.sendFile(path.resolve(__dirname + '/../assets/user.png'));
            return;
        }
        res.contentType(usr.avatar.mime);
        res.end(usr.avatar.stream);
    });
};

exports.setAvatar = (req, res, next) => {
    User.findById(req.params.userId, (err, usr) => {
        if(err) return next(err);
        if(!usr) {
            res.status(400).json({
                status: 1,
                msg: res.__('User not found')
            });
            return;
        }
        if(!req.file) {
            res.status(400).json({
                status: 1,
                msg: res.__('No avatar found in request')
            });
            return;
        }
        usr.avatar = { stream: req.file.buffer, mime: req.file.mimetype };
        usr.save((err) => { 
            if(err) return next(err);
            res.json({ status: 0, msg: 'ok' });
        });
    });
};

exports.getOrders = (req, res, next) => {
    var pIndex, pSize;
    try {
        pIndex = parseInt(req.query.pageIndex || '0');
    } catch (error) {
        logger.error(error);
        pIndex = 0;
    }
    try {
        pSize = parseInt(req.query.pageSize || '20');
    } catch (error) {
        logger.error(error);
        pSize = 20;
    }
    
    User.findById(req.params.userId).populate({
        path: 'orderList',
        options: {
            skip: (pIndex * pSize),
            limit: pSize
        }
    }).exec((err, orders) => {
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
}

exports.getOrder = (req, res, next) => {
    Order.findById(req.params.orderId, 'foodList', (err, order) => {
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

exports.makeOrder = (req, res, next) => {
    var order = new Order(req.body);
    order.orderedBy = req.params.userId;
    //TODO: check food stock

    order.save((err, _order) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: _order
        });
    });
}
