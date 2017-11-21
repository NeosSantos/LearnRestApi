'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.ImageSchema = new Schema({
    stream: Buffer,
    mime: String
}, {id: false});

exports.serialize = {
    toObject: { getters: true, virtuals: false, versionKey: false },
    toJSON: { getters: true, virtuals: false, versionKey: false },
};