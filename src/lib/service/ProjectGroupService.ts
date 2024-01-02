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