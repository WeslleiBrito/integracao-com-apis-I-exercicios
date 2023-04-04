import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { AUTH_TOKEN } from '../../constants/AUTH_TOKEN'


export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])

    const [nomeMusica, setNomeMusica] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const getAllMusicas = async () => {

        try {
            const response = await axios.get(`${BASE_URL}${props.playlist.id}/tracks`, { headers: { Authorization: AUTH_TOKEN } })
            setMusicas(response.data.result.tracks)
        } catch (error) {
            console.log(error.response)
        }

    }

    const addMusica = async () => {

        const body = {
            name: nomeMusica,
            artist: artista,
            url: url
        }

        try {

            await axios.post(`${BASE_URL}${props.playlist.id}/tracks`, body, { headers: { Authorization: AUTH_TOKEN } })
            getAllMusicas()

        } catch (error) {
            console.log(error.response)
        }
    }

    const deleteMusica = async (idPlaylist, idMusica) => {

        try {
            await axios.delete(`${BASE_URL}${idPlaylist}/tracks/${idMusica}`, { headers: { Authorization: "wesllei-brito-ozemela" } })
            getAllMusicas()
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => { getAllMusicas() }, [])

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => { deleteMusica(props.playlist.id, musica.id) }}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(e) => { setArtista(e.target.value) }} />
                <InputMusica placeholder="musica" value={nomeMusica} onChange={(e) => { setNomeMusica(e.target.value) }} />
                <InputMusica placeholder="url" value={url} onChange={(e) => { setUrl(e.target.value) }} />
                <Botao onClick={() => addMusica()}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

