import { useParams } from "react-router-dom";

export default function DeleteAccountForm(){
    const { id } = useParams();
    
    return (
        <>
            Account to delete id: {id}
        </>
    )
}