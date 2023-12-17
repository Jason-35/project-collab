import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import RecommendedProjects from "../RecommendedProjects";
import Friends from "../Friends";
import Activity from "../Activity";
import { useState } from "react";
import BottomBar from "../BottomBar";

interface MobilePage {
    [key: string]: JSX.Element;
}
const Home = () => {

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    const [width, setWidth] = useState(window.innerWidth)
    const [pageType, setPageType] = useState<string>("recommend")
    const navigate = useNavigate()

    const mobilePage: MobilePage = {
        "home" : <RecommendedProjects />,
        "friends" : <Friends />,
        "activity" : <Activity />
    }
    

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
    })

    let screen = <></>

    if(width < 1200){
        screen = (
        <div className="container-with-nav">
            
            <NavigationBar />
            <SideBar />

            {mobilePage[pageType]}
            <BottomBar setPageType={setPageType}/>
        </div>
        )
    }else{
        screen = (
            <div className="container-with-nav">
                <NavigationBar />
                <SideBar />
                <div>
                    <div>
                        <RecommendedProjects />
                    </div>
                    <div>
                        ----------------
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