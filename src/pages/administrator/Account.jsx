import { Link } from 'react-router-dom';
import {  Table, Spinner, InputGroup, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';

const BASE_PATH = '/administrators';

const DUMMY_ACCOUNTS = [
  { id: 1, first_name: 'Natalie', last_name: 'Alarcon', email: 'natalie@example.com', role: 'Administrator', suspended: false },
  { id: 2, first_name: 'John',    last_name: 'Doe',     email: 'john.doe@example.com', role: 'Moderator',     suspended: false },
  { id: 3, first_name: 'Jane',    last_name: 'Smith',   email: 'jane@company.com',     role: 'Staff',         suspended: true  }
];

function Account() {
  const auth = useAuth() ?? {};
  const [accounts, setAccounts] = useState(null);
  const [search, setSearch] = useState('');

 

  useEffect(() => {
    const timer = setTimeout(() => setAccounts(DUMMY_ACCOUNTS), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSuspend = id =>
    setAccounts(prev => prev.map(a => (a.id === id ? { ...a, suspended: !a.suspended } : a)));
  const handleDelete = id => setAccounts(prev => prev.filter(a => a.id !== id));

  const filtered = accounts?.filter(u =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <>
       

            <div className="container-fluid px-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">Account Manager</h4>
                <Link to="add" className="btn btn-primary">+ Add Account</Link>
              </div>

              <InputGroup className="mb-3">
                <InputGroup.Text>Search</InputGroup.Text>
                <Form.Control
                  placeholder="name or email"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </InputGroup>

              {!accounts ? (
                <Spinner animation="border" />
              ) : (
                <Table hover responsive className="shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u, i) => (
                      <tr key={u.id}>
                        <td>{i + 1}</td>
                        <td>{u.first_name} {u.last_name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                          <span className={`badge ${u.suspended ? 'bg-danger' : 'bg-success'}`}>
                            {u.suspended ? 'Suspended' : 'Active'}
                          </span>
                        </td>
                        <td className="text-nowrap">
                          <Link to={`view/${u.id}`}className="btn btn-sm btn-outline-secondary me-1">View</Link>
                          <Link to={`edit/${u.id}`} className="btn btn-sm btn-outline-primary me-1">Edit</Link>
                          {u.suspended ? (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(u.id)}
                            >
                              Delete
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleSuspend(u.id)}
                            >
                              Suspend
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
         

          
      
    </>
  );
}

export default Account;
