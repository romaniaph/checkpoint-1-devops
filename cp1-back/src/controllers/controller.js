const db = require("../config/database");

module.exports = {
  async index(req, res) {
    return res.json("Hello, world!")
  },
  async get(req, res) {
    try {
      console.log(req.body)
      const { rows: emprestimoConsulta } = await db.query('SELECT * FROM TB_EMPRESTIMO_XCAVE WHERE cd_emprestimo = $1', [req.body.id]);
      const { rows: parcelaConsulta } = await db.query('SELECT * FROM TB_PARCELAS_XCAVE WHERE cd_emprestimo = $1', [req.body.id]);

      return res.json(emprestimoConsulta[0] ?
        {
          emprestimo: {
            id: emprestimoConsulta[0].cd_emprestimo,
            valor: emprestimoConsulta[0].nr_valor,
            parcelas: parcelaConsulta[0].nr_parcelas,
            valorParcelas: parcelaConsulta[0].nr_valor_parcela
          }
        } :
        { emprestimo: null })
    }
    catch (e) {
      console.log(e)
      return res.sendStatus({ status: "erro" })
    }
  },
  async create(req, res) {
    try {
      console.log(req.body)
      await db.query("INSERT INTO TB_EMPRESTIMO_XCAVE (nr_valor) VALUES ($1)", [req.body.emprestimo]);

      const { rows: emprestimoConsulta } = await db.query('SELECT * FROM TB_EMPRESTIMO_XCAVE ORDER BY cd_emprestimo DESC');

      console.log({ emprestimo: emprestimoConsulta[0] })

      await db.query(
        "INSERT INTO TB_PARCELAS_XCAVE (cd_emprestimo, nr_parcelas, nr_valor_parcela) VALUES ($1, $2, $3)",
        [emprestimoConsulta[0].cd_emprestimo, req.body.parcelas, (req.body.emprestimo / req.body.parcelas)]);



      return res.json({
        emprestimo: {
          id: emprestimoConsulta[0].cd_emprestimo,
          valor: emprestimoConsulta[0].nr_valor,
          parcelas: req.body.parcelas,
          valorParcelas: (req.body.emprestimo / req.body.parcelas)
        }
      })
    }
    catch (e) {
      console.log(e)
      return res.sendStatus({ status: "erro" })
    }
  },
  async update(req, res) {
    try {
      console.log(req.body)
      await db.query(
        "UPDATE TB_EMPRESTIMO_XCAVE SET nr_valor = $1 WHERE cd_emprestimo = $2",
        [req.body.emprestimo.valor, req.body.emprestimo.id]);

      const { rows: parcelaConsulta } = await db.query('SELECT * FROM TB_PARCELAS_XCAVE WHERE cd_emprestimo = $1', [req.body.emprestimo.id]);

      await db.query(
        "UPDATE TB_PARCELAS_XCAVE SET nr_valor_parcela = $1 WHERE cd_emprestimo = $2",
        [(req.body.emprestimo.valor / parcelaConsulta[0].nr_parcelas), req.body.emprestimo.id]);

      return res.sendStatus(200)
    }
    catch (e) {
      console.log(e)
      return res.sendStatus({ status: "erro" })
    }
  },
  async delete(req, res) {
    try {
      console.log(req.body)
      await db.query('DELETE FROM TB_PARCELAS_XCAVE WHERE cd_emprestimo = $1', [req.body.id]);
      await db.query('DELETE FROM TB_EMPRESTIMO_XCAVE WHERE cd_emprestimo = $1', [req.body.id]);
      return res.sendStatus(200)
    }
    catch (e) {
      console.log(e)
      return res.sendStatus({ status: "erro" })
    }
  }
}