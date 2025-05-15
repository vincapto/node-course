import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
};

export default config;