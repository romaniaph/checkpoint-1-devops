import React, { useState } from 'react';
import Api from './Api'

const Container = {
  FontFace: {
    src: 'https://fonts.googleapis.com/css?family=Montserrat'
  },
  fontFamily: 'Montserrat',
  display: 'flex',
  fontSize: "2.5vh",
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
  padding: '0',
  boxSizing: "border-box"
}

const Button = {
  margin: "1% 0",
  padding: "1%",
  width: "50%",
  borderRadius: "3px",
  border: "none",
  backgroundColor: "#a98600",
  color: "#fff9ae",
  fontSize: "2.5vh",
  cursor: "pointer"
}


const Div = {
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0.5vh 0',
  padding: '0',
  paddingBottom: "2vh"
}

const DivButtons = {
  ...Div,
  flexDirection: 'row',
  width: "60%"
}

const DivButtonsButton = {
  ...Button,
  margin: "1%"
}

const Input = {
  margin: "1%",
  padding: "1%",
  width: "50%",
  fontSize: "2.5vh",
}

const View = (parameters) => {
  const [cria, setCria] = useState("")
  const [criaParcelas, setCriaParcelas] = useState("")

  const [consultaId, setConsultaId] = useState("")
  const [consulta, setConsulta] = useState({ valor: 0, id: 0, parcelas: 0, valorParcelas: 0 })
  const [edita, setEdita] = useState("")

  const [criadoF, setCriadoF] = useState(false)
  const [criado, setCriado] = useState({ valor: 0, id: 0, parcelas: 0, valorParcelas: 0 })

  const [habilitaEdicao, setHabilitaEdicao] = useState(false)

  function clearConsulta() {
    setConsultaId("")
    setConsulta("")
    setEdita("")
    setHabilitaEdicao(false)
  }

  function clearCria() {
    setCria("")
    setCriaParcelas("")
  }

  async function criaEmprestimo() {
    if (!cria || !criaParcelas)
      return alert("Valor(es) inválido(s)")

    if (criaParcelas >= cria )
      return alert("O número de parcelas deve ser menor que o valor do empréstimo")

    const { emprestimo } = await Api.post('/create', { emprestimo: cria, parcelas: criaParcelas }).then(res => res.data)
    alert("Empréstimo criado!")
    setCriadoF(true)
    setCriado(emprestimo)
    clearCria()
  }

  async function consultaEmprestimo() {
    if (!consultaId)
      return alert("Valor inválido")

    const { emprestimo } = await Api.post('/', { id: consultaId }).then(res => res.data)

    if (emprestimo) {
      setConsulta(emprestimo)
      setHabilitaEdicao(true)
    }
    else
      alert("Empréstimo não encontrado.")
  }

  async function editaEmprestimo() {
    if (!edita)
      return alert("Valor inválido")

    await Api.post('/update', { emprestimo: { id: consulta.id, valor: edita } })
    alert("Editado com sucesso!")
    clearConsulta()
  }

  async function deletaEmprestimo() {
    if (!consultaId)
      return alert("Valor inválido")

    await Api.post('/delete', { id: consultaId })
    alert("Deletado com sucesso!")
    clearConsulta();
  }

  return (
    <>
      <div style={Container}>
        <div style={Div}>
          <h1>DIM DIM Empréstimos</h1>
        </div>

        <div style={Div}>
          <h2>Criar novo empréstimo:</h2>
          <input type="number" min="0" max="10000" placeholder="valor do empréstimo" style={Input} value={cria} onChange={text => setCria(text.target.value)} />
          <input type="number" min="0" max="10000" placeholder="número de parcelas" style={Input} value={criaParcelas} onChange={text => setCriaParcelas(text.target.value)} />
          <button style={Button}
            onClick={() => criaEmprestimo()}
          >CRIAR</button>
        </div>

        <div style={Div}>
          {
            criadoF ?
              <>
                <h2>Último empréstimo criado:</h2>
                <p>ID {criado.id} - Valor R${criado.valor} ({criado.parcelas}x R${criado.valorParcelas})</p>
              </>
              : null
          }

        </div>

        <div style={Div}>
          {
            habilitaEdicao ?
              <>
                <h2>CONSULTA: ID {consulta.id} - Valor R${consulta.valor} ({consulta.parcelas}x R${consulta.valorParcelas})</h2>
                <input type="number" min="0" max="10000" placeholder="novo valor" style={Input} value={edita} onChange={text => setEdita(text.target.value)} />
                <div style={DivButtons}>
                  <button style={DivButtonsButton}
                    onClick={() => editaEmprestimo()}
                  >EDITAR</button>
                  <button style={DivButtonsButton}
                    onClick={() => deletaEmprestimo()}
                  >DELETAR</button>
                </div>
                <button style={Button}
                  onClick={() => clearConsulta()}
                >VOLTAR</button>
              </>
              :
              <>
                <h2>Consultar empréstimo:</h2>
                <input type="number" min="0" max="10000" placeholder="id do empréstimo" style={Input} value={consultaId} onChange={text => setConsultaId(text.target.value)} />
                <button style={Button}
                  onClick={() => consultaEmprestimo()}
                >CONSULTAR</button>
              </>
          }
        </div>
      </div>
    </>
  );
}

export default View;