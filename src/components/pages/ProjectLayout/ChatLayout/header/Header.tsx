import { UsersRound } from "lucide-react";
import "./Header.css"
interface HeaderProps {
    title: string;
    setShowMembers: React.Dispatch<React.SetStateAction<boolean>> 
}

const Header = ( { title, setShowMembers }: HeaderProps ) => {
    return ( 
        <div className="header">
            <div className="title">{title}</div> 
            <UsersRound className="members" onClick={() => setShowMembers(prev => !prev)} />
        </div>
     );
}

export default Header;