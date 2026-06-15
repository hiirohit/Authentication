import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.js"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx';
import axios from "axios";

axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
       <App/>
    </AppContextProvider>
  </BrowserRouter>
)
