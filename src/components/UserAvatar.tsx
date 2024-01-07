import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react";
import "../styles/AvatarMenu.css"
import { CircleUser, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getCurrentUserDocument } from "../lib/service/UserService";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({width, height} : {width: number, height: number}) => {

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [imgUrl, setImgUrl] = useState("")
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        const getImgUrl = async() => {
            const currentUser = await getCurrentUserDocument()
            if(currentUser){
                setImgUrl(currentUser.imgUrl)
            }
        }
        getImgUrl()
    })

    
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
            <MenuItem onClick={() => navigate("/profile")}>
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