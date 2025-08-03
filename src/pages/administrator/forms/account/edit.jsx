import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

function EditAccountProfile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Dummy data for roles and branches
  const roles = [
    { id: "admin", name: "Administrator" },
    { id: "moderator", name: "Moderator" },
    { id: "staff", name: "Staff" },
  ];

  const branches = [
    { id: 1, name: "Main Branch", address: "Iloilo City" },
    { id: 2, name: "Cebu Branch", address: "Cebu City" },
  ];

  // Form fields
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [setupProfile, toggleSetupProfile] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birth_date, setBirthDate] = useState("");

  useEffect(() => {
    // Simulate fetching user
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const fetchedData = {
          email: "john@example.com",
          role: "admin",
          branch_id: 1,
          first_name: "John",
          middle_name: "C.",
          last_name: "Doe",
          birth_date: "1990-01-01",
        };

        setEmail(fetchedData.email);
        setSelectedRole(fetchedData.role);
        setSelectedBranch(fetchedData.branch_id);
        setFirstName(fetchedData.first_name);
        setMiddleName(fetchedData.middle_name);
        setLastName(fetchedData.last_name);
        setBirthDate(fetchedData.birth_date);
        toggleSetupProfile(true);
      } catch (err) {
        setError("Failed to fetch account.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  const handleClearForms = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setSelectedRole("");
    setSelectedBranch("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setBirthDate("");
    toggleSetupProfile(false);
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    if (password && password !== passwordConfirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const updatedData = {
        email,
        password,
        role: selectedRole,
        branch_id: selectedBranch,
        first_name,
        middle_name,
        last_name,
        birth_date,
      };

      console.log("Updating account:", updatedData);
      alert("Account updated successfully!");
    } catch (err) {
      setError("Failed to update account.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div className="container mt-4">
      <h4 className="fw-bold mb-4">Edit Account (ID: {id})</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <Form.Select
              required
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option hidden>Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                className="form-control"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                minLength={8}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPasswordConfirm ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && (
              <div className="text-danger small mt-1">{passwordError}</div>
            )}
          </div>

          

          <div className="col-md-6">
            <label className="form-label">Branch</label>
            <Form.Select
              required
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option hidden>Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name} - {branch.address}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <div className="mt-3 d-flex justify-content-end">
          <Form.Check
            type="switch"
            id="setup-profile"
            checked={setupProfile}
            onChange={() => toggleSetupProfile(!setupProfile)}
            label="Edit Profile Information"
            reverse
          />
        </div>

        {setupProfile && (
          <>
            <hr />
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={middle_name}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={birth_date}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary fw-bold"
            onClick={handleClearForms}
          >
            Clear
          </button>
          <button type="submit" className="btn btn-primary fw-bold" disabled={saving}>
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAccountProfile;
