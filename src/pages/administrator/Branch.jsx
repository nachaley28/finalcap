import { useState, useEffect } from 'react';
import {Container,Row,Col,Table,Button,Spinner,InputGroup,Form,Modal,Dropdown,Pagination,} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DUMMY_BRANCHES = [
  { id: 1, name: 'Main Branch', email: 'main@company.com', manager: 'Natalie Alarcon', active: true },
  { id: 2, name: 'Iloilo Branch', email: 'iloilo@company.com', manager: 'John Doe', active: true },
  { id: 3, name: 'Cebu Branch', email: 'cebu@company.com', manager: 'Jane Smith', active: false },
  { id: 4, name: 'Davao Branch', email: 'davao@company.com', manager: 'Ana Lopez', active: true },
  { id: 5, name: 'Bacolod Branch', email: 'bacolod@company.com', manager: 'Liam Reyes', active: false },
];

function Branch() {
  const [branches, setBranches] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setTimeout(() => setBranches(DUMMY_BRANCHES), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (!selectedBranch) return;

    if (modalType === 'delete') {
      setBranches(prev => prev.filter(b => b.id !== selectedBranch.id));
    } else if (modalType === 'deactivate') {
      setBranches(prev =>
        prev.map(b => b.id === selectedBranch.id ? { ...b, active: false } : b)
      );
    }

    setSelectedBranch(null);
    setModalType(null);
  };

  const filteredBranches = branches?.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'All' ? true : (filter === 'Active' ? b.active : !b.active);
    return matchesSearch && matchesStatus;
  }) || [];

  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col><h4 className="fw-bold">Branch Manager</h4></Col>
        <Col xs="auto">
          <Link to="add" className="btn btn-primary">+ Add Branch</Link>
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              placeholder="Branch name or email"
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
              <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
              <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {!branches ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Table hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Branch Name</th>
                <th>Email</th>
                <th>Manager</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBranches.map((b, i) => (
                <tr key={b.id}>
                  <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.manager}</td>
                  <td>
                    <span className={`badge ${b.active ? 'bg-success' : 'bg-danger'}`}>
                      {b.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    <Link to={`view/${b.id}`} className="btn btn-sm btn-outline-secondary me-1">View</Link>
                    <Link to={`edit/${b.id}`} className="btn btn-sm btn-outline-primary me-1">Edit</Link>
                    {b.active ? (
                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() => {
                          setSelectedBranch(b);
                          setModalType('deactivate');
                        }}
                        className="me-1"
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          setSelectedBranch(b);
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
              <Modal.Title>{modalType === 'delete' ? 'Delete Branch' : 'Deactivate Branch'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to {modalType} <strong>{selectedBranch?.name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalType(null)}>Cancel</Button>
              <Button variant={modalType === 'delete' ? 'danger' : 'warning'} onClick={handleConfirm}>
                {modalType === 'delete' ? 'Delete' : 'Deactivate'}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Branch;
