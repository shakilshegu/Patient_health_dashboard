import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { getPatients } from "../../Services/PatientService";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewPatient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Handle view click to open modal
  const handleViewClick = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null); // Reset selected patient when closing
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const patients = data?.data || [];

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "170px",
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      width: "100px",
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: "Condition",
      selector: (row) => row.condition,
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <IconButton onClick={() => handleViewClick(row)}>
          <VisibilityIcon />
        </IconButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "70px",
    },
  ];

  return (
    <div className="shadow-md">
      <h2 className="font-medium">Patient Data</h2>
      <DataTable
        columns={columns}
        data={patients}
        pagination
        striped
        highlightOnHover
      />

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Patient Profile</DialogTitle>
        <DialogContent>
          {selectedPatient && (
            <>
              <Typography variant="h6">Name: {selectedPatient.name}</Typography>
              <Typography variant="h6">Age: {selectedPatient.age}</Typography>
              <Typography variant="h6">Phone Number: {selectedPatient.phoneNumber}</Typography>
              <Typography variant="h6">Condition: {selectedPatient.condition}</Typography>
              <Typography variant="h5" gutterBottom>
                Health Records
              </Typography>
              {selectedPatient.healthRecords.map((record, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">Treatment: {record.treatment}</Typography>
                  <Typography variant="body2">Medication: {record.medication}</Typography>
                  <Typography variant="body2">Lab Results: {record.labResults}</Typography>
                  <Typography variant="body2">
                    Date: {new Date(record.date).toLocaleDateString()}
                  </Typography>
                </div>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewPatient;



