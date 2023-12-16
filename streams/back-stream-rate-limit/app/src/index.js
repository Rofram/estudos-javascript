import { createReadStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import csvtojson from 'csvtojson'
import { Transform } from 'node:stream'
import { randomUUID } from 'node:crypto'
import { log, makeRequest } from './util.js'
import ThrottleRequest from './throttle.js'

const dataProcessor = new Transform({
  objectMode: true,
  transform(chunk, encode, callback) {
    const jsonData = chunk.toString();
    const data = JSON.parse(jsonData);
    data.id = randomUUID();
    return callback(null, JSON.stringify(data));
  }
})

const throttle = new ThrottleRequest({
  objectMode: true,
  requestsPerSecond: 10,
})

await pipeline(
  createReadStream('../animes.csv'),
  csvtojson(),
  dataProcessor,
  throttle,
  async function* (source) {
    let count = 0;
    for await (const line of source) {
      log(`processed ${++count} items...`);
      const status = await makeRequest(line);
      if (status !== 200) {
        throw new Error(`oops! reached rate limit, stupid!! - status ${status}`);
      }
    }
  }
)