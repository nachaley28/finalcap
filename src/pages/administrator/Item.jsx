import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Table, Button, Spinner,
  InputGroup, Form, Modal, Dropdown, Pagination
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DUMMY_ITEMS = [
  { id: 1, name: 'Passbook', sku: 'PSB-001', category: 'Account', active: true, quantity: 125 },
  { id: 2, name: 'ATM Card', sku: 'ATM-002', category: 'Card', active: true, quantity: 89 },
  { id: 3, name: 'Checkbook', sku: 'CHK-003', category: 'Cheque', active: false, quantity: 47 },
  { id: 4, name: 'Deposit Slip Booklet', sku: 'DSB-004', category: 'Slip', active: true, quantity: 104 },
  { id: 5, name: 'Withdrawal Slip Pad', sku: 'WSP-005', category: 'Slip', active: false, quantity: 62 },
];

function Item() {
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setTimeout(() => setItems(DUMMY_ITEMS), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (!selectedItem) return;

    if (modalType === 'delete') {
      setItems(prev => prev.filter(i => i.id !== selectedItem.id));
    } else if (modalType === 'deactivate') {
      setItems(prev => prev.map(i => i.id === selectedItem.id ? { ...i, active: false } : i));
    }

    setSelectedItem(null);
    setModalType(null);
  };

  const filteredItems = items?.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                          i.sku.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  }) || [];

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col><h4 className="fw-bold">Lifebank Item Manager</h4></Col>
        <Col xs="auto">
          <Link to="add" className="btn btn-primary">Register New Item</Link>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              placeholder="Item name or SKU"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      {!items ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Table hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item, i) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className={`badge ${item.quantity >= 100 ? 'bg-success' : 'bg-danger'}`}>
                      {item.quantity >= 100 ? 'Overstock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    <Link to={`view/${item.id}`} className="btn btn-sm btn-outline-secondary me-1">View Details</Link>
                    <Link to={`edit/${item.id}`} className="btn btn-sm btn-outline-primary me-1">Update Info</Link>
                    {item.active ? (
                      <Button
                        size="sm"
                        variant="outline-warning"
                        className="me-1"
                        onClick={() => {
                          setSelectedItem(item);
                          setModalType('deactivate');
                        }}
                      >
                        Mark as Inactive
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          setSelectedItem(item);
                          setModalType('delete');
                        }}
                      >
                        Remove Item
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>

          <Modal show={!!modalType} onHide={() => setModalType(null)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{modalType === 'delete' ? 'Remove Item' : 'Mark Item as Inactive'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to {modalType === 'delete' ? 'remove' : 'mark as inactive'} <strong>{selectedItem?.name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalType(null)}>Cancel</Button>
              <Button variant={modalType === 'delete' ? 'danger' : 'warning'} onClick={handleConfirm}>
                {modalType === 'delete' ? 'Remove Item' : 'Mark as Inactive'}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Item;
