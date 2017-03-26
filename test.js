var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://r04522839-hw2:FAmQouH05kGxi77Uga7pDwEDBu9EGJmEFAhqUQdi695cSRcvweGfUNzWBvkzuSZr37vamEonjgCJl3koE7YkVA==@r04522839-hw2.documents.azure.com:10250/NigehajiGame?ssl=true';


var insertData = function(db, callback) {  
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = {dsex:"dsadsada",ddds:"ssssm"};
    var callbf = function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    }
    collection.insertOne(data, callbf);
}
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});