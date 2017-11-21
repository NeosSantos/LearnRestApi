'use strict';

var path = require('path');
var mongoose = require('mongoose'),
    User = mongoose.model('User'),    
    Order = mongoose.model('Order');

exports.allUsers = (req, res, next) => {
    var pIndex, pSize;
    try {
        pIndex = parseInt(pIndex || '0');
    } catch (error) {
        console.error(error);
        pIndex = 0;
    }
    try {
        pSize = parseInt(pSize || '20');
    } catch (error) {
        console.error(error);
        pSize = 20;
    }
    
    User.find().skip(pIndex * pSize).limit(pSize)
    .exec((err, users) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: 'Succeed',
            data: users,
            pageIndex: pIndex,
            pageSize: pSize,
            totalCount: users.length
        });
    });
};

exports.register = (req, res, next) => {
    var user = new User(req.body);
    user.avatar = { stream: req.file.buffer, mime: req.file.mimetype };
    user.save((err, usr) => {
        if(err) return next(err);
        var u = usr.toObject();
        delete u.avatar;
        res.json({
            status: 0,
            msg: 'Succeed',
            data: u
        });
    });
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.userId, (err, usr) => {
        if(err) return next(err);
        if(!usr) {
            res.status(404).json({
                status: 1,
                msg: 'User not found'
            });
            return;
        }
        res.json({
            status: 0,
            msg: '',
            data: usr
        });
    });
};

exports.updateUser = (req, res, next) => {
    User.findById(req.params.userId, (err, usr) => {
        if(err) return next(err);
        if(!usr) {
            res.status(400).json({
                status: 1,
                msg: 'User not found'
            });
            return;
        }
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
            msg: 'User successfully deleted.' 
        });
    });
};

exports.getAvatar = (req, res, next) => {
    User.findById(req.params.userId, '+avatar', (err, usr) => {
        if(err) return next(err);
        if(!usr){
            res.status(404).json({
                status: 1,
                msg: 'User not found'
            });
            return;
        }
        if(!usr.avatar) {
            res.contentType('image/png');
            res.sendFile(path.resolve(__dirname + '/../asserts/user.png'));
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
                msg: 'User not found'
            });
            return;
        }
        if(!req.file) {
            res.status(400).json({
                status: 1,
                msg: 'No avatar found in request'
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
        console.error(error);
        pIndex = 0;
    }
    try {
        pSize = parseInt(req.query.pageSize || '20');
    } catch (error) {
        console.error(error);
        pSize = 20;
    }
    
    Order.find({'orderBy._id': req.params.userId}).skip(pIndex * pSize).limit(pSize).populate('foodList')
    .exec((err, orders) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: 'Succeed',
            data: orders,
            pageIndex: pIndex,
            pageSize: pSize,
            totalCount: orders.length
        });
    });
}
