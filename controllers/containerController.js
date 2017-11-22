'use strict';

var mongoose = require('mongoose'),
Container = mongoose.model('Container');

exports.allContainers = (req, res, next) => {
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
    Container.find().skip(pIndex * pSize).limit(pSize)
    .exec((err, containers) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: containers,
            pageIndex: pIndex,
            pageSize: pSize,
            totalCount: containers.length
        });
    });
};

exports.newContainer = (req, res, next) => {
    var container = new Container(req.body);

    container.save((err, container) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: container
        });
    });
};

exports.getContainer = (req, res, next) => {
    Container.findById(req.params.containerId, (err, container) => {
        if(err) return next(err);
        if(!container) {
            res.status(404).json({
                status: 1,
                msg: res.__('Container not found')
            });
            return;
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: container
        });
    });
};

exports.getBoxes = (req, res, next) => {
    Container.findById(req.params.containerId, '+boxes', (err, container) => {
        if(err) return next(err);
        if(!container) {
            res.status(404).json({
                status: 1,
                msg: res.__('Container not found')
            });
            return;
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: container
        });
    });
};

exports.updateContainer = (req, res, next) => {
    Container.findById({_id: req.params.containerId}, (err, container) => {
        if(err) return next(err);
        if(!container) {
            res.status(400).json({
                status: 1,
                msg: res.__('Container not found')
            });
            return;
        }
        for(var key in req.body) {
            if(req.body.hasOwnproperty(key)){
                container[key] = req.body[key];
            }
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: container
        });
    });
};

exports.deleteContainer = (req, res, next) => {
    Container.remove({_id: req.params.containerId}, (err, container) => {
        if(err) return next(err);
        res.json({ 
            status: 0,
            msg: res.__('Container successfully deleted.')
        });
    });
};
