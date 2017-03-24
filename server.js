var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 1337;

var url = require('url');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://r04522839-hw2:FAmQouH05kGxi77Uga7pDwEDBu9EGJmEFAhqUQdi695cSRcvweGfUNzWBvkzuSZr37vamEonjgCJl3koE7YkVA==@r04522839-hw2.documents.azure.com:10250/NigehajiGame?ssl=true';
var file_content;

//var webPath = 'public';
MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功！")
    var findDocuments = function (db, left, callback) {
        var collection = db.collection('Home');
        collection.find({
            'left': left
        }).toArray(function (err, docs) {
            console.log("Found the following records");
            callback(docs);
        });
    }
    var server = http.createServer(function (req, res) {
        let url_path = url.parse(req.url, true);
        console.log('path:' + url_path);
        let pathname = url_path.pathname;
        console.log('pathname:' + pathname);
        console.log('typeof ' + typeof (url_path.query.left));


        if (typeof (url_path.query.left) === 'string') {
            console.log(url_path.query.left);
            findDocuments(db, 448, function (docs) {
                res.write(docs[0].content);
                res.end();
            })
        } else {
            if (pathname === "/" || pathname === "/index.htm") {
                pathname = 'index.html';
            }

            var filePath = path.join(__dirname, pathname);
            console.log('filePath:' + filePath);

            fs.readFile(filePath, function (err, content) {
                if (err) {
                    console.log('Failed to read');
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    res.end();
                    return;
                }
                res.write(content);
                res.end();
            });
        }

    });
    server.listen(port);
    console.log('Server running at http://127.0.0.1:' + port);
});