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
                if(rows.length > 0){
                    var Status = {
                        'code': '200',
                        'content' : 'Records Exist',
                        'dataRow' : rows
                      };
                      res.status(200).json(Status)
                }else{
                    var Status = {
                        'code': '300',
                        'content' : 'Records Empty'
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
                if(rows.length > 0){
                    var Status = {
                        'code': '200',
                        'content' : 'Records Exist',
                        'dataRow' : rows
                      };
                      res.status(200).json(Status)
                }else{
                    var Status = {
                        'code': '300',
                        'content' : 'Records Empty'
                      };
                      res.status(300).json(Status)
                }
            }
        });
}