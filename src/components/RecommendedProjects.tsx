import { query, collection, getDocs, where, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

const RecommendedProjects = () => {

    const [recommend, setRecommend] = useState<DocumentData>([])
    
    useEffect(() => {
        const fetchData = async() => {
            if(auth.currentUser) {
                const userQuery = query(collection(db, "users"), where("name", "==", auth.currentUser.displayName))
                const docs = await getDocs(userQuery)
                const level = docs.docs[0].data().level

  
                console.log(level)
                const levelQuery = query(collection(db, "group"), where("group.level", "==", level))
                const levelDocs = await getDocs(levelQuery)
                const documentArray = levelDocs.docs.map(doc => doc.data())
                setRecommend(documentArray)
                
            }
        }


        if(recommend.length < 1){
            console.log("run")
            fetchData()
        }
    })

    return ( 
    <div>
        <h2>Recommended Projects</h2>
        {recommend.map((rec: DocumentData, index: number) => (
            <div key={index}>
                {rec.group.projectName}
            </div>
        ))}
    </div>
     );
}
 
export default RecommendedProjects;