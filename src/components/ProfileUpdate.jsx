import { useEffect, useState } from "react";
import { Button, Form, Modal, NavLink } from "react-bootstrap"

const FORM_TITLE = "Update Profile"


export default function ProfileUpdate({ btn_name, btn_variant = "secondary", form_mode = false }) {
    const [loading, setLoading] = useState(false);

    // modal state
    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalOpen = () => {
        update_original_data()
        setShow(true)
    };

    // form data
    const [originalData, setOriginalData] = useState({})

    // form input
    const [formData, setFormData] = useState({})

    // effects
    const update_original_data = () => {
        setLoading(true)

        // fetch original
        setOriginalData({
            first_name: '',
            middle_name: '',
            last_name: '',
            birth_date: ''
        })

        setLoading(false)
    }

    useEffect(() => {
        update_original_data
        setFormData({...originalData})
    }, [])

    // handle
    function handleClear() {
        setFormData({
            first_name: '',
            middle_name: '',
            last_name: '',
            birth_date: ''
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
                    <Form.Label>First Name</Form.Label>
                    {
                        formData.first_name != originalData.first_name ? <a className="navlink text-end" onClick={(e) => setFormData({ ...formData, first_name: originalData.first_name })}>Reset</a> : ''
                    }
                </div>
                <Form.Control type="text" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
            </Form.Group>



            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>Middle Name</Form.Label>
                    {
                        formData.middle_name != originalData.middle_name ? <a className="navlink text-end" onClick={(e) => setFormData({ ...formData, middle_name: originalData.middle_name })}>Reset</a> : ''
                    }                </div>
                <Form.Control type="text" value={formData.middle_name} onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })} />
            </Form.Group>



            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>Last Name</Form.Label>
                    {
                        formData.last_name != originalData.last_name ? <a className="navlink text-end" onClick={(e) => setFormData({ ...formData, last_name: originalData.last_name })}>Reset</a> : ''
                    }                </div>
                <Form.Control type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
            </Form.Group>



            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                    <Form.Label>Date of Birth</Form.Label>
                    {
                        formData.birth_date != originalData.birth_date ? <a className="navlink text-end" onClick={(e) => setFormData({ ...formData, birth_date: originalData.birth_date })}>Reset</a> : ''
                    }                </div>
                <Form.Control type="date" value={formData.birth_date} onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })} />
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