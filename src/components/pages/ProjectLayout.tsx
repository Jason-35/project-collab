import { useParams } from "react-router-dom";

const ProjectLayout = () => {

    const { uuid, name } = useParams()

    console.log(name, uuid)

    return ( 
        <div>start of a new project</div>
     );
}
 
export default ProjectLayout;