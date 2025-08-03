import { Routes, Route, Navigate } from 'react-router-dom';

// hook to manage user authentication and authorization
import { useAuth } from './services/AuthContext';

// non-user pages
import LoginPage from './pages/LoginPage.jsx';
import AccountRecoveryPage from './pages/AccountRecovery.jsx';

// general components
import AccountProfile from './components/AccountProfile.jsx';
import AccountSettings from './components/settings/AccountSettings.jsx';
import RouteProtector from './components/RouteProtector.jsx'; // used to check if user has proper authorization to access pages

// guests
import GuestHomepage from './pages/guest/GuestHomepage.jsx';

// dashboard
import Dashboard from './pages/dashboard/index.jsx';
import DashboardIndexContent from './pages/dashboard/DashboardIndexContent.jsx';

// administrators
import AdminDashboard from './pages/administrator/AdminDashboard.jsx';

import Account from './pages/administrator/Account.jsx';
import AddAccountForm from './pages/administrator/forms/account/add.jsx';
import ViewAccountForm from './pages/administrator/forms/account/view.jsx';
import EditAccountProfile from './pages/administrator/forms/account/edit.jsx';

import Branch from './pages/administrator/Branch.jsx';
import AddBranchForm from './pages/administrator/forms/branch/add.jsx';
import DeleteBranch from './pages/administrator/forms/branch/delete.jsx';
import EditBranchForm from './pages/administrator/forms/branch/edit.jsx';
import ViewBranchForm from './pages/administrator/forms/branch/view.jsx';

import Item from './pages/administrator/Item.jsx';
import ViewItem from './pages/administrator/forms/item/view.jsx';
import AddItemForm from './pages/administrator/forms/item/add.jsx';
import EditItemForm from './pages/administrator/forms/item/edit.jsx';

import Inventory from './pages/administrator/Inventory.jsx';
import ViewReport from './pages/administrator/forms/inventory/view.jsx';
import AddInventory from './pages/administrator/forms/inventory/add.jsx';



import Equipment from './pages/administrator/Equipment.jsx';
import AddEquipmentForm from './pages/administrator/forms/equipment/add.jsx';
import ViewEquipment  from './pages/administrator/forms/equipment/view.jsx';
import EditEquipment  from './pages/administrator/forms/equipment/edit.jsx';












import AdminDashboardIndex from './pages/administrator/index.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import ThemeToggleButton from './components/ThemeToggleButton.jsx';
import { useTheme } from './services/ThemeContext.jsx';

function App() {
  const { authenticated } = useAuth();

  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <div className={`container-fluid px-0 position-relative ${theme == 'dark' ? 'bg-offblack' : 'bg-offwhite'}`}>
        <ThemeToggleButton />
        <Routes>
          <Route path="/" element={<Navigate to='/login' replace />} />
          <Route path="/login" element={!authenticated ? <LoginPage /> : <Navigate to='/dashboard' replace />} />
          <Route path="/recovery" element={!authenticated ? <AccountRecoveryPage /> : <Navigate to='/dashboard' replace />} />


          <Route path="/guest" element={<RouteProtector required_access_level={[5]} />} >
            <Route element={<Dashboard />}>
              <Route index element={<GuestHomepage />} />
            </Route>
          </Route>


          <Route path="/supplier" element={<RouteProtector required_access_level={[4]} />} >
            <Route element={<>Suppliers page</>}>
              <Route index element={<>Supplier's homepage content</>} />
            </Route>
          </Route>


          <Route path="/dashboard" element={<RouteProtector required_access_level={[1, 2, 3]} />} >
            <Route element={<Dashboard />}>
              <Route path='profile' element={<AccountProfile />} />
              <Route path='setting' element={<AccountSettings />} />

              <Route index element={<DashboardIndexContent />} />
            </Route>
          </Route>


          <Route path="/administrators" element={<RouteProtector required_access_level={[0]} />} >
            <Route element={<AdminDashboard />}>
              <Route index element={<AdminDashboardIndex />} />
              <Route path='profile' element={<AccountProfile />} />
              <Route path='setting' element={<AccountSettings />} />

              <Route path='account' element={<Account/>} />
              <Route path='account/add' element={<AddAccountForm/>} />
              <Route path='account/view/:id' element={<ViewAccountForm/>} />
              <Route path='account/suspend/:id' element={<>DeleteAccountForm</>} />
              <Route path='account/delete/:id' element={<>DeleteAccountForm</>} />
              <Route path='account/edit/:id' element={<EditAccountProfile/>} />
              <Route path='account/edit/credential/:id' element={<>EditAccountCredential</>} />
              <Route path='account/edit/password/:id' element={<>EditAccountPassword</>} />

              <Route path='branch' element={<Branch/>} />
              <Route path='branch/add' element={<AddBranchForm/>} />
              <Route path='branch/edit' element={<EditBranchForm/>} />
              <Route path='branch/view/:id' element={<ViewBranchForm/>} />
              <Route path='branch/delete/:id' element={<DeleteBranch/>} />

              <Route path='item' element={<Item/>} />
              <Route path='item/view' element={<ViewItem/>} />
              <Route path='item/add' element={<AddItemForm/>} />
              <Route path='item/edit/:id' element={<EditItemForm/>} />
              <Route path='item/delete/:id' element={<>DeleteItemForm</>} />
              <Route path='item/suspend/:id' element={<>SuspendItemForm</>} />

              <Route path='equipment' element={<Equipment/>} />
              <Route path='equipment/view/:id' element={<ViewEquipment/>} />
              <Route path='equipment/add' element={<AddEquipmentForm/>} />
              <Route path='equipment/edit/:id' element={<EditEquipment/>} />
              <Route path='equipment/delete/:id' element={<>DeleteEquipmentForm</>} />
              <Route path='equipment/suspend/:id' element={<>SuspendEquipmentForm</>} />

              <Route path='inventory' element={<Inventory/>} />
              <Route path='inventory/view/:id' element={<ViewReport/>} />
              <Route path='inventory/add' element={<AddInventory/>} />
              <Route path='inventory/edit/:id' element={<>EditInventoryForm</>} />
              <Route path='inventory/delete/:id' element={<>DeleteInventoryForm</>} />
              <Route path='inventory/suspend/:id' element={<>SuspendInventoryForm</>} />

              <Route path='*' element={<>PageNotFound</>} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div >
    </>
  );
}

export default App;