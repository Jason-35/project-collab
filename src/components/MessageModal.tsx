import { X } from "lucide-react";
import "../styles/MessageModal.css"
import { getCurrentDisplayName, getCurrentUserUid } from "../lib/service/UserService";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { v4 as uuid } from "uuid";

interface MessageModalProps {
    message: string,
    type: string,
    fromId: string,
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    msgId: string,
    joining: string,
    projUrl: string
}


const MessageModal = ({ message, type, fromId, open, setOpen, msgId, joining, projUrl }:MessageModalProps) => {
    console.log("this the type ",type)

    const handleReject = async() => {
        const createdAt = new Date()
        const currentUserName = getCurrentDisplayName()
        const currentUserId = getCurrentUserUid()
        const respId = uuid()
        await updateDoc(doc(db, "users", fromId), {
            notification: arrayUnion({
            msgId: respId,
            from: currentUserName,
            fromId: currentUserId,
            message: `${currentUserName} has declined your request to join ${joining}`,
            joining: joining,
            type: "response",
            read: false,
            createdAt: createdAt
            })
        })

        setOpen(false)

    }

    const handleAccept = async() => {
        const createdAt = new Date()
        const currentUserName = getCurrentDisplayName()
        const currentUserId = getCurrentUserUid()
        const respId = uuid()
        await updateDoc(doc(db, "users", fromId), {
            notification: arrayUnion({
            msgId: respId,
            from: currentUserName,
            fromId: currentUserId,
            message: `${currentUserName} has accepted your request to join ${joining}`,
            joining: joining,
            type: "response",
            read: false,
            createdAt: createdAt
            }),
            memberOfProject: arrayUnion({
                projectName: joining,
                projectUrl: projUrl,
            })
        })

        setOpen(false)
        
    }
  
    if(!open){
        return (<></>) 
    }

    if(type === "request"){
        return(
            <div>
                <div className="message-sheet"></div>
                <div className="message-modal">
                    <div>
                        <p>Message:</p> <X onClick={() => setOpen(false)}/>
                    </div>
                    {message}        
                    <div>
                        <button onClick={handleAccept}>Accept</button>
                        <button onClick={handleReject}>Reject</button>
                    </div>
                </div>
            </div>
            
        )
    }

    if(type === "response"){
        return(
            <div>
                <div className="message-sheet"></div>
                <div className="message-modal">
                    <div>
                        <p>Message:</p> <X onClick={() => setOpen(false)}/>
                    </div>
                    {message}        
                </div>
            </div>
            
        )
    }

    

    return ( 
    <div>
        <p>Message:</p> <br/>
        {message}
    </div>
    );
}
 
export default MessageModal;