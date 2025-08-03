import { useParams } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { ImgDefaultProfile } from "../../../../components/general/Images";

function ViewBranchForm() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Branch Details</h4>

      <Card className="p-4 shadow-sm">
        <Row>
          <Col md={4} className="border-end text-center">
            <img
              src={ImgDefaultProfile}
              alt="Branch"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h5 className="fw-semibold">Main Branch</h5>
            <p className="text-muted">Iloilo City</p>
            <p className="text-muted small">Status: Operational</p>
          </Col>

          <Col md={8}>
            <div className="mb-3">
              <strong>Branch ID:</strong>
              <div className="text-muted">{id}</div>
            </div>
            <div className="mb-3">
              <strong>Address:</strong>
              <div className="text-muted">123 Main St, Iloilo City</div>
            </div>
            <div className="mb-3">
              <strong>Contact:</strong>
              <div className="text-muted">09123456789</div>
            </div>
            <div className="mb-3">
              <strong>Description:</strong>
              <div className="text-muted">Head office location handling main operations.</div>
            </div>

          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ViewBranchForm;
