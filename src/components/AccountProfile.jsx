import { Button, ButtonGroup, Card, Figure, Form, InputGroup } from "react-bootstrap";
import { useAuth } from "../services/AuthContext"
import { Navigate, useNavigate } from "react-router-dom";
import BugReportModal from "./BugReportButton";
import ProfileUpdate from "./ProfileUpdate";
import CredentialUpdate from "./CredentialUpdate";
import { ImgDefaultProfile } from "./general/Images";


const SAMPLE_EQUIPMENTS = ["Printer", "Monitor", "CPU Unit", "Mouse", "Smartphone", "Wireless Mouse", "Scanner"]

export default function AccountProfile() {
    const { account, loading } = useAuth();
    const nav = useNavigate()

    return (
        <>
            <div className="container-fluid ">

                <div className="d-flex justify-content-end gap-3 mb-3">
                    <ButtonGroup>
                        <BugReportModal />
                        <CredentialUpdate />
                        <ProfileUpdate />
                    </ButtonGroup>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <Figure>
                        <Figure.Image
                            width={150}
                            height={150}
                            alt="logo"
                            className="rounded-circle"
                            src={ImgDefaultProfile}
                        />
                    </Figure>

                    <div>
                        <div className="h4">{account.first_name ? `${account.first_name} ${account.middle_name} ${account.last_name}` : 'Invalid Account Name'}</div>
                        <div className="d-flex gap-2 align-items-center">
                            <div className="text-muted material-symbols-outlined">mail</div>
                            <div className="text-muted">{account.email}</div>
                        </div>

                        <div className="d-flex gap-2 align-items-center">
                            <div className="text-muted material-symbols-outlined">location_on</div>
                            <div className="text-muted">{account.branch_id ? account.branch_name : "Non Specific Branch"}</div>
                        </div>
                    </div>
                </div>



                <div className="mb-5"></div>

                <div className="h5 text-muted">Owned Equipments</div>
                <div className="d-flex gap-3 overflow-x-scroll h-auto">
                    {
                        SAMPLE_EQUIPMENTS.map((e, k) => (
                            <Card key={k} className="col-3">
                                <Card.Body>
                                    <Card.Title>{e}</Card.Title>
                                    <Card.Text>
                                        *sample description*
                                    </Card.Text>
                                    <Button variant="primary">Actions</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            </div>

        </>
    )
}
