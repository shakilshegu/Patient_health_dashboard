import { axiosInstance } from "../Api/axiosInstance"

export const addPatient = async (formData) =>{
    try {
        const response = await axiosInstance.post('api/patients/add', formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add Patient'); 
    }
}

export const getPatients = async () =>{
    try {
        const response = await axiosInstance.get('api/patients/');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get Patient');  
    }
}
export const singlePatients = async (id) =>{
    try {
        const response = await axiosInstance.get(`api/patients/:id${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get Patient');  
    }
}

export const addPrior = async (formData) =>{
    try {
        const response = await axiosInstance.post('api/patients/prior/create',formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add Parir');  
    }
}

export const getAllPrior = async () =>{
    try {
        const response = await axiosInstance.get('api/patients/prior/all');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add Parir');  
    }
}

export const addPatientHealthRecord = async (id,formData) =>{
    try {
        const response = await axiosInstance.get(`api/patients/:id${id}/health-records`,formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add Health records'); 
    }
} 

