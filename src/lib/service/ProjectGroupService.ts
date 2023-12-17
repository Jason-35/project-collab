import { query, collection, getDocs, orderBy, DocumentData } from "firebase/firestore"
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