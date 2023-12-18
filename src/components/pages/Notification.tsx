import { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import { getCurrentUserDocument } from "../../lib/service/UserService";
import MessageCard from "../MessageCard";
import "../../styles/Notification.css"


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
    <div>
        <NavigationBar />
        <SideBar />
        <div className="message-container">
            <input placeholder="search..." />
            {messages && messages.length > 0 && messages.map((msg, index) => (
                <MessageCard
                key={index}
                createdString={msg.createdString}
                from={msg.from} 
                fromId={msg.fromId}
                type={msg.type}
                read={msg.read}
                joining={msg.joining}
                message={msg.message}
                msgId={msg.msgId}
                projUrl={msg.projUrl}
                />
            ))}
        </div>
    </div>
     );
}
 
export default Notification;