import ChatBox from "../Chat/ChatBox";
import TextBox from "../Chat/TextBox";
import "./ChatComponent.css"

const ChatComponent = () => {
    return (  
        <div className="chat-component">
            <ChatBox />
            <TextBox />
        </div>
    );
}
 
export default ChatComponent;