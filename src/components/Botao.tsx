interface BotaoProps {
    children: any,
    cor?: 'green' | 'blue' | 'grey',
    className?: string
    onClick?: () => void
}

export default function Botao (props) {
    return(
        <button onClick={props.onClick} className={`
            bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2
            rounded-md
            ${props.className}
        `}>
            {props.children}
        </button>
    )
}