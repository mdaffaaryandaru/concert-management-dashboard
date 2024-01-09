import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import AddTicket from './tickets/AddTicket';
import EditTicket from './tickets/EditTicket';
import PrivateRoute from './PrivateRoute';
import Register from './auth/Register';

import Login from './auth/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

function Main() {
  const location = useLocation();
  const showNavbar =
    location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-ticket"
          element={
            <PrivateRoute>
              <AddTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-ticket/:id"
          element={
            <PrivateRoute>
              <EditTicket />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
function App() {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
}

export default App;
