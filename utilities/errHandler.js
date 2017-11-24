'use strict';

const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;
const ValidatorError  = mongoose.Error.ValidatorError;

function formatError(template, values) {
    Object.keys(values).forEach(key => {
        if(typeof values[key] === 'string')
            template = template.replace(new RegExp(`\{${key.toUpperCase()}\}`, 'gm'), values[key]);
    });
    return template;
}

exports.dbErrHandler = function(err, req, res, next){
    if(err instanceof ValidationError || err instanceof ValidatorError){
        let msg = `${res.__(err._message)}: `;
        msg += Object.keys(err.errors).map(key=> {
            var e = err.errors[key];
            var d = {PATH: e.path, VALUE: e.value};
            d[e.kind.toUpperCase()] = e[e.kind];
            return `${key}: ${formatError(res.__(e.properties.message), d)}`;
        }).join(' ');
        err.message = msg;
    }
    next(err);
};