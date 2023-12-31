import { useState } from "react";
import "./InboxCard.css"
import DefaultModal from "../../../../DefaultLayout/components/Modal/DefaultModal";

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

    const button = (
        <div>
            <button>Accept</button>
            <button>Reject</button>
        </div>
    )

    return ( 
        <div onClick={handleOpen} className="inbox-card">
            <span><h2>{title}</h2> <p>from {from}</p></span>
            {open && <div onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
            }} className="sheet"></div>}
            <DefaultModal open={open} setOpen={setOpen} title={`Join request for ${projectData.joining}`} buttons={button}/>
        </div>
     );
}
 
export default InboxCard;