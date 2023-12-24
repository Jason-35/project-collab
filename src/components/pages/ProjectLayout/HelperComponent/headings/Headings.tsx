interface HeadingsProps {
    title: string
}

const Headings = ({ title }: HeadingsProps) => {
    return ( 
        <div className="title">
            {title}
        </div>
     );
}
 
export default Headings;