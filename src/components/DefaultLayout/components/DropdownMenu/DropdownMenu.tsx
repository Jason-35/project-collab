import { useState } from "react";
import "./DropdownMenu.css"


interface FormData {
    projectName: string;
    level: string;
    tags: string[];
    description: string;
    url: string;
    max: number,
    repository: string
}


interface DropdownMenuProps {
    items?: Array<string>;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
    setForm?: React.Dispatch<React.SetStateAction<FormData>>;
    formData? : FormData
}


const DropdownMenu = ({ items, selected, setSelected, setForm, formData }:DropdownMenuProps) => {
    const [display, setDisplay] = useState(false)

    const handleSelected = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(e.currentTarget.textContent){
            setSelected(e.currentTarget.textContent)
            if(setForm && formData){
                setForm({...formData, ["level"]: e.currentTarget.textContent})
            }
        }
        setDisplay(false)

    }

    const handleClickCarrot = () => {
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