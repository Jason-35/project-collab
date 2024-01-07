import Avatar from "react-avatar";
import DefaultLayout from "../../DefaultLayout/DefaultLayout";
import "./Profile.css"
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getCurrentUserDocument, getCurrentUserUid } from "../../../lib/service/UserService";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { Autocomplete, TextField } from "@mui/material";
import jsonData from "../../../assets/skills.json"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";
import { db, storage } from "../../../firebase/firebase";
import { useRerender } from "../../../lib/hooks/nav-rerender-hook";
import { useNavigate } from "react-router-dom";
const Profile = () => {

    const [user, setUser] = useState<DocumentData>()
    const [bio, setBio] = useState("")
    const [skillLevel, setSkillLevel] = useState("")
    const [skills, setSkills ] = useState<string[]>([])
    const input = useRef<HTMLInputElement>(null)

    const [imgFile, setImgFile] = useState<File | null>(null)
    const [img, setImg] = useState("")
    const [changeImage, setChangeImg] = useState(false)

    const {rerender, setRerender} = useRerender()
    const navigate = useNavigate()

    useEffect(() => {
        const getUserProfile = async() => {
            if(user === undefined){
                const userProfile = await getCurrentUserDocument()
                setUser(userProfile)
                setBio(userProfile?.bio)
                setSkillLevel(userProfile?.level)
                setSkills(userProfile?.skills)
                setImg(userProfile?.imgUrl)
            }else{
                // console.log(user)
            }
        }

        getUserProfile()
    })

    const handleLevelSelect = (level: string) => {
        setSkillLevel(level)
    }

    const isSelected = (id: string) => {
        return skillLevel === id ? "selected" : "not-selected"  
    }

    const handleSelectedSkill = (event: SyntheticEvent<Element, Event>, value: { label: string } | null): void => {
        if(value?.label && !skills.includes(value.label) && event){
            setSkills((prevSkill) => [...prevSkill, value.label])
        }
    }

    const handleRemoveSkill = (item: string) => {
        const skillIndex = skills.indexOf(item)
        skills.splice(skillIndex, 1)
        setSkills((prevSkill) => [...prevSkill])
    }

    const handleFileInput = () => {
        if(input.current){
            input.current.click()
        }
    }

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const file = (event.target.files[0])
            setImgFile(file)
            const reader = new FileReader()

            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                  setImg(result);
                }
            };

            reader.readAsDataURL(file)
            setChangeImg(true)

        }

    }

    const handleSave = async() => {
        const userId = getCurrentUserUid()
        await updateDoc(doc(db, "users", userId), {
            bio: bio,
            level: skillLevel,
            skills: skills,
        })

        if(changeImage){
            let imgUrl = ""
            const uid = uuid()
            const storageRef = ref(storage, `avatar/${uid}`)
            if(imgFile){
                await uploadBytes(storageRef, imgFile)
                imgUrl = await getDownloadURL(storageRef)
            }
            await updateDoc(doc(db, "users", userId), {
                imgUrl: imgUrl
            })
        }

        setRerender(!rerender)
        navigate("/home")

    }


    const layout = (
        <div className="profile-layout">
            <div className="profile-avatar">
                <div className="avatar-input">
                    <Avatar src={img} round={true} name={user?.name} size="200"/>
                    <div className="avatar-input">
                        <input ref={input} onChange={handleImage} type="file" style={{ display: "none" }}/>
                        <button onClick={handleFileInput} className="file-upload-btn">Browse</button>
                        <br />
                        <label >Change image</label>
                    </div>
                </div>
            </div>
            <div className="bio">
                <label>Bio</label> <br />
                <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        className="bioText"
                        value={bio}
                        onChange={(e) => {setBio(e.target.value)}}
                    />
            </div>
            <div className="level">
                <label>level</label>
                <div className="level-btns">
                    <button onClick={() => handleLevelSelect("beginner")} id={isSelected("beginner")}>Beginner</button>
                    <button onClick={() => handleLevelSelect("intermediate")} id={isSelected("intermediate")}>Intermediate</button>
                    <button onClick={() => handleLevelSelect("expert")} id={isSelected("expert")}>Expert</button>
                </div>
            </div>
            <div className="skills">
                <div>
                    <div>
                        <Autocomplete
                            disablePortal
                            options={jsonData}
                            sx={{ width: 300, backgroundColor: "white"}}
                            renderInput={({ inputProps, ...rest}) => <TextField {...rest} inputProps={{...inputProps, readOnly:true}}/>}
                            onChange={handleSelectedSkill}
                        />
                    </div>
                    <div className="skill-container">
                        {skills.map((skill:string, index:number) => (
                            <button onClick={() => handleRemoveSkill(skill)} key={index}>{skill}</button>
                        ))}
                    </div>
                </div>
            </div>
            <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
    )

    return ( 
        <div>
            <DefaultLayout component={layout} />
        </div>
     );
}
 
export default Profile;