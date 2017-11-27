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
    container: { type: Schema.Types.ObjectId, ref: 'Container', select: false },
    boxId:  String,
    foodList: {
        type: [{
            food: { type: Schema.Types.ObjectId, ref: 'Food' }, //TODO: should clone the food objects as the price may be changed
            count: {
                type: Number,
                required: true,
                min: 0,
                set: v => Math.round(v),
                get: v => Math.round(v),
                default: 1
            }
        }],
        select: false
    },
    totalPrice: {
        type: Number,
        min: 0,
        set: v => Math.round(v * 100) / 100,
        get: v => Math.round(v * 100) / 100,
        default: 0
    },
    totalDiscount: {
        type: Number,
        min: 0,
        set: v => Math.round(v * 100) / 100,
        get: v => Math.round(v * 100) / 100,
        default: 0
    },
    serviceCharge: {
        type: Number,
        min: 0,
        set: v => Math.round(v * 100) / 100,
        get: v => Math.round(v * 100) / 100,
        default: 0
    },
    realPrice: {
        type: Number,
        min: 0,
        set: v => Math.round(v * 100) / 100,
        get: v => Math.round(v * 100) / 100,
        default: 0
    },
    state: {
        type: String,
        enum: ['Shopping', 'Delivering', 'Delivered']
    }
}, serialize);

OrderSchema.virtual('containerAddress').get(function(){
    return this.container && this.container.address;
});
module.exports = mongoose.model('Order', OrderSchema);
