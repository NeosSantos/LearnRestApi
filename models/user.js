'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = require('./shared').ImageSchema;
var serialize = require('./shared').serialize;

var UserSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        minlength: 11,
        maxlength: 14,
        unique: true,
        set: v => v.replace(/[- ]/,''),
        validate: {
            validator: function(v) {
                return /^1\d\d[ \-]?\d{4}[ \-]?\d{4}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number is required!']
    },
    regDate: {
        type: Date,
        default: Date.now
    },
    lastSignInDate: {
        type: Date,
    },
    avatar: {
        type: ImageSchema,
        select: false
    },
    orderList: { 
        type: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
        select: false
    }
}, serialize);

module.exports = mongoose.model('User', UserSchema);
