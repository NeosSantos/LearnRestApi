'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serialize = require('./shared').serialize;

var BoxSchema = new Schema({
    boxId: {
        type: Number,
        requried: true
    },
    isEmpty: {
        type: Boolean,
        default: false
    },
    boxSize: {
        type: [ Number ],
        required: true,
        validate: {
            validator: v=> v && v.length === 3,
            message: 'Value should be [length, width, height]'
        },
        default: [30,40,50]
    }
}, {_id: false});

var ContainerSchema = new Schema({
    eid: {
        type: Number,
        required: true
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
        default: 20
    },
    boxes: {
        type: [BoxSchema],
        select: false
    }
}, serialize);

module.exports = mongoose.model('Container', ContainerSchema);