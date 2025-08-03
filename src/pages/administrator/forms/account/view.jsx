import { useParams } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { ImgDefaultProfile } from "../../../../components/general/Images";


function ViewAccountForm() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Account Details</h4>

      <Card className="p-4 shadow-sm">
        <Row>
        
          <Col md={4} className="border-end text-center">
            <img
              src={ImgDefaultProfile}
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h5 className="fw-semibold">John Doe</h5>
            <p className="text-muted">Administrator</p>
            <p className="text-muted small">Status: Active</p>
          </Col>

          
          <Col md={8}>
            <div className="mb-3">
              <strong>Account ID:</strong>
              <div className="text-muted">{id}</div>
            </div>
            <div className="mb-3">
              <strong>Email:</strong>
              <div className="text-muted">john.doe@example.com</div>
            </div>
            <div className="mb-3">
              <strong>Role:</strong>
              <div className="text-muted">Administrator</div>
            </div>

            <Button variant="secondary" href="/administrators/account" className="mt-2">
              Back to Accounts
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ViewAccountForm;
