import { useState } from "react";
import ChatComponent from "./ChatComponent/ChatComponent";
import "./ChatLayout.css"
import Header from "./header/Header";
import Members from "./Members/Members";

const ChatLayout = () => {

    const [showMembers, setShowMembers] = useState(false)

    const component = showMembers ? <Members/> : <ChatComponent /> 
    const title = showMembers ? "Members" : "Chat"
    return ( 
        <div className="chat-layout-container">
            <Header title={title} setShowMembers={setShowMembers}/>
            {component}
        </div>
     );
}
 
export default ChatLayout;