import { DocumentData, arrayUnion, doc, updateDoc } from "firebase/firestore";
import "../styles/RequestToJoinModal.css"
import React from "react"
import { db } from "../firebase/firebase";
import { getCurrentDisplayName, getCurrentUserUid } from "../lib/service/UserService";
import { db_collections } from "../constants/constant";
 
const RequestToJoinModal = ({setOpenModal, openModal, selectedProj} : {setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, openModal: boolean, selectedProj: DocumentData | null}) => {


    const joinRequest = async() => {
        const createdAt = new Date()
        const currentUserName = getCurrentDisplayName()
        const userId = getCurrentUserUid()
        if(selectedProj){
            await updateDoc(doc(db, db_collections.USERS, selectedProj.ownerId), {
                notification: arrayUnion({
                from: currentUserName,
                fromId: userId,
                message: "I want to join!",
                joining: selectedProj.projectData.projectName,
                type: "request",
                read: false,
                createdAt: createdAt
                })
            })
        }
        setOpenModal(false)
    }
    

    const isOpen = openModal ? (
    <div className="transparent-sheet center">
        <div className="join-card">
            <button onClick={() => setOpenModal(false)}>X</button>
            <div>
                <div>
                    {selectedProj?.projectData.projectName}
                    Description: 
                </div>
                <div>
                    message:
                    <input type="text" />
                </div>
                <button onClick={joinRequest}>Request</button>
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