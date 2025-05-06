import cluster from 'cluster';
import http from 'http';
import os from 'os';
import app from './app.js';

const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, _code, _signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    http.createServer(app).listen(PORT, () => {
        console.log(`Worker ${process.pid} is listening on port ${PORT}`);
    });
}