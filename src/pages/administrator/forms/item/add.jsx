import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

function AddItemForm() {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    active: true,
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    console.log('Form Submitted:', formData);
    alert('Item saved (frontend only). Check console for data.');

    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: '',
      active: true,
    });
    setValidated(false);
  };

  return (
    <div
      className="py-5 px-4"
      style={{ minHeight: '100vh' }}
      data-bs-theme="auto" 
    >
      <Container fluid="lg">
        <Card className="shadow-lg rounded-4 p-4 border-0 bg-body text-body">
          <Card.Header className="rounded-3 mb-4 bg-primary text-white">
            <h3 className="mb-0">➕ Register New Item</h3>
          </Card.Header>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    placeholder="Enter item name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Item name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formSKU">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    required
                    placeholder="Enter SKU"
                    value={formData.sku}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    SKU is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    required
                    placeholder="Enter category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Category is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    required
                    min={0}
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Quantity is required and must be 0 or more.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formActive">
              <Form.Check
                type="checkbox"
                name="active"
                label="Active"
                checked={formData.active}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-end">
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={() =>
                  setFormData({
                    name: '',
                    sku: '',
                    category: '',
                    quantity: '',
                    active: true,
                  })
                }
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Item
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default AddItemForm;
