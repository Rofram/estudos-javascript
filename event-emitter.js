import { EventEmitter, captureRejectionSymbol } from 'node:events';


class MyEmitter extends EventEmitter {

  constructor() {
    super({ captureRejections: true });
  }

  [captureRejectionSymbol](err) {
    console.log(`captured error: ${err}`);
  }

  destroy() {
    console.log('destroy');
    this.removeAllListeners();
  }
}


const emitter = new MyEmitter();

emitter.on('something', async () => {
  throw new Error("something went wrong");
});

emitter.emit('something');