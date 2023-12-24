import "./InboxCard.css"

interface InboxCardProps {
    title: string;
    from: string
}

const InboxCard = ({title, from}:InboxCardProps) => {
    return ( 
        <div className="inbox-card">
            <span><h2>{title}</h2> <p>from {from}</p></span>
        </div>
     );
}
 
export default InboxCard;