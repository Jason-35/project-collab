import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import RecommendedProjects from "../RecommendedProjects";
import ProjectRooms from "../ProjectRooms";

const Home = () => {
    const navigate = useNavigate()
    
    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })


    return (
    <div className="container-with-nav">
        <NavigationBar />
        <SideBar />
        <RecommendedProjects />
        <ProjectRooms />
    </div>
      );
}
 
export default Home;