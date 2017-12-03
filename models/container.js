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
        max: 100,
        default: 10
    },
    boxes: {
        type: [BoxSchema],
        select: false
    },
    isFull: Boolean
}, serialize);

ContainerSchema.plugin(uniqueValidator, {message: '`{VALUE}` is taken!'});
module.exports = mongoose.model('Container', ContainerSchema);