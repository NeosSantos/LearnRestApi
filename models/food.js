'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = require('./shared').ImageSchema;
var serialize = require('./shared').serialize;

var FoodSchema = new Schema({
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
        enum: ['Chinese', 'Western', 'Japenese', 'NewStyle']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
        validate: {
            validator: function() {
                return this.discount <= this.price;
            }
        },
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        },
        default: 0
    },
    evaluation: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    saled: {
        type: Number,
        required: true,
        min: 0
    }
}, serialize)
module.exports = mongoose.model('Food', FoodSchema);
