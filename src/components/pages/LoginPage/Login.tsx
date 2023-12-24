import { GoogleAuthProvider, signInWithPopup,  } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
// import { useNavigate } from "react-router-dom"
import { ReactSVG } from "react-svg"
import HighFive from "../../../assets/high-five.svg"
import "./Login.css"
import { db } from "../../../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { getCurrentUserDocument } from "../../../lib/service/UserService"

const Login = () => {
    const navigate = useNavigate()
    
    const onClick = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            if(result){
                try {
                    const currentUser = await getCurrentUserDocument()

                    if(currentUser){
                        if(!currentUser.profileSetup){
                            navigate("/profile-setup")
                        }else{
                            navigate("/home")
                        }
                    }else {
                        const userId = result.user.uid
                        const currentUserDoc = doc(db, "users", userId)
                        await setDoc(currentUserDoc, {
                            name: result.user.displayName,
                            profileSetup: false
                        })
                        navigate("/profile-setup")
                    }

                } catch (error) {
                    console.log("ERROR IN LOGIN PAGE ",error)
                }
            }    
        })
    }


    return ( 
    <div className="container bg-bluish">
        <div className="sign-up-container">
            <div className="welcome-quote">
                <h2>
                Embrace the spirit of collaboration! 
                </h2>
                <p>
                Welcome to a hub where users unite to turn dreams into projects and projects into reality
                </p>
            </div>
            <div id="high-five">
                <ReactSVG src={HighFive} />
            </div>
            <div>
                <button className="sign-in" onClick={onClick}>Sign In With Google</button>
            </div>
        </div>
    </div>
    );
}
 
export default Login;