import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function AddAccountForm() {
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [setupProfile, toggleSetupProfile] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [middle_name, setMiddleName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birth_date, setBirthDate] = useState('');

  const [branches, setBranches] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    setBranches([
      { id: 0, name: 'br1', address: 'add1' },
      { id: 1, name: 'br2', address: 'add2' },
      { id: 2, name: 'br3', address: 'add3' },
      { id: 3, name: 'br4', address: 'add4' },
    ]);

    setRoles([
      { id: 0, name: 'Admin' },
      { id: 1, name: 'Employee' },
      { id: 2, name: 'Guest' },
    ]);
  }, []);

  useEffect(() => {
    if (password !== passwordConfirm && password.length > 0) {
      setPasswordError('Password does not match');
    } else if (password.length > 0 && password.length < 10) {
      setPasswordError('Password should contain 10 characters');
    } else {
      setPasswordError('');
    }
  }, [password, passwordConfirm]);

  function handleClearForms() {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setBirthDate('');
    setSelectedBranch('');
    setSelectedRole('');
    setError('');
    setPasswordError('');
    toggleSetupProfile(false);
  }

  function handleRegister(e) {
    e.preventDefault();
    console.log('Form submitted');
  }

  return (
    <div className="container my-4">
      <div className="p-4 bg-primary-subtle rounded" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <form onSubmit={handleRegister}>
          <div className="h4 text-center fw-bold mb-4">Create New Account</div>

          {/* Account Credentials */}
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
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
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
                  type={showPasswordConfirm ? 'text' : 'password'}
                  className="form-control"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {passwordError && <div className="text-danger small mt-1">{passwordError}</div>}
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

          {/* Profile Toggle */}
          <div className="mt-3 d-flex justify-content-end">
            <Form.Check
              type="switch"
              id="setup-profile"
              checked={setupProfile}
              onChange={() => toggleSetupProfile(!setupProfile)}
              label="Add Profile Information"
              reverse
            />
          </div>

          {/* Optional Profile Info */}
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

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary fw-bold"
              onClick={handleClearForms}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary fw-bold">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAccountForm;
