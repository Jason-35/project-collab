import ChatComponent from "./ChatComponent/ChatComponent";
import "./ChatLayout.css"
import Header from "./header/Header";

const ChatLayout = () => {
    return ( 
        <div className="chat-layout-container">
            <Header title={"Chat"} />
            <ChatComponent />
        </div>
     );
}
 
export default ChatLayout;