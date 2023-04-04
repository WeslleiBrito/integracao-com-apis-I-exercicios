import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
import { AUTH_TOKEN } from "../../constants/AUTH_TOKEN";
import { BASE_URL } from "../../constants/BASE_URL";


function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const getAllPlaylist = async (pesquisa) => {

        try {
            const response = await axios.get(
                !pesquisa ? BASE_URL : `${BASE_URL}search?name=${pesquisa}`,
                { headers: { Authorization: AUTH_TOKEN } }
            )
            setPlaylists(response.data.result.list)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => { getAllPlaylist() }, [])

    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} />
            })}

        </div>
    );
}

export default Playlists;
