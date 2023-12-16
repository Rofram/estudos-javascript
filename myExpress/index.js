import { express } from './express.js';

const app = express();

app.get('/', (req, res) => {
  return 'Hello World';
});

app.listen(3333, () => console.log('Server ready'));