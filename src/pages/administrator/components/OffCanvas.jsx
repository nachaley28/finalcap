import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';

function OffCanvas({ showOffCanvas, handleCloseOffCanvas, nav_buttons }) {
  const { account, logout } = useAuth()

  return (
    <>
      <Offcanvas show={showOffCanvas} placement='end' onHide={handleCloseOffCanvas} className='d-block d-sm-none' responsive="sm">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column flex-fill gap-3 py-3">
            {
              nav_buttons.map((e, k) => (
                <Link key={k} to={e.path} className={`btn gap-2 d-flex justify-content-center align-items-center text-decoration-none ${e.added_class}`} onClick={handleCloseOffCanvas}>
                  <div className="material-symbols-outlined">{e.icon}</div>
                  <div className="p mb-0 fw-bold ">{e.name}</div>
                </Link>

              ))
            }

            <div className="border"></div>


            <div className="rounded p-2 bg-secondary-subtle">
              <p class="d-inline-flex mb-0 w-100">
                <button class="btn border-0 d-flex w-100 align-items-center gap-2 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  <div className="material-symbols-outlined rounded p-1 bg-secondary text-light fs-2">person</div>
                  <div className='d-flex flex-column align-items-start text-dark'>
                    <div className="h6 mb-0 fw-bold">{account.first_name ? account.first_name : "User"}</div>
                    <div className="p mb-0">{account.email}</div>
                  </div>
                </button>
              </p>
              <div class="collapse" id="collapseExample">
                <div class="card card-body d-flex gap-2 border-0 bg-secondary-subtle p-0">
                  <Link to='./profile' className='btn btn-secondary' onClick={handleCloseOffCanvas}>Profile</Link>
                  <Link to='./setting' className='btn btn-secondary' onClick={handleCloseOffCanvas}>Settings</Link>
                  <Link className='btn btn-danger border-0 bg-danger border-danger'>Logout</Link>
                </div>
              </div>

            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;