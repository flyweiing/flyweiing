var http = require('http')

var options = {
    host:'localhost', //check this
    port: 8081,  //check this
    method: 'POST',
    //path:'/command/y10-417-60202', //check this
    path:'/command/y10-b15-01036',
    headers:{'Content-Type':"application/json; charset=UTF-8"}
}

var req = http.request(options, function(res) {
   // console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

var request = {
  // 清除当前播放内容
	"type": "clear"
  
   
  //加载远程html 
  // "type": 'loadUrl',
  // url: 'http://192.168.0.101:8080/static/display/test.html',
  // persistent: true

  //获取截图
  // "type": "callCardService",
  // "fn": "screenshot",
  // "arg1": 100, //quality
  // "arg2": 100 //scale

    
}

// write data to request body
req.write(JSON.stringify(request));
req.end();