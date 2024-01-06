// import { v4 as uuid } from "uuid";
import { v4 as featureId } from "uuid"
import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Features.css"
import "../HelperComponent/common.css"
import DefaultModal from "../../../DefaultLayout/components/Modal/DefaultModal";
import { useEffect, useState } from "react";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebase";
import { getCurrentDisplayName } from "../../../../lib/service/UserService";

interface FeatureFields {
    name: string;
    description: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
    assigned: string;
    id: string
}

interface renderingProps {
    rerender: boolean
    setRerender: React.Dispatch<React.SetStateAction<boolean>>
    updatedAssignment: boolean
    setUpdatedAssignment: React.Dispatch<React.SetStateAction<boolean>>
}


const Features = ({rerender, setRerender, setUpdatedAssignment, updatedAssignment}:renderingProps) => {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const { uuid } = useParams()
    const [features, setFeatures] = useState<FeatureFields[]>([])
    const [adding, setAdding] = useState(false)



    // unsub();

    useEffect(() => {

        onSnapshot(doc(db, "projectGroup", String(uuid)) , (doc) => {
            // console.log("yo")
            const featureItem = doc.data()?.features
            if(featureItem){
                if(features && features.length !== featureItem.length){
                    setFeatures(featureItem)
                }
                if(updatedAssignment){
                    setFeatures(featureItem)
                    setUpdatedAssignment(false)
                }
            }
            

        })
       
    }, [adding, features, rerender, setUpdatedAssignment, updatedAssignment, uuid])

    const handleAdd = async() => {
        setAdding(true)
        const FeatureId = featureId()
        const createdAt = new Date()
        const user = getCurrentDisplayName()
        await updateDoc(doc(db, "projectGroup", String(uuid)), {
            features: arrayUnion({
                id: FeatureId,
                name: name,
                description: description,
                createdAt: createdAt,
                assigned: ""
            }),
            logs: arrayUnion({
                id: FeatureId,
                user: user,
                task: name,
                action: `Added feature ${name}`,
                createdAt: createdAt,
            })
        })
        setOpen(false)
        setRerender(!rerender)
        setAdding(false)
    }

    const content = (
        <div>
            <div className="form-center">
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
            </div>
            <div className="form-center">
                <label>Description</label>
                <textarea name="" id="" cols={40} rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>
    )

    const button = (
        <button onClick={handleAdd}>Add</button>
    )

    return ( 
        <div className="common-component">
            <div className="common-container">
                <button className="common-btn" onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }}>Add</button>
                <Headings title="Features" />
                <div className="cards no-scrollbar no-scroll">
                    {features && features.length > 0 && features.map((item, index) => (
                        <ServiceCard id={item.id} rerender={rerender} setRerender={setRerender} index={index} features={features} type="feature" key={index} title={item.name} assigned={item.assigned} desc={item.description}/>
                    ))}
                </div>
                <DefaultModal open={open} setOpen={setOpen} title="Add A Feature" buttons={button} content={content}/>
            </div>
        </div>
     );
}
 
export default Features;