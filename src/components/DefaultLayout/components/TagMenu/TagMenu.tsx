import { useState } from "react";
import "./TagMenu.css"

interface TagMenuProps {
    items?: Array<string>;
    tags: Array<string>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

const TagMenu = ({ items, tags, setTags }:TagMenuProps) => {
    const [display, setDisplay] = useState(false)

    const handleSelected = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log("selected", e.currentTarget.textContent)
        if(e.currentTarget.textContent){
            const selectedTag = e.currentTarget.textContent
            if(tags.includes(selectedTag)){
                setTags((prev) => prev.filter((item) => item !== selectedTag))
            }else{
                setTags((prev) => [...prev, selectedTag])
            }
        }
    }

    const handleClickCarrot = () => {
        setDisplay((prev) => !prev)
    }

    return ( 
        <div className="tag-menu-container">
            <div className={`selected-area`} onClick={handleClickCarrot}>
                <div className="tag-container">
                    {tags && tags.length > 0 && tags.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
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
 
export default TagMenu;