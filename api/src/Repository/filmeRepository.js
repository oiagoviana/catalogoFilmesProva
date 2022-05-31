import { con } from './Connection.js'

export async function cadastrarFilme (filme){
    const comando = 
    `INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
    VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    
    

    filme.id = resposta.insertId;
    return filme;
}

export async function alterarImagem (imagem, id) {
    const comando = 
    `UPDATE tb_filme 
    SET img_filme     = ?
    WHERE id_filme = ?`

    const [resposta] = await con.query(comando, [imagem, id]);
    return resposta.affectedRows;
}

export async function alterarFilme (id, filme){
    const comando = 
    `UPDATE tb_filme 
        SET     nm_filme      = ?,
                ds_sinopse    = ?,
                vl_avaliacao  = ?,
                dt_lancamento = ?,
                bt_disponivel = ?
    WHERE id_filme            = ?`;

    const [resposta] = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, id]);
    return resposta.affectedRows; 
}

export async function delFilme(id) {
    const comando = 
    `DELETE FROM tb_filme 
        WHERE id_filme = ?`

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function consultarFilmes(){
    const comando = 
    `SELECT id_filme			id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel
      FROM  tb_filme`

    const [resposta] = await con.query(comando);
    return resposta;
}

export async function consultarNomeFilme (nome) {
    const comando = 
    `SELECT id_filme			id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel
    FROM tb_filme
    WHERE nm_filme			    like ?`

    const [resposta] = await con.query(comando, [`%${nome}%`]);
    return resposta;
}

export async function consultarIdFilme(id){
    const comando = 
    `SELECT id_filme		 id,
            nm_filme	     nome,
            vl_avaliacao	 avaliacao,
            ds_sinopse		 sinopse,
            dt_lancamento	 lancamento,
            bt_disponivel	 disponivel,
            img_filme        capa
       FROM tb_filme
      WHERE id_filme	     = ?`;

    const [resposta] = await con.query(comando, [id]);
    console.log(resposta);
    return resposta[0];
}
