'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ImageSchema = new Schema({
    stream: Buffer,
    mime: String
}, {
    _id: false
});

exports.BoxSchema = new Schema({
    boxId: {
        type: String,
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
            validator: v => v && v.length === 3,
            message: 'Value should be [length, width, height]'
        },
        default: [30,40,50]
    }
}, {
    _id: false
});
exports.serialize = {
    toObject: { getters: true, virtuals: true, versionKey: false },
    toJSON: { getters: true, virtuals: true, versionKey: false },
};