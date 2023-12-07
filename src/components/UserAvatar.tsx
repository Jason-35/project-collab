import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react";
import "../styles/AvatarMenu.css"
import { CircleUser, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

const UserAvatar = ({width, height} : {width: number, height: number}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [imgUrl, setImgUrl] = useState("")
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    useEffect(() => {
        const getImgUrl = async() => {
            if(auth.currentUser){
                console.log("yip")
                const userCollection = query(collection(db, "users"), where("name", "==", auth.currentUser.displayName))
                const userArray = await getDocs(userCollection);

                userArray.forEach((doc) => {
                   setImgUrl(doc.data().imgUrl)
                   
                })
            }
        }

        getImgUrl()
        
    }, [])
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        signOut(auth)
    }

    return ( 
    <React.Fragment>
        <IconButton
            onClick={handleClick}
            size="small"
        >
            <Avatar sx={{ width: width, height: height }} src={imgUrl}>jm</Avatar>
        </IconButton>

        <Menu 
            className="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem onClick={() => {console.log("profile")}}>
               <ListItemIcon>
                    <CircleUser />
                </ListItemIcon> 
               Profile
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                    <LogOut />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </React.Fragment>);
}
 
export default UserAvatar;