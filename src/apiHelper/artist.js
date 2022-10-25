import axios from '../axios'
import {
    toast
} from 'react-toastify';
export const GetAllArtists = async (ContextState) => {
    try {
        const res = await axios.get('/api/artist/get-all')
        console.log("artists", res.data.artists);
        if (res.status == 200) {
            ContextState(res.data.artists)
        }
    } catch (error) {
        console.log(error);
    }

}

export const SaveArtist = async (data, contextState, btnState) => {
    try {
        const res = await axios.post('/api/artist/save', data)
        if (res.status == 200) {
            console.log(res.data);
            contextState(res.data.artist)
            btnState(false)
            toast.success("Artist Saved", {
                theme: "dark",
                position: "top-right",
                pauseOnHover: true,

            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const DeleteArtist = async (id, ContextState) => {
    try {
        const res = await axios.delete(`api/artist/delete/${id}`)
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