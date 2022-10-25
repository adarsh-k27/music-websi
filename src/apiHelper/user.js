import axios from "../axios";
export const LoginUser = async (token, changeState) => {
  console.log("TOKEN", token);
  try {
    const res = await axios.get('/api/user/login', {
      headers: {
        "authorization": token
      }
    })
    console.log(res.data);
    if (res.status == 200) {
      changeState(res.data.update)
    }
  } catch (error) {
    console.log(error);
  }
}

export const GetAllUser = async (UserState) => {
  try {
    const res = await axios.get('/api/user/all-users')

    if (res.status == 200) {
       UserState(res.data.users)
    }
  } catch (error) {
    console.log(error);
  }
}

export const UpdateUser=async (id,index,role,contextUpdate)=>{
  try{
   const res = await axios.put(`api/user/update-role/${id}`,{role})
  
   if(res.status===200){
    console.log("updated", res.data.update);
     contextUpdate(res.data.update,index)
   }
  }
  catch(error){
    console.log(error);
  }
}