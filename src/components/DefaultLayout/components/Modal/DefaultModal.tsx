import { X } from "lucide-react";
import "./DefaultModal.css"

interface DefaultModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    heading?: JSX.Element;
    title: string;
    content?: JSX.Element;
    buttons?: JSX.Element;
}

const DefaultModal = ({open, setOpen, heading, title, content, buttons}: DefaultModalProps) => {


    const modal = open ? (
        <div className="default-modal">
            <div className="modal-header">
                <h1>{title}</h1>
                {heading}
                <X className="x-button" onClick={() => setOpen(false)} />
            </div>

            <div className="modal-content">
                {content}
            </div>

            <div className="modal-buttons">
                {buttons}
            </div>
            
        </div>
    ) : (<></>)

    return ( 
        modal
     );
}
 
export default DefaultModal;