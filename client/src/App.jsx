// App.js
import { UserContextProvider } from "./context/UserContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskProvider } from "./context/TaskContext";
import Home from './components/Home/Home';
import MainLayout from './components/MainLayout/MainLayout';
import Board from './components/Board/Board';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import ViewTask from './components/ViewTask/ViewTask';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <UserContextProvider> 
      <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/app/*" element={<MainLayout />}>
            <Route path="dashboard" element={<Board />} />
            <Route path="dashboard/create-task" element={<Board />} />

            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />

          </Route>
          <Route path="*" element={<NotFound />} />

          <Route path="/public/:taskId" element={<ViewTask />} />
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
      </TaskProvider>
    </UserContextProvider>
  );
}

export default App;
