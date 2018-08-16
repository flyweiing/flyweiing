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

//JS里判断一个对象oStringObject是否为String
var oStringObject = new String('hello world');
console.log(oStringObject instanceof String) //true