const BASE_PATH = "/administrators"

import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import OffCanvas from './components/OffCanvas';
import { ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import Breadcrumber from '../../components/general/Breadcrumbs';
import { useAuth } from '../../services/AuthContext';


function AdminDashboard() {
    const { account, logout, loading } = useAuth();


    // offcanvas
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const handleCloseOffCanvas = () => setShowOffCanvas(false);
    const handleShowOffCanvas = () => setShowOffCanvas(true);


    // used for navigation
    const nav_buttons = [
        {
            name: "Dashboard",
            icon: 'dashboard',
            path: `${BASE_PATH}`,
            added_class: 'btn-primary'
        },
        {
            name: "Account",
            icon: 'person',
            path: `${BASE_PATH}/account`,
            added_class: 'btn-outline-primary'
        },
        {
            name: "Branches",
            icon: 'home',
            path: `${BASE_PATH}/branch`,
            added_class: 'btn-outline-primary'
        },
        {
            name: "Items",
            icon: 'category',
            path: `${BASE_PATH}/item`,
            added_class: 'btn-outline-primary'
        },
        {
            name: "Inventory",
            icon: 'package',
            path: `${BASE_PATH}/inventory`,
            added_class: 'btn-outline-primary'
        },
        {
            name: "Equipment",
            icon: 'computer',
            path: `${BASE_PATH}/equipment`,
            added_class: 'btn-outline-primary'
        },
    ]


    return (
        <>
            <OffCanvas nav_buttons={nav_buttons} showOffCanvas={showOffCanvas} handleCloseOffCanvas={handleCloseOffCanvas} handleShowOffCanvas={handleShowOffCanvas} />


            <Container fluid className='p-0 m-0 vh-100 overflow-hidden'>
                <Navbar key='md' expand='md' className="bg-dark" style={{ height: '7vh' }}>
                    <Container fluid>
                        <Navbar.Brand href={BASE_PATH} className='text-light'>
                            <div className="p mb-0">Admin</div>
                        </Navbar.Brand>

                        <div class="btn-group">
                            <button type="button" class="btn rounded btn-sm d-none d-sm-flex align-items-center p-1 gap-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className='d-flex flex-column align-items-end text-light'>
                                    <div className="h6 mb-0 fw-bold">{account.first_name ? account.first_name : "User"}</div>
                                    <div className="p mb-0">{account.email}</div>
                                </div>
                                <div className="material-symbols-outlined rounded p-1 bg-secondary text-light fs-2">person</div>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className='dropdown-item' to='./profile'>Profile</Link>
                                </li>
                                <li>
                                    <Link className='dropdown-item' to='./setting'>Settings</Link>
                                </li>
                                <hr />
                                <li>
                                    <div className="dropdown-item btn" onClick={logout}>Logout</div>
                                </li>
                            </ul>
                        </div>

                        {/* toggles offcanvas */}
                        <span class="navbar-toggler-icon d-block d-sm-none cursor-pointer fs-2 text-center" onClick={handleShowOffCanvas}>
                            <i class="material-symbols-outlined text-light">menu</i>
                        </span>

                    </Container>
                </Navbar>


                <div className="row m-0 p-0" style={{ height: '93vh' }}>

                    {/* side panel (Left) */}
                    <div className="col-auto col-lg-2 d-none d-sm-block bg-primary-light">
                        <div className="d-flex flex-column flex-fill gap-3 py-3">
                            {
                                // display all the navigation buttons
                                nav_buttons.map((e, k) => (
                                    <Link key={k} to={e.path} className={`btn gap-2 d-flex justify-content-center justify-content-lg-start align-items-center text-decoration-none rounded-pillz ${e.added_class}`}>
                                        <div className="material-symbols-outlined">{e.icon}</div>
                                        <div className="p mb-0 fw-bold d-none d-lg-block">{e.name}</div>
                                    </Link>

                                ))
                            }
                        </div>
                    </div>


                    {/* Center Content */}
                    <div className="col h-100 overflow-y-scroll">
                        <div className="container-fluid my-3 p-0">
                            <Breadcrumber basePath={BASE_PATH} basePathName="Dashboard" />
                        </div>

                        <div className="mb-5">
                            <Outlet />
                        </div>
                    </div>



                    {/* side Panel (Right) */}
                    <div className="col-auto col-lg-2 d-none d-lg-block bg-primary-light">
                        <div className="d-flex flex-column flex-fill gap-2 py-3">

                            <div className="text-muted mb-0">System Logs</div>
                            <ListGroup variant="flush">
                                <ListGroup.Item className='text-danger'>Critical (1)</ListGroup.Item>
                                <ListGroup.Item className='text-warning'>Warning (5)</ListGroup.Item>
                                <ListGroup.Item className='text-muted'>Bug Reports (10)</ListGroup.Item>
                                <ListGroup.Item className='text-muted'>View All (16)</ListGroup.Item>
                            </ListGroup>

                            <div className="pb-3"></div>

                            <div className="text-muted mb-0">Messages (1)</div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Create Message</ListGroup.Item>
                                <ListGroup.Item>View Messages</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default AdminDashboard;