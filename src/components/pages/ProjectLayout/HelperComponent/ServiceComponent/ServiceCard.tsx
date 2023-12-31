import { useState } from "react";
import DefaultModal from "../../../../DefaultLayout/components/Modal/DefaultModal";
import "./ServiceCard.css"
import { getCurrentDisplayName } from "../../../../../lib/service/UserService";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../../firebase/firebase";
import { getProjectFeature } from "../../../../../lib/service/ProjectGroupService";


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

interface ServiceCardProps {
    title: string;
    assigned?: string;
    click?: boolean;
    type: string;
    desc?: string;
    features? : FeatureFields[];
    index? : number;
    setRerender?: React.Dispatch<React.SetStateAction<boolean>>;
    rerender?: boolean
    id: string;
    setUpdatedAssignmet?: React.Dispatch<React.SetStateAction<boolean>>
    setForce?: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceCard = ({setForce, title, assigned, click=true, type, desc, index, features, rerender, setRerender, id, setUpdatedAssignmet}: ServiceCardProps) => {

    const { uuid } = useParams()
    const user = getCurrentDisplayName()

    const [open, setOpen] = useState(false)

    const handleTakeAssignment = async() => {
        if(features){
            const featureCopy = [...features]
            if(index || index == 0){
                const createdAt = new Date()
                if(user)featureCopy[index]["assigned"] = user
                await updateDoc(doc(db, "projectGroup", String(uuid)), {
                    features: featureCopy,
                    logs: arrayUnion({
                        user: user,
                        task: title,
                        action: "Accepted Assignment",
                        createdAt: createdAt,
                    })
                })
            }
            setOpen(false)
            if(setRerender){
                setRerender(!rerender)
            }
            if(setForce) setForce(true)
        }
    }

    const handleDeleteFeature = async() => {
        if(features && (index || index == 0)){
            const featureCopy = [...features]
            featureCopy.splice(index, 1)
            const createdAt = new Date()
            await updateDoc(doc(db, "projectGroup", String(uuid)), {
                features: featureCopy,
                logs: arrayUnion({
                    user: user,
                    task: title,
                    action: `Deleted Feature ${title}`,
                    createdAt: createdAt,
                })
            })
            setOpen(false)
            if(setRerender){
                setRerender(!rerender)
            }
        }
    }

    const handleDone = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        const createdAt = new Date()
        const AllFeatures = await getProjectFeature(String(uuid))
        const copyFeature = AllFeatures.filter((obj: FeatureFields) => obj.id !== id)
        // console.log(copyFeature)
        await updateDoc(doc(db, "projectGroup", String(uuid)), {
            features: copyFeature,
            logs: arrayUnion({
                user: user,
                task: title,
                action: `Finished Feature ${title}`,
                createdAt: createdAt,
            })
        })
        if(setRerender){
            setRerender(!rerender)
        }
        setOpen(false)
    }

    const handleForfeit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        const createdAt = new Date()
        const AllFeatures = await getProjectFeature(String(uuid))
        const copyFeature = AllFeatures.map((obj: FeatureFields) => obj.id === id ? {...obj, ["assigned"]: ""} : obj)
        await updateDoc(doc(db, "projectGroup", String(uuid)), {
            features: copyFeature,
            logs: arrayUnion({
                user: user,
                task: title,
                action: `Forfeited Feature ${title}`,
                createdAt: createdAt,
            })
        })
        if(setRerender) setRerender(!rerender)
        if(setUpdatedAssignmet){
            setUpdatedAssignmet(true)
        }
        setOpen(false)
    }

    let content;
    let button;

    if(type === "feature"){
        content =(
            <div>
                <p className="desc">{desc}</p>
                {assigned ? <div style={{textAlign: "center"}}>
                    This assignment is taken
                </div> : <div style={{textAlign: "center"}}>
                    Accept this assignment?
                </div>}
            </div>
            )

        button = assigned ? (
            <div>
                <button onClick={handleDeleteFeature}>Delete Feature</button>
            </div>
            ) : 
            (
            <div>
                <button onClick={handleTakeAssignment}>Take Assignment</button>
                <button onClick={handleDeleteFeature}>Delete Feature</button>
            </div>
            )
    }else if(type === "assignment"){
        button = (
            <div>
                <button onClick={handleDone}>Done</button>
                <button onClick={handleForfeit}>Forfeit</button>
            </div>
        )

        content = (
            <div>
                <p className="desc">{desc}</p>
            </div>
        )
    }

    const clickService = click ? (
        <div className="service-card" onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
        }}>
                <div className="service-title">
                    <h2>{title}</h2>
                </div>
                <div className="assigned">
                    {assigned}
                </div>
                <DefaultModal open={open} setOpen={setOpen} title={title} content={content} buttons={button}/>
            </div>
    ) : (
        <div className="service-card no-hover">
                <div className="service-title">
                    <h2>{title}</h2>
                </div>
                <div className="assigned">
                    {assigned}
                </div>
            </div>
    )

    return ( 
        <div className="service-container">
            {clickService}
        </div>
     );
}
 
export default ServiceCard;