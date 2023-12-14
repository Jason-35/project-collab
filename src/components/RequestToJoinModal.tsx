import { DocumentData, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import "../styles/RequestToJoinModal.css"
import React from "react"
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


const RequestToJoinModal = ({setOpenModal, openModal, selectedProj} : {setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, openModal: boolean, selectedProj: DocumentData | null}) => {
    const navigate = useNavigate()

    // const joinRequest = async() => {
    //     if(selectedProj){
    //         const userCollection = query(collection(db, "users"), where("name", "==", selectedProj.owner))
    //         const userArray = await getDocs(userCollection);
    //         await updateDoc(doc(db, "users", userArray.docs[0].id), {
    //             notification: arrayUnion(
    //                 {
    //                     name: auth.currentUser?.displayName,
    //                     message: "I want to join!",
    //                     joining: selectedProj.group.projectName,
    //                     type: "request",
    //                     read: false
    //                 }
    //             )
    //         })

    //     }
    // }
    

    // This is temperarily for getting started on rooms
    const joiningRoom = async() => {
        // console.log(selectedProj?.group.projectName)
        if(selectedProj){
            const projRoom = query(collection(db, "group"), where("group.projectName", "==", selectedProj.group.projectName))
            const projDoc = await getDocs(projRoom);
            await updateDoc(doc(db, "group", projDoc.docs[0].id), {
                members: arrayUnion(auth.currentUser?.displayName)
            })


            const userCollection = query(collection(db, "users"), where("name", "==", selectedProj.owner))
            const userArray = await getDocs(userCollection);
            await updateDoc(doc(db, "users", userArray.docs[0].id), {
                membersOf: arrayUnion(projDoc.docs[0].id)
            })

            navigate(`${selectedProj.url}`)

        }
    }

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
                <button onClick={joiningRoom}>Request</button>
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