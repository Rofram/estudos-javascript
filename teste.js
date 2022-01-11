function testando(callback) {
  return callback(this);
}

testando.log = function (callback) {
  console.log(this(callback));
};

testando.__proto__ = Array.prototype;

testando.log(() => 'teste');

// Object.defineProperty(testando, "log", {
//   value: function () {
//     console.log(this());
//   }
// })

// testando.log(() => "teste");
// testando.meuReduce();

