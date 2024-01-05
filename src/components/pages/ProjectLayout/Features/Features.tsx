import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Features.css"
import "../HelperComponent/common.css"
import DefaultModal from "../../../DefaultLayout/components/Modal/DefaultModal";
import { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase/firebase";
import { getProjectFeature } from "../../../../lib/service/ProjectGroupService";
import { getCurrentDisplayName } from "../../../../lib/service/UserService";

interface FeatureFields {
    name: string;
    description: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
    assigned: string
}


const Features = ({rerender, setRerender}:{rerender: boolean, setRerender: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const { uuid } = useParams()
    const [features, setFeatures] = useState<FeatureFields[]>([])
    // const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const getFeatures = async() => {
            const featureItem = await getProjectFeature(String(uuid))
            if(featureItem){
                // prevents the infinite rerendering
                if(features && (features.length !== featureItem.length)){
                    setFeatures(featureItem)
                    setName("")
                    setDescription("")
                }
            }
        }

        getFeatures()
    })

    const handleAdd = async() => {
        const createdAt = new Date()
        const user = getCurrentDisplayName()
        await updateDoc(doc(db, "projectGroup", String(uuid)), {
            features: arrayUnion({
                name: name,
                description: description,
                createdAt: createdAt,
                assigned: ""
            }),
            logs: arrayUnion({
                user: user,
                task: name,
                action: `Added feature ${name}`,
                createdAt: createdAt,
            })
        })
        setOpen(false)
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
                        <ServiceCard rerender={rerender} setRerender={setRerender} index={index} features={features} type="feature" key={index} title={item.name} assigned={item.assigned} desc={item.description}/>
                    ))}
                </div>
                <DefaultModal open={open} setOpen={setOpen} title="Add A Feature" buttons={button} content={content}/>
            </div>
        </div>
     );
}
 
export default Features;