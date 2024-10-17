import { useState } from 'react';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isPriorOpen, setIsPriorOpen] = useState(false);

  const togglePatientSection = () => {
    setIsPatientOpen(!isPatientOpen);
  };
  const togglePriorSection = () => {
    setIsPriorOpen(!isPriorOpen);
    setIsPatientOpen(false);
   }
  return (
    <div className="bg-gray-950 text-white w-64 h-screen p-5 space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          <NavLink to="/" end>
            <li className="hover:bg-gray-700 p-2 rounded">Home</li>
          </NavLink>
          <li className="hover:bg-gray-700 p-2 rounded" onClick={togglePatientSection}>Patient</li>
          {isPatientOpen && (
            <ul className="ml-4 space-y-2">
              <NavLink to="/add-patient">
                <li className="hover:bg-gray-600 p-2 rounded">Add Patient</li>
              </NavLink>
              <NavLink to="/health">
                <li className="hover:bg-gray-600 p-2 rounded">View Patients</li>
              </NavLink>
            </ul>
          )}
          <li className="hover:bg-gray-700 p-2 rounded" onClick={togglePriorSection}>
            Prior
          </li>
          {isPriorOpen && (
            <ul className="ml-4 space-y-2">
              <NavLink to="/add-prior">
                <li className="hover:bg-gray-600 p-2 rounded">Add Prior</li>
              </NavLink>
              <NavLink to="/view-prior">
                <li className="hover:bg-gray-600 p-2 rounded">View Prior</li>
              </NavLink>
            </ul>
          )}
          <NavLink to="/settings"> {/* Add this if you have a Settings page */}
            <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
          </NavLink>

        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
