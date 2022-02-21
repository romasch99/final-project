import './App.css';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {EditCustomer} from "./pages/EditCustomer";
import {Shows} from "./pages/Shows";
import {EditShow} from "./pages/EditShow";
import {Navbar} from "./ui/molecules/Nav";
import {AuthProvider} from "./components/AuthProvider";
import {RequireAuth} from "./components/RequireAuth";   

function App() {
  const navigate = useNavigate();
  
  const goLogin = () => {
    navigate(`/login`);
  };
  
  const goRegister = () => {
    navigate(`/register`);
  };
  
  return (
    <AuthProvider>
      <Navbar goLogin={() => goLogin()} goRegister={() => goRegister()} />
      <Routes>
        <Route>
          <Route path="/" 
            element={
              <RequireAuth><Home /></RequireAuth>
            } 
          />
          <Route path="/edit-customer/:id" 
            element={
              <RequireAuth><EditCustomer /></RequireAuth>
            } 
          />
          <Route path="/shows" 
            element={
              <RequireAuth><Shows /></RequireAuth>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-show/:id" 
            element={
              <RequireAuth><EditShow /></RequireAuth>
            } 
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>  
      </Routes>  
    </AuthProvider>  

  );
}

export default App;
