import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebase"


export const getCurrentUserDocument = async(): Promise<DocumentData | undefined> => {
    if(auth && auth.currentUser){
        const userId = auth.currentUser.uid
        const currentUserDoc = doc(db, "users", userId)

        try {
            const currentUserDocSnap = await getDoc(currentUserDoc)
            return currentUserDocSnap.data()
                
        } catch (error) {
            console.log("GET CURRENT USER DOCUMENT ERROR", error)
        }
        
    }
}


export const getCurrentUserUid = (): string => {
    if(auth && auth.currentUser){
        return auth.currentUser.uid
    }
    return ""
}

export const updateCurrentUserDocument = async(payload: object) => {
    if(auth && auth.currentUser){
        await updateDoc(doc(db, "users", auth.currentUser.uid), payload)
    }
}

export const getCurrentDisplayName = () => {
    if(auth && auth.currentUser?.displayName) return auth.currentUser.displayName
}

export const getUserDocument = async(id: string): Promise<DocumentData | undefined> => {
    const userDoc = doc(db, "users", id)

    try {
        const userDocSnap = await getDoc(userDoc)
        return userDocSnap.data()
    } catch (error) {
        console.log("GET USER DOCUMENT ERROR", error)
    }
}
