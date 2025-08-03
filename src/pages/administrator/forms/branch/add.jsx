import { useState } from 'react';

function AddBranchForm() {
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleClearForm = () => {
    setBranchName('');
    setBranchAddress('');
    setContactNumber('');
    setDescription('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!branchName || !branchAddress) {
      setError('Branch Name and Address are required.');
      return;
    }

    const branchData = {
      name: branchName,
      address: branchAddress,
      contact: contactNumber,
      description,
    };

    console.log('Branch to add:', branchData);
    alert('Branch added successfully!');
    handleClearForm();
  };

  return (
    <div className="w-100 d-flex justify-content-center my-5">
      <div className="p-4 bg-primary-subtle rounded shadow w-100" style={{ maxWidth: '1000px' }}>
        <form onSubmit={handleSubmit}>
          <div className="h4 text-center fw-bold mb-4">Add New Branch</div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label fw-semibold">Branch Name</label>
            <input
              type="text"
              className="form-control"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Branch Address</label>
            <textarea
              className="form-control"
              rows="2"
              value={branchAddress}
              onChange={(e) => setBranchAddress(e.target.value)}
              placeholder="Enter full address"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact Number <small className="text-muted">(optional)</small></label>
            <input
              type="text"
              className="form-control"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="e.g. 09123456789"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description <small className="text-muted">(optional)</small></label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any notes or details about the branch"
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary fw-semibold"
              onClick={handleClearForm}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary fw-semibold">
              Add Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBranchForm;
