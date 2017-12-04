'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BoxSchema = require('./shared').BoxSchema;

var serialize = require('./shared').serialize;
var uniqueValidator = require('mongoose-unique-validator');

var ContainerSchema = new Schema({
    eid: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    coordinate: {
        type: [Number],
        index: '2dsphere'
    },
    temperature: {
        type: Number,
        min: -10,
        max: 30,
        default: 10
    },
    remark: String,
    boxes: {
        type: [BoxSchema],
        select: false
    }
}, serialize);

ContainerSchema.virtual('isFull').get(function () {
    let full = [true, true];
    if(!this.boxes) return undefined;
    this.boxes.forEach((box) => {
        full[0] = full[0] && box.booked[0];
        full[1] = full[1] && box.booked[1];
    });
    return full;
});

ContainerSchema.plugin(uniqueValidator, {message: '`{VALUE}` is taken!'});
module.exports = mongoose.model('Container', ContainerSchema);