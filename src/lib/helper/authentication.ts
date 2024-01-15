import { AuthType, OAuthType } from "@/constants/constants"
import { auth } from "@/firebase/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { NavigateFunction } from "react-router-dom"
import * as z from "zod"

export const registerSchema = z.object({
    email: z.string().min(2).email("Not an email!"),
    password: z.string().min(1, {
        message: "Password cannt be empty"
    }),
    type: z.string()
})

export const loginSchema = z.object({
    email: z.string().min(2).email("Not an email!"),
    password: z.string().min(1, {
        message: "Password cannt be empty"
    }),
    type: z.string()
})

const handleLogin = () => {
    console.log("logging in")
}

const handleRegister = () => {
    console.log("handle register")
}

export const handleAuthentication = (values: z.infer<typeof loginSchema> | z.infer<typeof registerSchema>) => {
    switch (values.type) {
        case AuthType.Login :
            handleLogin()
            break
        case AuthType.Register:
            handleRegister()
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
        signInWithPopup(auth, provider).then(async(result) => {
            navigate("/dashboard")
        })
    }


} 