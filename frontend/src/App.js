//Entry Point
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Component
import LandingPage from "./components/LandingPage";
//Admin
// import LoginAdmin from './components-admin/LoginAdmin';
import AdminDashboard from './components-admin/AdminDashboard';
import DataAdmin from './components-admin/DataAdmin';
import KelolaGaji from './components-admin/KelolaGaji';
import KelolaDokumen from './components-admin/KelolaDokumen';
import ChatAdmin from './components-admin/ChatAdmin';
import MasterGaji from './components-admin/MasterGaji';
//Karyawan
import Register from './components/Register';
import Forgot from "./components/Forgot";
import Dashboard from "./components/KaryawanDashboard";
import LoginKaryawan from './components/LoginKaryawan';
import PresensiKaryawan from './components/PresensiKaryawan';
import DataKaryawan from './components/DataKaryawan';
import GajiKaryawan from './components/GajiKaryawan';
import DokumenKaryawan from './components/DokumenKaryawan';
import ChatApp from './components/ChatApp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        {/* Router Admin */}
        {/* <Route path="/login-admin" element={<LoginAdmin/>}/> */}
        <Route path="/data-admin/:id" element={<DataAdmin/>}/>
        <Route path="/kelola-gaji/:id" element={<KelolaGaji/>}/>
        <Route path="/kelola-dokumen/:id" element={<KelolaDokumen/>}/>
        <Route path="/chat-admin/:id" element={<ChatAdmin/>}/>
        <Route path="/master-gaji/:id" element={<MasterGaji/>}/>
        {/* Router Karyawan */}
        <Route path="/login" element={<LoginKaryawan/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/presensi-karyawan/:id" element={<PresensiKaryawan/>}/>
        <Route path="/data-karyawan/:id" element={<DataKaryawan/>}/>
        <Route path="/gaji-karyawan/:id" element={<GajiKaryawan/>}/>
        <Route path="/dokumen-karyawan/:id" element={<DokumenKaryawan/>}/>
        <Route path="/chatting/:id" element={<ChatApp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
