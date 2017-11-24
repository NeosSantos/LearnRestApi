'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ImageSchema = new Schema({
    stream: Buffer,
    mime: String
}, {
    _id: false
});

exports.serialize = {
    toObject: { getters: true, virtuals: true, versionKey: false },
    toJSON: { getters: true, virtuals: true, versionKey: false },
};