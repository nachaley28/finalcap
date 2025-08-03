import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner, Badge, Row, Col, Container, Card, Form, Button } from 'react-bootstrap';

const DUMMY_EQUIPMENT = [
  { id: 1, name: 'ATM Machine', assetCode: 'EQP-001', category: 'Self-Service', quantity: 5 },
  { id: 2, name: 'Cash Counter', assetCode: 'EQP-002', category: 'Teller Equipment', quantity: 2 },
  { id: 3, name: 'Passbook Printer', assetCode: 'EQP-003', category: 'Printing Device', quantity: 0 },
  { id: 4, name: 'Check Scanner', assetCode: 'EQP-004', category: 'Document Scanner', quantity: 3 },
  { id: 5, name: 'Coin Sorting Machine', assetCode: 'EQP-005', category: 'Teller Equipment', quantity: 1 },
];

function EditEquipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [name, setName] = useState('');
  const [assetCode, setAssetCode] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = DUMMY_EQUIPMENT.find(e => e.id === parseInt(id));
      if (found) {
        setEquipment(found);
        setName(found.name);
        setAssetCode(found.assetCode);
        setCategory(found.category);
        setQuantity(found.quantity);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const getStatusBadge = () => {
    if (quantity === 0) return <Badge bg="danger">Unavailable</Badge>;
    if (quantity < 3) return <Badge bg="warning">Low Stock</Badge>;
    return <Badge bg="success">Operational</Badge>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add real update logic here (e.g. API call)
    console.log('Updated Equipment:', { id, name, assetCode, category, quantity });

    alert('✅ Equipment updated!');
    navigate('/equipment');
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
          <h4 className="mb-4 text-primary fw-bold">🛠️ Edit Equipment</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Asset Code:</Form.Label>
              <Form.Control
                type="text"
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Category:</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Quantity:</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0"
                required
              />
            </Form.Group>

            <Row className="mb-4">
              <Col xs={5} className="text-muted">Status:</Col>
              <Col>{getStatusBadge()}</Col>
            </Row>

            <div className="d-flex justify-content-between">
              <Link to="/equipment" className="btn btn-outline-secondary">
                ← Cancel
              </Link>
              <Button type="submit" className="btn btn-primary px-4">
                💾 Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditEquipment;
