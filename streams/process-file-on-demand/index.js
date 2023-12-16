import { createServer } from 'node:http';
import { Transform, Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const server = createServer(async (req, res) => {
  switch (req.url) {
    case '/':
      const chunks = [];
      const transformLogger = new Transform({
        transform: (chunk, encode, cb) => {
          chunks.push(chunk);
          cb(null);
        },
        flush: (cb) => {
          const file = Buffer.concat(chunks);
          console.log(file);
          cb();
        }
      })
      try {
        await pipeline(
          req,
          transformLogger,
          res
        );
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
      }
      break
    default:
      res.statusCode = 404;
      res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
})