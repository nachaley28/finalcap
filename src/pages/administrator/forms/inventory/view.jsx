import {
  Container, Row, Col, Card, Table, Badge, Button, ButtonGroup, Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialReport = {
  id: 1,
  submittedBy: 'Cristina Reyes',
  department: 'Inventory Management',
  date: 'June 24, 2025, 10:00 AM',
  status: 'Reviewed',
  items: [
    { name: 'Passbook', quantity: 100, status: 'Active' },
    { name: 'ATM Card', quantity: 15, status: 'Active' },
    { name: 'Checkbook', quantity: 8, status: 'To Be Deleted' },
    { name: 'Deposit Slip', quantity: 22, status: 'Suspended' }
  ]
};

const STATUS_COLORS = {
  'Active': 'success',
  'Suspended': 'warning',
  'To Be Deleted': 'danger',
  'Reviewed': 'info',
  'Approved': 'success',
  'Rejected': 'danger'
};

function ViewReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState(initialReport);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(''); 

  const handleAction = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const confirmAction = () => {
    setReport(prev => ({
      ...prev,
      status: actionType === 'approve' ? 'Approved' : 'Rejected'
    }));
    setShowModal(false);
  };

  return (
    <Container fluid="lg" className="my-5">
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold">📄 Report Details</h3>
          <p className="text-muted">Submitted by <strong>{report.submittedBy}</strong></p>
          <p className="text-muted">Department: {report.department}</p>
          <p className="text-muted">Date Submitted: {report.date}</p>
          <p>
            Status:{' '}
            <Badge bg={STATUS_COLORS[report.status] || 'secondary'}>
              {report.status}
            </Badge>
          </p>
          <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
            ← Back to Reports
          </Button>

          {report.status !== 'Approved' && report.status !== 'Rejected' && (
            <div className="mb-3">
              <ButtonGroup>
                <Button variant="success" onClick={() => handleAction('approve')}>
                  ✅ Approve
                </Button>
                <Button variant="danger" onClick={() => handleAction('reject')}>
                  ❌ Reject
                </Button>
              </ButtonGroup>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-4 shadow-sm bg-body text-body">
            <h5>📦 Inventory Summary</h5>
            <Table bordered responsive className="mt-3">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Status</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {report.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <Badge bg={STATUS_COLORS[item.status]}>{item.status}</Badge>
                    </td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === 'approve' ? 'Approve Report' : 'Reject Report'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{' '}
          <strong>{actionType === 'approve' ? 'approve' : 'reject'}</strong> this report?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant={actionType === 'approve' ? 'success' : 'danger'}
            onClick={confirmAction}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ViewReport;
