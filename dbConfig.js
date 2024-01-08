var mysql = require('mysql');
var db_config = {
  host: "103.191.63.174",
  port: 3306,
  user: "root",
  password: "b1sm1llah",
  database: "larissaintercom_saab"
};

// var mysql = require('mysql');
// var db_config = {
//   host: "110.239.67.154",
//   port: 7906,
//   user: "dev03",
//   password: "B0s**2023#",
//   database: "interfacing_zea_test"
// };

var con;

function handleDisconnect() {
  con = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 0); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = con;