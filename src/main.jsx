import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

// bootstrappie
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/scss/main.scss'

// custom style classes
import './assets/css/main.css'

// AG-GRID Community version, for data visualization with tables
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

// custom context
import { AuthProvider } from './services/AuthContext.jsx';
import { ThemeProvider } from './services/ThemeContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)