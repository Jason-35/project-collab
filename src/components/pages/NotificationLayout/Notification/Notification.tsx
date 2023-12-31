import { useState, useEffect } from "react";
import { getCurrentUserDocument } from "../../../../lib/service/UserService";
import InboxCard from "./InboxCard/InboxCard";
import "./Notification.css"

interface NotificationField {
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
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

const Notification = () => {

    const sortByCreated = (a: NotificationField, b: NotificationField) => {

        const dateA = new Date(a.createdString).getTime();
        const dateB = new Date(b.createdString).getTime();

        return dateB - dateA;
    };

    const mapCreatedAtToString = (noti: NotificationField): string => {
        const milliseconds = noti.createdAt.seconds * 1000 + noti.createdAt.nanoseconds / 1e6;
        const dateObject = new Date(milliseconds);

        const formattedDate = dateObject.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });

        return formattedDate; // Convert to a string in ISO format
      };

    const [messages, setMessages] = useState<NotificationField[]>([])

    useEffect(() => {
        const fetchNotification = async() => {
            const currentUserDoc = await getCurrentUserDocument()
            if(currentUserDoc){
                const NotificationWithDate = (currentUserDoc.notification.map((noti: NotificationField) => {
                    return {...noti, createdString: mapCreatedAtToString(noti)}
                }))

                NotificationWithDate.sort(sortByCreated)
                
                console.log(NotificationWithDate)

                setMessages(NotificationWithDate)
            }
        }
        fetchNotification()

    }, [])


    return ( 
        <div className="notification-container">
            <div className="notification">
                <h1>Inbox</h1>
                <div className="divider-nm" />
                <div className="inbox">
                    {messages && messages.length > 0 && messages.map((msg, index) => (
                        <InboxCard key={index} title={`Join request for ${msg.joining}`} from={msg.from} projectData={msg}/>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Notification;