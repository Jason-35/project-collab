import { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import { getCurrentUserDocument } from "../../lib/service/UserService";
import MessageCard from "../MessageCard";

interface CreatedField {
    seconds: number,
    nanoseconds: number
}

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
    createdString: string
}

const Notification = () => {

    const sortByCreated = (a: CreatedField, b: CreatedField) => {
        return a.nanoseconds - b.nanoseconds;
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
                }).sort(sortByCreated))
                setMessages(NotificationWithDate)
                console.log(NotificationWithDate)
            }
        }
        fetchNotification()

    }, [])

    return ( 
    <div>
        <NavigationBar />
        <SideBar />
        <div>
            {messages && messages.length > 0 && messages.map((msg) => (
                <MessageCard
                createdString={msg.createdString}
                from={msg.from} 
                fromId={msg.fromId}
                type={msg.type}
                read={msg.read}
                joining={msg.joining}
                message={msg.message}
                />
            ))}
        </div>
    </div>
     );
}
 
export default Notification;