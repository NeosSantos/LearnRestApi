'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = require('./shared').ImageSchema;
var serialize = require('./shared').serialize;

var options = Object.assign({
    timestamps: {
        updatedAt : 'lastUpdated'
    }
}, serialize);

var FoodBase = {
    name: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2
    },
    image: {
        type: ImageSchema,
        select: false
    },
    introduction: {
        type: String,
        maxlength: 40,
        minlength: 2
    },
    catagory: {
        type: String,
        required: true,
        enum: ['Chinese', 'Western', 'Japanese', 'NewStyle']
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price ({VALUE}) should be greater than 0."],
        set: v => Math.round(v * 100) / 100,
        get: v => Math.round(v * 100) / 100
    },
    discount: {
        type: Number,
        min: [0, "Discount ({VALUE}) should be greater than 0."],
        validate: {
            validator: function() {
                return this.discount <= this.price;
            },
            message: 'Discount ({VALUE}) should be less than price'
        },
        default: 0,
        set: v => Math.round(v * 100) / 100,
        get: v => Math.round(v * 100) / 100
    },
    rate: {
        type: Number,
        min: [1, "Rate ({VALUE}) should be greater than 1."],
        max: [5, "Rate ({VALUE}) should be less than 5."],
        default: 1,
        required: true,
        set: v => Math.round(v),
        get: v => Math.round(v)
    }
};

var FoodSchema = new Schema(Object.assign({
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock ({VALUE}) should be greater than 0."],
        default: 0,
        set: v => Math.round(v),
        get: v => Math.round(v)
    },
    sales: {
        type: Number,
        min: [0, "Sales ({VALUE}) should be greater than 0."],
        default: 0,
        set: v => Math.round(v),
        get: v => Math.round(v)
    }
}, FoodBase), options)
module.exports.Food = mongoose.model('Food', FoodSchema);
module.exports.FoodBase = FoodBase;
