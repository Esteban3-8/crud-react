
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import EditUserForm from "./pages/EditUserForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
     
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/users" element={<Users />} />
            <Route path="/form" element={<UserForm />} />
            
            <Route path="/edit/:id" element={<EditUserForm />} />
          </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;