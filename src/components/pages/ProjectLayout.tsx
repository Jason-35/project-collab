import { useNavigate, useParams } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from "../../firebase/firebase";
import { query, collection, limit, DocumentData, addDoc } from "firebase/firestore";
import { useState } from "react";
import { getUser } from "../../lib/service/UserService";

const ProjectLayout = () => {

    const { uuid, name } = useParams()

    const messageRef = query(collection(db, "messages"), limit(10))

    const [messages] = useCollectionData(messageRef)

    const [msg, setMsg] = useState("")

    const navigate = useNavigate()

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    const handleSend = async() => {
        await addDoc(collection(db, "messages"), {
            message: msg
        })
    }

    return ( 
        <div>
            <div>service assignment</div>
            <div>Bug tracker</div>
            {(messages && messages.length > 0) && messages?.map((msg: DocumentData) => (
                <div>{msg.message}</div>
            ))}
            
                <input onChange={(e) => setMsg(e.target.value)} type="text" />
                <button onClick={handleSend}>send</button>

        </div>
     );
}
 
export default ProjectLayout;