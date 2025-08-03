import { useParams } from "react-router-dom";

export default function DeleteBranch(){
    const { id } = useParams();
    
    return (
        <>
            Branch to delete id: {id}
        </>
    )
}