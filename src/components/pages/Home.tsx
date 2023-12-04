import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string | null>("")
    
    auth.onAuthStateChanged((user) => {
        if(user){
            setUsername(user.displayName)
            console.log("user is logged in", user.displayName)
        }else{
            console.log("no user")
            navigate("/login")
        }
    })

    const logout = () => {
        signOut(auth)
    }

    return ( <div>WELCOME HOME {username} <button onClick={logout}>sign out</button></div>  );
}
 
export default Home;