import { useParams } from "react-router-dom";
import "./ChatBox.css"
import { query, collection, DocumentData, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../../../firebase/firebase";



const ChatBox = () => {

    const {uuid} = useParams()
    
    const messageRef = query(collection(db, "messages"), orderBy("createdAt"))
    const [messages] = useCollectionData(messageRef)


    return ( 
    <div className="chat-box">
            <div className="chat-msg">
                {(messages && messages.length > 0) && messages?.filter((obj) => obj.projId === uuid).map((msg: DocumentData, index) => (
                    <p key={index}><span>{msg.sender}:</span> {msg.message}</p>
                ))}
            </div>
    </div>
    );
}
 
export default ChatBox;