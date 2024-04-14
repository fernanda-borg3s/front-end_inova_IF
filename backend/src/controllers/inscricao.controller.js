import postgre from '../../database.js';

const inscricaoController ={
    inscreverEncontro: async(req, res) => {
        try {
            const {id_encontro, id_aluna} = req.body

            const sql = 'INSERT INTO inscricao(id_encontro, id_aluna) VALUES($1, $2) RETURNING *'

            const { rows } = await postgre.query(sql, [id_encontro, id_aluna])

            res.json({msg: "Inscrição realizado com sucesso", data: rows[0]})

        } catch (error) {
            console.error(error);
            res.json({ msg: "Ocorreu um erro realizar inscrição" });
        }
    },
    getEncontroInscritoById: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT I.id_inscricao, I.id_encontro, I.data_inscricao, E.id_encontro, E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.sala, E.num_vagas, E.data_inicio, E.hora_inicio, E.hora_fim, P.nome_professora, AC.area, CC.componente_curricular, TOBJ.tipo_objetivos, OA.objetivo_aprendizagem, ET.etapa FROM inscricao AS I INNER JOIN encontro AS E ON I.id_encontro = E.id_encontro INNER JOIN professora AS P ON E.id_professora = P.id_professora INNER JOIN area_conhecimento AS AC ON E.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular INNER JOIN tipo_objAprend_etapa AS TAE ON E.id_tipoObj_objApren_etapa = TAE.id_tipoObj_objApren_etapa INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE I.id_aluna = $1", [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(404).json({msg: "Não há inscrições realizadas pelo usuário"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    deleteInscricao: async(req, res) => {
        try {
            const sql = 'DELETE FROM inscricao WHERE id_inscricao = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "Ocorreu um erro ao excluir sua inscrição"})
            

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    listInscritos: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT I.*, A.id_aluna, A.nome_aluna, A.mat_aluna, A.email FROM inscricao AS I INNER JOIN encontro AS E ON I.id_encontro = E.id_encontro INNER JOIN aluna AS A ON I.id_aluna = A.id_aluna INNER JOIN professora AS P ON E.id_professora = P.id_professora WHERE E.id_professora = $1 AND I.id_encontro = $2 ORDER BY A.nome_aluna ASC", [req.params.id, req.params.id_encontro])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

           return res.json({msg: "Não há inscritos nesse encontro"})
    
        } catch (error) {
           return res.json({msg: error.msg})
        }
    },
    allAlunoExceptInscritos: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT aluna.id_aluna, aluna.nome_aluna, aluna.mat_aluna, aluna.email, T.id_encontro FROM aluna LEFT JOIN (SELECT I.id_encontro, A.nome_aluna, A.mat_aluna, A.email FROM inscricao AS I INNER JOIN encontro AS E ON I.id_encontro = E.id_encontro INNER JOIN aluna AS A ON I.id_aluna = A.id_aluna INNER JOIN professora AS P ON E.id_professora = P.id_professora WHERE E.id_professora = $1 AND I.id_encontro = $2) T ON aluna.mat_aluna = T.mat_aluna WHERE T.id_encontro IS NULL", [req.params.id, req.params.id_encontro])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

           return res.json({msg: "Não há inscritos nesse encontro"})
    
        } catch (error) {
           return res.json({msg: error.msg})
        }
    },

    addAluno: async(req, res) => {
        try {
            const {id_encontro, id_aluna} = req.body

            const sql = 'INSERT INTO inscricao(id_encontro, id_aluna) VALUES($1, $2) RETURNING *'

            const { rows } = await postgre.query(sql, [id_encontro, id_aluna])

           return res.json({msg: "Inscrição realizado com sucesso", data: rows[0]})

        } catch (error) {
            console.error(error);
           return res.json({ msg: "Ocorreu um erro realizar inscrição" });
        }
    },
    
}
export default inscricaoController;
