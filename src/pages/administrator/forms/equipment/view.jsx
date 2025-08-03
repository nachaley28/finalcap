import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner, Badge, Row, Col, Container, Card } from 'react-bootstrap';

const DUMMY_EQUIPMENT = [
  { id: 1, name: 'ATM Machine', assetCode: 'EQP-001', category: 'Self-Service', quantity: 5 },
  { id: 2, name: 'Cash Counter', assetCode: 'EQP-002', category: 'Teller Equipment', quantity: 2 },
  { id: 3, name: 'Passbook Printer', assetCode: 'EQP-003', category: 'Printing Device', quantity: 0 },
  { id: 4, name: 'Check Scanner', assetCode: 'EQP-004', category: 'Document Scanner', quantity: 3 },
  { id: 5, name: 'Coin Sorting Machine', assetCode: 'EQP-005', category: 'Teller Equipment', quantity: 1 },
];

function ViewEquipment() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = DUMMY_EQUIPMENT.find(e => e.id === parseInt(id));
      setEquipment(found || null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const getStatusBadge = () => {
    if (equipment.quantity === 0) return <Badge bg="danger">Unavailable</Badge>;
    if (equipment.quantity < 3) return <Badge bg="warning">Low Stock</Badge>;
    return <Badge bg="success">Operational</Badge>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!equipment) {
    return (
      <Container className="text-center mt-5">
        <h5 className="text-danger fw-semibold">⚠️ Equipment not found</h5>
        <Link to="/equipment" className="btn btn-outline-secondary mt-3">← Back</Link>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '100%', maxWidth: '600px' }} className="shadow rounded-4 p-4">
        <Card.Body>
          <h4 className="mb-4 text-primary fw-bold">🛠️ Equipment Information</h4>

          <Row className="mb-3">
            <Col xs={5} className="text-muted">Name:</Col>
            <Col>{equipment.name}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={5} className="text-muted">Asset Code:</Col>
            <Col>{equipment.assetCode}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={5} className="text-muted">Category:</Col>
            <Col>{equipment.category}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={5} className="text-muted">Quantity:</Col>
            <Col>{equipment.quantity}</Col>
          </Row>

          <Row className="mb-4">
            <Col xs={5} className="text-muted">Status:</Col>
            <Col>{getStatusBadge()}</Col>
          </Row>

          <div className="text-center">
            <Link to={`/equipment/edit/${equipment.id}`} className="btn btn-primary px-4">
              ✏️ Edit Equipment
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewEquipment;
