import { useState } from "react";
import "./DropdownMenu.css"

interface DropdownMenuProps {
    items?: Array<string>;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const DropdownMenu = ({ items, selected, setSelected }:DropdownMenuProps) => {
    const [display, setDisplay] = useState(false)

    const handleSelected = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(e.currentTarget.textContent){
            setSelected(e.currentTarget.textContent)
        }
        console.log(display)
        setDisplay(false)

    }

    const handleClickCarrot = () => {
        console.log("hiya")
        setDisplay((prev) => !prev)
    }

    return ( 
        <div className="dropdown-container">
            <div className={`selected-area`} onClick={handleClickCarrot}>
                <span>{selected}</span>
                <div className={`carrot ${display && "carrot-rotate"}`}></div>
            </div>
            {display && 
            <ul className="dropdown-selection">
                {items && items.length > 0 && items.map((item, index) => (
                    <li onClick={handleSelected} key={index}>{item}</li>
                ))}
            </ul>
            }
        </div>
     );
}
 
export default DropdownMenu;