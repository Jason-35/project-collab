import { AuthType, ErrorMsg, OAuthType, Status } from "@/constants/constants"
import { auth } from "@/firebase/firebase"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { Dispatch, SetStateAction } from "react"
import { NavigateFunction } from "react-router-dom"
import * as z from "zod"

export const registerSchema = z.object({
    email: z.string().min(2, {
        message: "Please enter a valid input"
    }).email("Not an email!"),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    type: z.string()
})

export const loginSchema = z.object({
    email: z.string().min(2, {
        message: "Please enter a valid input"
    }).email("Not an email!"),
    password: z.string().min(1, {
        message: "Password cannot be empty"
    }),
    type: z.string()
})

const handleLogin = (values: z.infer<typeof loginSchema>, navigate: NavigateFunction, setStatus: Dispatch<SetStateAction<Status>>) => {
    console.log("logging in")
    const email = values.email
    const password = values.password
    
    signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/dashboard")
    }).catch((error) => {
        console.log("ERROR IN LOGIN:",error.message, error.code)
        if(error.code === ErrorMsg.INVALID_CREDENTIAL){
            setStatus(Status.ERROR)
        }
    })
}

const handleRegister = (values: z.infer<typeof registerSchema>, navigate: NavigateFunction, setStatus: Dispatch<SetStateAction<Status>>) => {
    const email = values.email
    const password = values.password

    createUserWithEmailAndPassword(auth, email, password).then(() =>{
        navigate("/dashboard")
    }).catch((error) => {
        console.log("Register_ERROR", error.message, error.code)
        if(error.code === ErrorMsg.EMAIL_USED){
            setStatus(Status.ERROR)
        }
    })

}

export const handleLogout = (navigate: NavigateFunction) => {
    signOut(auth)
    navigate("/login")
}

export const handleAuthentication = (values: z.infer<typeof loginSchema> | z.infer<typeof registerSchema>, navigate: NavigateFunction, setStatus: Dispatch<SetStateAction<Status>>) => {
    switch (values.type) {
        case AuthType.Login :
            handleLogin(values, navigate, setStatus)
            break
        case AuthType.Register:
            handleRegister(values, navigate, setStatus)
            break
        default:
            console.log("Some Error Occured in Authentication")
            break
    }
}

export const handleOAuthSignIn = async(value: OAuthType, navigate: NavigateFunction) => {
    let provider: GoogleAuthProvider | undefined;
    switch(value) {
        case OAuthType.Google:
            provider = new GoogleAuthProvider()
            break
        default:
            console.log("Some error in OAuth Signin")
            provider = undefined
            break
    }

    if(provider){
        signInWithPopup(auth, provider).then(() => {
            navigate("/dashboard")
        })
    }
} 

export const Authorization = (navigate: NavigateFunction) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })
    return unsubscribe
}