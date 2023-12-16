/**
 * implementação do async await por baixo dos panos usando generators
 * @param {GeneratorFunction} generator 
 */
function async(generator) {
  const iterator = generator();

  /**
   * lidando com o retorno do generator
   * caso seja uma promise é resolvida e repassado o resultado para o generator
   * @param {Generator} iteratorResult 
   */
  function handle(iteratorResult) {
    if (iteratorResult.done) return;
    if (iteratorResult.value instanceof Promise) {
      iteratorResult.value.then(res => handle(iterator.next(res)));
    } else {
      handle(iterator.next(iteratorResult.value));
    }
  }

  try {
    handle(iterator.next());
  } catch (error) {
    iterator.throw(error);
  }
}

async(function* () {
  const response = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
  const json = yield response.json();

  console.log(json);
})
