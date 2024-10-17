import React from 'react';
import {
    Container, Grid, Typography, Box, Paper, List, ListItem, ListItemText, Divider
} from '@mui/material';

const PatientProfile = ({ patient }) => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Patient Profile
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Name:</Typography>
                            <Typography variant="body1">{patient.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Age:</Typography>
                            <Typography variant="body1">{patient.age}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Phone Number:</Typography>
                            <Typography variant="body1">{patient.phoneNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Condition:</Typography>
                            <Typography variant="body1">{patient.condition}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" gutterBottom>
                    Health Records
                </Typography>
                
                <List>
                    {patient.healthRecords.map((record, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <ListItemText
                                            primary="Treatment"
                                            secondary={record.treatment}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ListItemText
                                            primary="Medication"
                                            secondary={record.medication}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ListItemText
                                            primary="Lab Results"
                                            secondary={record.labResults}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ListItemText
                                            primary="Date"
                                            secondary={new Date(record.date).toLocaleDateString()}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default PatientProfile;
