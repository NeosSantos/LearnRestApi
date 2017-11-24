'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = require('./shared').ImageSchema;
var serialize = require('./shared').serialize;

var UserSchema = new Schema({
    name: {
        type: String,
        minlength: [2, 'Username should be at least 2 charaters.'],
        maxlength: [30, 'Username should be at most 30 charaters.'],
        required: [true, 'Username cannot be blank.'],
        unique: [true, 'Username is taken'],
    },
    phone: {
        type: String,
        unique: [true, 'Phone number is used by others.'],
        set: v => v.replace(/[- ]/,''),
        validate: {
            validator: function(v) {
                return /^1\d\d[ \-]?\d{4}[ \-]?\d{4}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'Phone number cannot be empty!']
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
