import { useState } from "react"
import "../styles/MessageCard.css"
import MessageModal from "./MessageModal"

interface MessageCardProps {
    joining: string,
    message: string,
    read: boolean,
    type: string,
    from: string,
    fromId: string,
    createdString: string,
    msgId: string,
    projUrl: string
}

const MessageCard = ({ message, msgId, joining, read, type, from, fromId, createdString, projUrl }: MessageCardProps) => {
    const [isRead, setIsRead] = useState("unread")
    const [open, setOpen] = useState(false)

    if(read){
        console.log("dsa")
        setIsRead("read")
    }
    
    return(
        <div>
            <div onClick={() => setOpen(true)} className={`message-card ${isRead}`}>
                <span><h4>Join Request for {joining} from {from}</h4></span>
                <span>{createdString}</span>
            </div>
            <MessageModal projUrl={projUrl} joining={joining} open={open} fromId={fromId} message={message} type={type} setOpen={setOpen} msgId={msgId} />
        </div>
    )
    

}
 
export default MessageCard;