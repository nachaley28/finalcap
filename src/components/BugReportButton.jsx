import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiClient from '../services/apiClient';

function BugReportModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        // const result = await apiClient.post('/system/bug_report')

        // if(result) {
        // }

        alert("Issue report submitted")
        handleClose();
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Report Issues
            </Button>

            <Modal
                centered
                show={show}
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>System Bug Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option hidden>Open this select menu</option>
                                <option value="1">System Performance</option>
                                <option value="1">Profile</option>
                                <option value="2">Inventory</option>
                                <option value="3">Equipment</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bug/Issue Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BugReportModal;