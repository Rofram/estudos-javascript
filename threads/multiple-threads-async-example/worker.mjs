// import { setTimeout as delay } from 'node:timers/promises';
import { parentPort, workerData } from "node:worker_threads";

function fibonacci(n) {
  if (n <= 1) return n;
  let prev = BigInt(0);
  let result = BigInt(1);

  for (let i = 2; i <= n; i++) {
    [prev, result] = [result, result + prev];
  }
  return result;
}

function fibonacciRec(n) {
  if (n <= 1) return BigInt(n);
  return fibonacciRec(n - 1) + fibonacciRec(n - 2);
}


const { payload } = workerData;
const result = fibonacci(payload);
// await delay(1000);
parentPort.postMessage(result);
