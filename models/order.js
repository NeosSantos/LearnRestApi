'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var serialize = require('./shared').serialize;

var OrderSchema = new Schema({
    orderedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        select: false
    },
    orderTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    promisedTime: {
        type: Date,
        required: true
    },
    shippedTime: Date,
    pickTime: Date,
    container: { type: Schema.Types.ObjectId, ref: 'Container' },
    boxId: Number, /* see container box id */
    foodList: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    totalPrice: {
        type: Number,
        min: 0
    },
    totalDiscount: {
        type: Number,
        min: 0
    },
    serviceCharge: {
        type: Number,
        min: 0
    },
    realPrice: {
        type: Number,
        min: 0,
    },
    state: {
        type: String,
        enum: ['Delivering', 'Delivered']
    }
}, serialize);

module.exports = mongoose.model('Order', OrderSchema);
