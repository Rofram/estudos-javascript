import os from 'node:os';
import { Worker } from "node:worker_threads";

function* workers() {
  for (let i = 1; i <= os.availableParallelism(); i++) {
    const { resolve, reject, promise } = Promise.withResolvers();
    const thread = new Worker(`${import.meta.dirname}/worker.mjs`, { workerData: { payload: i } });
    thread.on("message", resolve);
    thread.on("error", reject);
    yield promise;
  }
}

const workersValues = await Promise.all(workers());
console.log(workersValues);