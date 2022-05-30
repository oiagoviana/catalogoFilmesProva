import 'dotenv/config';
import express from 'express';
import { con } from './Repository/Connection.js'
import cors from 'cors';
import usuarioController from './Controller/usuarioController.js'
import filmeController from './Controller/filmeController.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use(usuarioController);
server.use(filmeController);

server.listen(process.env.PORT, () => console.log(`API conectada na porta ${process.env.PORT}`));
