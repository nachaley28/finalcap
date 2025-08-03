import { useEffect, useState } from "react";
import { Button, Form, Modal, NavLink } from "react-bootstrap"
import PasswordInput from "./forms/PasswordInput";

const FORM_TITLE = "Update Credentials"

export default function CredentialUpdate({ btn_name, btn_variant = "secondary", form_mode = false }) {
    const [loading, setLoading] = useState(false);

    // modal state
    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalOpen = () => {
        update_original_data()
        setShow(true)
    };

    // form data
    const [originalData, setOriginalData] = useState({
            email: '',
            current_password: '',
            new_password: '',
            new_password_confirm: '',
        })

    // form input
    const [formData, setFormData] = useState({
        email: '',
        current_password: '',
        new_password: '',
        new_password_confirm: '',
    })

    // effects
    const update_original_data = () => {
        setLoading(true)

        // fetch original
        setOriginalData({
            email: '',
            current_password: '',
            new_password: '',
            new_password_confirm: '',
        })

        setLoading(false)
    }

    useEffect(() => {
        update_original_data()
        setFormData({ ...originalData })
    }, [])

    // handle
    function handleClear() {
        setFormData({
            email: '',
            current_password: '',
            new_password: '',
            new_password_confirm: '',
        })
    }

    function handleSubmit() {
        alert('submit test')

        handleModalClose()
    }

    const FORM_CONTENT = (
        <Form>
            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>Email</Form.Label>
                    {
                        formData.email != originalData.email ? <a className="navlink text-end" onClick={(e) => setFormData({ ...formData, email: originalData.email })}>Reset</a> : ''
                    }
                </div>
                <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>



            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>Current Password</Form.Label>
                </div>
                <PasswordInput value={formData.current_password} onChangeFunction={(e) => setFormData({...formData, current_password: e.target.value})} />
            </Form.Group>



            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>New Password</Form.Label>
                </div>
                <PasswordInput value={formData.new_password} onChangeFunction={(e) => setFormData({...formData, new_password: e.target.value})} />
            </Form.Group>



            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>Confirm New Password</Form.Label>
                </div>
                <PasswordInput value={formData.new_password_confirm} onChangeFunction={(e) => setFormData({...formData, new_password_confirm: e.target.value})} />
            </Form.Group>
        </Form>
    )



    // rendering contents
    if (!form_mode && !loading)
        return (
            <>
                <Button variant={btn_variant ? btn_variant : "primary"} onClick={handleModalOpen}>
                    {btn_name ? btn_name : FORM_TITLE}
                </Button>

                <Modal
                    centered
                    show={show}
                    onHide={handleModalClose}
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{FORM_TITLE}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {FORM_CONTENT}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )

    else if (form_mode && !loading)
        return FORM_CONTENT;

    else
        return (
            <>
                Loading
            </>
        )

}