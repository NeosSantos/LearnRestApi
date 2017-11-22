'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serialize = require('./shared').serialize;

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
        index: '2d'
    },
    temperature: {
        type: Number,
        min: -10,
        max: 100
    },
    boxes: {
        type: [
            {
                boxId: {
                    type: number
                },
                isEmpty: {
                    type: boolean,
                },
                boxSize: [ number ]
            }
        ],
        select: false
    }
}, serialize);

module.exports = mongoose.model('Container', ContainerSchema);