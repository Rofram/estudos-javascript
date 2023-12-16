import { createServer } from "node:http";
import { createReadStream } from 'node:fs';
import { Readable, Transform } from 'node:stream'
import { WritableStream, TransformStream } from 'node:stream/web'
import { setTimeout } from 'node:timers/promises'

import csvtojson from 'csvtojson'

const PORT = 3000;
createServer(async (request, response) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  }
  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
    return;
  }
  let items = 0;
  request.on('close', () => console.log(`connection was closed!`, items))
  Readable.toWeb(createReadStream('../anime.csv'))
  // pipeThrough o passo a passo da stream (linha a linha)
  .pipeThrough(Transform.toWeb(csvtojson()))
  .pipeThrough(new TransformStream({
    transform(chunk, controller) {
      const data = JSON.parse(Buffer.from(chunk));
      const mappedData = {
        name: data.Name,
        genres: data.Genres,
        type: data.Type,
      }
      // quebra de linha pois é um NDJSON
      controller.enqueue(JSON.stringify(mappedData).concat('\n'));
    }
  }))
  // pipeTo ultima etapa da stream
  .pipeTo(new WritableStream({
    async write(chunk) {
      await setTimeout(1000);
      items += 1;
      response.write(chunk)
    },
    close() {
      response.end()
    }
  }))

  response.writeHead(200, headers);
})
.listen(PORT)
.on("listening", () => console.log(`Server running at ${PORT}`))