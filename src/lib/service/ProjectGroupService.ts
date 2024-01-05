import { query, collection, getDocs, orderBy, DocumentData, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export const getAllProjectGroups = async () =>{
    const projectGroupQuery = query(collection(db, "projectGroup"), orderBy("createdAt", "desc"))
    
    try {
        const projects: DocumentData[] = []
        const projectGroupDocuments = await getDocs(projectGroupQuery)
        
        projectGroupDocuments.forEach((project) => {
            projects.push(project.data())
        })
        
        return projects
    } catch (error) {
        console.log("ERROR GETTING ALL PROJECTS ", error)
    }
}

export const getCurrentProject = async(docId: string) => {
    const projectDocRef = doc(db, "projectGroup", docId)
    try {
        const doc = await getDoc(projectDocRef)
        return doc.data()
    } catch (error) {
        console.log(error)
    }
}

export const getProjectFeature = async(docId: string) => {
    const featureDocRef = doc(db, "projectGroup", docId)
    try {
        // const features: FeatureFields[] = []
        const featureDocuments = (await getDoc(featureDocRef))
        if(featureDocuments){
            const featureData = featureDocuments.data()
            if(featureData){
                const featureArray = featureData.features
                if(featureArray){
                    console.log(featureArray)
                    return featureArray   
                }
            }
        }

        return []
        
    } catch (error) {
        console.log(error)
    }
}

interface date {
    seconds: number;
    nanoseconds: number
}

export const getLogs = async(docId: string) => {
    const logRef = doc(db, "projectGroup", docId)
    try {
        const logDoc = await getDoc(logRef)
        if(logDoc){
            const logData = logDoc.data()
            if(logData){
                const logArray = logData.logs
                if(logArray){
                    const sortedArray = logArray.sort((a: date, b: date) => {
                        const timestampA = a.seconds * 1e9 + a.nanoseconds;
                        const timestampB = b.seconds * 1e9 + b.nanoseconds;
                        return timestampA - timestampB;
                    })
                    return sortedArray
                }
            }
        }
        return []
    } catch (error) {
        console.log(error)
    }
}