import axios from '../axios'
import {
    toast
} from 'react-toastify'


export const SaveSong = async (data, contextState, btnState) => {
    try {
        const res = await axios.post('/api/song/save', data)
        if (res.status == 200) {
            console.log(res.data);
            contextState(res.data.song)
            btnState(false)
            toast.success("Song Saved", {
                theme: "dark",
                position: "top-right",
                pauseOnHover: true,

            })
        }
    } catch (error) {
        console.log("errr",error);
        toast.error("Something wrong happens",{
            theme:"dark"
        })
    }
}

export const GetAllSongs = async (State) => {
    try {
        const res = await axios.get('/api/song/get-all')
        console.log("songs", res.data.songs);
        if (res.status == 200) {
            State(res.data.songs)
        }
    } catch (error) {
        console.log(error);
    }

}

export const DeleteSong = async (id, ContextState) => {
    try {
        const res = await axios.delete(`api/song/delete/${id}`)
        console.log(res.data);
        if (res.status == 200) {
            toast.success("Delete SuccesFully", {
                theme: "dark",
                position: "top-right",
                pauseOnHover: true,

            })
        }
    } catch (error) {
        console.log(error);
    }
}