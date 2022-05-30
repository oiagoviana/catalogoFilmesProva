import { Router } from "express";
import { cadastrarFilme } from "../Repository/filmeRepository.js";

const server = Router();

server.post('/filme', async (req, resp) => {
    try{
    const filme  = req.body;
    
    const resposta = await cadastrarFilme(filme);
    
    resp.send(resposta);
    } catch (err) {
        
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;
