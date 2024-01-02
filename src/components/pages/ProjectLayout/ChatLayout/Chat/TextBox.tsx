import { useState } from "react"
import "./TextBox.css"
import { getCurrentDisplayName } from "../../../../../lib/service/UserService"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../../../../firebase/firebase"
import { useParams } from "react-router-dom"
const TextBox = () => {

    const {uuid} = useParams()
    const [text, setText] = useState("")

    const handleEnter = async(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            const currentUser = getCurrentDisplayName()
            await addDoc(collection(db, "messages"), {
                message: text,
                sender: currentUser,
                projId: uuid,
                createdAt: serverTimestamp()
        })            
            setText("")
        }
    }

    return ( 
        <div className="text-box">
            <input type="text" placeholder="Send a message" onKeyDown={handleEnter} onChange={(e) => {
                e.preventDefault()
                setText(e.target.value)}
                } value={text}/>
        </div>
     );
}
 
export default TextBox;