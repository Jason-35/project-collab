import { UsersRound } from "lucide-react";
import "./Header.css"
interface HeaderProps {
    title: string
}

const Header = ( { title }:HeaderProps ) => {
    return ( 
        <div className="header">
            <div className="title">{title}</div> 
            <UsersRound className="members" />
        </div>
     );
}
 
export default Header;