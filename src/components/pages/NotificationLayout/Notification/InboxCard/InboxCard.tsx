import { useState } from "react";
import "./InboxCard.css"
import DefaultModal from "../../../../DefaultLayout/components/Modal/DefaultModal";
import uuid from "react-uuid";
import { getCurrentDisplayName, getCurrentUserUid } from "../../../../../lib/service/UserService";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";

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

interface InboxCardProps {
    title: string;
    from: string;
    projectData: NotificationField;
}

const InboxCard = ({title, from, projectData}:InboxCardProps) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAccept = async() => {
        const createdAt = new Date()
        const currentUserName = getCurrentDisplayName()
        const currentUserId = getCurrentUserUid()
        const respId = uuid()

        await updateDoc(doc(db, "users", projectData.fromId), {
            notification: arrayUnion({
                msgId: respId,
                from: currentUserName,
                fromId: currentUserId,
                message: `${currentUserName} has accepted your request to join ${projectData.joining}`,
                joining: projectData.joining,
                type: "response",
                read: false,
                createdAt: createdAt
            }),
            memberOfProject: arrayUnion({
                projectName: projectData.joining,
                projectUrl: projectData.projUrl
            })
        })

        const urlId = projectData.projUrl.split("/")[2]
        await updateDoc(doc(db, "projectGroup", urlId), {
            members: arrayUnion({
                user: projectData.from,
                userId: projectData.fromId
            })
        })

        setOpen(false)
    }

    const handleReject = async() => {
        const createdAt = new Date()
        const currentUserName = getCurrentDisplayName()
        const currentUserId = getCurrentUserUid()
        const respId = uuid()

        await updateDoc(doc(db, "users", projectData.fromId), {
            notification: arrayUnion({
                msgId: respId,
                from: currentUserName,
                fromId: currentUserId,
                message: `${currentUserName} has declined your request to join ${projectData.joining}`,
                joining: projectData.joining,
                type: "response",
                read: false,
                createdAt: createdAt
            })
        })

        setOpen(false)
    }

    const button = (
        <div>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleReject}>Reject</button>
        </div>
    )

    const inboxCard = projectData.type === "request" ? (
        (
            <div onClick={handleOpen} className="inbox-card">
                <span><h2>{title}</h2> <p>from {from}</p></span>
                {open && <div onClick={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                }} className="sheet"></div>}
                <DefaultModal open={open} setOpen={setOpen} title={`Join request for ${projectData.joining}`} buttons={button}/>
            </div>
        )
    ) : (
        (
            <div className="inbox-card">
                <span><h2>{title}</h2> <p>from {from}</p></span>
                {open && <div onClick={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                }} className="sheet"></div>}
                <DefaultModal open={open} setOpen={setOpen} title={`Join request for ${projectData.joining}`} buttons={button}/>
            </div>
        )
    )

    return ( 
        inboxCard
     );
}
 
export default InboxCard;