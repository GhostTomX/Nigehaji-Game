var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 1337;

var url = require('url');
var path = require('path');
var querystring = require('querystring');

var MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://r04522839proj:Duhwg3cGLh2PeYc7MrwDWA8XAmdtlyhjC4o6hYgKPIH2phdkBG03arJuOzIiHoRfWxeEcwkFrMQ7F5UTZZpTyg==@r04522839proj.documents.azure.com:10250/NigehajiGame?ssl=true';
var file_content;
var USERNAME;
var PASSWORD;
var S_VALUE = 0;

//var webPath = 'public';
MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功！")
    // mongodb 查询，插入函数
    var findDocument = function (db, collectionName, query1, value1, callback) {
        var query = {};
        query[query1] = value1;
        var collection = db.collection(collectionName);
        collection.find(query).toArray(function (err, docs) {
            callback(docs);
        });
    };

    var updateDocument = function (db, collectionName, query1, value1, query2, value2, callback) {
        var query = {};
        query[query1] = value1;
        var set2 = {};
        set2[query2] = value2;
        var set = {
            $set: set2
        };
        var collection = db.collection(collectionName);
        collection.updateOne(query, set,
            function (err, docs) {
                callback(docs);
            });
    };
    var insertDocuments = function (db, collectionName, keyInfo1, valueInfo1, keyInfo2, valueInfo2, keyInfo3, valueInfo3, callback) {
        if (arguments[4] === null) {
            var query = {};
            query[keyInfo1] = valueInfo1;
        } else if (arguments[6] === null) {

            var query = {};
            query[keyInfo1] = valueInfo1;
            query[keyInfo2] = valueInfo2;
        } else {
            //    arguments[7] === 0
            var query = {};
            query[keyInfo1] = valueInfo1;
            query[keyInfo2] = valueInfo2;
            query[keyInfo3] = valueInfo3;
        }
        var collection = db.collection(collectionName);
        //        var query = {};
        //        query[keyInfo] = valueInfo;
        collection.insertOne(query, function (err, docs) {
            callback(docs);
        });
    };


    var server = http.createServer(function (req, res) {
        console.log("==================================");
        let url_path = url.parse(req.url, true);
        let pathname = url_path.pathname;
        //        console.log('pathname:' + pathname);
        var postData = '';
        //post 触发
        req.addListener("data", function (postDataChunk) {
            pathname = "\home.html";
            postData += postDataChunk;
            var params = querystring.parse(postData); //解析 HEADER 中的数据
            //            console.log(params);
            USERNAME = params.user;
            PASSWORD = params.pw;
            console.log(USERNAME);
            console.log(PASSWORD);
            findDocument(db, 'UserInfo', 'Username', params.user, function (docs) {
                console.log(docs.length);
                console.log("验证用户名是否存在");
                console.log("S_VALUE" + S_VALUE);
                if (docs.length === 0) {
                    insertDocuments(db, 'UserInfo', 'Username', USERNAME, 'Passward', PASSWORD, 'SpecialValue', S_VALUE, function (docs) {
                        console.log("用户名之前不存在，已新建账号");
                    });
                } else {
                    console.log(docs);
                    S_VALUE = docs[0].SpecialValue;
                    console.log("S_VALUE" + S_VALUE);
                    console.log("用户名已存在，载入之前进度");
                }
            });
        })
        //=========cookie operation=======//
        //get 有query
        if (typeof (url_path.query.left) === 'string') {
            findDocument(db, 'Home', 'left', 448, function (docs) {
                res.write(docs[0].content);
                res.end();
            })
        } else if (typeof (url_path.query.s_value) === 'string') {
            console.log(url_path.query.s_value);
            console.log(url_path.query.username);
            updateDocument(db, 'UserInfo', 'Username', url_path.query.username, 'SpecialValue', Number(url_path.query.s_value), function () {
                res.write("保存成功！");
                res.end();

            });
        } else { // get 无query
            if (pathname === "/" || pathname === "/index.htm") {
                pathname = 'index.html';
            }

            var filePath = path.join(__dirname, pathname);
            console.log('pathname:' + pathname);
            console.log('filePath:' + filePath);
            if (pathname === "/home.html") {
                res.writeHead(200, {
                    'Set-Cookie': ['Username =' + USERNAME, 'SpecialValue=' + S_VALUE]
                });
            }
            else{
                 res.writeHead(200, {
            });
            }

//            res.writeHead(200, {
//                'Set-Cookie': ['Username =' + USERNAME, 'SpecialValue=' + S_VALUE]
//            });
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
