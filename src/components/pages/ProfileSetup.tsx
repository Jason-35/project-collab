import "../../styles/ProfileSetup.css"
import KittyComp from "../../assets/kitty-computer-256.png"
import Cool from "../../assets/cool.png"
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import Avatar from "react-avatar"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Autocomplete, TextField } from "@mui/material"
import KittyWrite from "../../assets/kitty-write.png"
import jsonData from "../../assets/skills.json"
import { query, collection, where, getDocs, updateDoc, doc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { db, storage } from "../../firebase/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 as uuid } from "uuid";

const ProfileSetup = () => {

    const welcome = useRef<HTMLDivElement>(null)
    const avatar = useRef<HTMLDivElement>(null)
    const level = useRef<HTMLDivElement>(null)
    const skill = useRef<HTMLDivElement>(null)
    const bio = useRef<HTMLDivElement>(null)
    const finish = useRef<HTMLDivElement>(null)
    const input = useRef<HTMLInputElement>(null)

    const [img, setImg] = useState("")
    const [skillLevel, setSkillLevel] = useState("beginner")
    const [skills, setSkills ] = useState<string[]>([])
    const [bioText, setBioText] = useState("") 
    const [imgFile, setImgFile] = useState<File | null>(null)

    const navigate = useNavigate()
    const auth = getAuth()


       
    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })
    
    let username = ""
    if(auth.currentUser?.displayName){
        username = auth.currentUser.displayName
    }

    const handleWelcome = () => {
        if(welcome.current && avatar.current){
            welcome.current.className = welcome.current.className + " slide-out"
            setTimeout(() => {
                if(avatar.current){
                    avatar.current.className = avatar.current.className + " slide-in"
                }
            }, 100)

        }
        
    }

    const handleAvatar = () => {
        if(avatar.current){
            avatar.current.className = avatar.current.className + " slide-out"
            setTimeout(() => {
                if(level.current){
                    level.current.className = level.current.className + " slide-in"
                }
            }, 100)
        }
    }

    const handleLevel = () => {
        if(level.current){
            level.current.className = level.current.className + " slide-out"
            setTimeout(() => {
                if(skill.current){
                    skill.current.className = skill.current.className + " slide-in"
                }
            }, 100)
        }
    }

    const handleSkills = () => {
        if(skill.current){
            skill.current.className = skill.current.className + " slide-out"
            setTimeout(() => {
                if(bio.current){
                    bio.current.className = bio.current.className + " slide-in"
                }
            }, 100)
        }
    }

    const handleBio = () => {
        // save the text into the database
        console.log(bioText)
        if(bio.current){
            bio.current.className = bio.current.className + " slide-out"
            setTimeout(() => {
                if(finish.current){
                    finish.current.className = finish.current.className + " slide-in"
                }
            }, 100)
        }
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

        }

    }

    const handleLevelSelect = (level: string) => {
        setSkillLevel(level)
    }

    const isSelected = (id: string) => {
        return skillLevel === id ? "selected" : "not-selected"  
    }

    const handleBioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBioText(event.target.value)
    }

    const handleSelectedSkill = (event: SyntheticEvent<Element, Event>, value: { label: string } | null): void => {
        if(value?.label && !skills.includes(value.label)){
            setSkills((prevSkill) => [...prevSkill, value.label])
        }
    }

    const handleRemoveSkill = (item: string) => {
        const skillIndex = skills.indexOf(item)
        console.log(skillIndex, skills)
        skills.splice(skillIndex, 1)
        setSkills((prevSkill) => [...prevSkill])
    }

    const handleDone = async() => {
        let documnet : QueryDocumentSnapshot<DocumentData, DocumentData>;
        if(auth.currentUser){
            const userCollection = query(collection(db, "users"), where("name", "==", auth.currentUser.displayName))
            await getDocs(userCollection).then((obj) => {
                obj.forEach((doc) => {
                    documnet = doc
                })
            })
            .then(async () => { 
                await updateDoc(doc(db, "users", documnet.id), {
                    bio: bioText,
                    level: skillLevel,
                    skills: skills,
                    finishSetup: true,

                })
            });

            const uid = uuid()
            const storageRef = ref(storage, `avatar/${uid}`)
            if(imgFile){
                uploadBytes(storageRef, imgFile).then(async() => {
                    getDownloadURL(storageRef).then(async(url) => {
                        
                        await updateDoc(doc(db, "users", documnet.id), {
                            imgUrl: url
                        }).then(() => {
                            
                        })
                    })
                })
            }

            navigate("/home")

        }
    
    }

    return ( 
        <div className="container">
            <div ref={welcome} className="card" id="welcome-card">
                <div className="card-heading">
                    <h1>Welcome! <br/> Lets setup your profile</h1>
                </div>
                <div className="card-item">
                    <img src={KittyComp} alt="" />
                </div>
                <div className="card-btn">
                    <button className="next-btn" onClick={handleWelcome}>Lets Go!</button>
                </div>
            </div>
            <div ref={avatar} className="card out-of-view" id="avatar-card">
                <div className="card-heading">
                    <h1>Avatar Setup</h1>
                </div>
                <div className="card-item">
                    <Avatar src={img} round={true} name={username} size="200"/>
                </div>
                <div className="input-file">
                    <input ref={input} type="file" onChange={handleImage} style={{ display: "none" }}/>
                    <button className="file-upload-btn" onClick={handleFileInput}>Browse</button>
                    <label >Choose an image</label>
                </div>
                <div className="card-btn">
                    <button className="next-btn" onClick={handleAvatar}>Next</button>
                </div>
            </div>
            <div ref={level} className="card out-of-view" id="level-card">
                <div className="card-heading">
                    <h1>What is your current level</h1>
                </div>
                <div className="card-item">
                    <div className="level-btns">
                        <button onClick={() => handleLevelSelect("beginner")} id={isSelected("beginner")}>Beginner</button>
                        <button onClick={() => handleLevelSelect("intermediate")} id={isSelected("intermediate")}>Intermediate</button>
                        <button onClick={() => handleLevelSelect("expert")} id={isSelected("expert")}>Expert</button>
                    </div>
                </div>
                <div className="card-btn">
                    <button onClick={handleLevel} className="next-btn">Next</button>
                </div>
            </div>
            <div ref={skill} className="card out-of-view" id="skills-card">
                <div className="card-heading">
                    <h1>What skills do you have?</h1>
                </div>
                <div className="skillbox-container">
                    <div className="skillbox" style={{overflow: "scroll"}}>
                        {skills.map((skill, index) => (
                            <button key={index} onClick={() => handleRemoveSkill(skill)}>{skill}</button>
                        ))}
                    </div>
                </div>
                <div className="auto-complete">
                    <Autocomplete
                        disablePortal
                        options={jsonData}
                        sx={{ width: 300, backgroundColor: "white"}}
                        renderInput={({ inputProps, ...rest}) => <TextField {...rest} inputProps={{...inputProps, readOnly:true}}/>}
                        onChange={handleSelectedSkill}
                    />
                </div>
                <div className="card-btn">
                    <button onClick={handleSkills} className="next-btn">Next</button>
                </div>
            </div>
            <div ref={bio} className="card out-of-view" id="bio-card">
                <div className="card-heading">
                    <h1>Your Bio</h1>
                </div>
                <div className="card-item" style={{display: "flex", flexDirection: "column", gap:"1rem"}}>
                    <img src={KittyWrite} />
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        onChange={handleBioChange}
                        className="bioText"
                    />
                  
                </div>
                <div className="card-btn">
                    <button onClick={handleBio} className="next-btn">Next</button>
                </div>
            </div>
            <div ref={finish} className="card out-of-view" id="finish">
                <div className="card-heading">
                    <h1>YOU'RE DONE!</h1>
                </div>
                <div className="card-item">
                    <img src={Cool} alt="" />
                </div>
                <div className="card-btn">
                    <button className="next-btn" onClick={handleDone}>Find Some Projects!</button>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileSetup;