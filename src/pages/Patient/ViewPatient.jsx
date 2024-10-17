import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../Services/PatientService";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton,
  Typography, Divider, Box, CircularProgress, TablePagination
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

const ViewPatient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleViewClick = (patient) => {
    setSelectedPatient(patient); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const patients = data?.data || [];
  const paginatedPatients = patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" style={{ padding: "16px" }}>
        Patient Data
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {["ID", "Name", "Age", "Phone Number", "Condition", "Actions"].map((header) => (
              <TableCell key={header} style={{ fontWeight: "bold", color: "black" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedPatients.map((patient, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.phoneNumber}</TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleViewClick(patient)}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={patients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
          Patient Profile
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          {selectedPatient && (
            <>
              {/* Patient Basic Information */}
              <Box mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Name: {selectedPatient.name}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Age: {selectedPatient.age}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Phone Number: {selectedPatient.phoneNumber}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Condition: {selectedPatient.condition}</Typography>
              </Box>

              {/* Health Records Section */}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Health Records
              </Typography>
              {selectedPatient.healthRecords.map((record, index) => (
                <Box key={index} sx={{ mb: 2, padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                    Treatment: {record.treatment}
                  </Typography>
                  <Typography variant="body2">Medication: {record.medication}</Typography>
                  <Typography variant="body2">Lab Results: {record.labResults}</Typography>
                  <Typography variant="body2">
                    Date: {new Date(record.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ViewPatient;
