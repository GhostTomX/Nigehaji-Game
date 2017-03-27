var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 1337;

var url = require('url');
var path = require('path');
var querystring = require('querystring');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://r04522839proj:Duhwg3cGLh2PeYc7MrwDWA8XAmdtlyhjC4o6hYgKPIH2phdkBG03arJuOzIiHoRfWxeEcwkFrMQ7F5UTZZpTyg==@r04522839proj.documents.azure.com:10250/NigehajiGame?ssl=true';
var file_content;

//var webPath = 'public';
MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功！")
        // mongodb 查询，插入函数
    var findDocuments = function (db, left, callback) {
        var collection = db.collection('Home');
        collection.find({
            'left': left
        }).toArray(function (err, docs) {
            callback(docs);
        });
    }


    var insertDocuments = function (db, callback) {
        var collection = db.collection('Userinfo');
        collection.insertOne({
            a: "b"
        }, function (err, docs) {
            callback();
        });
    }


    var server = http.createServer(function (req, res) {
        console.log("==================================");
        let url_path = url.parse(req.url, true);
        let pathname = url_path.pathname;
        console.log('pathname:' + pathname);
        var postData = '';
        //post 触发
        req.addListener("data", function (postDataChunk) {
            pathname = "\home.html";
            postData += postDataChunk;
            var params = querystring.parse(postData); //解析 HEADER 中的数据
            insertDocuments(db, function (docs) {
                console.log("Post : insert 结束");
            });
        })

        //get 有query
        if (typeof (url_path.query.left) === 'string') {
            findDocuments(db, 448, function (docs) {
                res.write(docs[0].content);
                res.end();
            })
        } else { // get 无query
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