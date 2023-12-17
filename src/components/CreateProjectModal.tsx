import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { db } from "../firebase/firebase";
import { arrayUnion, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { getCurrentDisplayName, getCurrentUserUid, updateCurrentUserDocument } from "../lib/service/UserService";

interface CreateProjectProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "react", "javascript", "python", "java"
  ];

interface FormData {
    projectName: string;
    level: string;
    tags: string[];
    description: string;
    url: string;
    max: number
}

const CreateProjectModal = ({open, setOpen} : CreateProjectProps) => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>({
        projectName: '',
        level: '',
        tags: [],
        description: '',
        url: '',
        max: 1
      });
    

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleClose = () => {
        setOpen(false);
    };


    
    
    const handleChangeTag = (event: SelectChangeEvent<string[]>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })

    };
    
    const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleFormSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
          [name]: value,
        });
    };
    
    const handleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        formData.max = Number(formData.max)
        
        const uid = uuid()
        const userDisplayName = getCurrentDisplayName()
        const userId = getCurrentUserUid()
        formData.url = `/project/${uid}`
        
        await setDoc(doc(db, "projectGroup", uid), {
            owner: userDisplayName,
            ownerId: userId,
            url: formData.url,
            projectData: formData,
            members: [userDisplayName],
            createdAt: serverTimestamp()
        });
        
        await updateCurrentUserDocument({
            memberOfProject: arrayUnion({
                projectName: formData.projectName,
                projectUrl: formData.url
            })
        })

        navigate(`${formData.url}`)
    }

    
    return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit}>
            <DialogTitle id="responsive-dialog-title">
            {"Create a group for your project"}
            </DialogTitle>
                <DialogContent>
          
                    <label>
                        Project Name
                    </label>
                    <input name="projectName" value={formData.projectName} onChange={handleFormInputChange}/>
                    <br/>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="Number"
                            value={formData.max}
                            name="max"
                            onChange={handleFormInputChange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        onChange={handleFormInputChange}
                        />
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                        <Select
                        value={formData.level}
                        onChange={handleFormSelectChange}
                        name="level"
                        >
                        <MenuItem value={"beginner"}>Beginner</MenuItem>
                        <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                        <MenuItem value={"expert"}>Expert</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-chip-label">tags</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={formData.tags}
                        name="tags"
                        onChange={handleChangeTag}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >
                        {names.map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                 
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
   
                </DialogContent>
            <DialogActions>
                <Button autoFocus type="submit">
                    Create
                </Button>
                <Button autoFocus onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
    )
}
 
export default CreateProjectModal;