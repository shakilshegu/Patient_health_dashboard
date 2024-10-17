import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Health from "./pages/Health";
import AddPatientForm from "./pages/Patient/AddPatientForm"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/health"
            element={
              <MainLayout>
                <Health />
              </MainLayout>
            }
          />
           <Route
            path="/add-patient"
            element={
              <MainLayout>
                <AddPatientForm/>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
