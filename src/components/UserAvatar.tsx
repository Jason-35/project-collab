import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React from "react";
import "../styles/AvatarMenu.css"
import { CircleUser, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const UserAvatar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
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
            <Avatar sx={{ width: 40, height: 40 }} src="">jm</Avatar>
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