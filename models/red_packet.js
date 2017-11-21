'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RedPacketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    issuedDate: Date,
    usedDate: Date,
    expiredDate: Date,
    packetType: String,
    amount: Number,
    condition: Number,
});

module.exports = mongoose.model('RedPacket', RedPacketSchema);
