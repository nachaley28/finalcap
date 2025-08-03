
import BugReportModal from "../../components/BugReportButton";
import { useAuth } from "../../services/AuthContext"

export default function GuestHomepage() {
    const { logout, account } = useAuth();

    return (

        <>
            <div className="container-fluid">
                <div className="p">Hello, {account.first_name ? account.first_name : "User"}</div>
                <div className="p">This account is currently in guest mode, please contact the adminitrators on their email, or submit a report below</div>

                <div className="d-flex gap-3 align-items-center justify-content-center align-items-center p-5">
                    <div className="btn btn-secondary ">Email: admin@sys.com</div>
                    <BugReportModal />
                    <div className="p">or</div>
                    <div className="btn btn-secondary" onClick={logout}>Logout</div>
                </div>
            </div>
        </>
    )
};