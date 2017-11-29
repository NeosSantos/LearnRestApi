'use strict';
const multer = require('multer');

module.exports = function(app) {
    const containerCtrl = require('../controllers/containerController');
    app.route('/admin/containers')
        .post(containerCtrl.newContainer);
    app.route('/admin/containers/:containerId')
        .put(containerCtrl.updateContainer)
        .delete(containerCtrl.deleteContainer);

    app.route('/containers')
        .get(containerCtrl.allContainers);

    app.route('/containers/:containerId')
        .get(containerCtrl.getContainer)
        .put(containerCtrl.updateContainer)
        .delete(containerCtrl.deleteContainer);
};
