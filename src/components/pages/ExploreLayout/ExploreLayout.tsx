import DefaultLayout from "../../DefaultLayout/DefaultLayout";
import Explore from "./components/Explore";
import SearchBar from "./components/SearchBar";
import "./ExploreLayout.css"

const ExploreLayout = () => {


    const layout = (
    <div className="explore-layout">
        <SearchBar />
        <Explore />
    </div>
    )

    return ( 
        <DefaultLayout component={layout} />
     );
}
 
export default ExploreLayout;