import { useParams } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { db } from "../../firebase/firebase";
import { query, collection, limit } from "firebase/firestore";

const ProjectLayout = () => {

    const { uuid, name } = useParams()

    // const messageRef = db.collection("messages")
    const messageRef = query(collection(db, "messages"), limit(10))

    const [messages] = useCollectionData(messageRef)

    console.log(name, uuid)
    console.log(messages)
    return ( 
        <div>start of a new project {messages && (messages.length > 0) && messages[0].message}</div>
     );
}
 
export default ProjectLayout;