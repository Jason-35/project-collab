import "../../styles/ProfileSetup.css"
import KittyComp from "../../assets/kitty-computer-256.png"
import { useRef } from "react"
const ProfileSetup = () => {

    const welcome = useRef<HTMLDivElement>(null)
    const avatar = useRef<HTMLDivElement>(null)
    const level = useRef<HTMLDivElement>(null)
    const skill = useRef<HTMLDivElement>(null)
    const bio = useRef<HTMLDivElement>(null)
    const finish = useRef<HTMLDivElement>(null)

    const handleWelcome = () => {
        if(welcome.current && avatar.current){
            welcome.current.className = welcome.current.className + " slide-out"
            setTimeout(() => {
                if(avatar.current){
                    avatar.current.className = avatar.current.className + " slide-in"
                }
            }, 500)

        }
        
    }

    const handleAvatar = () => {
        if(avatar.current){
            avatar.current.className = avatar.current.className + " slide-out"
            setTimeout(() => {
                if(level.current){
                    level.current.className = level.current.className + " slide-in"
                }
            }, 500)
        }
    }

    const handleLevel = () => {
        if(level.current){
            level.current.className = level.current.className + " slide-out"
            setTimeout(() => {
                if(skill.current){
                    skill.current.className = skill.current.className + " slide-in"
                }
            }, 500)
        }
    }

    const handleSkills = () => {
        if(skill.current){
            skill.current.className = skill.current.className + " slide-out"
            setTimeout(() => {
                if(bio.current){
                    bio.current.className = bio.current.className + " slide-in"
                }
            }, 500)
        }
    }

    const handleBio = () => {
        if(bio.current){
            bio.current.className = bio.current.className + " slide-out"
            setTimeout(() => {
                if(finish.current){
                    finish.current.className = finish.current.className + " slide-in"
                }
            }, 500)
        }
    }


    return ( 
        <div className="container profile-setup">
            <div ref={welcome} className="card" id="welcome-card">
                <h1>Hello lets setup your profile</h1>
                <img src={KittyComp} alt="" />
                <button onClick={handleWelcome}>Lets Go!</button>
            </div>
            <div ref={avatar} className="card out-of-view" id="avatar-card">
                <h1>Avatar Setup</h1>
                <button onClick={handleAvatar}>Next</button>
                <button>Prev</button>
            </div>
            <div ref={level} className="card out-of-view" id="level-card">
                <h1>Your level</h1>
                <button onClick={handleLevel}>Next</button>
                <button>Prev</button>
            </div>
            <div ref={skill} className="card out-of-view" id="skills-card">
                <h1>Your level</h1>
                <button onClick={handleSkills}>Next</button>
                <button>Prev</button>
            </div>
            <div ref={bio} className="card out-of-view" id="bio-card">
                <h1>Your Bio</h1>
                <button onClick={handleBio}>Next</button>
                <button>Prev</button>
            </div>
            <div ref={finish} className="card out-of-view" id="finish">
                <h1>YOUR DONE!</h1>
                <button >Lets Go!</button>
            </div>
        </div>
     );
}
 
export default ProfileSetup;