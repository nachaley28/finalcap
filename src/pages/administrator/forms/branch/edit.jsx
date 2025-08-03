import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBranchForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = {
          name: 'Main Branch',
          address: '123 Main St, Iloilo City',
          contact: '09123456789',
          description: 'Head office branch' ,
        };

        setBranchName(res.name);
        setBranchAddress(res.address);
        setContactNumber(res.contact);
        setDescription(res.description);
      } catch (err) {
        setError('Failed to load branch details.');
      }
    };

    fetchBranch();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!branchName || !branchAddress) {
      setError('Branch Name and Address are required.');
      return;
    }

    const updatedBranch = {
      id,
      name: branchName,
      address: branchAddress,
      contact: contactNumber,
      description,
    };

    console.log('Branch to update:', updatedBranch);
    alert('Branch updated successfully!');
    navigate('/administrators/branches'); 
  };

  return (
    <div className="w-100 d-flex justify-content-center my-5">
      <div className="p-4 bg-primary-subtle rounded shadow w-100" style={{ maxWidth: '1000px' }}>
        <form onSubmit={handleSubmit}>
          <div className="h4 text-center fw-bold mb-4">Edit Branch</div>

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
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary fw-semibold">
              Update Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBranchForm;
