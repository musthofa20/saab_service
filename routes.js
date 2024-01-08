module.exports = function (app) {
    var ctrl = require('./controller');

    app.route('/v1/Login').post(ctrl.Login);
    app.route('/v1/BebanKubik').post(ctrl.BebanKubik);
}