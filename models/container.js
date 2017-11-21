'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serialize = require('./shared').serialize;

var ContainerSchema = new Schema({
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
    boxId: {
        type: String,
        minlength: 12,
        maxlength: 15
    }
}, serialize);

module.exports = mongoose.model('Container', ContainerSchema);