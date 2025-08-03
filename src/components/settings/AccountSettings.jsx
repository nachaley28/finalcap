import { Form, InputGroup } from "react-bootstrap";
import { useAuth } from "../../services/AuthContext"
import { useState } from "react";

export default function AccountSettings() {
    const { account } = useAuth();

    const [showUpdatePassword, toggleShowUpdatePassword] = useState(false)

    return (
        <>
            <div className="container-fluid py-5">
                <div className="h4 text-start">General</div>
                <div className="mb-4 p-3 border bg-primary-subtle rounded shadow">
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        className="mb-3"
                        label="Dark Mode"
                    />



                </div>

                <div className="d-flex justify-content-end">
                    <div className="btn btn-primary fw-bold">Update</div>
                </div>

                
            </div>
        </>
    )
}