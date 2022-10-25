import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header, Home, Login, DashBoard, MusicPlayer } from "./Components";
import { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { LoginUser } from "./apiHelper/user";
import { Music_Context } from "./context";
import { AnimatePresence } from "framer-motion";

function App() {
  //firebase authentication
  const firebaseAuth = getAuth(app);
  const Navigate = useNavigate();

  //authentiaction setUp
  const [Auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") == "true"
  );
  //CONTEXT SETUP
  const { UserLogin } = useContext(Music_Context);
  const {Playing}=useContext(Music_Context).state
  //Google Auth sTATE Changing when refresh

  useEffect(() => {
    if (localStorage.getItem("auth") == false) {
      Navigate("/login");
    }
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          LoginUser(`Bearer ${token}`, UserLogin);
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", false);
        UserLogin(null);
        Navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login setAuth={setAuth} />}></Route>
        <Route path='/*' element={<Home> </Home>}></Route>
        <Route path='/dashboard/*' element={<DashBoard />}></Route>
      </Routes>
      {
        Playing && <MusicPlayer />
      }
      </>
  );
}

export default App;
