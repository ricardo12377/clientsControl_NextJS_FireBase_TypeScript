import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../Core/Client'
import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import { useState, useEffect } from 'react'
import ClienteRepositorio from '../Core/ClienteRepositorio'
import ColecaoCliente from '../FireBase/db/ColecaoCliente'

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [visible, setVisible] = useState<'tabela' | 'form'>('tabela')
  const [cliente, setCliente]= useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes]= useState<Cliente[]>([])

  useEffect(obterTodos, [])
   
    function obterTodos () {
      repo.obterTodos().then(clientes => {
        setClientes(clientes)
        setVisible('tabela')
      })
    }

  


  function ClienteSelecionado (cliente: Cliente) {
    setCliente(cliente)
    setVisible('form')
  }

  async function ClienteExcluido (cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }


  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
}

function novoCliente(cliente: Cliente) {
  setCliente(Cliente.vazio())
  setVisible('form')
}

  return (
    <div className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
    `}>
      <Layout titulo="Cadastro Simples">
      {visible === 'tabela' ? (
        <>
        <div className='flex justify-end'>
        <Botao className='mb-4' onClick={novoCliente}>Novo Cliente</Botao>
       </div>

       <Tabela
        clientes={clientes}
        Selecionado={ClienteSelecionado}
        Excluido={ClienteExcluido} />
        </>
      ) : (
        <Formulario cliente={cliente} 
        cancelado={() => setVisible('tabela')}
        clienteMudou={salvarCliente}
        />
      ) }

      </Layout>
    </div>
  )
}