import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        <div className="col-12">
          <div className=" bg-primary-subtle p-4 rounded shadow">
            <div className="h2 fw-bold mb-0">404</div>
            <div className="h4 mb-0">Page not Found</div>
            <div className='p text-muted mt-3'>Sorry, the page you are looking for does not exist.</div>
            <div className="d-flex justify-content-center mt-3">
              <Link to="/guest" className="btn btn-primary">Return</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
