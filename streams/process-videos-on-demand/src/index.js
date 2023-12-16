import { IncomingMessage, createServer, ServerResponse } from 'node:http';
import { spawn } from 'node:child_process';
import { createReadStream } from 'node:fs';


const server = createServer(handler);

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse<IncomingMessage>} res 
 */
async function handler(req, res) {
  const enableCors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, enableCors);
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-type': 'video/mp4'
  });

  const url = new URL(req.url, `http://${req.headers.host}`);
  const ffmpegProcess = spawn('ffmpeg', [
    '-i', 'pipe:0',
    '-f', 'mp4',
    '-vcodec', 'h264',
    '-acodec', 'aac',
    '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
    '-b:v', '1500k',
    '-maxrate', '1500k',
    '-bufsize', '1000k',
    '-f', 'mp4',
    '-vf', `monochrome,drawtext=text='${url.searchParams.get('text')}':x=10:y=H-th-10:fontsize=50:fontcolor=yellow:shadowcolor=black:shadowx=5:shadowy=5`,
    'pipe:1'
  ], {
    stdio: ['pipe', 'pipe', 'pipe']
  })
  createReadStream('./assets/video-prepared.mp4').pipe(ffmpegProcess.stdin)
  ffmpegProcess.stdout.pipe(res)
  ffmpegProcess.stderr.on('data', (msg) => console.log(msg.toString()))

  req.once('close', () => {
    ffmpegProcess.stdout.destroy()
    ffmpegProcess.stdin.destroy()
    ffmpegProcess.stderr.destroy()
    console.log('disconnected', ffmpegProcess.kill());
  })
}
const port = 3000;
server.listen(port, () => {
  console.log('listening...')
})