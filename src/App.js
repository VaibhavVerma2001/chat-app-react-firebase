import React , {useContext} from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './index.scss';
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import AuthContext from './context/AuthContext';

function App() {

  const context = useContext(AuthContext);
  const {currentUser } = context;
  console.log("from app.js current user is" ,currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/">

          <Route index element={ currentUser? <Home /> : <Navigate to="/login" /> } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
