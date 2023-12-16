const PI = 3.14;

/**
 * não pura pois depende de variável externa;
 * @param {number} raio 
 * @returns {number}
 */
function areaCirculoImpura(raio) {
  return raio * raio * PI;
}

console.log(areaCirculoImpura(10));

/**
 * pura pois não depende de variável externa;
 * @param {number} raio 
 * @param {number} pi 
 * @returns {number}
 */
function areaCirculoPura(raio, pi) {
  return raio * raio * pi;
}

console.log(areaCirculoPura(10, 3.14));

/**
 * não pura pois seu retorno não é determinado apenas por seus argumentos;
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomNumber(min, max) {
  const factor = max - min + 1;
  return ~~(Math.random() * factor) + min;
}