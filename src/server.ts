import config from './config/index.js';
import app from './app.js';

const PORT = config.port || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default server;
