import DefaultLayout from "../../DefaultLayout/DefaultLayout";
import Notification from "./Notification/Notification";
import "./NotificationLayout.css"

const NotificationLayout = () => {
    const layout = (
        <div className="notification-layout">
            <Notification />
        </div>
        )
    
    return ( 
        <DefaultLayout component={layout} />
    );
}
 
export default NotificationLayout;