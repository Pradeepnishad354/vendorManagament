
import './App.css';
import AddVendor from './component/AddVendor';
import AllVendor from './component/AllVendor';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, BrowserRouter } from "react-router-dom"
import UpdateVendor from './component/UpdateVendor';
import NavBar from './component/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import HomePage from './component/Home';

function App() {
  return (
   <>
<NavBar/>
    <BrowserRouter>
  
    <ToastContainer/>
    <Routes>
    <Route path="/" element={ <HomePage/> } />
           <Route path="/vendor" element={ <AddVendor/> } />
           <Route path="/vendor-list" element={ <AllVendor/> } />
           <Route path="/vendor/edit/:id" element={ <UpdateVendor/> } />
          
         </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
