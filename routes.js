module.exports = function (app) {
    var ctrl = require('./controller');

    app.route('/v1/Login').post(ctrl.Login);
    app.route('/v1/BebanKubik').get(ctrl.BebanKubik);
    app.route('/v1/UpdateBebanKubik').post(ctrl.UpdateBebanKubik);
    app.route('/v1/AddPelanggan').post(ctrl.AddPelanggan);
    app.route('/v1/GetAllPelanggan').get(ctrl.GetAllPelanggan);
    app.route('/v1/GetPelangganById').post(ctrl.GetPelangganById);
}