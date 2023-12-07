interface CreateProjectProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateProjectModal = ({ open, setOpen } : CreateProjectProps) => {

    if(open){
        return ( <div onClick={() => setOpen(!open)}>Creating modal!</div> );
    }else {
        return (<></>)
    }
}
 
export default CreateProjectModal;