'use strict';
var multer = require('multer');

module.exports = function(app) {
    var containerCtrl = require('../controllers/containerController');
    app.route('/containers')
        .get(containerCtrl.allContainers)
        .post(containerCtrl.newContainer);

    app.route('/containers/:containerId')
        .get(containerCtrl.getContainer)
        .put(containerCtrl.updateContainer)
        .delete(containerCtrl.deleteContainer);
};
