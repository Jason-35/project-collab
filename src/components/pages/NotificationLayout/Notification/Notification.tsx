import InboxCard from "./InboxCard/InboxCard";
import "./Notification.css"

const Notification = () => {
    return ( 
        <div className="notification-container">
            <div className="notification">
                <h1>Inbox</h1>
                <div className="divider-nm" />
                <div className="inbox">
                    <InboxCard title="Join request" from="John"/>
                    <InboxCard title="msges" from="John"/>
                </div>
            </div>
        </div>
     );
}
 
export default Notification;