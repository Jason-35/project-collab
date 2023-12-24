import { useState } from "react"
import "./TextBox.css"
const TextBox = () => {

    const [text, setText] = useState("")

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            console.log("enter")
            
            setText("")
        }
    }

    return ( 
        <div className="text-box">
            <input type="text" placeholder="Send a message" onKeyDown={handleEnter} onChange={(e) => setText(e.target.value)} value={text}/>
        </div>
     );
}
 
export default TextBox;