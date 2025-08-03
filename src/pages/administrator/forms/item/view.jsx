import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Spinner, Badge, Row, Col, Button, Container } from 'react-bootstrap';

const DUMMY_ITEMS = [
  { id: 1, name: 'Passbook', sku: 'PSB-001', category: 'Account', quantity: 125 },
  { id: 2, name: 'ATM Card', sku: 'ATM-002', category: 'Card', quantity: 89 },
  { id: 3, name: 'Checkbook', sku: 'CHK-003', category: 'Cheque', quantity: 47 },
  { id: 4, name: 'Deposit Slip Booklet', sku: 'DSB-004', category: 'Slip', quantity: 104 },
  { id: 5, name: 'Withdrawal Slip Pad', sku: 'WSP-005', category: 'Slip', quantity: 62 },
];

function ViewItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = DUMMY_ITEMS.find(i => i.id === parseInt(id));
      setItem(found || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!item) {
    return (
      <Container className="text-center mt-5">
        <h4 className="text-danger mb-4">Item not found</h4>
        <Link to="/items" className="btn btn-outline-secondary px-4 py-2">Back to Items</Link>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="w-100 shadow rounded-4" style={{ maxWidth: '700px' }}>
        <Card.Header className="bg-dark text-white rounded-top-4">
          <h4 className="mb-0">📄 Item Information</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="mb-3">
            <Col md={6}>
              <h6 className="text-uppercase text-muted">Item Name</h6>
              <p className="fs-5 fw-semibold">{item.name}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-uppercase text-muted">SKU</h6>
              <p className="fs-5 fw-semibold">{item.sku}</p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <h6 className="text-uppercase text-muted">Category</h6>
              <p className="fs-5 fw-semibold">{item.category}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-uppercase text-muted">Quantity</h6>
              <p className="fs-5 fw-semibold">{item.quantity}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className="text-uppercase text-muted">Stock Status</h6>
              <Badge bg={item.quantity >= 100 ? 'success' : 'danger'} className="fs-6 px-3 py-2 rounded-pill">
                {item.quantity >= 100 ? 'Overstock' : 'Low Stock'}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewItem;
