import { useEffect } from "react"
import "../styles/NotificationModal.css"

// Notification system later. Turn message into a new page instead

const NotificationModal = () => {
    const open = false

    useEffect(() => {

    })
    
    const notification = open ? (
    <div className="transparent-sheet center" style={{zIndex: "3"}}>
        <div className="notification-card">asd</div>
    </div>
    ) : 
    (<></>) 

    return ( 
        notification
     );
}
 
export default NotificationModal;