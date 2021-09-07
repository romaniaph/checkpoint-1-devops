import React, { useState } from 'react';

import controller from '../controllers/controller';

const Container = {
  FontFace: {
    src: 'https://fonts.googleapis.com/css?family=Montserrat'
  },
  fontFamily: 'Montserrat',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
  padding: '0',
  boxSizing: "border-box"
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

const input = {
  margin: "1%",
  padding: "1%",
  width: "50%"
}

const button = {
  margin: "1% 0",
  padding: "1%",
  width: "50%",
  borderRadius: "3px",
  border: "none",
  backgroundColor: "#a98600",
  color: "#fff9ae",
  fontSize: "18px",
  cursor: "pointer"
}

const view = (parameters) => {
  const [cria, setCria] = useState("")
  const [consultaId, setConsultaId] = useState("")
  const [consulta, setConsulta] = useState({ valor: "", id: "" })
  const [edita, setEdita] = useState("")

  const [habilitaEdicao, setHabilitaEdicao] = useState(false)

  function criaEmprestimo() {
    console.log("view")
    controller.create(cria)
    console.log("Empréstimo criado!")
    clearCria()
  }

  function clearConsulta() {
    setConsulta("")
    setEdita("")
    habilitaEdicao(false)
  }

  function clearCria() {
    setCria("")
  }

  function consultaEmprestimo() {
    const emprestimo = controller.get(consultaId)
    if (emprestimo) {
      setConsulta({ id: emprestimo.id, valor: emprestimo.valor })
      setHabilitaEdicao(true)
    }
    else
      console.log("Empréstimo não encontrado.")

  }

  function editaEmprestimo() {
    controller.update({ id: consulta.id, valor: edita })
    console.log("Editado com sucesso!")
  }

  function deletaEmprestimo() {
    controller.delete(consulta.id)
    console.log("Deletado com sucesso!")
    clearConsulta();
  }

  return (
    <>
      <div style={Container}>
        <div style={Div}>
          <h1>DIM DIM</h1>
        </div>
        <div style={Div}>
          {
            habilitaEdicao ?
              <>
                <input type="text" placeholder="novo valor" style={input} value={edita} onChange={text => setEdita(text.target.value)} />
                <button style={button} onClick={() => editaEmprestimo()}>EDITAR</button>
                <button style={button} onClick={() => deletaEmprestimo()}>DELETAR</button>
              </>
              :
              <>
                <h2>Consultar empréstimo:</h2>
                <input type="text" placeholder="id do empréstimo" style={input} value={consultaId} onChange={text => setConsultaId(text.target.value)} />
                <button style={button} onClick={() => consultaEmprestimo()}>CONSULTAR</button>
              </>
          }
        </div>

        <div style={Div}>
          <h2>Criar novo empréstimo:</h2>
          <input type="text" placeholder="valor do empréstimo" style={input} value={cria} onChange={text => setCria(text.target.value)} />
          <button style={button} onClick={() => criaEmprestimo()}>CRIAR</button>
        </div>
      </div>
    </>
  );
}

export default view;