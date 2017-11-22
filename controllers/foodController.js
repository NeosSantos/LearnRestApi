'use strict';

var mongoose = require('mongoose'),
    Food = mongoose.model('Food');

const logger = require('../utilities/logger');

exports.allFoods = (req, res, next) => {
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
    Food.find().skip(pIndex * pSize).limit(pSize)
    .exec((err, foods) => {
        if(err) return next(err);
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: foods,
            pageIndex: pIndex,
            pageSize: pSize,
            totalCount: foods.length
        });
    });
};

exports.newFood = (req, res, next) => {
    var food = new Food(req.body);

    if(!req.file) {
        res.status(400).json({
            status: 1,
            msg: res.__('Need image for the food')
        });
        return;
    }
    food.image = { stream: req.file.buffer, mime: req.file.mimetype };
    food.save((err, _food) => {
        if(err) return next(err);
        var f = food.toObject();
        delete f.image;
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: f
        });
    });
};

exports.getFood = (req, res, next) => {
    Food.findById(req.params.foodId, (err, food) => {
        if(err) return next(err);
        if(!food) {
            res.status(404).json({
                status: 1,
                msg: res.__('Food not found')
            });
            return;
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: food
        });
    });
};

exports.updateFood = (req, res, next) => {
    Food.findById({_id: req.params.foodId}, (err, food) => {
        if(err) return next(err);
        if(!food) {
            res.status(400).json({
                status: 1,
                msg: res.__('Food not found')
            });
            return;
        }
        if(req.file){
            food.image = { stream: req.file.buffer, mime: req.file.mimetype };
        }
        for(var key in req.body) {
            if(req.body.hasOwnproperty()){
                food[key] = req.body[key];
            }
        }
        res.json({
            status: 0,
            msg: res.__('Succeed'),
            data: food
        });
    });
};

exports.deleteFood = (req, res, next) => {
    Food.remove({_id: req.params.foodId}, (err, food) => {
        if(err) return next(err);
        res.json({ 
            status: 0,
            msg: res.__('Food successfully deleted.')
        });
    });
};
