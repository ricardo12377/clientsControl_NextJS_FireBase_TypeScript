import Entrada from './Entrada'
import { useState } from 'react'
import Cliente from '../Core/Client'
import Botao from './Botao'

type FormularioProps = {
    cliente: Cliente
    cancelado?: () => void
    clienteMudou?: (cliente: Cliente) => void
}

export default function Formulario (props: FormularioProps) {
    const id = props.cliente?.id ?? null
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? '')


    return (
        <div>
            {id? (
                 <Entrada  texto="Codigo" valor={id} somenteLeitura className='mb-5'/>
            ) : false}
            <Entrada  texto="Nome" valor={nome} valorMudou={setNome} className='mb-5'/>
            <Entrada  texto="Idade" valor={idade} tipo="number" valorMudou={setIdade} className='mb-5'/>

            <div className='flex mt-3' justify-end>
                <Botao cor="blue" className="mr-2" onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>

                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}