import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import PeopleIcon from '@mui/icons-material/People'; 
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

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
          <li className="hover:bg-gray-700 p-2 rounded flex items-center">
              <HomeIcon className="mr-2" />
              Home
            </li>
          </NavLink>
          <li
            className="hover:bg-gray-700 p-2 rounded flex items-center justify-between cursor-pointer"
            onClick={togglePatientSection}
          >
            <div className="flex items-center">
              <PeopleIcon className="mr-2" />
              Patient
            </div>
            {isPatientOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
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
         <li
            className="hover:bg-gray-700 p-2 rounded flex items-center justify-between cursor-pointer"
            onClick={togglePriorSection}
          >
            <div className="flex items-center">
              <AssignmentIcon className="mr-2" />
              Prior Authorization
            </div>
            {isPriorOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
          {isPriorOpen && (
            <ul className="ml-4 space-y-2">
              <NavLink to="/add-prior">
                <li className="hover:bg-gray-600 p-2 rounded">Add Prior</li>
              </NavLink>
              <NavLink to="/get-prior">
                <li className="hover:bg-gray-600 p-2 rounded">View Prior</li>
              </NavLink>
            </ul>
          )}
          <NavLink to="/settings"> 
          <li className="hover:bg-gray-700 p-2 rounded flex items-center">
              <SettingsIcon className="mr-2" />
              Settings
            </li>
          </NavLink>

        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
