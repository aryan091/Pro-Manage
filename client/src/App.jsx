import {UserContext ,  UserContextProvider } from "./context/UserContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import Dashboard from './components/Board/Board';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import ViewTask from './components/ViewTask/ViewTask';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserContextProvider> {/* Ensure UserContextProvider wraps the entire app */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/*" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/public" element={<ViewTask />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Router>
    </UserContextProvider>
  );
}

export default App;
