var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://r04522839proj:Duhwg3cGLh2PeYc7MrwDWA8XAmdtlyhjC4o6hYgKPIH2phdkBG03arJuOzIiHoRfWxeEcwkFrMQ7F5UTZZpTyg==@r04522839proj.documents.azure.com:10250/NigehajiGame?ssl=true';
var DB_CONN_STR_LOCAL = 'mongodb://localhost:27017/Test';

var data = {
    "type": "晚餐",
    "cost": 300,
    "date": new Date(2017, 03, 22, 15, 17),
    "update": Date.now(),
};

MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (err) {
        console.log('Error:' + err);
        return;
    }


    // 插入資料
    db.collection('books').insertOne(data, function (err, result) {
        console.log("Azure插入資料成功");
        db.collection('books').count(function (err, count) {
            if (err) throw err;
            console.log('Azure Rows:' + count);
        });
        db.close;
    });
});


//
//MongoClient.connect(DB_CONN_STR_LOCAL, function (err, db) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    db.collection('books').insertOne(data, function (err, result) {
//        console.log("local 插入資料成功");
//        db.collection('books').count(function (err, count) {
//            if (err) throw err;
//            console.log('Local Rows:' + count);
//        });
//        db.close;
//    });
//});


//MongoClient.connect(DB_CONN_STR, function (err, db) {
//
//    if (err) throw err;
//    //Write databse Insert/Update/Query code here..
//
//    db.collection('Persons', function (err, collection) {
//        collection.insert(data);
//        collection.count(function (err, count) {
//            if (err) throw err;
//            console.log('Row-final' + count);
//        });
//    });
//    db.close(); //關閉連線
//});