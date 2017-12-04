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
    boxSize: {
        type: [ Number ],
        required: true,
        validate: {
            validator: v => v && v.length === 3,
            message: 'Value should be [length, width, height]'
        },
        default: [30,40,50]
    },
    booked: { //at which time does the box ordered.
        type: [Boolean],
        required: true,
        validate: {
            validator: v => v && v.length === 2,
            message: 'Value should be [tomorrow, 2dayslater]'
        },
        default: [false, false]
    }
}, {
    _id: false
});
exports.serialize = {
    toObject: { getters: true, virtuals: true, versionKey: false },
    toJSON: { getters: true, virtuals: true, versionKey: false },
};