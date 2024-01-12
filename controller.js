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
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.UpdatePassword = async function (req, res) {
    try {
        con.query('UPDATE saab_bebankubik SET password = ? WHERE id=?',
            [req.body.password, req.body.id],
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


// pelanggan
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
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.GetPelangganById = async function (req, res) {

    con.query('SELECT * FROM saab_plg WHERE nopel=?',
        [req.body.nopel],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

        // cek jika masih ada transaksi yg belum lunas dan active menjadi M
        con.query('select COUNT(*) outstanding from saab_trx WHERE lunas = ? AND nopel = ?;',
            ['N', req.body.nopel],
            function (error, result, fields) {
                if (error) {
                    var Status = {
                        'code': '300',
                        'content': 'Update Failed',
                        'dataRow': error
                    };
                    res.status(300).json(Status)
                } else {
                    console.log(result);
                    if (parseFloat(result[0].outstanding) > 0) {
                        var Status = {
                            'code': '300',
                            'content': 'Masih ada Transaksi belum lunas',
                            'dataRow': result
                        };
                        res.status(300).json(Status)
                    } else {
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
                    }
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

exports.GetPelangganBacaMeter = async function (req, res) {

    con.query('SELECT X0.nopel, X0.nama FROM saab_plg X0 ' +
        'LEFT JOIN (SELECT T0.nopel, COALESCE(T0.meterakhir,0) meterakhir FROM saab_trx T0) X1 ON X0.nopel = X1.nopel ' +
        'WHERE X0.nopel NOT IN (SELECT nopel FROM saab_trx where periode = ? and status = ? and lunas=?);',
        [req.body.periode, 'O', 'N'],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.GetPelangganCatatMeter = async function (req, res) {

    con.query('SELECT X0.nopel, X0.nama, CASE WHEN (X1.meterakhir IS NULL OR X1.meterakhir = 0) THEN X0.meterawal ' +
        'ELSE X1.meterakhir END AS meterawa FROM saab_plg X0 ' +
        'LEFT JOIN (SELECT T0.nopel, COALESCE(T0.meterakhir,0) meterakhir FROM saab_trx T0) X1 ON X0.nopel = X1.nopel ' +
        'WHERE X0.nopel = ?;',
        [req.body.nopel],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': error
                };
                res.status(300).json(Status)
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



// transaksi
exports.GetTransaksiOutstanding = async function (req, res) {

    try {
        con.query('SELECT X0.*, X1.nama FROM saab_trx X0 ' +
            'INNER JOIN saab_plg X1 ON X0.nopel = X1.nopel WHERE X0.lunas = ? and X0.status = ?',
            ['N', 'O'],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
                    var Status = {
                        'code': '300',
                        'content': 'Error get Record',
                        'dataRow': rows
                    };
                    res.status(300).json(Status)
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
    } catch (error) {
        console.log(error)
    }

}

exports.AddTransaksi = async function (req, res) {
    try {
        con.query('INSERT INTO saab_trx(nopel, meterawal, beban, biayakubik, meterakhir ' +
            ', selisihmeter, totalpemakaian, pembayaran, periode, create_date, update_date) ' +
            'VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.nopel, req.body.meterawal, req.body.beban,
            req.body.biayakubik, req.body.meterakhir, req.body.selisihmeter,
            req.body.totalpemakaian, req.body.pembayaran, req.body.periode
                , moment(new Date()).format("yyyyMMDD"), moment(new Date()).format("yyyyMMDD")],
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

exports.GetTransaksiById = async function (req, res) {

    con.query('SELECT * FROM saab_trx WHERE id=?',
        [req.body.id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.GetTransaksiByNopel = async function (req, res) {

    con.query('SELECT * FROM saab_trx WHERE nopel=?',
        [req.body.nopel],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.GetTransaksiByPeriode = async function (req, res) {

    con.query('SELECT * FROM saab_trx WHERE periode BETWEEN ? AND ?',
        [req.body.dateFrom, req.body.dateTo],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.getTransaksiChart = async function (req, res) {

    con.query("SELECT COALESCE(SUM(selisihmeter),0) value, periode as label, '#177AD5' as frontColor FROM saab_trx WHERE status <> ? GROUP BY periode",
        ['L'],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.getTransaksiPrint = async function (req, res) {

    con.query("SELECT X0.nopel,X1.nama as name, X1.alamat AS address, X1.telp as phone, 'Tirta Wening' as company, " +
        "X0.pembayaran, X0.selisihmeter, X0.biayakubik, X0.beban, (X0.selisihmeter * X0.biayakubik) as Amount, X0.id, X0.periode  FROM saab_trx X0  " +
        "INNER JOIN saab_plg X1 ON X0.nopel = X1.nopel " +
        "WHERE X0.nopel = ? and X0.periode = ? and X0.id=?;",
        [req.body.nopel, req.body.periode, req.body.id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.UpdateTransaksi = async function (req, res) {

    con.query('UPDATE saab_trx SET beban = ?,biayakubik=?,meterakhir=?,selisihmeter=?,totalpemakaian=?,pembayaran=?, meterawal = ?, update_date=? WHERE id=?',
        [req.body.beban, req.body.biayakubik, req.body.meterakhir, req.body.selisihmeter
            , req.body.totalpemakaian, req.body.pembayaran, req.body.meterawal
            , moment(new Date()).format("yyyyMMDD"), req.body.id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
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
}

exports.PayTransaksi = async function (req, res) {

    con.query('UPDATE saab_trx SET lunas = ?,status=?, update_date=? WHERE id=?',
        ['Y', 'C'
            , moment(new Date()).format("yyyyMMDD"), req.body.id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Pembayaran Failed',
                    'dataRow': error
                };
                res.status(300).json(Status)
            } else {
                var Status = {
                    'code': '200',
                    'content': 'Pembayaran Success',
                    'dataRow': rows
                };
                res.status(200).json(Status)
            }
        });
}


// pengeluaran
exports.AddPengeluaran = async function (req, res) {
    try {
        con.query('INSERT INTO saab_expses(nama, keperluan, tanggal, jumlah, harga, total, status, create_date, update_date) ' +
            'VALUES (?,?,?,?,?,?,?,?,?)',
            [req.body.nama, req.body.keperluan, moment(new Date()).format("yyyyMMDD"),
            req.body.jumlah, req.body.harga, req.body.total, 'O', moment(new Date()).format("yyyyMMDD"), moment(new Date()).format("yyyyMMDD")],
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
            'content': 'Insert Failed',
            'dataRow': error
        };
        res.status(300).json(Status)
    }

}

exports.GetAllPengeluaran = async function (req, res) {

    con.query('SELECT * FROM saab_expses WHERE status <> ?',
        ['L'],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.GetPengeluaranById = async function (req, res) {

    con.query('SELECT * FROM saab_expses WHERE id = ?',
        [req.body.id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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

exports.EditPengeluaran = async function (req, res) {
    try {
        con.query('update saab_expses set keperluan=?, jumlah=?, status=?, update_date=? where id=?',
            [req.body.keperluan, req.body.jumlah, req.body.status, req.body.status
                , moment(new Date()).format("yyyyMMDD"), req.body.id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
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
        console.log(error)
        var Status = {
            'code': '300',
            'content': 'Update Failed',
            'dataRow': error
        };
        res.status(300).json(Status)
    }

}

exports.CancelPengeluaran = async function (req, res) {
    try {
        con.query('update saab_expses set status=?, update_date=? where id=?',
            [req.body.status, moment(new Date()).format("yyyyMMDD"), req.body.id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error)
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
        console.log(error)
        var Status = {
            'code': '300',
            'content': 'Update Failed',
            'dataRow': error
        };
        res.status(300).json(Status)
    }

}

exports.GetPengeluaranByPeriode = async function (req, res) {

    con.query('SELECT * FROM saab_expses WHERE tanggal BETWEEN ? AND ?',
        [req.body.dateFrom, req.body.dateTo],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
                var Status = {
                    'code': '300',
                    'content': 'Error get Record',
                    'dataRow': rows
                };
                res.status(300).json(Status)
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