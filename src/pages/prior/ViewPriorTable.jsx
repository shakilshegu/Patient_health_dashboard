import { useQuery } from "@tanstack/react-query";
import { getAllPrior } from "../../Services/PatientService";
import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, CircularProgress
} from "@mui/material";

const ViewPriorTable = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['priorAuthorization'],
        queryFn: getAllPrior
    });
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading data: {error.message}</Typography>;

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.patientId.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" style={{ padding: "16px" }}>
                Prior Authorization Data
            </Typography>
            <div className="flex justify-end">
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {[
                            "ID", "Patient Name", "Age", "Treatment Type", "Insurance Plan",
                            "Date of Service", "Diagnosis Code", "Medication", "Status",
                            "Provider Notes", "Insurance Company"
                        ].map((header) => (
                            <TableCell key={header} style={{ fontWeight: "bold", color: "black" }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.patientId.name}</TableCell>
                            <TableCell>{row.patientId.age}</TableCell>
                            <TableCell>{row.treatmentType}</TableCell>
                            <TableCell>{row.insurancePlan}</TableCell>
                            <TableCell>{new Date(row.dateOfService).toLocaleDateString()}</TableCell>
                            <TableCell>{row.diagnosisCode}</TableCell>
                            <TableCell>{row.medication}</TableCell>
                            <TableCell style={{ color: row.status === 'Pending' ? 'red' : 'black' }}>
                                {row.status}
                            </TableCell>
                            <TableCell>{row.providerNotes}</TableCell>
                            <TableCell>{row.insuranceCompany}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ViewPriorTable;
