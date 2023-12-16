import { createServer } from 'node:http';

export function express() {
  const routes = new Map([
    ['GET', []],
    ['POST', []],
  ]);

  /**
   * 
   * @param {string} path 
   * @param  {function[]} callbacks
   */
  function get(path, ...callbacks) {
    routes.get('GET').push({ path, callbacks });
  }
  
  /**
   * 
   * @param {string} path 
   * @param  {function[]} callbacks
   */
  function post(path, ...callbacks) {
    routes.get('POST').push({ path, callbacks });
  }

  /**
 * 
 * @param {number | string} port default 3000
 * @param {() => void | undefined} callback callback function to be called when server is ready
 */
  function listen(port = 3000, callback) {
    const server = createServer(handleRequest);
    server.listen(port, callback);
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.error('Address in use, retrying...');
        setTimeout(() => {
          server.close();
          server.listen(++port, callback);
        }, 1000);
      }
    });
  }

  function handleRequest(req, res) {
    const { method, url } = req;
    const routesByMethod = routes.get(method);
    const route = routesByMethod.find(route => route.path === url);
    if (!route) {
      res.statusCode = 404;
      res.end();
      return;
    }
    const { callbacks } = route;
    callbacks.forEach(callback => callback(req, res));
  }

  return { get, post, listen };
}