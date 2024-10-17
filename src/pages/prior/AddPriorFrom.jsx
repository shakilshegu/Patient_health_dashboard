import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField, Button, Box, Typography, Autocomplete } from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { addPrior, getPatients } from "../../Services/PatientService";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Validation schema using Yup
const validationSchema = Yup.object({
    patientId: Yup.string().required("Patient ID is required").nullable(),
    treatmentType: Yup.string().required("Treatment type is required"),
    insurancePlan: Yup.string().required("Insurance plan is required"),
    dateOfService: Yup.date().required("Date of service is required").nullable(),
    diagnosisCode: Yup.string().required("Diagnosis code is required"),
    medication: Yup.string().required("Medication is required"),
    providerNotes: Yup.string().optional(),
    insuranceCompany: Yup.string().required("Insurance company is required"),
});

const AddPriorForm = () => {
    const queryClient = useQueryClient();
    // get patient Data
    const { data: patients} = useQuery({
        queryKey: ["patients"],
        queryFn: getPatients,
    });
    const patientOptions = patients?.data || [];


    const mutation = useMutation({
        mutationFn: (newPrior) => addPrior(newPrior),
        onSuccess: () => {
            queryClient.invalidateQueries(["prior"]);
            toast.success("Prior added successfully!");
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(`Error: ${error.message}`);
            console.error("Error adding prior:", error.message);
        },
    });

    return (
        <>
            <Box fullWidth mx="auto" p={3} boxShadow={2}>
                <Typography variant="h6"  gutterBottom>
                    Add Prior Authorization
                </Typography>
                <Formik
                    initialValues={{
                        patientId: "",
                        treatmentType: "",
                        insurancePlan: "",
                        dateOfService: null,
                        diagnosisCode: "",
                        medication: "",
                        providerNotes: "",
                        insuranceCompany: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        mutation.mutate(values);
                        resetForm(); // Reset the form after successful submission
                    }}
                >
                    {({ errors, touched, handleChange, handleSubmit, resetForm,setFieldValue,setFieldTouched }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
                                {/* Row 1 */}
                                <Box flex={1} mb={2}>
                                    <Autocomplete
                                        options={patientOptions}
                                        getOptionLabel={(option) => option.name} 
                                        onChange={(event, value) => {
                                            if (value) {
                                                console.log("Selected patient ID:", value._id);
                                                setFieldValue("patientId", value._id); 
                                            } else {
                                                setFieldValue("patientId", ""); 
                                            }
                                        }}
                                        onBlur={() => setFieldTouched("patientId")}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Patient Name"
                                                variant="outlined"
                                                error={touched.patientId && Boolean(errors.patientId)}
                                                helperText={touched.patientId && errors.patientId}
                                            />
                                        )}
                                    />
                                </Box>
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="treatmentType"
                                        label="Treatment Type"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.treatmentType && Boolean(errors.treatmentType)}
                                        helperText={touched.treatmentType && errors.treatmentType}
                                    />
                                </Box>
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="insurancePlan"
                                        label="Insurance Plan"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.insurancePlan && Boolean(errors.insurancePlan)}
                                        helperText={touched.insurancePlan && errors.insurancePlan}
                                    />
                                </Box>
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="dateOfService"
                                        label="Date of Service"
                                        type="date"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.dateOfService && Boolean(errors.dateOfService)}
                                        helperText={touched.dateOfService && errors.dateOfService}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
                                {/* Row 2 */}
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="diagnosisCode"
                                        label="Diagnosis Code"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.diagnosisCode && Boolean(errors.diagnosisCode)}
                                        helperText={touched.diagnosisCode && errors.diagnosisCode}
                                    />
                                </Box>
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="medication"
                                        label="Medication"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.medication && Boolean(errors.medication)}
                                        helperText={touched.medication && errors.medication}
                                    />
                                </Box>
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="providerNotes"
                                        label="Provider Notes"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.providerNotes && Boolean(errors.providerNotes)}
                                        helperText={touched.providerNotes && errors.providerNotes}
                                    />
                                </Box>
                                <Box flex={1} mb={2}>
                                    <Field
                                        as={TextField}
                                        name="insuranceCompany"
                                        label="Insurance Company"
                                        variant="outlined"
                                        onChange={handleChange}
                                        error={touched.insuranceCompany && Boolean(errors.insuranceCompany)}
                                        helperText={touched.insuranceCompany && errors.insuranceCompany}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                <Button variant="contained" color="error" onClick={() => resetForm()}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                            {mutation.isLoading && <Typography>Adding prior...</Typography>}
                        </form>
                    )}
                </Formik>
            </Box>

        </>
    );
};

export default AddPriorForm;
