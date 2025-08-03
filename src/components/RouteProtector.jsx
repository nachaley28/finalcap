import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const ProtectedRoutes = ({ required_access_level }) => {
    const { authenticated, account, loading } = useAuth();

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems:" center", height: "100vh"}}>
                <div class="loader"></div>
                <p>Loading, Please Wait</p>
            </div>
        );
    }


    if (account && required_access_level) {
        const userAccessLevel = account.role_id;

        if (!required_access_level.includes(userAccessLevel)) {
            switch (userAccessLevel) {
                case 0:
                    return <Navigate to='/administrators' replace />
                case 1:
                case 2:
                case 3:
                    return <Navigate to='/dashboard' replace />
                case 4:
                    return <Navigate to='/supplier' replace />
                case 5:
                    return <Navigate to='/guest' replace />
            }
        }

        return <Outlet />;
    }

    if (!account && !loading && !authenticated) {
        console.log('ProtectedRoutes: User not authenticated. Redirecting to login.');
        return <Navigate to={'/login'} />
    }
};

export default ProtectedRoutes;