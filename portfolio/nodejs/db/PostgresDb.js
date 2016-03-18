

function PostgresDb() {

    }

PostgresDb.prototype.getUser = function (varUid){

    var arr = new Array(1,2);
    arr[1]=a;

// Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return [err,'db error'];
        }

        //client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        var query = client.query("SELECT * FROM nodejs_users where id=\'"+varUid+"\' ORDER BY id ASC");

        query.on('row', function (row) {
            results.push(row);
        });

        query.on('end', function () {
            done();
            return res.json(results);
        });
    });

};

module.exports = PostgresDb;