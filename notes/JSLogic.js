  //被执行一次的函数
  function add(a, b){
      console.log(a + b);
  }

  //立即执行函数加闭包的形式实现，真实的once函数为return返回的函数
  var once = (function(){
      var meme = {};
      return function(fn){
                 var args = [];
               if(meme[fn.name] === undefined) {
                    meme[fn.name] = fn;

                    //分割参数
                    args =     Array.prototype.slice.call(once.arguments, 1, once.arguments.length); 

                   return fn.apply(null ,args); //默认使用window调用
                } else {
                   return;
               } 
         };
  })()

  once(add, 1, 2);
  once(add, 1, 2);
  once(add, 1, 2);

//once函数简单实现
function test () {console.log('test')}

var once = function (fn) {
  var isFirst = true;
  return function () {
    if (isFirst) {
      isFirst = !isFirst;
      fn();
    }
  };
};

var b = once(test);
b(); // 'test'
b(); // nothing
//--------------------------------------------------------------------------------------------------------------------------------



//JS里判断一个对象oStringObject是否为String
var oStringObject = new String('hello world');
console.log(oStringObject instanceof String) //true
//--------------------------------------------------------------------------------------------------------------------------------



var a = [{'p1': 88}, {'p2': 89}, {'p3': 99}, {'p4': 78}, {'p5': 87}, {'p6': 85}, {'p7': 87}, {'p8': 95}, {'p9': 90}, {'p10': 80}],
    b = [];
a.forEach(function (value, index) {
  var i = 'p' + (index + 1);
  b.push(value[i]);
})
b.sort().pop(); //去掉最高分
b.shift(); //去掉最低分

var avg = '',
    sum = 0;
b.forEach(function (value) {
  sum += value;
})
avg = sum/b.length;
console.log(avg);
//--------------------------------------------------------------------------------------------------------------------------------


var arr1 = [typeof 3, typeof undefined, typeof null, typeof [], typeof new String('123'),  new String('123') instanceof String , typeof typeof 1]
console.log(arr1) //["number", "undefined", "object", "object", "object", true, "string"]
//--------------------------------------------------------------------------------------------------------------------------------


(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();

// 输出的结果是：
// 1
// undefined
// 2
//--------------------------------------------------------------------------------------------------------------------------------


setTimeout(function(){console.log(1)},0);
new Promise(function(resolve,reject){
   console.log(2);
   resolve();
}).then(function(){console.log(3)
}).then(function(){console.log(4)});

process.nextTick(function(){console.log(5)});

console.log(6);
//输出2,6,5,3,4,1
//--------------------------------------------------------------------------------------------------------------------------------


//深度克隆
function deepClone(obj){
    var result,oClass=isClass(obj);
        //确定result的类型
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(key in obj){
        var copy=obj[key];
        if(isClass(copy)=="Object"){
            result[key]=arguments.callee(copy);//递归调用
        }else if(isClass(copy)=="Array"){
            result[key]=arguments.callee(copy);
        }else{
            result[key]=obj[key];
        }
    }
    return result;
}
//返回传递给他的任意对象的类
function isClass(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
var oPerson={
    oName:"rookiebob",
    oAge:"18",
    oAddress:{
        province:"beijing"
    },    
    ofavorite:[
        "swimming",
        {reading:"history book"}
    ],
    skill:function(){
        console.log("bob is coding");
    }
};
//深度克隆一个对象
var oNew=deepClone(oPerson);
 
oNew.ofavorite[1].reading="picture";
console.log(oNew.ofavorite[1].reading);//picture
console.log(oPerson.ofavorite[1].reading);//history book
 
oNew.oAddress.province="shanghai";
console.log(oPerson.oAddress.province);//beijing
console.log(oNew.oAddress.province);//shanghai