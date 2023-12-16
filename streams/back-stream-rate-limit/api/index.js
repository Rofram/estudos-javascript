import bodyParser from 'body-parser';
import express from 'express'
import rateLimit from 'express-rate-limit';
import { createWriteStream } from 'node:fs'

const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

const output = createWriteStream('output.ndjson');
const app = express();
app.use(bodyParser.json())
app.use(limiter)
const PORT = 3000;

app.post("/", async (req, res) => {
  console.log(`received:`, req.body);
  output.write(JSON.stringify(req.body).concat("\n"))
  return res.send("ok!");
})

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
})