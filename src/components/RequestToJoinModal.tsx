import { DocumentData } from "firebase/firestore";
import "../styles/RequestToJoinModal.css"
import React from "react"


const RequestToJoinModal = ({setOpenModal, openModal, selectedProj} : {setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, openModal: boolean, selectedProj: DocumentData | null}) => {
    const isOpen = openModal ? (
    <div className="transparent-sheet center">
        <div className="join-card">
            <button onClick={() => setOpenModal(false)}>X</button>
            <div>
                <div>
                    {selectedProj?.group.projectName}
                    Description: 
                </div>
                <div>
                    message:
                    <input type="text" />
                </div>
                <button>Request</button>
                <button onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
    ) : (
    <div></div>
    )

    return ( 
        isOpen
     );
}
 
export default RequestToJoinModal;