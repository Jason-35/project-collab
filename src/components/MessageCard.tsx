interface MessageCardProps {
    joining: string,
    message: string,
    read: boolean,
    type: string,
    from: string,
    fromId: string,
    createdString: string
}

const MessageCard = ({ message, joining, read, type, from, fromId, createdString }: MessageCardProps) => {
    
    if(type === "request"){
        return(
            <div>
                <span><h4>Join Request for {joining} from {from}</h4></span>
                <span>{createdString}</span>
            </div>
        )
    }

    return ( 
    <div>
        {message} <br />
        {joining} <br />
        {type} <br />
        {from} <br />
        {createdString}
    </div>
     );
}
 
export default MessageCard;