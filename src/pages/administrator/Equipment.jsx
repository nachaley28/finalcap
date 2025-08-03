import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Table, Button, Spinner,
  InputGroup, Form, Modal, Dropdown, Pagination
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DUMMY_EQUIPMENT = [
  { id: 1, name: 'ATM Machine', category: 'Self-Service', status: 'Operational' },
  { id: 2, name: 'Cash Counter', category: 'Teller Equipment', status: 'Operational' },
  { id: 3, name: 'Passbook Printer', category: 'Printing Devices', status: 'Damaged' },
  { id: 4, name: 'Check Scanner', category: 'Document Processing', status: 'Operational' },
  { id: 5, name: 'Coin Sorting Machine', category: 'Teller Equipment', status: 'Damaged' },
];

function Equipment() {
  const [equipment, setEquipment] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setTimeout(() => setEquipment(DUMMY_EQUIPMENT), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (!selectedEquipment) return;

    if (modalType === 'delete') {
      setEquipment(prev => prev.filter(e => e.id !== selectedEquipment.id));
    } else if (modalType === 'deactivate') {
      setEquipment(prev =>
        prev.map(e =>
          e.id === selectedEquipment.id ? { ...e, status: 'Damaged' } : e
        )
      );
    }

    setSelectedEquipment(null);
    setModalType(null);
  };

  const filteredEquipment = equipment?.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'All' ? true : e.status === filter;
    return matchesSearch && matchesStatus;
  }) || [];

  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col><h4 className="fw-bold">Bank Equipment Management</h4></Col>
        <Col xs="auto">
          <Link to="add" className="btn btn-primary">+ Add Equipment</Link>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              placeholder="Equipment name or category"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3} className="mt-2 mt-md-0">
          <Dropdown onSelect={setFilter}>
            <Dropdown.Toggle variant="outline-secondary" className="w-100">
              {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Operational">Operational</Dropdown.Item>
              <Dropdown.Item eventKey="Damaged">Damaged</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {!equipment ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Table hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Equipment Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEquipment.map((e, i) => (
                <tr key={e.id}>
                  <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.category}</td>
                  <td>
                    <span className={`badge ${e.status === 'Operational' ? 'bg-success' : 'bg-danger'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    <Link to={`view/${e.id}`} className="btn btn-sm btn-outline-secondary me-1">View</Link>
                    <Link to={`edit/${e.id}`} className="btn btn-sm btn-outline-primary me-1">Edit</Link>
                    {e.status === 'Operational' ? (
                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() => {
                          setSelectedEquipment(e);
                          setModalType('deactivate');
                        }}
                        className="me-1"
                      >
                        Mark as Damaged
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          setSelectedEquipment(e);
                          setModalType('delete');
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
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
              <Modal.Title>{modalType === 'delete' ? 'Delete Equipment' : 'Mark as Damaged'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to {modalType === 'delete' ? 'delete' : 'mark as damaged'} <strong>{selectedEquipment?.name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalType(null)}>Cancel</Button>
              <Button variant={modalType === 'delete' ? 'danger' : 'warning'} onClick={handleConfirm}>
                {modalType === 'delete' ? 'Delete' : 'Confirm'}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Equipment;
