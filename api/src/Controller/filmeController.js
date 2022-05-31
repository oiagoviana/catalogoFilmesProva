import { Router } from "express";
import { alterarFilme, alterarImagem, cadastrarFilme, consultarFilmes, consultarIdFilme, consultarNomeFilme, delFilme } from "../Repository/filmeRepository.js";
import multer from 'multer'
const upload = multer({ dest: 'storage/capasfilmes' })

const server = Router();

server.post('/filme', async (req, resp) => {
    try {
        const filme = req.body;

        if (!filme.usuario)
            throw new Error('Campo usuário obrigatório');

        if (!filme.nome)
            throw new Error('Campo nome obrigatório');

        if (!filme.sinopse)
            throw new Error('Campo sinopse obrigatório');

        if (filme.avaliacao == undefined || filme.avaliacao < 0)
            throw new Error('Campo avaliação obrigatório');

        if (!filme.lancamento)
            throw new Error('Campo lançamento obrigatório');

        if (!filme.disponivel)
            throw new Error('Campo disponivel obrigatório');

        const resposta = await cadastrarFilme(filme);

        resp.send(resposta);
    } catch (err) {

        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);

        if (resposta != 1)
            throw new Error('Não foi possível alterar a imagem');

        else
            resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

server.put('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const filme = req.body;

        const resposta = await alterarFilme(id, filme);

        if (!filme.usuario)
            throw new Error('Campo usuário obrigatório');

        if (!filme.nome)
            throw new Error('Campo nome obrigatório');

        if (!filme.sinopse)
            throw new Error('Campo sinopse obrigatório');

        if (filme.avaliacao == undefined || filme.avaliacao < 0)
            throw new Error('Campo avaliação obrigatório');

        if (!filme.lancamento)
            throw new Error('Campo lançamento obrigatório');

        if (!filme.disponivel)
            throw new Error('Campo disponivel obrigatório');

        if (resposta != 1)
            throw new Error('Não possível alterar o filme');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.delete('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = delFilme(id);

        if (resposta != 1)
            throw new Error('Não possível deletar o filme');

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

server.get('/filme', async (req, resp) => {
    try{
        const resposta = await consultarFilmes();

        resp.send(resposta);
    }catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/filme/busca', async (req, resp) => {
    try {
        const {nome} = req.query;

        const resposta = await consultarNomeFilme(nome);
        
        if(resposta.length == 0){
            resp.status(404).send([])
        } else {
           resp.send(resposta); 
        }
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/:id', async (req, resp) => {
    try{
    const {id} = req.params;

    const resposta = await consultarIdFilme(id);

    if(!resposta)
        resp.status(404).send();
    else
        resp.send(resposta);
    
    } catch (err){
        resp.status(400).send({
            erro: err.message
        })
    }
})
export default server;
