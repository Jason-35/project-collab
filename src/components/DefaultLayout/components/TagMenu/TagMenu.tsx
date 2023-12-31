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
        if(e.currentTarget.textContent){
            const selectedTag = e.currentTarget.textContent
            if(tags.includes(selectedTag)){
                console.log("includes")
                setTags((prev) => prev.filter((item) => item !== selectedTag))
            }else{
                console.log("adding")
                setTags((prev) => [...prev, selectedTag])
            }
            // console.log(tags)
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
            <ul className="dropdown-selection-menu">
                {items && items.length > 0 && items.map((item, index) => (
                    <li onClick={handleSelected} key={index}>{item}</li>
                ))}
            </ul>
            }
        </div>
     );
}
 
export default TagMenu;