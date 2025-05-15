import cluster from 'cluster';
import http, { IncomingMessage, ServerResponse } from 'http';
import os from 'os';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const numCPUs = os.cpus().length;
const numWorkers = numCPUs - 1;

if (cluster.isPrimary) {
    const workerPorts: number[] = [];
    for (let i = 1; i <= numWorkers; i++) {
        const workerPort = PORT + i;
        const worker = cluster.fork({ WORKER_PORT: workerPort });
        workerPorts.push(workerPort);
    }

    let current = 0;
    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        const targetPort = workerPorts[current];
        current = (current + 1) % workerPorts.length;

        const options = {
            hostname: 'localhost',
            port: targetPort,
            path: req.url,
            method: req.method,
            headers: req.headers,
        };
        const proxy = http.request(options, (workerRes) => {
            res.writeHead(workerRes.statusCode || 500, workerRes.headers);
            workerRes.pipe(res, { end: true });
        });
        req.pipe(proxy, { end: true });
        proxy.on('error', (err) => {
            res.writeHead(500);
            res.end('Internal server error');
        });
    });
    server.listen(PORT, () => {
        console.log(`Load balancer is listening on port ${PORT}`);
        workerPorts.forEach((p) => console.log(`Worker will listen on port ${p}`));
    });

    cluster.on('exit', (worker, _code, _signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    import('./app.js').then(({ default: app }) => {
        const workerPort = process.env.WORKER_PORT ? parseInt(process.env.WORKER_PORT, 10) : PORT + 1;
        app.listen(workerPort, () => {
          console.log(`Worker ${process.pid} is listening on port ${workerPort}`);
        });
      });
}