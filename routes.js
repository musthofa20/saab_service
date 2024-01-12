module.exports = function (app) {
    var ctrl = require('./controller');

    // config
    app.route('/v1/Login').post(ctrl.Login);
    app.route('/v1/BebanKubik').get(ctrl.BebanKubik);
    app.route('/v1/UpdateBebanKubik').post(ctrl.UpdateBebanKubik);
    app.route('/v1/UpdatePassword').post(ctrl.UpdatePassword);

    // pelanggan
    app.route('/v1/AddPelanggan').post(ctrl.AddPelanggan);
    app.route('/v1/GetAllPelanggan').get(ctrl.GetAllPelanggan);
    app.route('/v1/GetPelangganById').post(ctrl.GetPelangganById);
    app.route('/v1/UpdatePelangganById').post(ctrl.UpdatePelangganById);
    app.route('/v1/GetPelangganBacaMeter').post(ctrl.GetPelangganBacaMeter);
    app.route('/v1/GetPelangganCatatMeter').post(ctrl.GetPelangganCatatMeter);

    // transaksi
    app.route('/v1/GetTransaksiOutstanding').get(ctrl.GetTransaksiOutstanding);
    app.route('/v1/AddTransaksi').post(ctrl.AddTransaksi);
    app.route('/v1/GetTransaksiById').post(ctrl.GetTransaksiById);
    app.route('/v1/GetTransaksiByNopel').post(ctrl.GetTransaksiByNopel);
    app.route('/v1/GetTransaksiByPeriode').post(ctrl.GetTransaksiByPeriode);
    app.route('/v1/getTransaksiChart').get(ctrl.getTransaksiChart);
    app.route('/v1/getTransaksiPrint').post(ctrl.getTransaksiPrint);
    app.route('/v1/UpdateTransaksi').post(ctrl.UpdateTransaksi);
    app.route('/v1/PayTransaksi').post(ctrl.PayTransaksi);

    // LAPORAN
    app.route('/v1/AddPengeluaran').post(ctrl.AddPengeluaran);
    app.route('/v1/EditPengeluaran').post(ctrl.EditPengeluaran);
    app.route('/v1/CancelPengeluaran').post(ctrl.CancelPengeluaran);
    app.route('/v1/GetPengeluaranByPeriode').post(ctrl.GetPengeluaranByPeriode);
    
}