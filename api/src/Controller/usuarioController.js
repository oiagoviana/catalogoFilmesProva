import { usuarioLogin } from "../Repository/usuarioRepository.js";

import { Router } from "express";
const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try{
    const {email, senha} = req.body;

    const resposta = await usuarioLogin(email, senha);

    if (!resposta)
        throw new Error('Credenciais incorretas')

    resp.send(resposta);
    } catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})


export default server;