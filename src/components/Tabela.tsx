import Cliente from '../Core/Client'
import { IconeEdicao, IconeLixo } from './Icones'

export interface TabelaProps  {
    clientes: Cliente[]
    Selecionado?: (cliente: Cliente) => void
    Excluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.Selecionado || props.Excluido

    function RenderizarCabecalho () {
        return (
                <tr>
                    <th  className="text-left p-4">Código</th>
                    <th  className="text-left p-4">Nome</th>
                    <th  className="text-left p-4">Idade</th>
                    {exibirAcoes ? <th className="p-4">Ações</th> : <th>erro</th>}
                </tr>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td  className="text-left p-4">{cliente.id}</td>
                    <td  className="text-left p-4">{cliente.nome}</td>
                    <td  className="text-left p-4">{cliente.idade}</td>
                    {exibirAcoes ? RenderizarAcoes(cliente) : false}
                </tr>
            )
        })
    }


    function RenderizarAcoes (cliente: Cliente) {
        return (
            <td className='flex justify-center'>
                {props.Selecionado ? (
                      <button onClick={() => props.Selecionado?.(cliente)} className={`
                      flex justify-center items-center
                      text-green-600 rounded-full p-2 m-1
                      hover: bg-purple-50
                      `}>
                          {IconeEdicao}
                      </button>
                ): false}
              
                {props.Excluido ? (
                      <button onClick={() => props.Excluido?.(cliente)} className={`
                      flex justify-center items-center
                      text-red-500 rounded-full p-2 m-1
                      hover: bg-purple-50
                      `}>
                          {IconeLixo}
                      </button>
                ): false}
            </td>
        )
    }


    return(
        <table className='w-full rounded-xl overflow-hidden'>
           <thead className={`
            bg-gradient-to-r from-purple-500 to-purple-800
            text-gray-100
           `}>
           {RenderizarCabecalho()}
           </thead>

           <tbody>
               {renderizarDados()}
           </tbody>
        </table>
    )

}