import { useState } from "react"
import { ContainerPesquisa } from "./style"

export const Pesquisar = (props) => {
    const [nomePlaylist, setNomePlaylist] = useState("")


    return (
        <ContainerPesquisa>
            <input type="text" placeholder="Buscar playlist" value={nomePlaylist} onChange={(e) => { setNomePlaylist(e.target.value) }} />
            <button onClick={() => { props.getAllPlaylis(nomePlaylist) }}>Buscar</button>
        </ContainerPesquisa>
    )
}