import axios from '../axios'
import {
  toast,
  Toast
} from 'react-toastify';


export const GetAllAlbums = async (ContextState) => {
  try {
    const res = await axios.get('/api/album/get-all')
    console.log("albums", res.data.albums);
    if (res.status == 200) {
      ContextState(res.data.albums)
    }
  } catch (error) {
    console.log(error);
  }

}

export const SaveAlbum = async (data,contextState,btnState) => {
  try {
    const res = await axios.post('/api/album/save', data)
    if (res.status == 200) {
      console.log(res.data);
      contextState(res.data.album)
      btnState(false)
      toast.success("Album Saved",{
        theme:"dark",
        position:"top-right",
        pauseOnHover:true,

      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const DeleteAlbum=async(id,ContextState)=>{
  try{
   const res=await axios.delete(`api/album/delete/${id}`)
   console.log(res.data);
   if(res.status==200){
      toast.success("Delete SuccesFully", {
        theme: "dark",
        position: "top-right",
        pauseOnHover: true,

      })
   }
  }
  catch(error){
    console.log(error);
  }
}