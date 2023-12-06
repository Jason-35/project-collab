import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import RecommendedProjects from "../RecommendedProjects";
import Friends from "../Friends";
import Activity from "../Activity";
import { useState } from "react";
import BottomBar from "../BottomBar";

const Home = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const navigate = useNavigate()
    
    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
    })

    let screen = <></>

    if(width < 1200){
        screen = (
        <div className="container-with-nav">
            
            <NavigationBar />
            <SideBar />
            
            <BottomBar />
        </div>
        )
    }else{
        screen = (
            <div className="container-with-nav">
                <NavigationBar />
                <SideBar />
                <div>
                    {width}
                    <div>
                        <RecommendedProjects />
                    </div>
                    <div>
                        <Friends />
                        <Activity />
                    </div>
                </div>
            </div>
        ) 
    }

    return (
    screen
      );
}
 
export default Home;