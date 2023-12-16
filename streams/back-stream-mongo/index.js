import csvtojson from 'csvtojson';
import mongoose from 'mongoose';
import { createReadStream } from 'node:fs';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
// import { createGzip } from 'node:zlib';
import { UserModel } from './user.js';

mongoose.set("strictQuery", true);
await mongoose.connect("mongodb://localhost:27017/jsstreams", { useNewUrlParser: true });
const abortController = new AbortController();

async function main(callback) {
  const readStream = createReadStream('./data/import.csv');
  // const writeStream = createWriteStream("./data/export.ndjson.gz");
  const transformJsonToUser = new Transform({
    objectMode: true,
    transform(chunk, encode, cb) {
      if (!isValidChunk(chunk)) throw new Error("chunk is invalid");
      const user = {
        name: chunk.name,
        email: chunk.email.toLowerCase(),
        age: Number(chunk.age),
        salary: Number(chunk.salary),
        isActive: chunk.isActive === 'true',
      }
      cb(null, user)
    }
  })
  const filterByUserActive = new Transform({
    objectMode: true,
    transform(user, enc, cb) {
      if (!user.isActive || user.salary < 700) {
        cb(null)
        return;
      }
      cb(null, user)
    }
  })
  const transformUserToNdJson = new Transform({
    objectMode: true,
    transform(user, enc, cb) {
      const data = JSON.stringify(user) // .split('\n').map(line => '\t' + line).join('\n').concat(",\n")
      cb(null, data + '\n')
    }
  })
  const saveUserToMongodb = new Transform({
    objectMode: true,
    async transform(user, enc, cb) {
      await UserModel.create(user);
      cb(null)
    }
  })

  try {
    await pipeline(
      readStream,
      csvtojson(null, { objectMode: true }),
      transformJsonToUser,
      // filterByUserActive,
      saveUserToMongodb,
      // transformUserToNdJson,
      // createGzip(),
      // writeStream
      { signal: abortController.signal }
    )
    // writeStream.end()
    await mongoose.disconnect()
    console.log('pipeline finished');
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("\nPipeline Aborted!");
    } else {
      console.error(err);
    }
  }
}

function isValidChunk(chunk) {
  return !!(typeof chunk === "object" && 
    chunk !== null && 
    typeof chunk.name === "string" && 
    typeof chunk.email === "string" &&
    typeof chunk.age === "string" &&
    typeof chunk.salary === "string" &&
    typeof chunk.isActive === "string");
}

main();

process.on("SIGTERM", async () => {
  abortController.abort();
  await mongoose.disconnect();
  console.log('mongoose disconnected');
  process.exit(0);
})

process.on("SIGINT", async () => {
  abortController.abort();
  await mongoose.disconnect();
  console.log('mongoose disconnected');
  process.exit(0);
})