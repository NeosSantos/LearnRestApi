exports.logger = require('./logger');
exports.dbErrHandler = require('./errHandler');

exports.parsePagination = function(req) {
    var pIndex, pSize;
    try {
        pIndex = parseInt(req.query.pageIndex || '0');
    } catch (error) {
        exports.logger.error(error);
        pIndex = 0;
    }
    try {
        pSize = parseInt(req.query.pageSize || '20');
    } catch (error) {
        exports.logger.error(error);
        pSize = 20;
    }
    return {pageIndex: pIndex, pageSize: pSize};
};