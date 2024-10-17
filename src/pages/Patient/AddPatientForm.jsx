import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { addPatient } from "../../Services/PatientService";
import ViewPatient from "./ViewPatient";
import toast from "react-hot-toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(0, "Age must be a positive number"),
    phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits"
    ),
  condition: Yup.string().required("Condition is required"),
});

const AddPatientForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPatient) => addPatient(newPatient),
    onSuccess: () => {
      queryClient.invalidateQueries(["patient"]);
      toast.success("Patient added successfully!");
    },
    onError: (error) => {
      toast.dismiss(); // Remove loading toast
      toast.error(`Error: ${error.message}`);
      console.error("Error adding patient:", error.message);
    },
  });

  return (
    <>
      <Box fullWidth mx="auto" p={3} boxShadow={2}>
        <Typography variant="h6" gutterBottom>
          Add Patient
        </Typography>
        <Formik
          initialValues={{ name: "", age: "",phoneNumber:"", condition: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            mutation.mutate(values);
            resetForm(); // Reset the form after successful submission
          }}
        >
          {({ errors, touched, handleChange, handleSubmit,resetForm  }) => (
            <form
              onSubmit={handleSubmit} 
              className="flex sm:flex-row flex-col gap-2"
            >
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  variant="outlined"
                  onChange={handleChange}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="condition"
                  label="Condition"
                  variant="outlined"
                  onChange={handleChange}
                  error={touched.condition && Boolean(errors.condition)}
                  helperText={touched.condition && errors.condition}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      resetForm();
                      mutation.reset(); 
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </Box>
              {mutation.isLoading && <Typography>Adding patient...</Typography>}
            </form>
          )}
        </Formik>
      </Box>
      <div className="mt-4">
        <ViewPatient />
      </div>
    </>
  );
};

export default AddPatientForm;
