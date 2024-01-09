var nodeFetch = require('node-fetch')
var fetch = require('fetch-cookie')(nodeFetch);
const https = require('https');
var moment = require('moment');
var con = require('./dbConfig');

exports.Login = async function (req, res) {
    console.log(req.body)
    con.query('SELECT * FROM saab_login WHERE username = ? and password = ?',
        [req.body.username, req.body.password],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                if (rows.length > 0) {
                    var Status = {
                        'code': '200',
                        'content': 'Records Exist',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                } else {
                    var Status = {
                        'code': '300',
                        'content': 'Records Empty'
                    };
                    res.status(300).json(Status)
                }
            }
        });
}

exports.BebanKubik = async function (req, res) {
    console.log(req.body)
    con.query('SELECT id,bebanAdmin,biayaMeter FROM saab_bebankubik',
        [],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                if (rows.length > 0) {
                    var Status = {
                        'code': '200',
                        'content': 'Records Exist',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                } else {
                    var Status = {
                        'code': '300',
                        'content': 'Records Empty'
                    };
                    res.status(300).json(Status)
                }
            }
        });
}

exports.UpdateBebanKubik = async function (req, res) {
    console.log(req.body)
    try {
        con.query('UPDATE saab_bebankubik SET bebanAdmin = ?,biayaMeter=? WHERE id=?',
            [req.body.bebanAdmin, req.body.biayaMeter, req.body.id],
            function (error, rows, fields) {
                if (error) {
                    var Status = {
                        'code': '300',
                        'content': 'Update Failed',
                        'dataRow': error
                    };
                    res.status(300).json(Status)
                } else {
                    var Status = {
                        'code': '200',
                        'content': 'Update Success',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                }
            });
    } catch (error) {
        var Status = {
            'code': '300',
            'content': 'Update Failed',
            'dataRow': error
        };
        res.status(300).json(Status)
    }

}

exports.AddPelanggan = async function (req, res) {
    try {
        con.query('INSERT INTO saab_plg(nopel, nama, telp, meterawal, alamat, create_date, update_date) ' +
            'VALUES (?,?,?,?,?,?,?)',
            [req.body.nopel, req.body.nama, req.body.telp,
            req.body.meterawal, req.body.alamat, moment(new Date()).format("yyyyMMDD")
                , moment(new Date()).format("yyyyMMDD")],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    var Status = {
                        'code': '300',
                        'content': 'Insert Failed',
                        'dataRow': error
                    };
                    res.status(300).json(Status)
                } else {
                    var Status = {
                        'code': '200',
                        'content': 'Insert Success',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                }
            });
    } catch (error) {
        console.log(error)
        var Status = {
            'code': '300',
            'content': 'Update Failed',
            'dataRow': error
        };
        res.status(300).json(Status)
    }

}

exports.GetAllPelanggan = async function (req, res) {

    con.query('SELECT * FROM saab_plg',
        [],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                if (rows.length > 0) {
                    var Status = {
                        'code': '200',
                        'content': 'Records Exist adalah sesuatu',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                } else {
                    var Status = {
                        'code': '300',
                        'content': 'Records Empty'
                    };
                    res.status(300).json(Status)
                }
            }
        });
}

exports.GetPelangganById = async function (req, res) {

    con.query('SELECT * FROM saab_plg WHERE nopel=?',
        [req.body.nopel],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                if (rows.length > 0) {
                    var Status = {
                        'code': '200',
                        'content': 'Records Exist',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                } else {
                    var Status = {
                        'code': '300',
                        'content': 'Records Empty'
                    };
                    res.status(300).json(Status)
                }
            }
        });
}

exports.UpdatePelangganById = async function (req, res) {
    try {
        con.query('UPDATE saab_plg SET nama=?, telp=?,alamat=?, active=?, update_date=? WHERE nopel=?',
            [req.body.nama, req.body.telp, req.body.alamat, req.body.active
                , moment(new Date()).format("yyyyMMDD"), req.body.nopel],
            function (error, rows, fields) {
                if (error) {
                    var Status = {
                        'code': '300',
                        'content': 'Update Failed',
                        'dataRow': error
                    };
                    res.status(300).json(Status)
                } else {
                    var Status = {
                        'code': '200',
                        'content': 'Update Success',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                }
            });
    } catch (error) {
        var Status = {
            'code': '300',
            'content': 'Update Failed',
            'dataRow': error
        };
        res.status(300).json(Status)
    }

}


exports.GetTransaksiOutstanding = async function (req, res) {

    con.query('SELECT * FROM saab_trx WHERE lunas=? and status=?',
        ['N','O'],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                if (rows.length > 0) {
                    var Status = {
                        'code': '200',
                        'content': 'Records Exist',
                        'dataRow': rows
                    };
                    res.status(200).json(Status)
                } else {
                    var Status = {
                        'code': '300',
                        'content': 'Records Empty'
                    };
                    res.status(300).json(Status)
                }
            }
        });
}