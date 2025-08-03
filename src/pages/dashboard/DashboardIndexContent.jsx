import { useAuth } from "../../services/AuthContext"

export default function DashboardIndexContent(){
    const { account, logout } = useAuth()

    return (
        <>
            <div className="h4">content of the dashboard's index page</div>

            [].
        </>
    )
}