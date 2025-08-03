import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const reports = [
  {
    id: 1,
    submittedBy: 'Cristina Reyes',
    date: 'June 24, 2025, 10:00 AM',
    department: 'Inventory Management',
    status: 'Reviewed',
  },
  {
    id: 2,
    submittedBy: 'James Salvador',
    date: 'June 23, 2025, 2:45 PM',
    department: 'Branch Operations',
    status: 'Pending',
  },
  {
    id: 3,
    submittedBy: 'Ella Ramos',
    date: 'June 22, 2025, 11:20 AM',
    department: 'Accounts & Records',
    status: 'Approved',
  }
];

const statusColors = {
  Approved: 'success',
  Reviewed: 'info',
  Pending: 'warning'
};

function Inventory() {
  return (
    <Container fluid="lg" className="my-5">
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold">Lifebank Inventory Reports</h3>
        </Col>
         <Col xs="auto">
          <Link to="add" className="btn btn-primary">+ Add Inventory</Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-4 shadow-sm bg-body text-body">
            <Table bordered responsive hover>
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Submitted By</th>
                  <th>Date Submitted</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report.id}>
                    <td>{index + 1}</td>
                    <td>{report.submittedBy}</td>
                    <td>{report.date}</td>
                    <td>{report.department}</td>
                    <td>
                      <span className={`badge bg-${statusColors[report.status]}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <Link to={`view/${report.id}`} className="btn btn-primary btn-sm">
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Inventory;
